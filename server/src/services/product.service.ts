import { eq } from "drizzle-orm";
import { db } from "../db";
import { products } from "../db/schema";

export const productService = {
   getAll: async () => {
      const result = await db.select().from(products);

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
         .insert(products)
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
         .update(products)
         .set({ title, category, technique, price, size, year, image, available })
         .where(eq(products.id, id))
         .returning();

      return result;
   },

   delete: async (id: string) => {
      const [result] = await db.delete(products).where(eq(products.id, id)).returning();

      return result;
   },
};
