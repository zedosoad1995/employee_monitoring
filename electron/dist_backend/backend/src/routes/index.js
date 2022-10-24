"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const timesheets_route_1 = __importDefault(require("./timesheets.route"));
const employees_route_1 = __importDefault(require("./employees.route"));
const groups_route_1 = __importDefault(require("./groups.route"));
const api = (0, express_1.Router)()
    .use('/timesheets', timesheets_route_1.default)
    .use('/employees', employees_route_1.default)
    .use('/groups', groups_route_1.default);
exports.default = (0, express_1.Router)().use('/api', api);
