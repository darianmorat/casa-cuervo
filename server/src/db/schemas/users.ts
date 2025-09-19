import { uuid, timestamp, varchar, pgTable } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const users = pgTable("users", {
   id: uuid("id")
      .primaryKey()
      .default(sql`gen_random_uuid()`),
   email: varchar({ length: 255 }).notNull().unique(),
   password: varchar({ length: 60 }).notNull(),
   phone: varchar({ length: 60 }).notNull(),
   createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});
