import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useArtworkStore } from "@/stores/useArtworkStore";
import { Plus, ChevronRight, ChevronLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { CreateArtwork } from "./artwork/CreateArtwork";
import { DeleteArtwork } from "./artwork/DeleteArtwork";
import { EditArtwork } from "./artwork/EditArtwork";
import { artworkSchema, type ArtworkFormData } from "./artwork/ArtworkSchema";
import { Modal } from "@/components/ui/Modal";
import { ArtworkCard } from "./artwork/ArtworkCard";

interface FileWithPreview extends File {
   preview: string;
   id: string;
}

type ShowFormState = {
   open: boolean;
   for: string;
   id?: string;
   object?: ArtworkFormData;
};

export const ArtworkSection = () => {
   const [currentModalImageIndex, setCurrentModalImageIndex] = useState(0);
   const [selectedImage, setSelectedImage] = useState<string[] | null>(null);

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
         images: [],
         available: true,
      },
   });

   const handleCreateArtwork = async (
      data: z.infer<typeof artworkSchema>,
      files: FileWithPreview[],
   ) => {
      await createArtwork(data, files);
      closeForm();
   };

   const handleEditArtwork = async (
      data: z.infer<typeof artworkSchema>,
      files: FileWithPreview[],
   ) => {
      if (!showForm.id) return;

      await editArtwork(data, files, showForm.id);
      closeForm();
   };

   const openForm = (formType: string, id?: string, object?: ArtworkFormData) => {
      setShowForm({ open: true, for: formType, id, object });
   };

   const closeForm = () => {
      setShowForm({ open: true, for: "" });
      artworkForm.reset();
   };

   const handleImageClick = (images: string[]) => {
      setSelectedImage(images);
      setCurrentModalImageIndex(0);
   };

   const nextModalImage = (e: React.MouseEvent, totalImages: number) => {
      e.stopPropagation();
      setCurrentModalImageIndex((prev) => (prev + 1) % totalImages);
   };

   const prevModalImage = (e: React.MouseEvent, totalImages: number) => {
      e.stopPropagation();
      setCurrentModalImageIndex((prev) => (prev - 1 + totalImages) % totalImages);
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
                              <ArtworkCard
                                 key={artwork.id}
                                 artwork={artwork}
                                 openForm={openForm}
                                 onImageClick={handleImageClick}
                              />
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

         {selectedImage && (
            <Modal onClose={() => setSelectedImage(null)} className="backdrop-blur-sm">
               {selectedImage.length > 1 && (
                  <>
                     <button
                        onClick={(e) => prevModalImage(e, selectedImage.length)}
                        className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full"
                     >
                        <ChevronLeft size={24} />
                     </button>
                     <button
                        onClick={(e) => nextModalImage(e, selectedImage.length)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full"
                     >
                        <ChevronRight size={24} />
                     </button>
                  </>
               )}

               <div className="relative max-w-7xl max-h-[90vh] m-4">
                  <img
                     src={selectedImage[currentModalImageIndex]}
                     alt={`Image ${currentModalImageIndex + 1}`}
                     className="max-w-full max-h-[85vh] object-contain"
                  />
               </div>

               <div className="absolute bottom-5 text-white text-lg">
                  {currentModalImageIndex + 1}/{selectedImage.length}
               </div>
            </Modal>
         )}
      </div>
   );
};
