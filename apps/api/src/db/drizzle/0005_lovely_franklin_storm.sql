CREATE TYPE "public"."contact_status" AS ENUM('pending', 'contacted', 'scheduled', 'completed', 'declined');--> statement-breakpoint
CREATE TABLE "contact_submissions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"full_name" varchar(255) NOT NULL,
	"work_email" varchar(255) NOT NULL,
	"company" varchar(255) NOT NULL,
	"phone" varchar(50),
	"preferred_contact_method" varchar(50) NOT NULL,
	"service_category" varchar(100) NOT NULL,
	"service_detail" varchar(100) NOT NULL,
	"business_website" varchar(500),
	"company_size" varchar(50) NOT NULL,
	"monthly_budget" varchar(50),
	"target_regions" varchar(255) NOT NULL,
	"desired_date" timestamp with time zone NOT NULL,
	"preferred_meeting_window" varchar(50) NOT NULL,
	"timezone" varchar(100) NOT NULL,
	"additional_context" text,
	"consent" boolean NOT NULL,
	"status" "contact_status" DEFAULT 'pending' NOT NULL,
	"ip_address" varchar(45),
	"user_agent" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX "contact_submissions_status_idx" ON "contact_submissions" USING btree ("status");--> statement-breakpoint
CREATE INDEX "contact_submissions_service_category_idx" ON "contact_submissions" USING btree ("service_category");--> statement-breakpoint
CREATE INDEX "contact_submissions_created_at_idx" ON "contact_submissions" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "contact_submissions_desired_date_idx" ON "contact_submissions" USING btree ("desired_date");