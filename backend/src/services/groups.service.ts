import { Prisma, PrismaClient } from "@prisma/client";
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
    WeekDayWork: group.isConstant ? group.WeekDayWork : undefined,
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
      },
    },
    where: {
      id: groupId,
    },
  };

  const group = (await prisma.group.findFirst(
    mainQuery
  )) as unknown as IGetManyGroupInferred;

  let retGroups;

  /* if (group.isConstant) {
    retGroups = {
      id: group.id,
      name: group.name,
      startTime: group.isConstant
        ? group.SubGroup?.at(0)?.startTime
        : undefined,
      endTime: group.isConstant ? group.SubGroup?.at(0)?.endTime : undefined,
      Break: group.isConstant ? group.SubGroup?.at(0)?.Break : undefined,
    };
  } else {
    retGroups = {
      id: group.id,
      name: group.name,
      subgroups: group.SubGroup,
    };
  } */

  retGroups = {
    id: group.id,
    name: group.name,
    isConstant: group.isConstant,
    weekDays: group.WeekDayWork,
    subgroups: group.SubGroup,
  };

  return retGroups;
};

export const update = async (groupId: string, data: any) => {
  let weekdaysWork;

  if (data.isConstant) {
    const weekDays = await prisma.weekDayWork.findMany();
    weekdaysWork = data.weekdaysWork.map((dayValue: any) => ({
      id: weekDays.find((weekDay) => weekDay.value === dayValue)?.id,
    }));

    if (weekdaysWork.some((day: any) => day.id === undefined))
      throw new Error("Undefined week day value");
  }

  return prisma.group.update({
    data: {
      isConstant: data.isConstant,
      name: data.name,
      WeekDayWork: {
        set: weekdaysWork,
      },
    },
    where: {
      id: groupId,
    },
  });
};

export const create = async (group: ICreateGroup) => {
  let mainQuery: Prisma.GroupCreateArgs = {
    data: {
      name: group.name,
      SubGroup: {
        create: {
          startTime: group.startTime,
          endTime: group.endTime,
          Break: {
            create: group.breaks,
          },
        },
      },
      isConstant: true,
    },
  };

  return await prisma.group.create(mainQuery);
};

export const deleteOne = async (groupId: string) => {
  let mainQuery: Prisma.GroupDeleteArgs = {
    where: {
      id: groupId,
    },
  };

  return await prisma.group.delete(mainQuery);
};
