/*
  Warnings:

  - A unique constraint covering the columns `[ipAddress]` on the table `AIPDB_Report` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "AIPDB_Report_ipAddress_key" ON "AIPDB_Report"("ipAddress");
