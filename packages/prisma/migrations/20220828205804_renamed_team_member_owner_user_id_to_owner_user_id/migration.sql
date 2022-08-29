/*
  Warnings:

  - You are about to drop the column `ownerUserID` on the `TeamMember` table. All the data in the column will be lost.
  - Added the required column `ownerUserId` to the `TeamMember` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "TeamMember" DROP CONSTRAINT "TeamMember_ownerUserID_fkey";

-- AlterTable
ALTER TABLE "TeamMember" DROP COLUMN "ownerUserID",
ADD COLUMN     "ownerUserId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "TeamMember" ADD CONSTRAINT "TeamMember_ownerUserId_fkey" FOREIGN KEY ("ownerUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
