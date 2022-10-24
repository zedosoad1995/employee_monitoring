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
exports.deleteOne = exports.create = exports.update = exports.getOne = exports.getManyShort = exports.getMany = void 0;
const prisma_client_1 = __importDefault(require("../../../prisma/prisma-client"));
const getMany = () => __awaiter(void 0, void 0, void 0, function* () {
    let mainQuery = {
        select: {
            id: true,
            cardId: true,
            name: true,
            group: {
                select: {
                    name: true
                }
            }
        }
    };
    return {
        employees: yield prisma_client_1.default.employee.findMany(mainQuery),
        total: yield prisma_client_1.default.employee.count()
    };
});
exports.getMany = getMany;
const getManyShort = () => __awaiter(void 0, void 0, void 0, function* () {
    let mainQuery = {
        select: {
            id: true,
            name: true
        }
    };
    return {
        employees: yield prisma_client_1.default.employee.findMany(mainQuery),
        total: yield prisma_client_1.default.employee.count()
    };
});
exports.getManyShort = getManyShort;
const getOne = (employeeId) => __awaiter(void 0, void 0, void 0, function* () {
    let mainQuery = {
        select: {
            id: true,
            name: true,
            cardId: true,
            group: {
                select: {
                    id: true,
                    name: true
                }
            }
        },
        where: {
            id: employeeId
        }
    };
    return yield prisma_client_1.default.employee.findFirst(mainQuery);
});
exports.getOne = getOne;
const update = (employeeId, data) => __awaiter(void 0, void 0, void 0, function* () {
    return prisma_client_1.default.employee.update({
        data: {
            name: data.name,
            cardId: data.cardId,
            group: {
                connect: {
                    id: data.groupId
                }
            }
        },
        where: {
            id: employeeId
        }
    });
});
exports.update = update;
const create = (employee) => __awaiter(void 0, void 0, void 0, function* () {
    let mainQuery = {
        data: {
            cardId: employee.cardId,
            name: employee.name,
            group: {
                connect: {
                    id: employee.groupId
                }
            }
        }
    };
    return yield prisma_client_1.default.employee.create(mainQuery);
});
exports.create = create;
const deleteOne = (employeeId) => __awaiter(void 0, void 0, void 0, function* () {
    let mainQuery = {
        where: {
            id: employeeId
        }
    };
    return yield prisma_client_1.default.employee.delete(mainQuery);
});
exports.deleteOne = deleteOne;
