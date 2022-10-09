import { Prisma } from "@prisma/client"
import prisma from "../../prisma/prisma-client"
import { DEFAULT_PAGE_LIMIT, MAX_PAGE_LIMIT } from "../constants"
import { getMinsFromTimeStr } from "../helpers/dateTime"
import { getBreaks, getOvertime } from "../helpers/timesheet"
import { ICreateTimesheet, ITimesheetObj } from "../types/timesheet"


export const getManyRaw = async (query: any) => {
    const { date, employeeId } = query

    let mainQuery: Prisma.TimesheetFindManyArgs = {
        select: {
            id: true,
            date: true,
            time: true,
            isEnter: true,
            employee: {
                select: {
                    id: true,
                    name: true
                }
            }
        }
    }

    mainQuery.where = {}
    if (date) mainQuery.where.date = date
    if (employeeId) mainQuery.where.employeeId = employeeId


    return {
        timesheets: await prisma.timesheet.findMany(mainQuery),
        total: await prisma.timesheet.count()
    }
}

export const getMany = async (query: any) => {
    const { date, employeeId } = query

    const mainQuery: Prisma.TimesheetFindManyArgs = {
        distinct: ['date', 'time', 'employeeId'],
        select: {
            id: true,
            date: true,
            time: true,
            isEnter: true,
            employee: {
                select: {
                    id: true,
                    name: true,
                    group: {
                        select: {
                            id: true
                        }
                    }
                }
            }
        }
    }

    mainQuery.where = {}
    if (date) mainQuery.where.date = date
    if (employeeId) mainQuery.where.employeeId = employeeId

    const timesheets = await prisma.timesheet.findMany(mainQuery)

    let groups = await prisma.group.findMany({
        select: {
            id: true,
            name: true,
            startTime: true,
            endTime: true,
            Break: {
                select: {
                    startTime: true,
                    endTime: true
                }
            }
        }
    })

    const transformedTimesheets = Object.values(timesheets.reduce((acc: ITimesheetObj, el: any) => {
        if (!(el.employee.id in acc)) {
            acc[el.employee.id] = {
                times: [],
                employeeId: el.employee.id,
                name: el.employee.name,
                group: el.employee.group.id
            }
        }

        acc[el.employee.id].times.push({ id: el.id, time: el.time, isEnter: el.isEnter })
        return acc
    }, {}))
        .map(ts => {
            const group = groups.find(el => el.id === ts.group)

            // Calculate Time late
            const enterTime = ts.times[0].isEnter ? ts.times[0].time : ''
            const timeLate = (group && enterTime) ?
                getMinsFromTimeStr(enterTime) - getMinsFromTimeStr(group.startTime) :
                ''

            const exitTime = !ts.times.at(-1)?.isEnter ? ts.times.at(-1)?.time : ''

            // Calculate Breaks Duration
            const { breaks, isNotAcceptableBreak: hasNonAcceptableBreaks, hasMalfunction } = getBreaks(ts.times, group, enterTime !== '', exitTime != '')

            // Calculate Overtime
            const overtime = (group && enterTime && exitTime) ? getOvertime(ts.times, group) : ''

            return {
                employeeId: ts.employeeId,
                name: ts.name,
                group: group ? { id: group.id, name: group.name } : '',
                overtime,
                timeLate,
                startTime: enterTime,
                endTime: exitTime,
                breaks,
                hasNonAcceptableBreaks,
                hasMalfunction
            }
        })

    let { page, limit, sortBy, order }: { page: string, limit: string, sortBy: string, order: string } = query

    const allowedSortFields = ['name', 'group', 'overtime', 'timeLate', 'startTime', 'endTime']
    if (allowedSortFields.includes(sortBy)) {
        transformedTimesheets.sort((a, b) => {
            // @ts-ignore
            if (typeof a[sortBy] === 'string') {
                // @ts-ignore
                return order === 'desc' ? b[sortBy].localeCompare(a[sortBy]) : a[sortBy].localeCompare(b[sortBy])
            } else {
                // @ts-ignore
                return order === 'desc' ? b[sortBy] - a[sortBy] : a[sortBy] - b[sortBy]
            }
        })
    }


    const _page = page ? Math.max(Number(page), 0) : 0
    const _limit = limit ? Math.min(Number(limit), MAX_PAGE_LIMIT) : DEFAULT_PAGE_LIMIT

    const ini = _page * _limit
    const fin = ini + _limit

    return {
        timesheets: transformedTimesheets.slice(ini, fin),
        total: transformedTimesheets.length
    }
}

export const create = async (timesheet: ICreateTimesheet) => {
    let mainQuery: Prisma.TimesheetCreateArgs = {
        data: {
            date: timesheet.date,
            time: timesheet.time,
            isEnter: timesheet.isEnter,
            employee: {
                connect: {
                    id: timesheet.employeeId
                }
            }
        }
    }

    return await prisma.timesheet.create(mainQuery)
}

export const editTimesFromEmployee = async (employeeId: string, date: any, times: any) => {
    await prisma.$transaction([
        prisma.timesheet.deleteMany({
            where: {
                date,
                employeeId
            }
        }),
        times.startTime && prisma.timesheet.create({
            data: {
                date,
                employee: {
                    connect: {
                        id: employeeId
                    }
                },
                time: times.startTime,
                isEnter: true
            }
        }),
        ...times.breaks.map((b: any) => ['startTime', 'endTime'].map((k: string) => b[k] && prisma.timesheet.create({
            data: {
                date,
                employee: {
                    connect: {
                        id: employeeId
                    }
                },
                time: b[k],
                isEnter: k === 'endTime'
            }
        })).filter(val => val !== '')).flat().flat(),
        times.endTime && prisma.timesheet.create({
            data: {
                date,
                employee: {
                    connect: {
                        id: employeeId
                    }
                },
                time: times.endTime,
                isEnter: false
            }
        })].filter(val => val))

    return
}