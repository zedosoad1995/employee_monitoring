import { faker } from "@faker-js/faker";
import { format } from "date-fns";

const groupConstant = {
  id: faker.datatype.uuid(),
  name: faker.word.adjective(),
  isConstant: true,
};
const groupVariant = {
  id: faker.datatype.uuid(),
  name: faker.word.adjective(),
  isConstant: false,
};
const subGroupConstant = {
  id: faker.datatype.uuid(),
  startTime: "8:00",
  endTime: "18:00",
  groupId: groupConstant.id,
};
const subGroupVariant1 = {
  id: faker.datatype.uuid(),
  startTime: "9:00",
  endTime: "18:00",
  groupId: groupVariant.id,
};
const subGroupVariant2 = {
  id: faker.datatype.uuid(),
  startTime: "9:00",
  endTime: "19:00",
  groupId: groupVariant.id,
};

const selectSubGroup = (num: number) => {
  if (num === 1) {
    return subGroupVariant1.id;
  }
  if (num === 2) {
    return subGroupVariant2.id;
  }
};

const year = 2022;
const month = 9;

const workshifts = Array.from({ length: 30 }, (_, i) => i + 1).map((day) => ({
  date: format(new Date(year, month, day), "yyyy-MM-dd"),
  subgroupId: selectSubGroup(faker.datatype.number({ min: 0, max: 2 })),
}));
