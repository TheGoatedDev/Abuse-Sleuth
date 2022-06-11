-- DropForeignKey
ALTER TABLE "reports" DROP CONSTRAINT "reports_ownerId_fkey";

-- AddForeignKey
ALTER TABLE "reports" ADD CONSTRAINT "reports_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
