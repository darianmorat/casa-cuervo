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
      category: string,
      technique: string,
      price: string,
      size: string,
      year: string,
      image: string,
      available: boolean,
   ) => {
      const [result] = await db
         .insert(artworks)
         .values({ title, category, technique, price, size, year, image, available })
         .returning();

      return result;
   },

   edit: async (
      id: string,
      title: string,
      category: string,
      technique: string,
      price: string,
      size: string,
      year: string,
      image: string,
      available: boolean,
   ) => {
      const [result] = await db
         .update(artworks)
         .set({ title, category, technique, price, size, year, image, available })
         .where(eq(artworks.id, id))
         .returning();

      return result;
   },

   delete: async (id: string) => {
      const [result] = await db.delete(artworks).where(eq(artworks.id, id)).returning();

      return result;
   },
};
