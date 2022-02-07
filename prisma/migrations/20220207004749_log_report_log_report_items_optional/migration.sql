/*
  Warnings:

  - A unique constraint covering the columns `[logReportId]` on the table `LogReportItem` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "LogReportItem_logReportId_key" ON "LogReportItem"("logReportId");
