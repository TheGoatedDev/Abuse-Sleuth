/*
  Warnings:

  - You are about to drop the `UserOnTeam` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserOnTeam" DROP CONSTRAINT "UserOnTeam_teamId_fkey";

-- DropForeignKey
ALTER TABLE "UserOnTeam" DROP CONSTRAINT "UserOnTeam_userId_fkey";

-- DropTable
DROP TABLE "UserOnTeam";

-- CreateTable
CREATE TABLE "TeamMember" (
    "role" "TeamMemberRole" NOT NULL DEFAULT 'USER',
    "userId" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TeamMember_pkey" PRIMARY KEY ("userId","teamId")
);

-- AddForeignKey
ALTER TABLE "TeamMember" ADD CONSTRAINT "TeamMember_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamMember" ADD CONSTRAINT "TeamMember_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
