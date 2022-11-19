import prisma from "../../prisma/prisma-client";

export const createMany = async (model: any, datas: any) => {
  const inserts = [];

  for (const data of datas) {
    inserts.push(model.create({ data }));
  }
  return prisma.$transaction(inserts);
};
