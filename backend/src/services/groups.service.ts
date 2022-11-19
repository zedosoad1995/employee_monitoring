import { Prisma } from "@prisma/client";
import prisma from "../../prisma/prisma-client";
import { ICreateGroup, IGetManyGroupInferred } from "../types/group";

export const getMany = async () => {
  let mainQuery: Prisma.GroupFindManyArgs = {
    select: {
      id: true,
      name: true,
      isConstant: true,
      Employee: {
        select: {
          id: true,
          name: true,
          cardId: true,
        },
      },
      WeekDayWork: {
        select: {
          id: true,
          value: true,
        },
      },
      SubGroup: {
        select: {
          id: true,
          startTime: true,
          endTime: true,
          Break: {
            select: {
              id: true,
              startTime: true,
              endTime: true,
            },
            orderBy: {
              startTime: "asc",
            },
          },
        },
        where: {
          group: {
            isConstant: true,
          },
        },
      },
    },
  };

  const groups = (await prisma.group.findMany(
    mainQuery
  )) as unknown as IGetManyGroupInferred[];

  const retGroups = groups.map((group) => ({
    id: group.id,
    name: group.name,
    startTime: group.isConstant ? group.SubGroup?.at(0)?.startTime : undefined,
    endTime: group.isConstant ? group.SubGroup?.at(0)?.endTime : undefined,
    Break: group.isConstant ? group.SubGroup?.at(0)?.Break : undefined,
  }));

  return {
    groups: retGroups,
    total: await prisma.group.count(),
  };
};

export const getManyShort = async () => {
  let mainQuery: Prisma.GroupFindManyArgs = {
    select: {
      id: true,
      name: true,
    },
  };

  return {
    groups: await prisma.group.findMany(mainQuery),
    total: await prisma.group.count(),
  };
};

export const getOne = async (groupId: string) => {
  let mainQuery: Prisma.GroupFindFirstArgs = {
    select: {
      id: true,
      name: true,
      isConstant: true,
      Employee: {
        select: {
          id: true,
          name: true,
          cardId: true,
        },
      },
      WeekDayWork: {
        select: {
          id: true,
          value: true,
        },
      },
      SubGroup: {
        select: {
          id: true,
          startTime: true,
          endTime: true,
          Break: {
            select: {
              id: true,
              startTime: true,
              endTime: true,
            },
            orderBy: {
              startTime: "asc",
            },
          },
        },
        where: {
          group: {
            isConstant: true,
          },
        },
      },
    },
    where: {
      id: groupId,
    },
  };

  const group = (await prisma.group.findFirst(
    mainQuery
  )) as unknown as IGetManyGroupInferred;

  const retGroups = {
    id: group.id,
    name: group.name,
    startTime: group.isConstant ? group.SubGroup?.at(0)?.startTime : undefined,
    endTime: group.isConstant ? group.SubGroup?.at(0)?.endTime : undefined,
    Break: group.isConstant ? group.SubGroup?.at(0)?.Break : undefined,
  };

  return retGroups;
};

export const update = async (groupId: string, data: any) => {
  /* await prisma.$transaction([
    prisma.break.deleteMany({
      where: {
        groupId: groupId,
      },
    }),
    prisma.group.update({
      data: {
        name: data.name,
        startTime: data.startTime,
        endTime: data.endTime,
        Break: {
          create: data.breaks,
        },
      },
      where: {
        id: groupId,
      },
    }),
  ]); */

  return;
};

export const create = async (group: ICreateGroup) => {
  /* let mainQuery: Prisma.GroupCreateArgs = {
    data: {
      name: group.name,
      startTime: group.startTime,
      endTime: group.endTime,
      Break: {
        create: group.breaks,
      },
    },
  };

  return await prisma.group.create(mainQuery); */
};

export const deleteOne = async (groupId: string) => {
  let mainQuery: Prisma.GroupDeleteArgs = {
    where: {
      id: groupId,
    },
  };

  return await prisma.group.delete(mainQuery);
};
