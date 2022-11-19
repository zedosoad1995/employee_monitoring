import { PrismaClient } from "@prisma/client";
import { createMany } from "../../../src/helpers/db";
const prisma = new PrismaClient();

const main = async () => {
  await prisma.workShift.deleteMany();

  const obj = {
    "3c29d49c-09e0-494c-8fff-aea20de9dcb6": {
      "04ea9489-fa9a-413d-896e-754422f5a1ed": [
        "2022-09-01",
        "2022-09-03",
        "2022-09-05",
      ],
      "04ea9489-fa9a-413d-896e-754422f5a1ee": [
        "2022-09-02",
        "2022-09-04",
        "2022-09-06",
      ],
    },
    "482114b0-3da3-4ea9-9528-80b0f2b4446e": {
      "04ea9489-fa9a-413d-896e-754422f5a1ed": [
        "2022-09-02",
        "2022-09-04",
        "2022-09-06",
      ],
      "04ea9489-fa9a-413d-896e-754422f5a1ee": [
        "2022-09-01",
        "2022-09-03",
        "2022-09-05",
      ],
    },
    "9da512e8-ca31-46e8-b475-9efcba3ab53d": {
      "04ea9489-fa9a-413d-896e-754422f5a1ed": [
        "2022-09-01",
        "2022-09-04",
        "2022-09-07",
      ],
      "04ea9489-fa9a-413d-896e-754422f5a1ee": [
        "2022-09-02",
        "2022-09-05",
        "2022-09-08",
      ],
    },
  };

  const workShiftObj = Object.entries(obj).reduce(
    (acc: any, [employeeId, groupsObj]) => {
      acc = acc.concat(
        Object.entries(groupsObj).reduce((acc: any, [groupId, dates]) => {
          acc = acc.concat(
            dates.map((date) => ({
              date,
              employeeId,
              groupId,
            }))
          );

          return acc;
        }, [])
      );

      return acc;
    },
    []
  );

  await createMany(prisma.workShift, workShiftObj);
  await prisma.employee.updateMany({
    data: {
      hasIrregularShifts: true,
    },
    where: {
      id: {
        in: Object.keys(obj),
      },
    },
  });
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
