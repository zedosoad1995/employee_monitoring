import { format } from "date-fns";
import { readFile, utils } from "xlsx";
import prisma from "../prisma/prisma-client";
import { createMany } from "../src/helpers/db";
import {
  createGroup,
  createSubGroups,
  getEmployee,
  getExcelTables,
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
      const createdGroup = await createGroup(tx, groupName);

      // Schedules Table
      for (const [subgroupLabel, ...schedule] of schedules.slice(1)) {
        const breaks =
          schedule.length >= 2
            ? schedule
                .slice(1, -1)
                .reduce((acc: any, date: any, idx: number) => {
                  if (idx % 2 === 0) {
                    acc.push({ startTime: format(date, "HH:mm") });
                  } else {
                    acc[acc.length - 1].endTime = format(date, "HH:mm");
                  }

                  return acc;
                }, [])
            : [];

        const subgroupData = {
          startTime: format(schedule[0], "HH:mm"),
          endTime: format(schedule.at(-1), "HH:mm"),
          breaks,
        };

        const subgroup = await createSubGroups(
          tx,
          subgroupData,
          createdGroup.id
        );

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

      for (const employeeWorkshifts of employees.slice(1)) {
        console.log(employeeWorkshifts);

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
              date: format(dates[idx], "yyyy-MM-dd"),
            }))
            .filter((val: any) => val.subgroupId),
        ];
      }
    }

    await createMany(tx.workShift, workShifts, true);
  });
};

fillDB().then(() => {
  console.log("Done");
});
