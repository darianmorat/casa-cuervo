CREATE TABLE "portfolio" (
	"id" varchar(10) PRIMARY KEY NOT NULL,
	"image" varchar(255) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
