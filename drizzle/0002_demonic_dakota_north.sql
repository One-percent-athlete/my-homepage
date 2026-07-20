CREATE TABLE "pikmin_decor_items" (
	"id" serial PRIMARY KEY NOT NULL,
	"category" varchar(120) NOT NULL,
	"decor" varchar(160) NOT NULL,
	"color" varchar(20) NOT NULL,
	"owned" boolean DEFAULT false NOT NULL,
	"event" boolean DEFAULT false NOT NULL,
	"active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX "pikmin_decor_identity" ON "pikmin_decor_items" USING btree ("category","decor","color");