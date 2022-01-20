-- CreateTable
CREATE TABLE "AIPDB_Report" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ipAddress" TEXT NOT NULL,
    "abuseScore" INTEGER NOT NULL,
    "country" TEXT NOT NULL,
    "usageType" TEXT NOT NULL,
    "isp" TEXT NOT NULL,
    "domain" TEXT NOT NULL,
    "totalReports" INTEGER NOT NULL,
    "totalDistinctReportee" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
