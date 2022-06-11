/*
  Warnings:

  - You are about to drop the `ScanReport` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ipProfileDetails` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "IPProfileOnScanReport" DROP CONSTRAINT "IPProfileOnScanReport_reportId_fkey";

-- DropForeignKey
ALTER TABLE "ScanReport" DROP CONSTRAINT "ScanReport_userId_fkey";

-- DropForeignKey
ALTER TABLE "ipProfileDetails" DROP CONSTRAINT "ipProfileDetails_ipProfileId_fkey";

-- AlterTable
ALTER TABLE "ipProfiles" ADD COLUMN     "countryCode" TEXT,
ADD COLUMN     "privateAddress" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "ScanReport";

-- DropTable
DROP TABLE "ipProfileDetails";

-- CreateTable
CREATE TABLE "abuseIPDBScans" (
    "id" TEXT NOT NULL,
    "pending" BOOLEAN NOT NULL DEFAULT true,
    "abuseScore" INTEGER,
    "ipProfileId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "abuseIPDBScans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "scanReports" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "scanReports_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "abuseIPDBScans_ipProfileId_key" ON "abuseIPDBScans"("ipProfileId");

-- AddForeignKey
ALTER TABLE "abuseIPDBScans" ADD CONSTRAINT "abuseIPDBScans_ipProfileId_fkey" FOREIGN KEY ("ipProfileId") REFERENCES "ipProfiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IPProfileOnScanReport" ADD CONSTRAINT "IPProfileOnScanReport_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "scanReports"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "scanReports" ADD CONSTRAINT "scanReports_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
