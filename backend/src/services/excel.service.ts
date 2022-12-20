import { startOfMonth, endOfMonth, format } from "date-fns";
import * as XLSX from "xlsx";

import prisma from "../../prisma/prisma-client";
import { getDateRange } from "../helpers/dateTime";
import { getTimesFromSubgroup } from "../helpers/schedule";

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
