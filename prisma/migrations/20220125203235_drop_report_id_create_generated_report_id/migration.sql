/*
  Warnings:

  - You are about to drop the column `reportId` on the `ReportIPProfileLink` table. All the data in the column will be lost.
  - Added the required column `generatedReportId` to the `ReportIPProfileLink` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ReportIPProfileLink" DROP CONSTRAINT "ReportIPProfileLink_reportId_fkey";

-- AlterTable
ALTER TABLE "ReportIPProfileLink" DROP COLUMN "reportId",
ADD COLUMN     "generatedReportId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "ReportIPProfileLink" ADD CONSTRAINT "ReportIPProfileLink_generatedReportId_fkey" FOREIGN KEY ("generatedReportId") REFERENCES "GeneratedReport"("generatedReportID") ON DELETE RESTRICT ON UPDATE CASCADE;
