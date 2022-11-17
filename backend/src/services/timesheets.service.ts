import { Prisma, Timesheet } from "@prisma/client";
import prisma from "../../prisma/prisma-client";
import { DEFAULT_PAGE_LIMIT, MAX_PAGE_LIMIT } from "../constants";
import { getMinsFromTimeStr } from "../helpers/dateTime";
import { parseBoolean } from "../helpers/parser";
import { getBreaks, getOvertime } from "../helpers/timesheet";
import { ICreateTimesheet, ITimesheetObj } from "../types/timesheet";

export const getManyRaw = async (query: any) => {
  const { date, employeeId } = query;

  let mainQuery: Prisma.TimesheetFindManyArgs = {
    select: {
      id: true,
      date: true,
      time: true,
      isEnter: true,
      employee: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  };

  mainQuery.where = {};
  if (date) mainQuery.where.date = date;
  if (employeeId) mainQuery.where.employeeId = employeeId;

  return {
    timesheets: await prisma.timesheet.findMany(mainQuery),
    total: await prisma.timesheet.count(),
  };
};

export const getMany = async (query: any) => {
  const { date, employeeId, groupId } = query;
  const isLate = parseBoolean(query.isLate);

  const mainQuery: Prisma.TimesheetFindManyArgs = {
    distinct: ["date", "time", "employeeId"],
    select: {
      id: true,
      date: true,
      time: true,
      isEnter: true,
      employee: {
        select: {
          id: true,
          name: true,
        },
      },
      group: {
        select: {
          id: true,
          name: true,
          WorkShift: {
            select: {
              id: true,
              date: true,
              startTime: true,
              endTime: true,
              isConstant: true,
              Break: {
                select: {
                  id: true,
                  startTime: true,
                  endTime: true,
                },
              },
              WeekDayWork: {
                select: {
                  id: true,
                  value: true,
                },
              },
            },
          },
        },
      },
    },
    orderBy: {
      time: "asc",
    },
  };

  mainQuery.where = {};
  if (date) mainQuery.where.date = date;
  if (employeeId) mainQuery.where.employeeId = employeeId;
  if (groupId) mainQuery.where.groupId = groupId;

  const timesheets = await prisma.timesheet.findMany(mainQuery);

  type ITransformedTimesheets = {
    employeeId: string;
    name: string;
    group: any;
    overtime: number | null;
    timeLate: number | null;
    startTime: string;
    endTime: string;
    date: string;
    breaks: any;
    hasNonAcceptableBreaks: boolean;
    hasMalfunction: boolean;
  }[];

  const transformedTimesheets = Object.values(
    timesheets.reduce((acc: ITimesheetObj, el: any) => {
      if (!acc[el.employeeId] || !acc[el.employeeId][el.date]) {
        acc[el.employeeId][el.date] = {
          times: [],
          employeeId: el.employeeId,
          name: el.employee.name,
          group: el.group,
          date: el.date,
        };
      }

      acc[el.employeeId][el.date].times.push({
        id: el.id,
        time: el.time,
        isEnter: el.isEnter,
      });
      return acc;
    }, {})
  )
    .map((res) => Object.values(res))
    .flat()
    .reduce((acc: ITransformedTimesheets, ts) => {
      // Calculate Enter time
      const enterTime = ts.times[0].isEnter ? ts.times[0].time : "";

      // Calculate Time late
      let timeLate = null;
      if (ts.group && enterTime) {
        const val =
          getMinsFromTimeStr(enterTime) -
          getMinsFromTimeStr(ts.group.startTime);

        if ((isLate === true && val <= 0) || (isLate === false && val > 0))
          return acc;

        if (val > 0) timeLate = val;
      } else if (isLate !== undefined) {
        return acc;
      }

      // Calculate Exit time
      let exitTime: string = "";
      if (ts.times?.at(-1)?.isEnter && ts.times?.at(-1)?.time) {
        // @ts-ignore
        exitTime = ts.times.at(-1).time;
      }

      // Calculate Breaks Duration
      const {
        breaks,
        isNotAcceptableBreak: hasNonAcceptableBreaks,
        hasMalfunction,
      } = getBreaks(ts.times, ts.group, enterTime !== "", exitTime != "");

      // Calculate Overtime
      const overtime =
        ts.group && exitTime ? getOvertime(exitTime, ts.group) : null;

      acc.push({
        employeeId: ts.employeeId,
        name: ts.name,
        group: ts.group ? { id: ts.group.id, name: ts.group.name } : "",
        overtime,
        timeLate,
        startTime: enterTime,
        endTime: exitTime,
        date: ts.date,
        breaks,
        hasNonAcceptableBreaks,
        hasMalfunction,
      });

      return acc;
    }, []);

  let { page, limit, sortBy, order } = query;

  const allowedSortFields = [
    "name",
    "group",
    "overtime",
    "timeLate",
    "startTime",
    "endTime",
    "date",
  ];
  if (allowedSortFields.includes(sortBy)) {
    transformedTimesheets.sort((a: any, b: any) => {
      if (typeof a[sortBy] === "string") {
        return order === "desc"
          ? b[sortBy].localeCompare(a[sortBy])
          : a[sortBy].localeCompare(b[sortBy]);
      } else {
        if (a[sortBy] === b[sortBy]) return 0;
        if (a[sortBy] === null) return 1;
        if (b[sortBy] === null) return -1;

        if (order === "desc") {
          return b[sortBy] - a[sortBy];
        } else {
          return a[sortBy] - b[sortBy];
        }
      }
    });
  }

  const _page = page ? Math.max(Number(page), 0) : 0;
  const _limit = limit
    ? Math.min(Number(limit), MAX_PAGE_LIMIT)
    : DEFAULT_PAGE_LIMIT;

  const ini = _page * _limit;
  const fin = ini + _limit;

  return {
    timesheets:
      page === undefined && limit === undefined
        ? transformedTimesheets
        : transformedTimesheets.slice(ini, fin),
    total: transformedTimesheets.length,
  };
};

export const create = async (timesheet: ICreateTimesheet) => {
  const employee = await prisma.employee.findFirst({
    where: {
      id: timesheet.employeeId,
    },
  });

  let mainQuery: Prisma.TimesheetCreateArgs = {
    data: {
      date: timesheet.date,
      time: timesheet.time,
      isEnter: timesheet.isEnter,
      employee: {
        connect: {
          id: timesheet.employeeId,
        },
      },
      group: {
        connect: {
          id: employee?.currGroupId,
        },
      },
    },
  };

  return await prisma.timesheet.create(mainQuery);
};

export const editTimesFromEmployee = async (
  employeeId: string,
  date: any,
  times: any
) => {
  const employee = await prisma.employee.findFirst({
    where: {
      id: employeeId,
    },
  });

  await prisma.$transaction(
    [
      prisma.timesheet.deleteMany({
        where: {
          date,
          employeeId,
        },
      }),
      times.startTime &&
        prisma.timesheet.create({
          data: {
            date,
            employee: {
              connect: {
                id: employeeId,
              },
            },
            time: times.startTime,
            isEnter: true,
            group: {
              connect: {
                id: employee?.currGroupId,
              },
            },
          },
        }),
      ...times.breaks
        .map((b: any) =>
          ["startTime", "endTime"]
            .map(
              (k: string) =>
                b[k] &&
                prisma.timesheet.create({
                  data: {
                    date,
                    employee: {
                      connect: {
                        id: employeeId,
                      },
                    },
                    time: b[k],
                    isEnter: k === "endTime",
                    group: {
                      connect: {
                        id: employee?.currGroupId,
                      },
                    },
                  },
                })
            )
            .filter((val) => val !== "")
        )
        .flat()
        .flat(),
      times.endTime &&
        prisma.timesheet.create({
          data: {
            date,
            employee: {
              connect: {
                id: employeeId,
              },
            },
            time: times.endTime,
            isEnter: false,
            group: {
              connect: {
                id: employee?.currGroupId,
              },
            },
          },
        }),
    ].filter((val) => val)
  );

  return;
};
