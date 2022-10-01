import { Prisma } from "@prisma/client"
import prisma from "../../prisma/prisma-client"
import { getMinsFromTimeStr, getTimeStrFromMins } from "../helpers/dateTime"
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

            // Calculate Overtime
            const { totalMins } = ts.times.reduce((acc: any, el) => {
                if (acc.hasEntered && !el.isEnter) {
                    acc.totalMins += getMinsFromTimeStr(el.time) - acc.prevMins
                    acc.hasEntered = false
                } else if (!acc.hasEntered && el.isEnter) {
                    acc.prevMins = getMinsFromTimeStr(el.time)
                    acc.hasEntered = true
                }

                return acc
            }, { totalMins: 0, hasEntered: false, prevMins: 0 })


            const group = groups.find(el => el.id === ts.group)

            let overtime
            if (group) {
                const totalTimeDiff = getMinsFromTimeStr(group.endTime) - getMinsFromTimeStr(group.startTime)
                const timeInBreaks = group.Break.reduce((acc: number, el) => {
                    return acc + getMinsFromTimeStr(el.endTime) - getMinsFromTimeStr(el.startTime)
                }, 0)
                const expectedMins = totalTimeDiff - timeInBreaks
                overtime = getTimeStrFromMins(totalMins - expectedMins)
            }


            // Calculate Time late
            const enterTime = ts.times.find(el => el.isEnter)

            let timeLate
            if (group && enterTime) {
                timeLate = getTimeStrFromMins(getMinsFromTimeStr(enterTime.time) - getMinsFromTimeStr(group.startTime))
            }



            // Calculate Breaks Duration
            let breaks

            if (group) {
                const expectedMoves = '10'.repeat(group.Break.length + 1)
                const moves = ts.times.reduce((acc, el) => {
                    return acc + String(Number(el.isEnter))
                }, '')

                if (expectedMoves === moves) {
                    breaks = ts.times.slice(1, -1).reduce((acc: Array<Array<string>>, el) => {
                        if (el.isEnter) {
                            acc[acc.length - 1].push(el.time)
                        } else {
                            acc.push([el.time])
                        }
                        return acc
                    }, [])
                        .map((el, index) => ({
                            startTime: el[0],
                            endTime: el[1],
                            duration: getTimeStrFromMins(getMinsFromTimeStr(el[1]) - getMinsFromTimeStr(el[0])),
                            minsExceeding: (getMinsFromTimeStr(el[1]) - getMinsFromTimeStr(el[0])) -
                                (getMinsFromTimeStr(group.Break[index].endTime) - getMinsFromTimeStr(group.Break[index].startTime))
                        }))

                } else {
                    breaks = ts.times.slice(1, -1).reduce((acc: Array<Array<string | null>>, el) => {
                        if (el.isEnter) {
                            if (acc.at(-1)?.length === 2 || acc.length === 0) {
                                acc.push([null, el.time])
                            } else if (acc.at(-1)?.length === 1) {
                                acc[acc.length - 1].push(el.time)
                            }
                        } else {
                            if (acc.at(-1)?.length === 1) {
                                acc[acc.length - 1].push(null)
                            }
                            acc.push([el.time])
                        }
                        return acc
                    }, [])
                        .map((el) => ({
                            startTime: el[0],
                            endTime: el[1],
                            duration: null,
                            minsExceeding: null
                        }))
                }
            }

            const exitTime = ts.times.slice(0).reverse().find(el => !el.isEnter)

            return { name: ts.name, group: group?.name, overtime, timeLate, startTime: enterTime?.time, endTime: exitTime?.time, breaks }
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