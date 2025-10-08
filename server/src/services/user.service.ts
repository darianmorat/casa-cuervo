import { eq } from "drizzle-orm";
import { db } from "../db";
import { users } from "../db/schema";

export const userService = {
   findForAuth: async (email: string) => {
      const [result] = await db
         .select({
            id: users.id,
            password: users.password,
         })
         .from(users)
         .where(eq(users.email, email))
         .limit(1);

      return result;
   },

   findById: async (id: string) => {
      const [result] = await db.select().from(users).where(eq(users.id, id)).limit(1);

      return result;
   },

   updatePhone: async (phone: string, id: string) => {
      const result = await db
         .update(users)
         .set({ phone: phone })
         .where(eq(users.id, id))
         .returning();

      return result;
   },

   getPhone: async () => {
      const [result] = await db.select({ phone: users.phone }).from(users).limit(1);

      return result;
   },
};
