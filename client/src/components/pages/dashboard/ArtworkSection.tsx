import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useArtworkStore } from "@/stores/useArtworkStore";
import { Plus, Calendar, DollarSign, Ruler, X, PencilLine } from "lucide-react";
import { useEffect, useState } from "react";
import { CreateArtwork } from "./artwork/CreateArtwork";
import { DeleteArtwork } from "./artwork/DeleteArtwork";
import { EditArtwork } from "./artwork/EditArtwork";
import { artworkSchema } from "./artwork/ArtworkSchema";

type ArtworkFormData = {
   title: string;
   price: string;
   size: string;
   year: string;
   image: string;
};

type ShowFormState = {
   open: boolean;
   for: string;
   id?: string;
   object?: ArtworkFormData;
};

export const ArtworkSection = () => {
   const [showForm, setShowForm] = useState<ShowFormState>({ open: false, for: "" });
   const { artworks, getArtworks, createArtwork, editArtwork } = useArtworkStore();

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

   const handleEditArtwork = (data: z.infer<typeof artworkSchema>) => {
      if (!showForm.id) return;

      editArtwork(data, showForm.id);
      closeForm();
   };

   const openForm = (formType: string, id?: string, object?: ArtworkFormData) => {
      setShowForm({ open: true, for: formType, id, object });
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
                     <div className="p-6 space-y-4 flex-1 flex flex-col">
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
                        <Button onClick={() => openForm("edit", artwork.id, artwork)}>
                           <PencilLine /> Editar
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

         {showForm.for === "edit" && showForm.object && (
            <EditArtwork
               artwork={showForm.object}
               artworkForm={artworkForm}
               handleEditArtwork={handleEditArtwork}
               closeForm={closeForm}
            />
         )}

         {showForm.for === "delete" && showForm.id && (
            <DeleteArtwork artworkId={showForm.id} closeForm={closeForm} />
         )}
      </div>
   );
};
