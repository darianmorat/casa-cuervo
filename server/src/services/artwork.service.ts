import { eq } from "drizzle-orm";
import { db } from "../db";
import { artworks } from "../db/schema";

export const artworkService = {
   getAll: async () => {
      const result = await db.select().from(artworks);

      return result;
   },

   create: async (
      title: string,
      price: string,
      size: string,
      year: string,
      image: string,
   ) => {
      const [result] = await db
         .insert(artworks)
         .values({ title, price, size, year, image })
         .returning();

      return result;
   },

   edit: async (
      id: string,
      title: string,
      price: string,
      size: string,
      year: string,
      image: string,
   ) => {
      const [result] = await db
         .update(artworks)
         .set({ title, price, size, year, image })
         .where(eq(artworks.id, id))
         .returning();

      return result;
   },

   delete: async (id: string) => {
      const [result] = await db.delete(artworks).where(eq(artworks.id, id)).returning();

      return result;
   },
};
