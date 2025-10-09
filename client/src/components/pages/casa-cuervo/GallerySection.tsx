import { Container } from "@/components/layout/Container";
import { Modal } from "@/components/ui/Modal";
import { Fullscreen, XCircleIcon } from "lucide-react";
import { useState } from "react";

type Image = {
   id: string;
   image: string;
};

export const GallerySection = () => {
   const [selectedImage, setSelectedImage] = useState<Image | null>(null);

   const galleryImages = [
      {
         id: "1",
         image: "https://res.cloudinary.com/dxlhxvgzc/image/upload/v1757468123/521114125_18496309984067158_4845615388996651374_n._uuorar.jpg",
      },
      {
         id: "2",
         image: "https://res.cloudinary.com/dxlhxvgzc/image/upload/v1757468122/505398277_17885949300291171_4636645246508492489_n._xalwf7.jpg",
      },
      {
         id: "3",
         image: "https://res.cloudinary.com/dxlhxvgzc/image/upload/v1757468122/523112383_18496309945067158_6788491316897620871_n._ylpvhu.jpg",
      },
      {
         id: "4",
         image: "https://res.cloudinary.com/dxlhxvgzc/image/upload/v1757468131/835398277_17885949300291171_4636645246508492489_qc2mlb.png",
      },
      {
         id: "5",
         image: "https://res.cloudinary.com/dxlhxvgzc/image/upload/v1757468122/516775856_1918847162262659_1852698867600959511_n._gpwre8.jpg",
      },
      {
         id: "6",
         image: "https://res.cloudinary.com/dxlhxvgzc/image/upload/v1757468122/523712886_18496309969067158_1445899787344711914_n._ebsky0.jpg",
      },
      {
         id: "7",
         image: "https://res.cloudinary.com/dxlhxvgzc/image/upload/v1757468122/517348890_753842867327050_64738216707787192_n._d9e24a.jpg",
      },
      {
         id: "8",
         image: "https://res.cloudinary.com/dxlhxvgzc/image/upload/v1757468122/496717255_18496994686024094_1930170544099970796_n._skhhu4.jpg",
      },
   ];

   return (
      <section id="galeria" className="bg-muted/30 py-20 border-t border-foreground/10">
         <Container>
            <div className="text-center mb-16">
               <h2 className="text-4xl font-thin tracking-wide mb-6">Galeria</h2>
               <div className="w-24 h-px bg-gradient-to-r from-transparent via-foreground/40 to-transparent mx-auto" />
            </div>

            <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6">
               {galleryImages.map((i) => (
                  <div
                     key={i.id}
                     className="break-inside-avoid mb-6 group cursor-pointer"
                  >
                     <div className="relative overflow-hidden bg-card shadow-sm hover:shadow-md transition-all duration-300">
                        <img
                           src={i.image}
                           alt={`Galería ${i.id}`}
                           className={`w-full object-cover group-hover:scale-105 transition-transform duration-500 h-80`}
                        />
                        <Fullscreen
                           size={25}
                           onClick={() => setSelectedImage(i)}
                           className="absolute z-10 bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity text-white cursor-pointer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-200" />
                     </div>
                  </div>
               ))}
            </div>

            {selectedImage && (
               <Modal onClose={() => setSelectedImage(null)} className="backdrop-blur-sm">
                  <div className="relative max-w-7xl max-h-[90vh] m-4">
                     <div
                        className="absolute right-0 top-0 text-white/80 hover:text-white hover:cursor-pointer p-3"
                        onClick={() => setSelectedImage(null)}
                     >
                        <XCircleIcon size={30} />
                     </div>
                     <img
                        src={selectedImage.image}
                        className="max-w-full max-h-[85vh] object-contain"
                     />
                  </div>
               </Modal>
            )}
         </Container>
      </section>
   );
};
