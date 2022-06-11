/*
  Warnings:

  - You are about to drop the column `plan` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `stripeCustomerId` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "plan",
DROP COLUMN "stripeCustomerId";

-- DropEnum
DROP TYPE "UserPlan";

-- CreateTable
CREATE TABLE "userPaymentPlans" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "stripeCustomerId" TEXT NOT NULL,
    "plan" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "userPaymentPlans_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "userPaymentPlans_userId_key" ON "userPaymentPlans"("userId");

-- AddForeignKey
ALTER TABLE "userPaymentPlans" ADD CONSTRAINT "userPaymentPlans_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
