/*
  Warnings:

  - You are about to drop the column `name` on the `WeekDayWork` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_WeekDayWork" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "value" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "workShiftId" TEXT NOT NULL,
    CONSTRAINT "WeekDayWork_workShiftId_fkey" FOREIGN KEY ("workShiftId") REFERENCES "WorkShift" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_WeekDayWork" ("createdAt", "id", "updatedAt", "value", "workShiftId") SELECT "createdAt", "id", "updatedAt", "value", "workShiftId" FROM "WeekDayWork";
DROP TABLE "WeekDayWork";
ALTER TABLE "new_WeekDayWork" RENAME TO "WeekDayWork";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
