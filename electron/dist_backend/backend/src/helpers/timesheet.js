"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBreaks = exports.getOvertime = void 0;
const constants_1 = require("../constants");
const dateTime_1 = require("./dateTime");
const getOvertime = (endTime, group) => {
    return (0, dateTime_1.getMinsFromTimeStr)(endTime) - (0, dateTime_1.getMinsFromTimeStr)(group.endTime);
};
exports.getOvertime = getOvertime;
const getBreaks = (times, group, hasStart, hasEnd) => {
    let isSameSchedule = false;
    if (group) {
        const expectedMoves = '10'.repeat(group.Break.length + 1);
        const moves = times.reduce((acc, el) => {
            return acc + String(Number(el.isEnter));
        }, '');
        isSameSchedule = expectedMoves === moves;
    }
    const breaksIni = hasStart ? 1 : 0;
    const timesSliced = hasEnd ? times.slice(breaksIni, -1) : times.slice(breaksIni);
    const breaks = timesSliced.reduce((acc, el) => {
        var _a, _b, _c;
        if (el.isEnter) {
            if (acc.length === 0 || ((_a = acc.at(-1)) === null || _a === void 0 ? void 0 : _a.at(1).length) === 2) {
                acc.push([el.id, ['', el.time]]);
            }
            else if (((_b = acc.at(-1)) === null || _b === void 0 ? void 0 : _b.at(1).length) === 1) {
                acc[acc.length - 1][1].push(el.time);
            }
        }
        else {
            if (((_c = acc.at(-1)) === null || _c === void 0 ? void 0 : _c.at(1).length) === 1) {
                acc[acc.length - 1][1].push('');
            }
            acc.push([el.id, [el.time]]);
        }
        return acc;
    }, [])
        .map((el, index) => {
        const duration = (isSameSchedule && el[1][0] && el[1][1]) ?
            (0, dateTime_1.getTimeStrFromMins)((0, dateTime_1.getMinsFromTimeStr)(el[1][1]) - (0, dateTime_1.getMinsFromTimeStr)(el[1][0])) : '';
        const minsExceeding = (isSameSchedule && group && el[1][0] && el[1][1]) ?
            ((0, dateTime_1.getMinsFromTimeStr)(el[1][1]) - (0, dateTime_1.getMinsFromTimeStr)(el[1][0])) -
                ((0, dateTime_1.getMinsFromTimeStr)(group.Break[index].endTime) - (0, dateTime_1.getMinsFromTimeStr)(group.Break[index].startTime))
            : '';
        return {
            id: el[0],
            startTime: el[1][0],
            endTime: el[1][1],
            duration,
            minsExceeding,
            isNotAcceptable: minsExceeding ? minsExceeding > constants_1.BREAK_DURATION_TH : false
        };
    });
    return {
        breaks,
        isNotAcceptableBreak: breaks.some(b => b.isNotAcceptable),
        hasMalfunction: !isSameSchedule
    };
};
exports.getBreaks = getBreaks;
