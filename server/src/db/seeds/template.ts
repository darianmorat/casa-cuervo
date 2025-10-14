import { db } from "../index";
import { users } from "../schema";

export const seedTemplate = async () => {
   const data = [
      {
         email: "admin@gmail.com",
         password: "$2b$10$P4D6/FnazVpurmQi8x2iU.hRCJkcU6LM4RsEcYIOvVq7WMrXgWRUC",
         phone: "2288192333",
      },
   ];

   try {
      await db.insert(users).values(data);
      console.log("Users seeded successfully");
   } catch (error) {
      console.error("Error seeding users:", error);
      throw error;
   }
};
