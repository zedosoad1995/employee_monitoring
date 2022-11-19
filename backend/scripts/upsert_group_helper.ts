import prisma from "../prisma/prisma-client";

export const getEmployee = async (name: string, cardId: string) => {
  const employee = await prisma.employee.findFirst({
    where: {
      name,
      cardId,
    },
  });

  if (!employee) {
    throw new Error("Employee does not exist");
  }

  return employee;
};

const getGroup = async (name: string) => {
  const group = await prisma.group.findFirst({
    where: {
      name,
    },
  });

  if (!group) {
    throw new Error("Group does not exist");
  }
  if (group.isConstant) {
    throw new Error("Group is constant");
  }

  return group;
};

export const createSubGroups = async (name: string, subgroupData: any) => {
  const group = await getGroup(name);

  const subgroup = await prisma.subgroup.create({
    data: {
      startTime: subgroupData.startTime,
      endTime: subgroupData.endTime,
      groupId: group.id,
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
