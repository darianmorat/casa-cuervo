import { Container } from "@/components/layout/Container";
import { Fullscreen } from "lucide-react";

export const GallerySection = () => {
   const galleryImages = [
      {
         id: 1,
         src: "https://res.cloudinary.com/dxlhxvgzc/image/upload/v1757468123/521114125_18496309984067158_4845615388996651374_n._uuorar.jpg",
         className: "h-80",
      },
      {
         id: 2,
         src: "https://res.cloudinary.com/dxlhxvgzc/image/upload/v1757468122/505398277_17885949300291171_4636645246508492489_n._xalwf7.jpg",
         className: "h-80",
      },
      {
         id: 3,
         src: "https://res.cloudinary.com/dxlhxvgzc/image/upload/v1757468122/523112383_18496309945067158_6788491316897620871_n._ylpvhu.jpg",
         className: "h-80",
      },
      {
         id: 4,
         src: "https://res.cloudinary.com/dxlhxvgzc/image/upload/v1757468131/835398277_17885949300291171_4636645246508492489_qc2mlb.png",
         className: "h-80",
      },
      {
         id: 5,
         src: "https://res.cloudinary.com/dxlhxvgzc/image/upload/v1757468122/516775856_1918847162262659_1852698867600959511_n._gpwre8.jpg",
         className: "h-80",
      },
      {
         id: 6,
         src: "https://res.cloudinary.com/dxlhxvgzc/image/upload/v1757468122/523712886_18496309969067158_1445899787344711914_n._ebsky0.jpg",
         className: "h-80",
      },
      {
         id: 7,
         src: "https://res.cloudinary.com/dxlhxvgzc/image/upload/v1757468122/517348890_753842867327050_64738216707787192_n._d9e24a.jpg",
         className: "h-80",
      },
      {
         id: 8,
         src: "https://res.cloudinary.com/dxlhxvgzc/image/upload/v1757468122/496717255_18496994686024094_1930170544099970796_n._skhhu4.jpg",
         className: "h-80",
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
               {galleryImages.map((image) => (
                  <div
                     key={image.id}
                     className="break-inside-avoid mb-6 group cursor-pointer"
                  >
                     <div className="relative overflow-hidden bg-card shadow-sm hover:shadow-md transition-all duration-300">
                        <img
                           src={image.src}
                           alt={`Galería ${image.id}`}
                           className={`w-full object-cover group-hover:scale-105 transition-transform duration-500 ${image.className}`}
                        />
                        <Fullscreen
                           size={25}
                           onClick={() => window.open(image.src, "_blank")}
                           className="absolute z-10 bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity text-white cursor-pointer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-200" />
                     </div>
                  </div>
               ))}
            </div>
         </Container>
      </section>
   );
};
