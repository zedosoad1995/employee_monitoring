/*
  Warnings:

  - A unique constraint covering the columns `[employeeId,date]` on the table `WorkShift` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "WorkShift_employeeId_date_key" ON "WorkShift"("employeeId", "date");
