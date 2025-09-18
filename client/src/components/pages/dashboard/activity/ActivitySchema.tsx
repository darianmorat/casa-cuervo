import { z } from "zod";

export const activitySchema = z.object({
   title: z.string().min(1, { message: "Título es requerido" }),
   date: z.string().min(1, { message: "Fecha es requerida" }),
   time: z.string().min(1, { message: "Hora es requerida" }),
   image: z.string().nonempty({ message: "Imagen requerida" }),
   description: z
      .string()
      .min(10, { message: "Descripción debe tener al menos 10 caracteres" }),
   spots: z
      .string()
      .regex(/^[1-9]\d{0,2}$/, { message: "Cupos debe ser un número entre 1 y 999" }),
   phone: z
      .string()
      .regex(/^\d{10}$/, { message: "Teléfono debe tener exactamente 10 dígitos" }),
});
