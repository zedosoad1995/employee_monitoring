import { Prisma } from "@prisma/client";
import { format, getYear, isDate } from "date-fns";
import getDayOfYear from "date-fns/getDayOfYear";
import prisma from "../../prisma/prisma-client";

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
  groupId: string,
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
    where: {
      id: groupId,
      AND: andQuery,
    },
  });

  return Boolean(group);
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

const trimRows = (data: Array<any>) => {
  while (data.length > 0) {
    if (data[0].length > 0) break;

    data.splice(0, 1);
  }

  let i = data.length - 1;
  while (data.length > 0) {
    if (data[i].length > 0) break;

    data.splice(i, 1);
    i -= 1;
  }

  return data;
};

export const getExcelTables = (data: Array<any>) => {
  data = trimRows(data);

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

export const getSubgroup = async (
  tx: Prisma.TransactionClient,
  subgroupData: any,
  group: any
) => {
  const andQuery = subgroupData.breaks.map(({ startTime, endTime }: any) => ({
    Break: {
      some: {
        AND: [
          {
            startTime: {
              equals: startTime,
            },
          },
          {
            endTime: {
              equals: endTime,
            },
          },
        ],
      },
    },
  }));

  const subgroup = await tx.subgroup.findFirst({
    where: {
      groupId: group.id,
      startTime: subgroupData.startTime,
      endTime: subgroupData.endTime,
      AND: andQuery,
    },
  });

  if (!subgroup) throw new Error(`Subgroup does not exist: ${subgroupData}`);

  return subgroup;
};

export const parseScheduleDate = (date: Date | string) =>
  typeof date !== "string"
    ? format(date, "yyyy-MM-dd")
    : `${new Date().getFullYear()}-${date.split("/")[1]}-${date.split("/")[0]}`;
