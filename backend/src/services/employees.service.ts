import { Prisma } from "@prisma/client";
import prisma from "../../prisma/prisma-client";
import { ICreateEmployee } from "../types/employee";

export const getMany = async ({ groupId }: { groupId?: string } = {}) => {
  const mainQuery: Prisma.EmployeeFindManyArgs = {
    select: {
      id: true,
      cardId: true,
      name: true,
      currGroup: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  };

  const whereQuery: any = {};
  if (groupId) {
    whereQuery.currGroup = {
      id: groupId,
    };
  }

  mainQuery.where = whereQuery;

  return {
    employees: await prisma.employee.findMany(mainQuery),
    total: await prisma.employee.count(),
  };
};

export const getManyShort = async () => {
  let mainQuery: Prisma.EmployeeFindManyArgs = {
    select: {
      id: true,
      name: true,
    },
  };

  return {
    employees: await prisma.employee.findMany(mainQuery),
    total: await prisma.employee.count(),
  };
};

export const getOne = async (employeeId: string) => {
  let mainQuery: Prisma.EmployeeFindFirstArgs = {
    select: {
      id: true,
      name: true,
      cardId: true,
      currGroup: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    where: {
      id: employeeId,
    },
  };

  return await prisma.employee.findFirst(mainQuery);
};

export const update = async (employeeId: string, data: any) => {
  return prisma.employee.update({
    data: {
      name: data.name,
      cardId: data.cardId,
      currGroup: {
        connect: {
          id: data.groupId,
        },
      },
    },
    where: {
      id: employeeId,
    },
  });
};

export const create = async (employee: ICreateEmployee) => {
  let mainQuery: Prisma.EmployeeCreateArgs = {
    data: {
      cardId: employee.cardId,
      name: employee.name,
      currGroup: {
        connect: {
          id: employee.groupId,
        },
      },
    },
  };

  return await prisma.employee.create(mainQuery);
};

export const deleteOne = async (employeeId: string) => {
  let mainQuery: Prisma.EmployeeDeleteArgs = {
    where: {
      id: employeeId,
    },
  };

  return await prisma.employee.delete(mainQuery);
};
