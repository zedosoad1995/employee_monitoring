import { Prisma } from "@prisma/client";
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

export const createGroup = async (
  tx: Prisma.TransactionClient,
  name: string
) => {
  const group = await tx.group.create({
    data: {
      name,
      isConstant: false,
    },
  });
  return group;
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
