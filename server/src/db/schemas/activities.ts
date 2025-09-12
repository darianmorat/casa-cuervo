import { uuid, timestamp, varchar, pgTable } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const activities = pgTable("activities", {
   id: uuid("id")
      .primaryKey()
      .default(sql`gen_random_uuid()`),
   title: varchar({ length: 255 }).notNull(),
   date: varchar({ length: 255 }).notNull(),
   time: varchar({ length: 255 }).notNull(),
   image: varchar({ length: 255 }).notNull(),
   description: varchar({ length: 255 }).notNull(),
   spots: varchar({ length: 255 }).notNull(),
   phone: varchar({ length: 255 }).notNull(),
   createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});
