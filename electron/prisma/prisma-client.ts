import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient({
    datasources: {
        db: {
            url: "file:C:/Users/joaop/Desktop/dev.db",
        },
    },
})

export default prisma
