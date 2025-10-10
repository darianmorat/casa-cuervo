import { uuid, boolean, timestamp, varchar, pgTable } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const products = pgTable("products", {
   id: uuid("id")
      .primaryKey()
      .default(sql`gen_random_uuid()`),
   title: varchar({ length: 255 }).notNull(),
   category: varchar({ length: 255 }).notNull(),
   technique: varchar({ length: 255 }).notNull(),
   price: varchar({ length: 255 }).notNull(),
   size: varchar({ length: 255 }).notNull(),
   year: varchar({ length: 255 }).notNull(),
   image: varchar({ length: 255 }).notNull(),
   available: boolean().notNull().default(true),
   createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

