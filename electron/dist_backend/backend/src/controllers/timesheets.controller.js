"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.editTimesFromEmployee = exports.create = exports.getManyRaw = exports.getMany = void 0;
const timesheetsService = __importStar(require("../services/timesheets.service"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const getMany = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let resp;
    try {
        resp = yield timesheetsService.getMany(req.query);
    }
    catch (err) {
        return next(err);
    }
    res.status(http_status_codes_1.default.OK).json(resp);
});
exports.getMany = getMany;
const getManyRaw = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let resp;
    try {
        resp = yield timesheetsService.getManyRaw(req.query);
    }
    catch (err) {
        return next(err);
    }
    res.status(http_status_codes_1.default.OK).json(resp);
});
exports.getManyRaw = getManyRaw;
const create = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let resp;
    try {
        resp = yield timesheetsService.create(req.body);
    }
    catch (err) {
        return next(err);
    }
    res.status(http_status_codes_1.default.CREATED).json(resp);
});
exports.create = create;
const editTimesFromEmployee = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { date, times } = req.body;
    try {
        yield timesheetsService.editTimesFromEmployee(req.params.employeeId, date, times);
    }
    catch (err) {
        return next(err);
    }
    res.status(http_status_codes_1.default.NO_CONTENT).json();
});
exports.editTimesFromEmployee = editTimesFromEmployee;
