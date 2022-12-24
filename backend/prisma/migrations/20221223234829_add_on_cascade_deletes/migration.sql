-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Timesheet" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "isEnter" BOOLEAN NOT NULL,
    "employeeId" TEXT NOT NULL,
    "groupId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Timesheet_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Timesheet_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Timesheet" ("createdAt", "date", "employeeId", "groupId", "id", "isEnter", "time", "updatedAt") SELECT "createdAt", "date", "employeeId", "groupId", "id", "isEnter", "time", "updatedAt" FROM "Timesheet";
DROP TABLE "Timesheet";
ALTER TABLE "new_Timesheet" RENAME TO "Timesheet";
CREATE TABLE "new_Employee" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "cardId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "currGroupId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Employee_currGroupId_fkey" FOREIGN KEY ("currGroupId") REFERENCES "Group" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Employee" ("cardId", "createdAt", "currGroupId", "id", "name", "updatedAt") SELECT "cardId", "createdAt", "currGroupId", "id", "name", "updatedAt" FROM "Employee";
DROP TABLE "Employee";
ALTER TABLE "new_Employee" RENAME TO "Employee";
CREATE TABLE "new_Subgroup" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "groupId" TEXT NOT NULL,
    CONSTRAINT "Subgroup_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Subgroup" ("createdAt", "endTime", "groupId", "id", "startTime", "updatedAt") SELECT "createdAt", "endTime", "groupId", "id", "startTime", "updatedAt" FROM "Subgroup";
DROP TABLE "Subgroup";
ALTER TABLE "new_Subgroup" RENAME TO "Subgroup";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
