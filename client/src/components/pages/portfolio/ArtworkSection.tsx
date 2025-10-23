import { Modal } from "@/components/ui/Modal";
import { useArtworkStore } from "@/stores/useArtworkStore";
import { useAuthStore } from "@/stores/useAuthStore";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArtworkCard } from "./artworkSection/ArworkCard";

export const ArtworkSection = () => {
   const { artworks, getArtworks } = useArtworkStore();
   const { getPhone } = useAuthStore();
   const [categoriesObras, setCategoriesObras] = useState<string[]>([]);
   const [currentModalImageIndex, setCurrentModalImageIndex] = useState(0);
   const navigate = useNavigate();

   const [selectedImageCarousel, setSelectedImageCarousel] = useState<string[] | null>(
      null,
   );

   const handleBuyBtn = async (artTitle: string) => {
      const phone = await getPhone();

      const message = `Hola, me gustaría comprar la obra "${artTitle}"`;
      const url = `https://wa.me/57${phone}?text=${encodeURIComponent(message)}`;

      window.open(url, "_blank");
   };

   const handleTabChange = (
      newTab: "" | "acerca" | "contacto" | "obras" | "productos",
   ) => {
      if (newTab === "") {
         navigate("/");
      } else {
         navigate(`/${newTab}`);
      }
   };

   const handleImageClick = (images: string[]) => {
      setSelectedImageCarousel(images);
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

   useEffect(() => {
      const categories = [...new Set(artworks.map((artwork) => artwork.category))];
      setCategoriesObras(categories);
   }, [artworks]);

   useEffect(() => {
      getArtworks();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   return (
      <>
         <div className="animate-in fade-in duration-400">
            <button
               onClick={() => handleTabChange("")}
               className="text-sm tracking-widest hover:text-blue-400 transition-all duration-300 mb-8 flex items-center gap-2 group"
            >
               <span className="group-hover:-translate-x-1 transition-transform duration-300">
                  ←
               </span>
               VOLVER
            </button>

            <div className="text-center mb-16">
               <h2 className="text-4xl font-thin tracking-wide mb-6">Obras</h2>
               <div className="w-24 h-px bg-gradient-to-r from-transparent via-foreground/40 to-transparent mx-auto" />
            </div>

            {artworks.length <= 0 ? (
               <div className="text-center text-muted-foreground">
                  Upps! Parece que no hay obras
               </div>
            ) : (
               <div className="space-y-12">
                  {categoriesObras.map((category) => {
                     const categoryArtworks = artworks.filter(
                        (artwork) => artwork.category === category,
                     );

                     return (
                        <div key={category} className="space-y-6">
                           <h3 className="text-xl font-semibold capitalize border-b border-black/20 pb-2">
                              {category}
                           </h3>
                           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                              {categoryArtworks.map((artwork) => (
                                 <ArtworkCard
                                    key={artwork.id}
                                    artwork={artwork}
                                    onImageClick={handleImageClick}
                                    onBuyClick={handleBuyBtn}
                                 />
                              ))}
                           </div>
                        </div>
                     );
                  })}
               </div>
            )}
         </div>

         {selectedImageCarousel && (
            <Modal
               onClose={() => setSelectedImageCarousel(null)}
               className="backdrop-blur-sm"
            >
               {selectedImageCarousel.length > 1 && (
                  <>
                     <button
                        onClick={(e) => prevModalImage(e, selectedImageCarousel.length)}
                        className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full"
                     >
                        <ChevronLeft size={24} />
                     </button>
                     <button
                        onClick={(e) => nextModalImage(e, selectedImageCarousel.length)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full"
                     >
                        <ChevronRight size={24} />
                     </button>
                  </>
               )}

               <div className="relative max-w-7xl max-h-[90vh] m-4">
                  <img
                     src={selectedImageCarousel[currentModalImageIndex]}
                     alt={`Image ${currentModalImageIndex + 1}`}
                     className="max-w-full max-h-[85vh] object-contain"
                  />
               </div>

               <div className="absolute bottom-5 text-white text-lg">
                  {currentModalImageIndex + 1}/{selectedImageCarousel.length}
               </div>
            </Modal>
         )}
      </>
   );
};
