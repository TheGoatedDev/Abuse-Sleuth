-- CreateTable
CREATE TABLE "AIPDBProfile" (
    "aipdbProfileID" SERIAL NOT NULL,
    "ipProfileId" INTEGER NOT NULL,
    "abuseScore" INTEGER NOT NULL,
    "country" TEXT NOT NULL,
    "usageType" TEXT NOT NULL,
    "isp" TEXT NOT NULL,
    "domain" TEXT NOT NULL,
    "totalReports" INTEGER NOT NULL,
    "totalDistinctReportee" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AIPDBProfile_pkey" PRIMARY KEY ("aipdbProfileID")
);

-- CreateTable
CREATE TABLE "IPProfile" (
    "ipProfileID" SERIAL NOT NULL,
    "ipAddress" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "IPProfile_pkey" PRIMARY KEY ("ipProfileID")
);

-- CreateTable
CREATE TABLE "GeneratedReport" (
    "generatedReportID" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GeneratedReport_pkey" PRIMARY KEY ("generatedReportID")
);

-- CreateTable
CREATE TABLE "ReportIPProfileLink" (
    "linkID" SERIAL NOT NULL,
    "aipdbProfileId" INTEGER NOT NULL,
    "reportId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ReportIPProfileLink_pkey" PRIMARY KEY ("linkID")
);

-- CreateIndex
CREATE UNIQUE INDEX "IPProfile_ipAddress_key" ON "IPProfile"("ipAddress");

-- AddForeignKey
ALTER TABLE "AIPDBProfile" ADD CONSTRAINT "AIPDBProfile_ipProfileId_fkey" FOREIGN KEY ("ipProfileId") REFERENCES "IPProfile"("ipProfileID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReportIPProfileLink" ADD CONSTRAINT "ReportIPProfileLink_aipdbProfileId_fkey" FOREIGN KEY ("aipdbProfileId") REFERENCES "AIPDBProfile"("aipdbProfileID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReportIPProfileLink" ADD CONSTRAINT "ReportIPProfileLink_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "GeneratedReport"("generatedReportID") ON DELETE RESTRICT ON UPDATE CASCADE;
