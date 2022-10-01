import { groups, breaks, employees, timesheets } from './seed.json'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const main = async () => {
    await prisma.timesheet.deleteMany()
    await prisma.employee.deleteMany()
    await prisma.break.deleteMany()
    await prisma.group.deleteMany()

    await prisma.group.createMany({
        data: groups
    })
    await prisma.break.createMany({
        data: breaks
    })
    await prisma.employee.createMany({
        data: employees
    })
    await prisma.timesheet.createMany({
        data: timesheets
    })
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })