import { format } from "date-fns";
import { readFile, utils } from "xlsx";
import prisma from "../prisma/prisma-client";
import { createMany } from "../src/helpers/db";
import {
  getGroup,
  getEmployee,
  getExcelTables,
  isEveryEmployeeInGroup,
  isDatesInSequence,
  getSubgroup,
  parseScheduleDate,
} from "./upsert_group_helper";

const workbook = readFile(`${__dirname}\\excel_example.xlsx`, {
  type: "binary",
  cellDates: true,
});

const sheet_name_list = workbook.SheetNames;
const data: Array<any> = utils.sheet_to_json(
  workbook.Sheets[sheet_name_list[0]],
  { header: 1 }
);

const tables = getExcelTables(data);

const fillDB = async () => {
  return prisma.$transaction(async (tx) => {
    const subgroupDict: any = {};
    let workShifts: any = [];

    for (const { schedules, employees } of tables) {
      const groupName = schedules[0][0];
      subgroupDict[groupName] = [];
      const group = await getGroup(tx, groupName);
      if (!group) throw new Error(`Group ${groupName} does not exist`);

      const isValidGroup = await isEveryEmployeeInGroup(
        tx,
        group.id,
        employees
      );
      if (!isValidGroup)
        throw new Error(
          `One or more employees are not present the in the group ${groupName}`
        );

      // Schedules Table
      for (const [subgroupLabel, ...schedule] of schedules.slice(1)) {
        const breaks =
          schedule.length >= 2
            ? schedule
                .slice(1, -1)
                .reduce((acc: any, date: any, idx: number) => {
                  if (typeof date !== "string") date = format(date, "HH:mm");

                  if (idx % 2 === 0) {
                    acc.push({ startTime: date });
                  } else {
                    acc[acc.length - 1].endTime = date;
                  }

                  return acc;
                }, [])
            : [];

        const subgroupData = {
          startTime:
            typeof schedule[0] !== "string"
              ? format(schedule[0], "HH:mm")
              : schedule[0],
          endTime:
            typeof schedule.at(-1) !== "string"
              ? format(schedule.at(-1), "HH:mm")
              : schedule.at(-1),
          breaks,
        };

        const subgroup = await getSubgroup(tx, subgroupData, group);

        if (subgroupDict[groupName]) {
          subgroupDict[groupName][String(subgroupLabel)] = subgroup.id;
        } else {
          subgroupDict[groupName] = {
            [String(subgroupLabel)]: subgroup.id,
          };
        }
      }

      // Employees Table
      const dates = employees[0].slice(2);
      if (isDatesInSequence(dates.map((date: any) => new Date(date)))) {
        throw new Error(
          "Dates must be in sequence, of the same year, and have a valid Date format"
        );
      }

      for (const employeeWorkshifts of employees.slice(1)) {
        const employeeName = employeeWorkshifts[0];
        const employeeCardId = employeeWorkshifts[1];

        const employeeId = (await getEmployee(employeeName, employeeCardId)).id;

        workShifts = [
          ...workShifts,
          ...employeeWorkshifts
            .slice(2)
            .map((workshiftNum: any, idx: number) => ({
              subgroupId: subgroupDict[groupName][String(workshiftNum)],
              employeeId,
              date: parseScheduleDate(dates[idx]),
            }))
            .filter((val: any) => val.subgroupId),
        ];

        await tx.workShift.deleteMany({
          where: {
            employeeId,
            AND: [
              {
                date: {
                  gte: parseScheduleDate(dates[0]),
                },
              },
              {
                date: {
                  lte: parseScheduleDate(dates.at(-1)),
                },
              },
            ],
          },
        });
      }
    }

    await createMany(tx.workShift, workShifts, true);
  });
};

fillDB().then(() => {
  console.log("Done");
});

// TODO: Check if employee is constant
// Trim right
