/*
  Warnings:

  - You are about to drop the column `groupId` on the `WeekDayWork` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "_GroupToWeekDayWork" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_GroupToWeekDayWork_A_fkey" FOREIGN KEY ("A") REFERENCES "Group" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_GroupToWeekDayWork_B_fkey" FOREIGN KEY ("B") REFERENCES "WeekDayWork" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_WeekDayWork" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "value" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_WeekDayWork" ("createdAt", "id", "updatedAt", "value") SELECT "createdAt", "id", "updatedAt", "value" FROM "WeekDayWork";
DROP TABLE "WeekDayWork";
ALTER TABLE "new_WeekDayWork" RENAME TO "WeekDayWork";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "_GroupToWeekDayWork_AB_unique" ON "_GroupToWeekDayWork"("A", "B");

-- CreateIndex
CREATE INDEX "_GroupToWeekDayWork_B_index" ON "_GroupToWeekDayWork"("B");
