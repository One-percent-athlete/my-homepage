-- 1. Set a default category for existing posts
UPDATE "public"."Post"
SET "category" = 'TECH_BUSINESS'
WHERE "category" IS NULL;

-- 2. Make the category column NOT NULL (required)
ALTER TABLE "public"."Post"
ALTER COLUMN "category" SET NOT NULL;

-- 3. Optional: Drop the default if you want future posts to always require it explicitly
ALTER TABLE "public"."Post"
ALTER COLUMN "category" DROP DEFAULT;
