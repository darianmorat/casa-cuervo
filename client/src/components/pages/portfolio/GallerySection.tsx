import { Button } from "@/components/ui/button";
import logo from "../../../assets/cuervo-logo.png";
import { useNavigate } from "react-router-dom";
import { usePortfolioStore } from "@/stores/usePortfolioStore";
import { useEffect, useState } from "react";
import { Fullscreen } from "lucide-react";
import { Modal } from "@/components/ui/Modal";

type Image = {
   id: string;
   image: string;
};

export const GallerySection = () => {
   const { images, getImages } = usePortfolioStore();
   const [selectedImage, setSelectedImage] = useState<Image | null>(null);
   const navigate = useNavigate();

   const handleTabChange = (
      newTab: "" | "acerca" | "contacto" | "obras" | "productos",
   ) => {
      if (newTab === "") {
         navigate("/");
      } else {
         navigate(`/${newTab}`);
      }
   };

   useEffect(() => {
      getImages();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   return (
      <>
         <div className="animate-in fade-in duration-400">
            <div className="text-center mb-10">
               <img
                  src={logo}
                  className="absolute left-1/2 -translate-x-1/2 -top-10 w-130 mx-auto"
               />
               <div className="w-32 h-[2px] mt-50 bg-gradient-to-r from-transparent via-blue-400/60 to-transparent mx-auto mb-6" />
            </div>

            <div className="flex justify-center gap-8 md:gap-16 mb-12 flex-wrap">
               <button
                  onClick={() => handleTabChange("acerca")}
                  className="text-sm tracking-[0.3em] hover:text-blue-400 transition-all duration-300 relative group px-2 py-1"
               >
                  ACERCA DE
                  <div className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-300" />
               </button>
               <button
                  onClick={() => handleTabChange("contacto")}
                  className="text-sm tracking-[0.3em] hover:text-blue-400 transition-all duration-300 relative group px-2 py-1"
               >
                  CONTACTO
                  <div className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-300" />
               </button>
               <button
                  onClick={() => handleTabChange("obras")}
                  className="text-sm tracking-[0.3em] hover:text-blue-400 transition-all duration-300 relative group px-2 py-1"
               >
                  OBRAS
                  <div className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-300" />
               </button>
               <button
                  onClick={() => handleTabChange("productos")}
                  className="text-sm tracking-[0.3em] hover:text-blue-400 transition-all duration-300 relative group px-2 py-1"
               >
                  PRODUCTOS
                  <div className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-300" />
               </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-16">
               {[...images]
                  .sort((a, b) => Number(a.id) - Number(b.id))
                  .map((image) => (
                     <div key={image.id} className="group cursor-pointer">
                        <div className="relative overflow-hidden bg-muted/10 aspect-[3/4] shadow-lg hover:shadow-2xl transition-all duration-500 group">
                           <img
                              src={image.image}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                           />
                           <Fullscreen
                              size={25}
                              onClick={() => setSelectedImage(image)}
                              className="absolute z-10 bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity text-white cursor-pointer"
                           />
                           <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-200" />
                        </div>
                     </div>
                  ))}
            </div>

            <div className="text-center mb-10">
               <div className="mb-8 animate-pulse">
                  <div className="w-1 h-10 bg-gradient-to-t from-blue-400/60 to-transparent mx-auto" />
               </div>
               <div className="max-w-2xl mx-auto mb-8 space-y-3">
                  <h3 className="text-2xl font-thin tracking-wide">Conoce mi proceso</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                     Un vistazo al universo creativo donde nacen las obras, entre colores,
                     texturas y la magia de Casa Cuervo
                  </p>
               </div>
               <div className="flex flex-col items-center">
                  <div className="relative w-full">
                     <iframe
                        className="w-full aspect-video"
                        src="https://www.youtube-nocookie.com/embed/tik0ror2jdo?si=S5t4AXdIpQ_ZfEUo"
                        title="Video"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                     />
                  </div>
                  <div className="mt-8 animate-pulse">
                     <div className="w-1 h-10 bg-gradient-to-t from-blue-400/60 to-transparent mx-auto" />
                  </div>
                  <Button
                     variant={"ghost"}
                     size={"lg"}
                     onClick={() => navigate("/casa-cuervo")}
                     className={`mt-8 w-fit font-normal tracking-widest border border-black/20 transition-all duration-300 hover:text-blue-400 hover:border-blue-400/60 hover:shadow-md hover:shadow-blue-400/20 hover:bg-blue-400/5`}
                  >
                     EXPLORAR CASA CUERVO
                  </Button>
               </div>
            </div>
         </div>

         {selectedImage && (
            <Modal onClose={() => setSelectedImage(null)} className="backdrop-blur-sm">
               <div className="relative max-w-7xl max-h-[90vh] m-4">
                  <div
                     className="absolute right-0 top-0 text-white/80 hover:text-white hover:cursor-pointer p-3"
                     onClick={() => setSelectedImage(null)}
                  ></div>
                  <img
                     src={selectedImage.image}
                     className="max-w-full max-h-[85vh] object-contain"
                  />
               </div>
            </Modal>
         )}
      </>
   );
};
