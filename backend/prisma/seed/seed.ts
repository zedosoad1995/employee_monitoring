import {
  groups,
  breaks,
  employees,
  timesheets,
  subGroups,
  weekDayWorks,
  workshifts,
} from "./generatedSeed.json";
import { createMany } from "../../src/helpers/db";
import prisma from "../prisma-client";

const main = async () => {
  await prisma.weekDayWork.deleteMany();
  await prisma.break.deleteMany();
  await prisma.workShift.deleteMany();
  await prisma.subgroup.deleteMany();
  await prisma.timesheet.deleteMany();
  await prisma.employee.deleteMany();
  await prisma.group.deleteMany();

  await createMany(prisma.group, groups);
  await createMany(prisma.subgroup, subGroups);
  await createMany(prisma.weekDayWork, weekDayWorks);
  await createMany(prisma.break, breaks);
  await createMany(prisma.employee, employees);
  await createMany(prisma.workShift, workshifts);
  await createMany(prisma.timesheet, timesheets);
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
