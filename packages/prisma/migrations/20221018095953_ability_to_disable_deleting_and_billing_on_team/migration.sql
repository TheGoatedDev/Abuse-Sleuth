/*
  Warnings:

  - You are about to drop the column `canEditMember` on the `Team` table. All the data in the column will be lost.
  - You are about to drop the column `locked` on the `Team` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Team" DROP COLUMN "canEditMember",
DROP COLUMN "locked",
ADD COLUMN     "canBillingTeam" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "canDeleteTeam" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "canEditTeam" BOOLEAN NOT NULL DEFAULT true;
