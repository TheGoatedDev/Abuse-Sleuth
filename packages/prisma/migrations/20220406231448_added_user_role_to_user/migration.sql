-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('DEVELOPER', 'ADMIN', 'USER');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "userRole" "UserRole" NOT NULL DEFAULT E'USER';
