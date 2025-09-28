-- CreateEnum
CREATE TYPE "public"."Category" AS ENUM ('TECH_BUSINESS', 'TRAVEL_CULTURE', 'SKI_SNOW');

-- AlterTable
ALTER TABLE "public"."Post" ADD COLUMN     "category" "public"."Category" NOT NULL DEFAULT 'TECH_BUSINESS';
