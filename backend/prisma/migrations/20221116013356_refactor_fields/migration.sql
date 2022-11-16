/*
  Warnings:

  - You are about to drop the column `groupId` on the `Break` table. All the data in the column will be lost.
  - You are about to drop the column `endTime` on the `Group` table. All the data in the column will be lost.
  - You are about to drop the column `startTime` on the `Group` table. All the data in the column will be lost.
  - You are about to drop the column `groupId` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `hasIrregularShifts` on the `Employee` table. All the data in the column will be lost.
  - Added the required column `workShiftId` to the `Break` table without a default value. This is not possible if the table is not empty.
  - Added the required column `groupId` to the `Timesheet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `currGroupId` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isStable` to the `WorkShift` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Break" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "workShiftId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Break_workShiftId_fkey" FOREIGN KEY ("workShiftId") REFERENCES "WorkShift" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Break" ("createdAt", "endTime", "id", "startTime", "updatedAt") SELECT "createdAt", "endTime", "id", "startTime", "updatedAt" FROM "Break";
DROP TABLE "Break";
ALTER TABLE "new_Break" RENAME TO "Break";
CREATE TABLE "new_Timesheet" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "isEnter" BOOLEAN NOT NULL,
    "employeeId" TEXT NOT NULL,
    "groupId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Timesheet_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Timesheet_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Timesheet" ("createdAt", "date", "employeeId", "id", "isEnter", "time", "updatedAt") SELECT "createdAt", "date", "employeeId", "id", "isEnter", "time", "updatedAt" FROM "Timesheet";
DROP TABLE "Timesheet";
ALTER TABLE "new_Timesheet" RENAME TO "Timesheet";
CREATE TABLE "new_Group" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Group" ("createdAt", "id", "name", "updatedAt") SELECT "createdAt", "id", "name", "updatedAt" FROM "Group";
DROP TABLE "Group";
ALTER TABLE "new_Group" RENAME TO "Group";
CREATE TABLE "new_Employee" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "cardId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "currGroupId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Employee_currGroupId_fkey" FOREIGN KEY ("currGroupId") REFERENCES "Group" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Employee" ("cardId", "createdAt", "id", "name", "updatedAt") SELECT "cardId", "createdAt", "id", "name", "updatedAt" FROM "Employee";
DROP TABLE "Employee";
ALTER TABLE "new_Employee" RENAME TO "Employee";
CREATE TABLE "new_WorkShift" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" TEXT NOT NULL,
    "isStable" BOOLEAN NOT NULL,
    "groupId" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "WorkShift_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "WorkShift_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_WorkShift" ("createdAt", "date", "employeeId", "groupId", "id", "updatedAt") SELECT "createdAt", "date", "employeeId", "groupId", "id", "updatedAt" FROM "WorkShift";
DROP TABLE "WorkShift";
ALTER TABLE "new_WorkShift" RENAME TO "WorkShift";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
