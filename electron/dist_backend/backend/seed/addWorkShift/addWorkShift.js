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
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.workShift.deleteMany();
    const obj = {
        '3c29d49c-09e0-494c-8fff-aea20de9dcb6': {
            '04ea9489-fa9a-413d-896e-754422f5a1ed': ['2022-09-01', '2022-09-03', '2022-09-05'],
            '04ea9489-fa9a-413d-896e-754422f5a1ee': ['2022-09-02', '2022-09-04', '2022-09-06']
        },
        '482114b0-3da3-4ea9-9528-80b0f2b4446e': {
            '04ea9489-fa9a-413d-896e-754422f5a1ed': ['2022-09-02', '2022-09-04', '2022-09-06'],
            '04ea9489-fa9a-413d-896e-754422f5a1ee': ['2022-09-01', '2022-09-03', '2022-09-05']
        },
        '9da512e8-ca31-46e8-b475-9efcba3ab53d': {
            '04ea9489-fa9a-413d-896e-754422f5a1ed': ['2022-09-01', '2022-09-04', '2022-09-07'],
            '04ea9489-fa9a-413d-896e-754422f5a1ee': ['2022-09-02', '2022-09-05', '2022-09-08']
        },
    };
    const workShiftObj = Object.entries(obj).reduce((acc, [employeeId, groupsObj]) => {
        acc = acc.concat(Object.entries(groupsObj).reduce((acc, [groupId, dates]) => {
            acc = acc.concat(dates.map((date) => ({
                date,
                employeeId,
                groupId
            })));
            return acc;
        }, []));
        return acc;
    }, []);
    yield prisma.workShift.createMany({
        data: workShiftObj
    });
    yield prisma.employee.updateMany({
        data: {
            hasIrregularShifts: true
        },
        where: {
            id: {
                in: Object.keys(obj)
            }
        }
    });
});
main()
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}))
    .catch((e) => __awaiter(void 0, void 0, void 0, function* () {
    console.error(e);
    yield prisma.$disconnect();
    process.exit(1);
}));
