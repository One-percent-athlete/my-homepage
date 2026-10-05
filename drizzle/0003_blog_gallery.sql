ALTER TABLE "posts" ADD COLUMN IF NOT EXISTS "show_in_gallery" boolean DEFAULT false NOT NULL;
