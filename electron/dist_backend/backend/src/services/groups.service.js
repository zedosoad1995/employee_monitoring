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
            name: true,
            startTime: true,
            endTime: true,
            Employee: {
                select: {
                    name: true
                }
            },
            Break: {
                select: {
                    startTime: true,
                    endTime: true
                }
            }
        }
    };
    return {
        groups: yield prisma_client_1.default.group.findMany(mainQuery),
        total: yield prisma_client_1.default.group.count()
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
        groups: yield prisma_client_1.default.group.findMany(mainQuery),
        total: yield prisma_client_1.default.group.count()
    };
});
exports.getManyShort = getManyShort;
const getOne = (groupId) => __awaiter(void 0, void 0, void 0, function* () {
    let mainQuery = {
        select: {
            id: true,
            name: true,
            startTime: true,
            endTime: true,
            Employee: {
                select: {
                    name: true
                }
            },
            Break: {
                select: {
                    startTime: true,
                    endTime: true
                }
            }
        },
        where: {
            id: groupId
        }
    };
    return yield prisma_client_1.default.group.findFirst(mainQuery);
});
exports.getOne = getOne;
const update = (groupId, data) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_client_1.default.$transaction([
        prisma_client_1.default.break.deleteMany({
            where: {
                groupId: groupId
            }
        }),
        prisma_client_1.default.group.update({
            data: {
                name: data.name,
                startTime: data.startTime,
                endTime: data.endTime,
                Break: {
                    createMany: {
                        data: data.breaks
                    }
                }
            },
            where: {
                id: groupId
            }
        })
    ]);
    return;
});
exports.update = update;
const create = (group) => __awaiter(void 0, void 0, void 0, function* () {
    let mainQuery = {
        data: {
            name: group.name,
            startTime: group.startTime,
            endTime: group.endTime,
            Break: {
                createMany: {
                    data: group.breaks
                }
            }
        }
    };
    return yield prisma_client_1.default.group.create(mainQuery);
});
exports.create = create;
const deleteOne = (groupId) => __awaiter(void 0, void 0, void 0, function* () {
    let mainQuery = {
        where: {
            id: groupId
        }
    };
    return yield prisma_client_1.default.group.delete(mainQuery);
});
exports.deleteOne = deleteOne;
