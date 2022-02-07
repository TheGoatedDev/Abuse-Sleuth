-- DropForeignKey
ALTER TABLE "LogReportItem" DROP CONSTRAINT "LogReportItem_logReportId_fkey";

-- AddForeignKey
ALTER TABLE "LogReportItem" ADD CONSTRAINT "LogReportItem_logReportId_fkey" FOREIGN KEY ("logReportId") REFERENCES "LogReport"("id") ON DELETE CASCADE ON UPDATE CASCADE;
