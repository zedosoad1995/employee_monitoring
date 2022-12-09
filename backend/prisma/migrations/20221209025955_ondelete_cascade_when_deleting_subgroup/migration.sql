-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Break" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "subgroupId" TEXT NOT NULL,
    CONSTRAINT "Break_subgroupId_fkey" FOREIGN KEY ("subgroupId") REFERENCES "Subgroup" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Break" ("createdAt", "endTime", "id", "startTime", "subgroupId", "updatedAt") SELECT "createdAt", "endTime", "id", "startTime", "subgroupId", "updatedAt" FROM "Break";
DROP TABLE "Break";
ALTER TABLE "new_Break" RENAME TO "Break";
CREATE TABLE "new_WorkShift" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "subgroupId" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    CONSTRAINT "WorkShift_subgroupId_fkey" FOREIGN KEY ("subgroupId") REFERENCES "Subgroup" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "WorkShift_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_WorkShift" ("createdAt", "date", "employeeId", "id", "subgroupId", "updatedAt") SELECT "createdAt", "date", "employeeId", "id", "subgroupId", "updatedAt" FROM "WorkShift";
DROP TABLE "WorkShift";
ALTER TABLE "new_WorkShift" RENAME TO "WorkShift";
CREATE UNIQUE INDEX "WorkShift_employeeId_date_key" ON "WorkShift"("employeeId", "date");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
