import prisma from "../../prisma/prisma-client";

export const createMany = async (
  model: any,
  datas: any,
  isTransaction: boolean = false
) => {
  const inserts = [];

  for (const data of datas) {
    inserts.push(model.create({ data }));
  }

  if (isTransaction) {
    return Promise.all(inserts);
  }

  return prisma.$transaction(inserts);
};
