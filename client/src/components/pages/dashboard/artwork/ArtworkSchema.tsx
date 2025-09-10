import { z } from "zod";

export const artworkSchema = z.object({
   title: z.string().min(1, { message: "Título es requerido" }),
   price: z.string().min(1, { message: "Precio es requerido" }),
   size: z.string().min(1, { message: "Tamaño es requerido" }),
   year: z.string().min(1, { message: "Año es requerido" }),
   image: z.url({ message: "URL de imagen inválida" }),
});
