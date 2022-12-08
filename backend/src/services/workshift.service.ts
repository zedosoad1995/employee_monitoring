import prisma from "../../prisma/prisma-client";

export const updateMany = async (
  data: any,
  employeeId: string,
  dateIni: string,
  dateFin: string
) => {
  await prisma.$transaction([
    prisma.workShift.deleteMany({
      where: {
        AND: [
          {
            date: {
              gte: dateIni,
            },
          },
          {
            date: {
              lte: dateFin,
            },
          },
        ],
        employeeId,
      },
    }),
    ...data.workshifts.map(({ date, subgroupId }: any) =>
      prisma.workShift.create({
        data: {
          date,
          subgroupId,
          employeeId,
        },
      })
    ),
  ]);
};
