CREATE TYPE "public"."blog_block_type" AS ENUM('paragraph', 'heading', 'image', 'gallery', 'quote', 'code', 'bullet_list', 'ordered_list', 'divider');--> statement-breakpoint
CREATE TYPE "public"."blog_status" AS ENUM('draft', 'published');--> statement-breakpoint
CREATE TABLE "blog_blocks" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"blog_id" uuid NOT NULL,
	"type" "blog_block_type" NOT NULL,
	"content" jsonb NOT NULL,
	"order" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "blogs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(255) NOT NULL,
	"slug" varchar(255) NOT NULL,
	"excerpt" varchar(500),
	"cover_image_url" varchar(2048) NOT NULL,
	"seo_title" varchar(60),
	"seo_description" varchar(160),
	"is_featured" boolean DEFAULT false NOT NULL,
	"status" "blog_status" DEFAULT 'draft' NOT NULL,
	"published_at" timestamp with time zone,
	"author_id" uuid,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "blogs_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
ALTER TABLE "blog_blocks" ADD CONSTRAINT "blog_blocks_blog_id_blogs_id_fk" FOREIGN KEY ("blog_id") REFERENCES "public"."blogs"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "blogs" ADD CONSTRAINT "blogs_author_id_users_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "blog_blocks_blog_id_idx" ON "blog_blocks" USING btree ("blog_id");--> statement-breakpoint
CREATE UNIQUE INDEX "blog_blocks_blog_id_order_unique" ON "blog_blocks" USING btree ("blog_id","order");