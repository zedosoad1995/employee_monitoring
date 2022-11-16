import { groups, breaks, employees, timesheets } from './generatedSeed.json'
import { PrismaClient } from '@prisma/client'
import { createMany } from '../src/helpers/db'
const prisma = new PrismaClient()

const main = async () => {
    await prisma.timesheet.deleteMany()
    await prisma.employee.deleteMany()
    await prisma.break.deleteMany()
    await prisma.group.deleteMany()

    await createMany(prisma.group, groups)
    await createMany(prisma.break, breaks)
    await createMany(prisma.employee, employees)
    await createMany(prisma.timesheet, timesheets)
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