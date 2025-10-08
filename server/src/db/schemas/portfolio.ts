import { timestamp, varchar, pgTable } from "drizzle-orm/pg-core";

export const portfolio = pgTable("portfolio", {
   id: varchar("id", { length: 10 }).primaryKey(),
   image: varchar({ length: 255 }).notNull(),
   createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});
