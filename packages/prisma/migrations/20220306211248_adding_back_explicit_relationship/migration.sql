/*
  Warnings:

  - You are about to drop the `_IPProfileToReport` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_IPProfileToReport" DROP CONSTRAINT "_IPProfileToReport_A_fkey";

-- DropForeignKey
ALTER TABLE "_IPProfileToReport" DROP CONSTRAINT "_IPProfileToReport_B_fkey";

-- DropTable
DROP TABLE "_IPProfileToReport";

-- CreateTable
CREATE TABLE "IPProfileOnReport" (
    "ipProfileId" TEXT NOT NULL,
    "reportId" TEXT NOT NULL,

    CONSTRAINT "IPProfileOnReport_pkey" PRIMARY KEY ("ipProfileId","reportId")
);

-- AddForeignKey
ALTER TABLE "IPProfileOnReport" ADD CONSTRAINT "IPProfileOnReport_ipProfileId_fkey" FOREIGN KEY ("ipProfileId") REFERENCES "ipProfiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IPProfileOnReport" ADD CONSTRAINT "IPProfileOnReport_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "reports"("id") ON DELETE CASCADE ON UPDATE CASCADE;
