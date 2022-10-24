"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const xlsx_1 = require("xlsx");
const date_fns_1 = require("date-fns");
const uuid_1 = require("uuid");
const fs_1 = __importDefault(require("fs"));
const workbook = (0, xlsx_1.readFile)('C:\\Projects\\employees_monitor\\backend\\prisma\\data\\employees_sample.xlsx', { type: "binary", cellDates: true });
const sheet_name_list = workbook.SheetNames;
const data = xlsx_1.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
const keysDict = { '__EMPTY': 'date', '姓名': 'employee', '更改前開始時間': 'startTime', '更改前結束時間': 'endTime' };
const dateFields = ['date'];
const timeFields = ['startTime', 'endTime'];
const convertedData = data.map(row => Object.entries(keysDict).reduce((acc, [original, translation]) => {
    if (dateFields.includes(translation)) {
        acc[translation] = (0, date_fns_1.format)(row[original], 'yyyy-MM-dd');
    }
    else if (timeFields.includes(translation)) {
        acc[translation] = row[original] ? (0, date_fns_1.format)(row[original], 'HH:mm') : null;
    }
    else {
        const employeeInfo = row[original].split('(');
        acc['name'] = employeeInfo[0];
        acc['cardId'] = employeeInfo[1].slice(0, -1);
    }
    return acc;
}, {}));
const employees = Object.entries(convertedData.reduce((acc, el) => {
    acc[el.cardId.trim()] = el.name;
    return acc;
}, {})).map(([cardId, name]) => ({ id: (0, uuid_1.v4)(), name, cardId, groupId: '04ea9489-fa9a-413d-896e-754422f5a1ed' }));
const timesheets = convertedData.reduce((acc, el) => {
    var _a, _b;
    if (el.startTime) {
        const employeeId = (_a = employees.find((e) => el.cardId.trim() === e.cardId)) === null || _a === void 0 ? void 0 : _a.id;
        if (!employeeId)
            throw new Error('Cannot find employee in row ' + JSON.stringify(el));
        acc.push({
            date: el.date,
            time: el.startTime,
            isEnter: true,
            employeeId
        });
    }
    if (el.endTime) {
        const employeeId = (_b = employees.find((e) => el.cardId.trim() === e.cardId)) === null || _b === void 0 ? void 0 : _b.id;
        if (!employeeId)
            throw new Error('Cannot find employee in row ' + JSON.stringify(el));
        acc.push({
            date: el.date,
            time: el.endTime,
            isEnter: false,
            employeeId
        });
    }
    return acc;
}, []);
timesheets.sort((a, b) => {
    const dateCmp = a.date.localeCompare(b.date);
    if (dateCmp)
        return dateCmp;
    const employeeCmp = a.employeeId.localeCompare(b.employeeId);
    if (employeeCmp)
        return employeeCmp;
    return a.time.localeCompare(b.time);
});
let baseSeed = fs_1.default.readFileSync('C:\\Projects\\employees_monitor\\backend\\prisma\\data\\baseSeed.json', 'utf-8');
const seed = Object.assign(Object.assign({}, JSON.parse(baseSeed)), { employees, timesheets });
fs_1.default.writeFileSync('C:\\Projects\\employees_monitor\\backend\\prisma\\data\\generatedSeed.json', JSON.stringify(seed));
