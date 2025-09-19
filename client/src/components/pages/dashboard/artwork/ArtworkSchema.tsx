import { z } from "zod";

export const artworkSchema = z.object({
   title: z.string().min(1, { message: "Título es requerido" }),
   category: z.string().min(1, { message: "Categoria es requerida" }),
   technique: z.string().min(1, { message: "Descripción es requerida" }),
   price: z.string().min(1, { message: "Precio es requerido" }),
   size: z.string().min(1, { message: "Tamaño es requerido" }),
   year: z.string().min(1, { message: "Año es requerido" }),
   image: z.string().nonempty({ message: "Imagen requerida" }),
   available: z.boolean(),
});

export type ArtworkFormData = z.infer<typeof artworkSchema>;
