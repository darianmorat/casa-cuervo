import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useArtworkStore } from "@/stores/useArtworkStore";
import { Plus, Calendar, DollarSign, Ruler, X } from "lucide-react";
import { useEffect, useState } from "react";
import { CreateArtwork } from "./artwork/CreateArtwork";
import { DeleteArtwork } from "./artwork/DeleteArtwork";

type ShowFormState = {
   open: boolean;
   for: string;
   value?: string;
};

const artworkSchema = z.object({
   title: z.string().min(1, { message: "Título es requerido" }),
   price: z.string().min(1, { message: "Precio es requerido" }),
   size: z.string().min(1, { message: "Tamaño es requerido" }),
   year: z.string().min(1, { message: "Año es requerido" }),
   image: z.url({ message: "URL de imagen inválida" }),
});

export const ArtworkSection = () => {
   const [showForm, setShowForm] = useState<ShowFormState>({ open: false, for: "" });
   const { artworks, getArtworks, createArtwork } = useArtworkStore();

   useEffect(() => {
      getArtworks();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   const artworkForm = useForm({
      resolver: zodResolver(artworkSchema),
      defaultValues: {
         title: "",
         price: "",
         size: "",
         year: "",
         image: "",
      },
   });

   const handleCreateArtwork = (data: z.infer<typeof artworkSchema>) => {
      createArtwork(data);
      closeForm();
   };

   const openForm = (formType: string, value?: string) => {
      setShowForm({ open: true, for: formType, value: value });
   };

   const closeForm = () => {
      setShowForm({ open: true, for: "" });
      artworkForm.reset();
   };

   return (
      <div>
         <div className="flex gap-6 items-start justify-between mb-8 flex-col sm:flex-row sm:items-center">
            <div>
               <h2 className="text-2xl font-bold">Obras</h2>
               <p className="text-muted-foreground mt-1">Gestiona el catálogo de obras</p>
            </div>
            <Button onClick={() => openForm("create")} className="m-auto sm:m-0">
               <Plus /> Nueva Obra
            </Button>
         </div>

         {artworks.length <= 0 ? (
            <div className="text-center w-full">Upps! Parece que no hay obras</div>
         ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
               {artworks.map((artwork) => (
                  <div
                     key={artwork.id}
                     className="relative bg-card border overflow-hidden group"
                  >
                     <X
                        className="absolute top-0 right-0 w-8 h-8 bg-red-400 text-white p-1 hover:bg-red-500 hover:cursor-pointer opacity-0 group-hover:opacity-100 transition"
                        onClick={() => openForm("delete", artwork.id)}
                     />

                     <div className="aspect-square bg-muted">
                        <img
                           src={artwork.image}
                           alt={artwork.title}
                           className="w-full h-full object-cover"
                        />
                     </div>
                     <div className="p-5">
                        <h3 className="font-semibold mb-3">{artwork.title}</h3>
                        <div className="space-y-2">
                           <div className="flex items-center text-muted-foreground text-sm">
                              <DollarSign className="w-4 h-4 mr-2" />
                              {artwork.price}
                           </div>
                           <div className="flex items-center text-muted-foreground text-sm">
                              <Ruler className="w-4 h-4 mr-2" />
                              {artwork.size}
                           </div>
                           <div className="flex items-center text-muted-foreground text-sm">
                              <Calendar className="w-4 h-4 mr-2" />
                              {artwork.year}
                           </div>
                        </div>
                        <Button variant={"outline"} className="mt-5">
                           Editar obra
                        </Button>
                     </div>
                  </div>
               ))}
            </div>
         )}

         {showForm.for === "create" && (
            <CreateArtwork
               artworkForm={artworkForm}
               handleCreateArtwork={handleCreateArtwork}
               closeForm={closeForm}
            />
         )}

         {showForm.for === "delete" && showForm.value && (
            <DeleteArtwork artworkId={showForm.value} closeForm={closeForm} />
         )}
      </div>
   );
};
