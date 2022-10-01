import { Prisma } from "@prisma/client"
import prisma from "../../prisma/prisma-client"
import { getMinsFromTimeStr, getTimeStrFromMins } from "../helpers/dateTime"
import { getBreaks, getOvertime } from "../helpers/timesheet"
import { ICreateTimesheet, ITimesheetObj } from "../types/timesheet"


/* export const getMany = async () => {
    let mainQuery: Prisma.TimesheetFindManyArgs = {
        select: {
            id: true,
            date: true,
            time: true,
            isEnter: true,
            employee: {
                select: {
                    name: true
                }
            }
        }
    }
    
    return {
        timesheets: await prisma.timesheet.findMany(mainQuery),
        total: await prisma.timesheet.count()
    }
} */

export const getMany = async () => {
    let timesheets = await prisma.timesheet.findMany({
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
    })

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

    const transformedTimesheets = Object.values(timesheets.reduce((acc: ITimesheetObj, el) => {
        if (!(el.employee.id in acc)) {
            acc[el.employee.id] = {
                times: [],
                name: el.employee.name,
                group: el.employee.group.id
            }
        }

        acc[el.employee.id].times.push({ time: el.time, isEnter: el.isEnter })
        return acc
    }, {}))
        .map(ts => {
            const group = groups.find(el => el.id === ts.group)

            // Calculate Overtime
            const overtime = group ? getOvertime(ts.times, group) : null

            // Calculate Time late
            const enterTime = ts.times.find(el => el.isEnter)
            const timeLate = (group && enterTime) ?
                getTimeStrFromMins(getMinsFromTimeStr(enterTime.time) - getMinsFromTimeStr(group.startTime)) :
                null

            // Calculate Breaks Duration
            const { breaks, isNotAcceptableBreak: hasNonAcceptableBreaks } = getBreaks(ts.times, group)

            const exitTime = ts.times.slice(0).reverse().find(el => !el.isEnter)

            return {
                name: ts.name,
                group: group ? group.name : null,
                overtime, timeLate,
                startTime: enterTime ? enterTime.time : null,
                endTime: exitTime ? exitTime.time : null,
                breaks,
                hasNonAcceptableBreaks
            }
        })


    return {
        timesheets: transformedTimesheets,
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