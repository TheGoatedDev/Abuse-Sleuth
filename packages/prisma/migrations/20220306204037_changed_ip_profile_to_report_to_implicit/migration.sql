/*
  Warnings:

  - You are about to drop the `IPProfileOnReport` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "IPProfileOnReport" DROP CONSTRAINT "IPProfileOnReport_ipProfileId_fkey";

-- DropForeignKey
ALTER TABLE "IPProfileOnReport" DROP CONSTRAINT "IPProfileOnReport_reportId_fkey";

-- DropTable
DROP TABLE "IPProfileOnReport";

-- CreateTable
CREATE TABLE "_IPProfileToReport" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_IPProfileToReport_AB_unique" ON "_IPProfileToReport"("A", "B");

-- CreateIndex
CREATE INDEX "_IPProfileToReport_B_index" ON "_IPProfileToReport"("B");

-- AddForeignKey
ALTER TABLE "_IPProfileToReport" ADD FOREIGN KEY ("A") REFERENCES "ipProfiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_IPProfileToReport" ADD FOREIGN KEY ("B") REFERENCES "reports"("id") ON DELETE CASCADE ON UPDATE CASCADE;
