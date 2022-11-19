/*
  Warnings:

  - You are about to drop the column `workShiftId` on the `Break` table. All the data in the column will be lost.
  - You are about to drop the column `endTime` on the `WorkShift` table. All the data in the column will be lost.
  - You are about to drop the column `groupId` on the `WorkShift` table. All the data in the column will be lost.
  - You are about to drop the column `isConstant` on the `WorkShift` table. All the data in the column will be lost.
  - You are about to drop the column `startTime` on the `WorkShift` table. All the data in the column will be lost.
  - You are about to drop the column `workShiftId` on the `WeekDayWork` table. All the data in the column will be lost.
  - Added the required column `subgroupId` to the `Break` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isConstant` to the `Group` table without a default value. This is not possible if the table is not empty.
  - Added the required column `employeeId` to the `WorkShift` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subgroupId` to the `WorkShift` table without a default value. This is not possible if the table is not empty.
  - Added the required column `groupId` to the `WeekDayWork` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Subgroup" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "groupId" TEXT NOT NULL,
    CONSTRAINT "Subgroup_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Break" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "subgroupId" TEXT NOT NULL,
    CONSTRAINT "Break_subgroupId_fkey" FOREIGN KEY ("subgroupId") REFERENCES "Subgroup" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Break" ("createdAt", "endTime", "id", "startTime", "updatedAt") SELECT "createdAt", "endTime", "id", "startTime", "updatedAt" FROM "Break";
DROP TABLE "Break";
ALTER TABLE "new_Break" RENAME TO "Break";
CREATE TABLE "new_Group" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "isConstant" BOOLEAN NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Group" ("createdAt", "id", "name", "updatedAt") SELECT "createdAt", "id", "name", "updatedAt" FROM "Group";
DROP TABLE "Group";
ALTER TABLE "new_Group" RENAME TO "Group";
CREATE TABLE "new_WorkShift" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "subgroupId" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    CONSTRAINT "WorkShift_subgroupId_fkey" FOREIGN KEY ("subgroupId") REFERENCES "Subgroup" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "WorkShift_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_WorkShift" ("createdAt", "date", "id", "updatedAt") SELECT "createdAt", "date", "id", "updatedAt" FROM "WorkShift";
DROP TABLE "WorkShift";
ALTER TABLE "new_WorkShift" RENAME TO "WorkShift";
CREATE TABLE "new_WeekDayWork" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "value" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "groupId" TEXT NOT NULL,
    CONSTRAINT "WeekDayWork_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_WeekDayWork" ("createdAt", "id", "updatedAt", "value") SELECT "createdAt", "id", "updatedAt", "value" FROM "WeekDayWork";
DROP TABLE "WeekDayWork";
ALTER TABLE "new_WeekDayWork" RENAME TO "WeekDayWork";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
