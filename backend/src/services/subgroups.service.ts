import prisma from "../../prisma/prisma-client";

export const create = async (data: any) => {
  const breaks = data.breaks.map((b: any) => ({
    startTime: b.startTime,
    endTime: b.endTime,
  }));

  return prisma.subgroup.create({
    data: {
      groupId: data.groupId,
      startTime: data.startTime,
      endTime: data.endTime,
      Break: {
        create: breaks,
      },
    },
  });
};

export const update = async (subgroupId: string, data: any) => {
  const breaks = data.breaks.map((b: any) => ({
    startTime: b.startTime,
    endTime: b.endTime,
  }));

  return prisma.$transaction([
    prisma.break.deleteMany({
      where: {
        subgroupId,
      },
    }),
    prisma.subgroup.update({
      data: {
        startTime: data.startTime,
        endTime: data.endTime,
        Break: {
          create: breaks,
        },
      },
      where: {
        id: subgroupId,
      },
    }),
  ]);
};

export const deleteOne = async (id: string) => {
  return prisma.subgroup.delete({
    where: {
      id,
    },
  });
};
