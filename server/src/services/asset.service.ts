import { eq } from "drizzle-orm";
import { db } from "../db";
import { asset } from "../db/schema";

export const assetService = {
   create: async (public_id: string, secure_url: string, resource_type: string) => {
      const result = await db
         .insert(asset)
         .values({
            publicId: public_id,
            mediaUrl: secure_url,
            resourceType: resource_type,
         })
         .returning();

      return result;
   },

   delete: async (publicId: string) => {
      const [result] = await db
         .delete(asset)
         .where(eq(asset.publicId, publicId))
         .returning();

      return result;
   },
};
