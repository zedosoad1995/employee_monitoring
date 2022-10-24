"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editTimesFromEmployee = exports.create = exports.getMany = exports.getManyRaw = void 0;
const prisma_client_1 = __importDefault(require("../../../prisma/prisma-client"));
const constants_1 = require("../constants");
const dateTime_1 = require("../helpers/dateTime");
const parser_1 = require("../helpers/parser");
const timesheet_1 = require("../helpers/timesheet");
const getManyRaw = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const { date, employeeId } = query;
    let mainQuery = {
        select: {
            id: true,
            date: true,
            time: true,
            isEnter: true,
            employee: {
                select: {
                    id: true,
                    name: true
                }
            }
        }
    };
    mainQuery.where = {};
    if (date)
        mainQuery.where.date = date;
    if (employeeId)
        mainQuery.where.employeeId = employeeId;
    return {
        timesheets: yield prisma_client_1.default.timesheet.findMany(mainQuery),
        total: yield prisma_client_1.default.timesheet.count()
    };
});
exports.getManyRaw = getManyRaw;
const getMany = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const { date, employeeId, groupId } = query;
    const isLate = (0, parser_1.parseBoolean)(query.isLate);
    const mainQuery = {
        distinct: ['date', 'time', 'employeeId'],
        select: {
            id: true,
            date: true,
            time: true,
            isEnter: true,
            employee: {
                select: {
                    id: true,
                    name: true,
                    group: {
                        select: {
                            id: true
                        }
                    },
                    hasIrregularShifts: true,
                    WorkShift: {
                        select: {
                            id: true,
                            date: true,
                            groupId: true
                        }
                    }
                }
            }
        }
    };
    mainQuery.where = {};
    if (date)
        mainQuery.where.date = date;
    if (employeeId)
        mainQuery.where.employeeId = employeeId;
    if (groupId)
        mainQuery.where.employee = { groupId };
    const timesheets = yield prisma_client_1.default.timesheet.findMany(mainQuery);
    let groups = yield prisma_client_1.default.group.findMany({
        select: {
            id: true,
            name: true,
            startTime: true,
            endTime: true,
            Break: {
                select: {
                    startTime: true,
                    endTime: true
                }
            }
        }
    });
    const transformedTimesheets = Object.values(timesheets.reduce((acc, el) => {
        var _a;
        if (!((el.employee.id + el.date) in acc)) {
            const group = el.employee.hasIrregularShifts ?
                (_a = el.employee.WorkShift.find((w) => w.date === el.date)) === null || _a === void 0 ? void 0 : _a.groupId :
                el.employee.group.id;
            acc[el.employee.id + el.date] = {
                times: [],
                employeeId: el.employee.id,
                name: el.employee.name,
                group,
                date: el.date
            };
        }
        acc[el.employee.id + el.date].times.push({ id: el.id, time: el.time, isEnter: el.isEnter });
        return acc;
    }, {}))
        .reduce((acc, ts) => {
        var _a, _b;
        const group = groups.find(el => el.id === ts.group);
        // Calculate Time late
        const enterTime = ts.times[0].isEnter ? ts.times[0].time : '';
        let timeLate = null;
        if (group && enterTime) {
            const val = (0, dateTime_1.getMinsFromTimeStr)(enterTime) - (0, dateTime_1.getMinsFromTimeStr)(group.startTime);
            if ((isLate === true && val <= 0) || (isLate === false && val > 0))
                return acc;
            if (val > 0)
                timeLate = val;
        }
        else if (isLate !== undefined) {
            return acc;
        }
        const exitTime = !((_a = ts.times.at(-1)) === null || _a === void 0 ? void 0 : _a.isEnter) ? (_b = ts.times.at(-1)) === null || _b === void 0 ? void 0 : _b.time : '';
        // Calculate Breaks Duration
        const { breaks, isNotAcceptableBreak: hasNonAcceptableBreaks, hasMalfunction } = (0, timesheet_1.getBreaks)(ts.times, group, enterTime !== '', exitTime != '');
        // Calculate Overtime
        const overtime = (group && exitTime) ? (0, timesheet_1.getOvertime)(exitTime, group) : null;
        acc.push({
            employeeId: ts.employeeId,
            name: ts.name,
            group: group ? { id: group.id, name: group.name } : '',
            overtime,
            timeLate,
            startTime: enterTime,
            endTime: exitTime,
            date: ts.date,
            breaks,
            hasNonAcceptableBreaks,
            hasMalfunction
        });
        return acc;
    }, []);
    let { page, limit, sortBy, order } = query;
    const allowedSortFields = ['name', 'group', 'overtime', 'timeLate', 'startTime', 'endTime', 'date'];
    if (allowedSortFields.includes(sortBy)) {
        transformedTimesheets.sort((a, b) => {
            // @ts-ignore
            if (typeof a[sortBy] === 'string') {
                // @ts-ignore
                return order === 'desc' ? b[sortBy].localeCompare(a[sortBy]) : a[sortBy].localeCompare(b[sortBy]);
            }
            else {
                // @ts-ignore
                if (a[sortBy] === b[sortBy])
                    return 0;
                // @ts-ignore
                if (a[sortBy] === null)
                    return 1;
                // @ts-ignore
                if (b[sortBy] === null)
                    return -1;
                if (order === 'desc') {
                    // @ts-ignore
                    return b[sortBy] - a[sortBy];
                }
                else {
                    // @ts-ignore
                    return a[sortBy] - b[sortBy];
                }
            }
        });
    }
    const _page = page ? Math.max(Number(page), 0) : 0;
    const _limit = limit ? Math.min(Number(limit), constants_1.MAX_PAGE_LIMIT) : constants_1.DEFAULT_PAGE_LIMIT;
    const ini = _page * _limit;
    const fin = ini + _limit;
    return {
        timesheets: transformedTimesheets.slice(ini, fin),
        total: transformedTimesheets.length
    };
});
exports.getMany = getMany;
const create = (timesheet) => __awaiter(void 0, void 0, void 0, function* () {
    let mainQuery = {
        data: {
            date: timesheet.date,
            time: timesheet.time,
            isEnter: timesheet.isEnter,
            employee: {
                connect: {
                    id: timesheet.employeeId
                }
            }
        }
    };
    return yield prisma_client_1.default.timesheet.create(mainQuery);
});
exports.create = create;
const editTimesFromEmployee = (employeeId, date, times) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_client_1.default.$transaction([
        prisma_client_1.default.timesheet.deleteMany({
            where: {
                date,
                employeeId
            }
        }),
        times.startTime && prisma_client_1.default.timesheet.create({
            data: {
                date,
                employee: {
                    connect: {
                        id: employeeId
                    }
                },
                time: times.startTime,
                isEnter: true
            }
        }),
        ...times.breaks.map((b) => ['startTime', 'endTime'].map((k) => b[k] && prisma_client_1.default.timesheet.create({
            data: {
                date,
                employee: {
                    connect: {
                        id: employeeId
                    }
                },
                time: b[k],
                isEnter: k === 'endTime'
            }
        })).filter(val => val !== '')).flat().flat(),
        times.endTime && prisma_client_1.default.timesheet.create({
            data: {
                date,
                employee: {
                    connect: {
                        id: employeeId
                    }
                },
                time: times.endTime,
                isEnter: false
            }
        })
    ].filter(val => val));
    return;
});
exports.editTimesFromEmployee = editTimesFromEmployee;
