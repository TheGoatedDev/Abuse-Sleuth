/*
  Warnings:

  - Made the column `plan` on table `userBillingInfos` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "userBillingInfos" ALTER COLUMN "plan" SET NOT NULL,
ALTER COLUMN "plan" SET DEFAULT E'Free';
