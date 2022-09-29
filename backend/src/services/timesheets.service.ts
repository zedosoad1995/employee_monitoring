import { Prisma } from "@prisma/client"
import prisma from "../../prisma/prisma-client"
import { ICreateTimesheet } from "../types/timesheet"


export const getMany = async () => {
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