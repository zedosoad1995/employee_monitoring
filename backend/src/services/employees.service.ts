import { Prisma } from "@prisma/client"
import prisma from "../../prisma/prisma-client"
import { ICreateEmployee } from "../types/employee"


export const getMany = async () => {
    let mainQuery: Prisma.EmployeeFindManyArgs = {
        select: {
            id: true,
            cardId: true,
            name: true,
            group: {
                select: {
                    name: true
                }
            }
        }
    }

    return {
        timesheets: await prisma.employee.findMany(mainQuery),
        total: await prisma.timesheet.count()
    }
}


export const create = async (employee: ICreateEmployee) => {
    let mainQuery: Prisma.EmployeeCreateArgs = {
        data: {
            cardId: employee.cardId,
            name: employee.name,
            group: {
                connect: {
                    id: employee.groupId
                }
            }
        }
    }

    return await prisma.employee.create(mainQuery)
}