-- CreateTable
CREATE TABLE "LogReport" (
    "id" SERIAL NOT NULL,
    "owner" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LogReport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LogReportItem" (
    "id" SERIAL NOT NULL,
    "logReportId" INTEGER NOT NULL,
    "ipProfileId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LogReportItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "LogReportItem" ADD CONSTRAINT "LogReportItem_ipProfileId_fkey" FOREIGN KEY ("ipProfileId") REFERENCES "IPProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LogReportItem" ADD CONSTRAINT "LogReportItem_logReportId_fkey" FOREIGN KEY ("logReportId") REFERENCES "LogReport"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
