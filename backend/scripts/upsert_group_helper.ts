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
