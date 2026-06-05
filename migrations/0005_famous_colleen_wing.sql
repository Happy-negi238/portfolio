CREATE TABLE "visitors" (
	"id" serial PRIMARY KEY NOT NULL,
	"visitor_id" varchar(255) NOT NULL,
	"visits" integer DEFAULT 1 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"last_visit" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "visitors_visitor_id_unique" UNIQUE("visitor_id")
);
