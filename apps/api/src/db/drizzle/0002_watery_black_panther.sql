ALTER TYPE "public"."blog_status" ADD VALUE 'unlisted';--> statement-breakpoint
ALTER TABLE "blogs" ALTER COLUMN "cover_image_url" DROP NOT NULL;