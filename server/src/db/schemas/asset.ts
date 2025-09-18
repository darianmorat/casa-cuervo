import { uuid, timestamp, pgTable, text } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const asset = pgTable("asset", {
   id: uuid("id")
      .primaryKey()
      .default(sql`gen_random_uuid()`),
   publicId: text("public_id").notNull().unique(),
   mediaUrl: text("media_url").notNull(),
   resourceType: text("resource_type").notNull(),
   createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});
