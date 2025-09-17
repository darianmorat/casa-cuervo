import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useArtworkStore } from "@/stores/useArtworkStore";
import {
   Plus,
   Calendar,
   DollarSign,
   Ruler,
   X,
   PencilLine,
   HashIcon,
   Fullscreen,
} from "lucide-react";
import { useEffect, useState } from "react";
import { CreateArtwork } from "./artwork/CreateArtwork";
import { DeleteArtwork } from "./artwork/DeleteArtwork";
import { EditArtwork } from "./artwork/EditArtwork";
import { artworkSchema, type ArtworkFormData } from "./artwork/ArtworkSchema";

type ShowFormState = {
   open: boolean;
   for: string;
   id?: string;
   object?: ArtworkFormData;
};

export const ArtworkSection = () => {
   const [showForm, setShowForm] = useState<ShowFormState>({ open: false, for: "" });
   const [categories, setCategories] = useState<string[]>([]);
   const { artworks, getArtworks, createArtwork, editArtwork } = useArtworkStore();

   useEffect(() => {
      getArtworks();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   useEffect(() => {
      const categories = [...new Set(artworks.map((artwork) => artwork.category))];
      setCategories(categories);
   }, [artworks]);

   const artworkForm = useForm({
      resolver: zodResolver(artworkSchema),
      defaultValues: {
         title: "",
         category: "",
         technique: "",
         price: "",
         size: "",
         year: "",
         image: "",
         available: true,
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
            <div className="space-y-12">
               {categories.map((category) => {
                  const categoryArtworks = artworks.filter(
                     (artwork) => artwork.category === category,
                  );

                  return (
                     <div key={category} className="space-y-6">
                        <h3 className="text-xl font-semibold capitalize border-b pb-2">
                           {category}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                           {categoryArtworks.map((artwork) => (
                              <div
                                 key={artwork.id}
                                 className="relative bg-card border border-border hover:border-muted-foreground/20 transition-all duration-300 hover:shadow-lg h-full flex flex-col group"
                              >
                                 <X
                                    className="absolute z-10 top-4 right-4 w-6 h-6 bg-red-500 text-white p-1 hover:bg-red-400 hover:cursor-pointer opacity-0 group-hover:opacity-100 transition"
                                    onClick={() => openForm("delete", artwork.id)}
                                 />

                                 {artwork.available ? (
                                    <div className="absolute top-2 left-2 bg-emerald-100 text-emerald-600 m-2 py-1 px-2 font-medium text-xs z-10">
                                       DISPONIBLE
                                    </div>
                                 ) : (
                                    <div className="absolute top-2 left-2 bg-red-100 text-red-600 m-2 py-1 px-2 font-medium text-xs z-10">
                                       VENDIDO
                                    </div>
                                 )}

                                 <div className="relative overflow-hidden">
                                    <img
                                       src={artwork.image}
                                       alt={artwork.title}
                                       className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <Fullscreen
                                       size={25}
                                       onClick={() =>
                                          window.open(artwork.image, "_blank")
                                       }
                                       className="absolute z-10 bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity text-white cursor-pointer"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-200" />
                                 </div>

                                 <div className="p-6 space-y-4 flex-1 flex flex-col">
                                    <div>
                                       <h3 className="text-xl font-medium text-foreground">
                                          {artwork.title}
                                       </h3>
                                       <div className="flex items-center text-muted-foreground text-sm mt-2 pb-4 border-b">
                                          <DollarSign className="w-5 h-5 mr-1 text-green-600" />
                                          <span className="text-green-600 font-semibold text-lg">
                                             {artwork.price}
                                          </span>
                                       </div>
                                    </div>

                                    <div className="space-y-2">
                                       <div className="flex items-center text-muted-foreground text-sm">
                                          <Calendar className="w-4 h-4 mr-2" />
                                          {artwork.year}
                                       </div>
                                       <div className="flex items-center text-muted-foreground text-sm">
                                          <HashIcon className="w-4 h-4 mr-2" />
                                          {artwork.category}
                                       </div>
                                       <div className="flex items-center text-muted-foreground text-sm">
                                          <Ruler className="w-4 h-4 mr-2" />
                                          {artwork.size}
                                       </div>
                                    </div>

                                    <div className="text-muted-foreground bg-accent p-2 leading-relaxed text-sm flex-1">
                                       {artwork.technique}
                                    </div>

                                    <Button
                                       onClick={() =>
                                          openForm("edit", artwork.id, artwork)
                                       }
                                    >
                                       <PencilLine /> Editar
                                    </Button>
                                 </div>
                              </div>
                           ))}
                        </div>
                     </div>
                  );
               })}
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
