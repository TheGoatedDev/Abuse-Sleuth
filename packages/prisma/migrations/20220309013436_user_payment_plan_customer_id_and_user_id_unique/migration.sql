/*
  Warnings:

  - A unique constraint covering the columns `[stripeCustomerId]` on the table `userPaymentPlans` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "userPaymentPlans_stripeCustomerId_key" ON "userPaymentPlans"("stripeCustomerId");
