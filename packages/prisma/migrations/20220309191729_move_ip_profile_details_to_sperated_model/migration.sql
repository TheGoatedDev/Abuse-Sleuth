/*
  Warnings:

  - You are about to drop the column `countryCode` on the `ipProfiles` table. All the data in the column will be lost.
  - You are about to drop the `IPProfileOnReport` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `reports` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "IPProfileOnReport" DROP CONSTRAINT "IPProfileOnReport_ipProfileId_fkey";

-- DropForeignKey
ALTER TABLE "IPProfileOnReport" DROP CONSTRAINT "IPProfileOnReport_reportId_fkey";

-- DropForeignKey
ALTER TABLE "reports" DROP CONSTRAINT "reports_ownerId_fkey";

-- AlterTable
ALTER TABLE "ipProfiles" DROP COLUMN "countryCode",
ADD COLUMN     "version" TEXT NOT NULL DEFAULT E'4';

-- DropTable
DROP TABLE "IPProfileOnReport";

-- DropTable
DROP TABLE "reports";

-- CreateTable
CREATE TABLE "ipProfileDetails" (
    "id" TEXT NOT NULL,
    "countryCode" TEXT,
    "countryName" TEXT,
    "privateAddress" BOOLEAN NOT NULL,
    "ipProfileId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ipProfileDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IPProfileOnScanReport" (
    "ipProfileId" TEXT NOT NULL,
    "reportId" TEXT NOT NULL,

    CONSTRAINT "IPProfileOnScanReport_pkey" PRIMARY KEY ("ipProfileId","reportId")
);

-- CreateTable
CREATE TABLE "ScanReport" (
    "id" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ScanReport_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ipProfileDetails_ipProfileId_key" ON "ipProfileDetails"("ipProfileId");

-- AddForeignKey
ALTER TABLE "ipProfileDetails" ADD CONSTRAINT "ipProfileDetails_ipProfileId_fkey" FOREIGN KEY ("ipProfileId") REFERENCES "ipProfiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IPProfileOnScanReport" ADD CONSTRAINT "IPProfileOnScanReport_ipProfileId_fkey" FOREIGN KEY ("ipProfileId") REFERENCES "ipProfiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IPProfileOnScanReport" ADD CONSTRAINT "IPProfileOnScanReport_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "ScanReport"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScanReport" ADD CONSTRAINT "ScanReport_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
