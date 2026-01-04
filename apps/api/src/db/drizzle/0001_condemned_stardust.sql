CREATE TABLE "web_dev_services" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" varchar(255) NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text,
	"meta_title" varchar(255),
	"meta_description" text,
	"hero_title" varchar(255),
	"hero_subtitle" text,
	"hero_image" jsonb,
	"features" jsonb,
	"process_steps" jsonb,
	"is_active" boolean DEFAULT true NOT NULL,
	"order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "web_dev_services_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "web_dev_sub_services" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"service_id" uuid NOT NULL,
	"slug" varchar(255) NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text,
	"meta_title" varchar(255),
	"meta_description" text,
	"og_image" jsonb,
	"hero_content" jsonb,
	"features" jsonb,
	"process_steps" jsonb,
	"packages" jsonb,
	"case_studies" jsonb,
	"testimonials" jsonb,
	"faqs" jsonb,
	"is_active" boolean DEFAULT true NOT NULL,
	"order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "web_dev_packages" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"sub_service_id" uuid NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" text,
	"price" numeric(10, 2) NOT NULL,
	"currency" varchar(10) DEFAULT 'USD' NOT NULL,
	"features" jsonb,
	"is_popular" boolean DEFAULT false NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "web_dev_case_studies" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"sub_service_id" uuid NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text,
	"client_name" varchar(255),
	"results" jsonb,
	"image" jsonb,
	"is_active" boolean DEFAULT true NOT NULL,
	"order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "web_dev_testimonials" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"sub_service_id" uuid NOT NULL,
	"name" varchar(255) NOT NULL,
	"role" varchar(255),
	"company" varchar(255),
	"content" text NOT NULL,
	"image" jsonb,
	"rating" numeric(2, 1),
	"is_active" boolean DEFAULT true NOT NULL,
	"order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "web_dev_sub_services" ADD CONSTRAINT "web_dev_sub_services_service_id_web_dev_services_id_fk" FOREIGN KEY ("service_id") REFERENCES "public"."web_dev_services"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "web_dev_packages" ADD CONSTRAINT "web_dev_packages_sub_service_id_web_dev_sub_services_id_fk" FOREIGN KEY ("sub_service_id") REFERENCES "public"."web_dev_sub_services"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "web_dev_case_studies" ADD CONSTRAINT "web_dev_case_studies_sub_service_id_web_dev_sub_services_id_fk" FOREIGN KEY ("sub_service_id") REFERENCES "public"."web_dev_sub_services"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "web_dev_testimonials" ADD CONSTRAINT "web_dev_testimonials_sub_service_id_web_dev_sub_services_id_fk" FOREIGN KEY ("sub_service_id") REFERENCES "public"."web_dev_sub_services"("id") ON DELETE cascade ON UPDATE no action;