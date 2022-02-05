-- CreateTable
CREATE TABLE "IPProfile" (
    "id" SERIAL NOT NULL,
    "ipAddress" TEXT NOT NULL,
    "lastSeenBy" TEXT NOT NULL,
    "firstSeenBy" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "IPProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AIPDBScanResult" (
    "id" SERIAL NOT NULL,
    "abuseConfidenceScore" INTEGER NOT NULL,
    "countryCode" TEXT NOT NULL,
    "usageType" TEXT NOT NULL,
    "isp" TEXT NOT NULL,
    "domain" TEXT,
    "totalReports" INTEGER NOT NULL,
    "numDistinctReporters" INTEGER NOT NULL,
    "ipProfileId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AIPDBScanResult_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "IPProfile_ipAddress_key" ON "IPProfile"("ipAddress");

-- CreateIndex
CREATE UNIQUE INDEX "AIPDBScanResult_ipProfileId_key" ON "AIPDBScanResult"("ipProfileId");

-- AddForeignKey
ALTER TABLE "AIPDBScanResult" ADD CONSTRAINT "AIPDBScanResult_ipProfileId_fkey" FOREIGN KEY ("ipProfileId") REFERENCES "IPProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
