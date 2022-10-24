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
exports.deleteOne = exports.create = exports.update = exports.getOne = exports.getManyShort = exports.getMany = void 0;
const employeesService = __importStar(require("../services/employees.service"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const getMany = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let resp;
    try {
        resp = yield employeesService.getMany();
    }
    catch (err) {
        return next(err);
    }
    res.status(http_status_codes_1.default.OK).json(resp);
});
exports.getMany = getMany;
const getManyShort = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let resp;
    try {
        resp = yield employeesService.getManyShort();
    }
    catch (err) {
        return next(err);
    }
    res.status(http_status_codes_1.default.OK).json(resp);
});
exports.getManyShort = getManyShort;
const getOne = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let resp;
    try {
        resp = yield employeesService.getOne(req.params.id);
    }
    catch (err) {
        return next(err);
    }
    res.status(http_status_codes_1.default.OK).json(resp);
});
exports.getOne = getOne;
const update = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let resp;
    try {
        resp = yield employeesService.update(req.params.id, req.body);
    }
    catch (err) {
        return next(err);
    }
    res.status(http_status_codes_1.default.OK).json(resp);
});
exports.update = update;
const create = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let resp;
    try {
        resp = yield employeesService.create(req.body);
    }
    catch (err) {
        return next(err);
    }
    res.status(http_status_codes_1.default.CREATED).json(resp);
});
exports.create = create;
const deleteOne = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let resp;
    try {
        resp = yield employeesService.deleteOne(req.params.id);
    }
    catch (err) {
        return next(err);
    }
    res.status(http_status_codes_1.default.NO_CONTENT).json({});
});
exports.deleteOne = deleteOne;
