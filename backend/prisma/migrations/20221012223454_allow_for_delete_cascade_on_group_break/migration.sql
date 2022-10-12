-- DropForeignKey
ALTER TABLE "Break" DROP CONSTRAINT "Break_groupId_fkey";

-- AddForeignKey
ALTER TABLE "Break" ADD CONSTRAINT "Break_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;
