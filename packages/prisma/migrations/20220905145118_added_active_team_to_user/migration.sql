-- AlterTable
ALTER TABLE "User" ADD COLUMN     "activeTeamId" TEXT;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_activeTeamId_fkey" FOREIGN KEY ("activeTeamId") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;
