import { eq } from "drizzle-orm";
import { db } from "../db";
import { activities } from "../db/schema";

export const activityService = {
   getAll: async () => {
      const result = await db.select().from(activities);

      return result;
   },

   create: async (
      title: string,
      date: string,
      time: string,
      image: string,
      description: string,
      spots: string,
   ) => {
      const [result] = await db
         .insert(activities)
         .values({ title, date, time, image, description, spots })
         .returning();

      return result;
   },

   delete: async (id: string) => {
      const [result] = await db
         .delete(activities)
         .where(eq(activities.id, id))
         .returning();

      return result;
   },
};
