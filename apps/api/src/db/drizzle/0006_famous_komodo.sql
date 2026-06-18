CREATE TYPE "public"."case_study_accent" AS ENUM('pastel-peach', 'pastel-lilac', 'pastel-lime', 'pastel-mint', 'pastel-sky', 'pastel-blush');--> statement-breakpoint
CREATE TYPE "public"."case_study_category" AS ENUM('pay-per-call', 'pay-per-lead', 'digital-marketing', 'app-dev', 'cms', 'web-dev', 'hire-call-center');--> statement-breakpoint
CREATE TYPE "public"."case_study_status" AS ENUM('draft', 'published', 'archived');--> statement-breakpoint
CREATE TABLE "case_studies" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(200) NOT NULL,
	"slug" varchar(220) NOT NULL,
	"description" text NOT NULL,
	"image_url" varchar(2048),
	"image_alt" varchar(255),
	"accent_color" "case_study_accent",
	"link" varchar(2048),
	"category" "case_study_category" NOT NULL,
	"status" "case_study_status" DEFAULT 'draft' NOT NULL,
	"display_order" integer DEFAULT 0 NOT NULL,
	"published_at" timestamp with time zone,
	"created_by" uuid,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "case_studies_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
ALTER TABLE "case_studies" ADD CONSTRAINT "case_studies_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "case_studies_public_idx" ON "case_studies" USING btree ("category","status","display_order");--> statement-breakpoint
CREATE INDEX "case_studies_status_updated_idx" ON "case_studies" USING btree ("status","updated_at");--> statement-breakpoint
CREATE INDEX "case_studies_category_idx" ON "case_studies" USING btree ("category");--> statement-breakpoint
CREATE INDEX "case_studies_created_at_idx" ON "case_studies" USING btree ("created_at");