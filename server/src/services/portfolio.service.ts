import { eq } from "drizzle-orm";
import { db } from "../db";
import { portfolio } from "../db/schema";

export const portfolioService = {
   getAll: async () => {
      const result = await db.select().from(portfolio);

      return result;
   },

   upload: async (id: string, image: string) => {
      const [result] = await db.insert(portfolio).values({ id, image }).returning();

      return result;
   },

   delete: async (id: string) => {
      const [result] = await db.delete(portfolio).where(eq(portfolio.id, id)).returning();

      return result;
   },
};
