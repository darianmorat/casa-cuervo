import { z } from "zod";

export const activitySchema = z.object({
   title: z.string().min(1, { message: "Título es requerido" }),
   date: z.string().min(1, { message: "Fecha es requerida" }),
   time: z.string().min(1, { message: "Hora es requerida" }),
   image: z.url({ message: "URL de imagen inválida" }),
   description: z
      .string()
      .min(10, { message: "Descripción debe tener al menos 10 caracteres" }),
   spots: z.string().min(1, { message: "Información de cupos es requerida" }),
});
