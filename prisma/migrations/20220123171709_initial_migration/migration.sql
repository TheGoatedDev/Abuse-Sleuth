-- CreateTable
CREATE TABLE "AIPDB_Report" (
    "id" SERIAL NOT NULL,
    "ipAddress" TEXT NOT NULL,
    "abuseScore" INTEGER NOT NULL,
    "country" TEXT NOT NULL,
    "usageType" TEXT NOT NULL,
    "isp" TEXT NOT NULL,
    "domain" TEXT NOT NULL,
    "totalReports" INTEGER NOT NULL,
    "totalDistinctReportee" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AIPDB_Report_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Report" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Report_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReportLink" (
    "id" SERIAL NOT NULL,
    "aipdbReportId" INTEGER NOT NULL,
    "reportId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ReportLink_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AIPDB_Report_ipAddress_key" ON "AIPDB_Report"("ipAddress");

-- AddForeignKey
ALTER TABLE "ReportLink" ADD CONSTRAINT "ReportLink_aipdbReportId_fkey" FOREIGN KEY ("aipdbReportId") REFERENCES "AIPDB_Report"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReportLink" ADD CONSTRAINT "ReportLink_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "Report"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
