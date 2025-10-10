CREATE TABLE "products" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(255) NOT NULL,
	"category" varchar(255) NOT NULL,
	"technique" varchar(255) NOT NULL,
	"price" varchar(255) NOT NULL,
	"size" varchar(255) NOT NULL,
	"year" varchar(255) NOT NULL,
	"image" varchar(255) NOT NULL,
	"available" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
