-- CreateTable
CREATE TABLE "IPProfileOnReport" (
    "ipProfileId" TEXT NOT NULL,
    "reportId" TEXT NOT NULL,

    CONSTRAINT "IPProfileOnReport_pkey" PRIMARY KEY ("ipProfileId","reportId")
);

-- AddForeignKey
ALTER TABLE "IPProfileOnReport" ADD CONSTRAINT "IPProfileOnReport_ipProfileId_fkey" FOREIGN KEY ("ipProfileId") REFERENCES "ipProfiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IPProfileOnReport" ADD CONSTRAINT "IPProfileOnReport_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "reports"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
