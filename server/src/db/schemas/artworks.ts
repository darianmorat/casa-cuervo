import { uuid, timestamp, varchar, pgTable } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const artworks = pgTable("artworks", {
   id: uuid("id")
      .primaryKey()
      .default(sql`gen_random_uuid()`),
   title: varchar({ length: 255 }).notNull(),
   price: varchar({ length: 255 }).notNull(),
   size: varchar({ length: 255 }).notNull(),
   year: varchar({ length: 255 }).notNull(),
   image: varchar({ length: 255 }).notNull(),
   createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});
