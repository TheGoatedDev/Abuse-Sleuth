-- AlterTable
ALTER TABLE "Team" ADD COLUMN     "canAddMember" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "canGenerateReport" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "canScan" BOOLEAN NOT NULL DEFAULT true;
