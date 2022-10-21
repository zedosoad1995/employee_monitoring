import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const main = async () => {
    await prisma.workShift.deleteMany()

    const employeeId = '3c29d49c-09e0-494c-8fff-aea20de9dcb6'

    await prisma.workShift.createMany({
        data: [
            {
                date: '2022-09-01',
                employeeId,
                groupId: '04ea9489-fa9a-413d-896e-754422f5a1ed'
            },
            {
                date: '2022-09-02',
                employeeId,
                groupId: '04ea9489-fa9a-413d-896e-754422f5a1ee'
            }
        ]
    })
    await prisma.employee.update({
        data: {
            hasIrregularShifts: true
        },
        where: {
            id: employeeId
        }
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