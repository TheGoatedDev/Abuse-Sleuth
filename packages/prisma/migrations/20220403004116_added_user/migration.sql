-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "stytchUserID" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_stytchUserID_key" ON "users"("stytchUserID");

-- AddForeignKey
ALTER TABLE "userBillingInfos" ADD CONSTRAINT "userBillingInfos_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScanReport" ADD CONSTRAINT "ScanReport_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
