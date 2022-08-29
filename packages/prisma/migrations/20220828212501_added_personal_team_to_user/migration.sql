/*
  Warnings:

  - You are about to drop the column `ownerUserId` on the `Team` table. All the data in the column will be lost.
  - You are about to drop the column `ownerUserId` on the `TeamMember` table. All the data in the column will be lost.
  - Added the required column `userId` to the `TeamMember` table without a default value. This is not possible if the table is not empty.
  - Added the required column `personalTeamId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Team" DROP CONSTRAINT "Team_ownerUserId_fkey";

-- DropForeignKey
ALTER TABLE "TeamMember" DROP CONSTRAINT "TeamMember_ownerUserId_fkey";

-- AlterTable
ALTER TABLE "Team" DROP COLUMN "ownerUserId";

-- AlterTable
ALTER TABLE "TeamMember" DROP COLUMN "ownerUserId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "personalTeamId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_personalTeamId_fkey" FOREIGN KEY ("personalTeamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamMember" ADD CONSTRAINT "TeamMember_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
