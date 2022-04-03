/*
  Warnings:

  - You are about to drop the `userPaymentPlans` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "userPaymentPlans" DROP CONSTRAINT "userPaymentPlans_userId_fkey";

-- DropTable
DROP TABLE "userPaymentPlans";

-- CreateTable
CREATE TABLE "userBillingInfos" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "stripeCustomerId" TEXT NOT NULL,
    "plan" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "userBillingInfos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "userBillingInfos_userId_key" ON "userBillingInfos"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "userBillingInfos_stripeCustomerId_key" ON "userBillingInfos"("stripeCustomerId");

-- AddForeignKey
ALTER TABLE "userBillingInfos" ADD CONSTRAINT "userBillingInfos_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
