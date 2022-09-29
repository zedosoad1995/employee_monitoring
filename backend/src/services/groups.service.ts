import { Prisma } from "@prisma/client"
import prisma from "../../prisma/prisma-client"
import { ICreateGroup } from "../types/group"


export const getMany = async () => {
    let mainQuery: Prisma.GroupFindManyArgs = {
        select: {
            id: true,
            name: true,
            startTime: true,
            endTime: true,
            Employee: {
                select: {
                    name: true
                }
            },
            Break: {
                select: {
                    startTime: true,
                    endTime: true
                }
            }
        }
    }

    return {
        groups: await prisma.group.findMany(mainQuery),
        total: await prisma.group.count()
    }
}


export const create = async (group: ICreateGroup) => {
    let mainQuery: Prisma.GroupCreateArgs = {
        data: {
            name: group.name,
            startTime: group.startTime,
            endTime: group.endTime,
            Break: {
                createMany: {
                    data: group.breaks
                }
            }
        }
    }

    return await prisma.group.create(mainQuery)
}