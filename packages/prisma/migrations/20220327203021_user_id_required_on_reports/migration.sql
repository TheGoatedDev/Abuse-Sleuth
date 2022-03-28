/*
  Warnings:

  - Made the column `userId` on table `ScanReport` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "ScanReport" ALTER COLUMN "userId" SET NOT NULL;
