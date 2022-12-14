import { readFile, utils } from "xlsx";
import { format } from "date-fns";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import { faker } from "@faker-js/faker";

const weekDayWorkSun = {
  id: faker.datatype.uuid(),
  value: 0,
};
const weekDayWorkMon = {
  id: faker.datatype.uuid(),
  value: 1,
};
const weekDayWorkTue = {
  id: faker.datatype.uuid(),
  value: 2,
};
const weekDayWorkWed = {
  id: faker.datatype.uuid(),
  value: 3,
};
const weekDayWorkThu = {
  id: faker.datatype.uuid(),
  value: 4,
};
const weekDayWorkFri = {
  id: faker.datatype.uuid(),
  value: 5,
};
const weekDayWorkSat = {
  id: faker.datatype.uuid(),
  value: 6,
};
const weekDayWorks = [
  weekDayWorkSun,
  weekDayWorkMon,
  weekDayWorkTue,
  weekDayWorkWed,
  weekDayWorkThu,
  weekDayWorkFri,
  weekDayWorkSat,
];

const groupConstant = {
  id: faker.datatype.uuid(),
  name: `${faker.word.adjective()} workers`,
  isConstant: true,
  WeekDayWork: {
    connect: [
      {
        id: weekDayWorkMon.id,
      },
      {
        id: weekDayWorkTue.id,
      },
      {
        id: weekDayWorkWed.id,
      },
      {
        id: weekDayWorkThu.id,
      },
      {
        id: weekDayWorkFri.id,
      },
    ],
  },
};
const groupVariant = {
  id: faker.datatype.uuid(),
  name: `${faker.word.adjective()} workers`,
  isConstant: false,
};
const groups = [groupConstant, groupVariant];

const subGroupConstant = {
  id: faker.datatype.uuid(),
  startTime: "08:00",
  endTime: "18:00",
  groupId: groupConstant.id,
};
const subGroupVariant1 = {
  id: faker.datatype.uuid(),
  startTime: "09:00",
  endTime: "18:00",
  groupId: groupVariant.id,
};
const subGroupVariant2 = {
  id: faker.datatype.uuid(),
  startTime: "09:00",
  endTime: "19:00",
  groupId: groupVariant.id,
};

const subGroups = [subGroupConstant, subGroupVariant1, subGroupVariant2];

const selectSubGroup = (num: number) => {
  if (num === 1) {
    return subGroupVariant1.id;
  }
  if (num === 2) {
    return subGroupVariant2.id;
  }
};

const selectGroup = (num: number) => {
  if (num === 0) {
    return groupConstant.id;
  }
  return groupVariant.id;
};

const year = 2022;
const month = 8;

const workbook = readFile(
  "C:\\Projects\\employees_monitor\\backend\\prisma\\seed\\employees_sample.xlsx",
  { type: "binary", cellDates: true }
);

const sheet_name_list = workbook.SheetNames;
const data: Array<any> = utils.sheet_to_json(
  workbook.Sheets[sheet_name_list[0]]
);

const keysDict = {
  __EMPTY: "date",
  姓名: "employee",
  更改前開始時間: "startTime",
  更改前結束時間: "endTime",
};
const dateFields = ["date"];
const timeFields = ["startTime", "endTime"];

const convertedData = data.map((row) =>
  Object.entries(keysDict).reduce((acc: any, [original, translation]) => {
    if (dateFields.includes(translation)) {
      acc[translation] = format(row[original], "yyyy-MM-dd");
    } else if (timeFields.includes(translation)) {
      acc[translation] = row[original] ? format(row[original], "HH:mm") : null;
    } else {
      const employeeInfo = row[original].split("(");
      acc["name"] = employeeInfo[0];
      acc["cardId"] = employeeInfo[1].slice(0, -1);
    }
    return acc;
  }, {})
);

const employees = Object.entries(
  convertedData.reduce((acc: any, el) => {
    acc[el.cardId.trim()] = el.name;
    return acc;
  }, {})
).map(([cardId, name]) => ({
  id: uuidv4(),
  name,
  cardId,
  currGroupId: selectGroup(faker.datatype.number({ min: 0, max: 0 })),
}));

const timesheets = convertedData.reduce((acc: any, el) => {
  if (el.startTime) {
    const employee = employees.find((e) => el.cardId.trim() === e.cardId);
    if (!employee)
      throw new Error("Cannot find employee in row " + JSON.stringify(el));

    acc.push({
      date: el.date,
      time: el.startTime,
      isEnter: true,
      employeeId: employee.id,
      groupId: employee.currGroupId,
    });
  }

  if (el.endTime) {
    const employee = employees.find((e) => el.cardId.trim() === e.cardId);
    if (!employee)
      throw new Error("Cannot find employee in row " + JSON.stringify(el));

    acc.push({
      date: el.date,
      time: el.endTime,
      isEnter: false,
      employeeId: employee.id,
      groupId: employee.currGroupId,
    });
  }

  return acc;
}, []);

timesheets.sort((a: any, b: any) => {
  const dateCmp = a.date.localeCompare(b.date);
  if (dateCmp) return dateCmp;

  const employeeCmp = a.employeeId.localeCompare(b.employeeId);
  if (employeeCmp) return employeeCmp;

  return a.time.localeCompare(b.time);
});

const workshifts = employees.reduce((acc: any, employee) => {
  if (employee.currGroupId === groupConstant.id) return acc;

  const worksheetsEmployee = Array.from({ length: 30 }, (_, i) => i + 1)
    .map((day) => ({
      date: format(new Date(year, month, day), "yyyy-MM-dd"),
      subgroupId: selectSubGroup(faker.datatype.number({ min: 0, max: 2 })),
      employeeId: employee.id,
    }))
    .filter((ws) => ws.subgroupId);

  acc = acc.concat(worksheetsEmployee);

  return acc;
}, []);

const breakRanges = [
  [
    ["10:00", "10:15"],
    ["12:00", "13:00"],
    ["15:15", "15:30"],
  ],
  [
    ["10:30", "10:45"],
    ["12:00", "13:00"],
    ["15:45", "16:00"],
  ],
  [
    ["10:00", "10:45"],
    ["12:00", "13:00"],
    ["15:45", "16:00"],
  ],
];

const breaks = breakRanges
  .map((brs, idx) =>
    brs.map(([startTime, endTime]) => ({
      startTime,
      endTime,
      subgroupId: subGroups[idx].id,
    }))
  )
  .flat();

const seed = {
  employees,
  timesheets,
  groups,
  weekDayWorks,
  subGroups,
  workshifts,
  breaks,
};

fs.writeFileSync(
  "C:\\Projects\\employees_monitor\\backend\\prisma\\seed\\generatedSeed.json",
  JSON.stringify(seed)
);
