/*
  Warnings:

  - You are about to drop the column `employeeId` on the `WorkShift` table. All the data in the column will be lost.
  - You are about to drop the column `isStable` on the `WorkShift` table. All the data in the column will be lost.
  - Added the required column `endTime` to the `WorkShift` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isConstant` to the `WorkShift` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startTime` to the `WorkShift` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "WeekDayWork" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "workShiftId" TEXT NOT NULL,
    CONSTRAINT "WeekDayWork_workShiftId_fkey" FOREIGN KEY ("workShiftId") REFERENCES "WorkShift" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_WorkShift" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" TEXT,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "isConstant" BOOLEAN NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "groupId" TEXT NOT NULL,
    CONSTRAINT "WorkShift_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_WorkShift" ("createdAt", "date", "groupId", "id", "updatedAt") SELECT "createdAt", "date", "groupId", "id", "updatedAt" FROM "WorkShift";
DROP TABLE "WorkShift";
ALTER TABLE "new_WorkShift" RENAME TO "WorkShift";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
