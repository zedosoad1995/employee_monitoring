"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseBoolean = void 0;
const parseBoolean = (val) => {
    if (typeof val !== 'string')
        return undefined;
    if (val.toLowerCase() === 'true')
        return true;
    if (val.toLowerCase() === 'false')
        return false;
};
exports.parseBoolean = parseBoolean;
