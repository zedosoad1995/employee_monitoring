import { Prisma } from "@prisma/client";
import prisma from "../../prisma/prisma-client";
import { ICreateEmployee } from "../types/employee";

interface IGetManyProps {
  groupId?: string;
  displayWorkshifts?: boolean;
  dateIni?: string;
  dateFin?: string;
}

export const getMany = async ({
  groupId,
  displayWorkshifts,
  dateIni,
  dateFin,
}: IGetManyProps = {}) => {
  const whereQuery: Prisma.EmployeeWhereInput = {};

  if (groupId) {
    whereQuery.currGroup = {
      id: groupId,
    };
  }

  let WorkShiftWhereQuery = {};
  if (dateIni || dateFin) {
    const dateIniQuery = {
      date: {
        gte: dateIni,
      },
    };
    const dateFinQuery = {
      date: {
        lte: dateFin,
      },
    };

    WorkShiftWhereQuery = {
      AND: [
        ...(dateIni ? [dateIniQuery] : []),
        ...(dateFin ? [dateFinQuery] : []),
      ],
    };
  }

  const WorkShiftQuery = displayWorkshifts
    ? {
        select: {
          id: true,
          date: true,
          subgroupId: true,
        },
        where: WorkShiftWhereQuery,
      }
    : false;

  const employees = await prisma.employee.findMany({
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
      WorkShift: WorkShiftQuery,
    },
    where: whereQuery,
  });

  return {
    employees,
    total: await prisma.employee.count({ where: whereQuery }),
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
