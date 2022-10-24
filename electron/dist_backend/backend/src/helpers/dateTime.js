"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTimeStrFromMins = exports.getMinsFromTimeStr = void 0;
const getMinsFromTimeStr = (str) => {
    let [hh, mm] = str.split(':');
    return Number(hh) * 60 + Number(mm);
};
exports.getMinsFromTimeStr = getMinsFromTimeStr;
const getTimeStrFromMins = (totalMins) => {
    let tempMins = Math.abs(totalMins);
    const hours = Math.floor(tempMins / 60);
    const mins = tempMins - hours * 60;
    if (totalMins < 0) {
        return `-${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
    }
    return `+${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
};
exports.getTimeStrFromMins = getTimeStrFromMins;
