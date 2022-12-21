import { startOfMonth, endOfMonth, format } from "date-fns";
import * as XLSX from "xlsx";
import { read, utils } from "xlsx";
import {
  getGroup,
  getEmployee,
  getExcelTables,
  isEveryEmployeeInGroup,
  isDatesInSequence,
  getSubgroup,
  parseScheduleDate,
} from "../helpers/upsert_group_helper";

import prisma from "../../prisma/prisma-client";
import { getDateRange } from "../helpers/dateTime";
import { getTimesFromSubgroup } from "../helpers/schedule";
import { createMany } from "../helpers/db";

export const generateGroupExcel = async (groupId: string) => {
  const now = new Date("2022-09-01");
  const monthStart = format(startOfMonth(now), "yyyy-MM-dd");
  const monthEnd = format(endOfMonth(now), "yyyy-MM-dd");

  const group = await prisma.group.findFirst({
    where: {
      id: groupId,
    },
    include: {
      SubGroup: {
        include: {
          Break: true,
        },
      },
      Employee: {
        include: {
          WorkShift: {
            where: {
              AND: [
                {
                  date: {
                    gte: monthStart,
                  },
                },
                {
                  date: {
                    lte: monthEnd,
                  },
                },
              ],
            },
          },
        },
      },
    },
  });

  if (!group) throw new Error("Group does not exist");

  let scheduleHeader = [group.name];

  const times = [];
  const subgroupId2Num: Record<string, string> = {};
  for (let i = 1; i <= group.SubGroup.length; i++) {
    const subgroup = group.SubGroup[i - 1];

    times.push([String(i), ...getTimesFromSubgroup(subgroup)]);
    subgroupId2Num[subgroup.id] = String(i);
  }

  const maxScheduleLen = Math.max(...times.map((t) => (t.length - 1) / 2));
  scheduleHeader = scheduleHeader.concat(
    Array(maxScheduleLen).fill(["ON", "OFF"]).flat()
  );

  const dates = getDateRange(monthStart, monthEnd);

  const employeesHeader = (["Employee", "CardId"] as any[]).concat(
    dates.map((date) => format(date, "dd/MM"))
  );

  const employees = [];
  for (const employee of group.Employee) {
    const employeeWorkshifts = dates.map((date) => {
      const workshift = employee.WorkShift.find(
        (e) => e.date === format(date, "yyyy-MM-dd")
      );
      if (!workshift) return undefined;

      return subgroupId2Num[workshift.subgroupId];
    });

    employees.push([employee.name, employee.cardId, ...employeeWorkshifts]);
  }

  const rows = [
    scheduleHeader,
    ...times,
    [undefined],
    employeesHeader,
    ...employees,
  ];
  const maxColLen = Math.max(...rows.map((row) => row.length));
  rows.forEach((row, index) => {
    rows[index] = [
      ...rows[index],
      ...Array(maxColLen - row.length).fill(undefined),
    ];
  });

  const workbook = XLSX.utils.book_new();

  const worksheet = XLSX.utils.aoa_to_sheet(rows);

  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  return workbook;
};

export const uploadExcelToDB = async (fileData: any) => {
  const workbook = read(fileData.buffer, {
    type: "buffer",
    cellDates: true,
  });

  const sheet_name_list = workbook.SheetNames;
  const data: Array<any> = utils.sheet_to_json(
    workbook.Sheets[sheet_name_list[0]],
    { header: 1 }
  );

  const tables = getExcelTables(data);

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

// TODO: Check if employee is constant
// Trim right
