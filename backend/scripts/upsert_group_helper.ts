import { Prisma } from "@prisma/client";
import { getYear, isDate } from "date-fns";
import getDayOfYear from "date-fns/getDayOfYear";
import prisma from "../prisma/prisma-client";

export const getEmployee = async (name: string, cardId: string) => {
  const employee = await prisma.employee.findFirst({
    where: {
      name,
    },
  });

  if (!employee) {
    throw new Error("Employee does not exist");
  }

  return employee;
};

export const getGroup = async (tx: Prisma.TransactionClient, name: string) => {
  const group = await tx.group.findFirst({
    where: {
      name,
    },
  });

  return group;
};

export const isDatesInSequence = (dates: Date[]) => {
  for (let i = 1; i < dates.length; i++) {
    if (
      getDayOfYear(dates[i]) - getDayOfYear(dates[i - 1]) !== 1 ||
      getYear(dates[i]) !== getYear(dates[i - 1]) ||
      !isDate(dates[i]) ||
      isDate(dates[i - 1])
    ) {
      return false;
    }
  }

  return true;
};

export const isEveryEmployeeInGroup = async (
  tx: Prisma.TransactionClient,
  employees: any
) => {
  const employeeNames = employees.slice(1).map((e: any) => e[0]);
  const employeeCardIds = employees.slice(1).map((e: any) => e[1]);

  const andQuery = employeeNames.map((eName: any, idx: number) => ({
    Employee: {
      some: {
        AND: [
          {
            name: {
              equals: eName,
            },
          },
          {
            cardId: {
              equals: employeeCardIds[idx],
            },
          },
        ],
      },
    },
  }));

  const group = await tx.group.findFirst({
    include: {
      Employee: true,
    },
    where: {
      AND: andQuery,
    },
  });

  return !!group;
};

export const createSubGroups = async (
  tx: Prisma.TransactionClient,
  subgroupData: any,
  groupId: string
) => {
  const subgroup = await tx.subgroup.create({
    data: {
      startTime: subgroupData.startTime,
      endTime: subgroupData.endTime,
      groupId,
      Break: {
        create: subgroupData.breaks.map((b: any) => ({
          startTime: b.startTime,
          endTime: b.endTime,
        })),
      },
    },
  });

  return subgroup;
};

export const getExcelTables = (data: Array<any>) => {
  const tableIdxs = data
    .reduce((acc, row, idx) => {
      if (
        idx === 0 ||
        idx === data.length - 1 ||
        (row.length > 0 &&
          (data[idx - 1].length === 0 || data[idx + 1].length === 0))
      ) {
        acc.push(idx);
      }

      return acc;
    }, [])
    .reduce(
      (
        acc: Array<{ schedule: Array<number>; employees: Array<number> }>,
        num: number,
        idx: number
      ) => {
        if (idx % 4 === 0) {
          acc.push({ schedule: [num], employees: [] });
        } else if (idx % 4 === 1) {
          acc[acc.length - 1].schedule.push(num);
        } else if (idx % 4 >= 2) {
          acc[acc.length - 1].employees.push(num);
        }

        return acc;
      },
      []
    );

  return tableIdxs.map((tableIdx: any) => ({
    schedules: data.slice(tableIdx.schedule[0], tableIdx.schedule[1] + 1),
    employees: data.slice(tableIdx.employees[0], tableIdx.employees[1] + 1),
  }));
};
