"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addPlusSign = void 0;
const addPlusSign = (str) => {
    return (str[0] !== '-' ? '+' : '') + str;
};
exports.addPlusSign = addPlusSign;
