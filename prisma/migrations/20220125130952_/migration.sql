/*
  Warnings:

  - You are about to drop the column `aipdbProfileId` on the `ReportIPProfileLink` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[ipProfileId]` on the table `AIPDBProfile` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `ipProfileId` to the `ReportIPProfileLink` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ReportIPProfileLink" DROP CONSTRAINT "ReportIPProfileLink_aipdbProfileId_fkey";

-- AlterTable
ALTER TABLE "ReportIPProfileLink" DROP COLUMN "aipdbProfileId",
ADD COLUMN     "ipProfileId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "AIPDBProfile_ipProfileId_key" ON "AIPDBProfile"("ipProfileId");

-- AddForeignKey
ALTER TABLE "ReportIPProfileLink" ADD CONSTRAINT "ReportIPProfileLink_ipProfileId_fkey" FOREIGN KEY ("ipProfileId") REFERENCES "IPProfile"("ipProfileID") ON DELETE RESTRICT ON UPDATE CASCADE;
