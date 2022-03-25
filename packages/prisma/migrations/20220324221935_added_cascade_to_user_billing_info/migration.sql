-- DropForeignKey
ALTER TABLE "userBillingInfos" DROP CONSTRAINT "userBillingInfos_userId_fkey";

-- AddForeignKey
ALTER TABLE "userBillingInfos" ADD CONSTRAINT "userBillingInfos_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
