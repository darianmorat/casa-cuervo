import { Button } from "@/components/ui/button";
import {
   Calendar,
   DollarSign,
   Ruler,
   X,
   PencilLine,
   HashIcon,
   Fullscreen,
   ChevronRight,
   ChevronLeft,
} from "lucide-react";
import { useState } from "react";
import type { ProductFormData } from "./ProductSchema";

interface ProductCardProps {
   product: ProductFormData & { id: string };
   openForm: (formType: string, id?: string, object?: ProductFormData) => void;
   onImageClick: (images: string[]) => void;
}

export const ProductCard = ({ product, openForm, onImageClick }: ProductCardProps) => {
   const [currentImageIndex, setCurrentImageIndex] = useState(0);

   const nextImage = (e: React.MouseEvent, totalImages: number) => {
      e.stopPropagation();
      setCurrentImageIndex((prev) => (prev + 1) % totalImages);
   };

   const prevImage = (e: React.MouseEvent, totalImages: number) => {
      e.stopPropagation();
      setCurrentImageIndex((prev) => (prev - 1 + totalImages) % totalImages);
   };

   return (
      <div className="relative bg-card border border-border hover:border-muted-foreground/20 transition-all duration-300 hover:shadow-lg h-full flex flex-col group">
         <X
            className="absolute z-10 top-4 right-4 w-6 h-6 bg-red-500 text-white p-1 hover:bg-red-400 hover:cursor-pointer opacity-0 group-hover:opacity-100 transition"
            onClick={() => openForm("delete", product.id)}
         />

         {product.available ? (
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
               src={product.images[currentImageIndex]}
               alt={`${product.title} - Image ${currentImageIndex + 1}`}
               className="w-full h-90 object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {product.images.length > 1 && (
               <>
                  <button
                     onClick={(e) => prevImage(e, product.images.length)}
                     className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                     <ChevronLeft size={24} />
                  </button>
                  <button
                     onClick={(e) => nextImage(e, product.images.length)}
                     className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                     <ChevronRight size={24} />
                  </button>
               </>
            )}

            <Fullscreen
               size={25}
               onClick={() => onImageClick(product.images)}
               className="absolute z-10 bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity text-white cursor-pointer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-200" />
         </div>

         <div className="relative p-6 space-y-4 flex-1 flex flex-col">
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
               {product.images.map((_, index) => (
                  <button
                     key={index}
                     onClick={(e) => {
                        e.stopPropagation();
                        setCurrentImageIndex(index);
                     }}
                     className={`w-2 h-2 rounded-full transition-all ${
                        index === currentImageIndex
                           ? "bg-black/80 w-6 dark:bg-white"
                           : "bg-black/50 dark:bg-white/50 hover:bg-black/75 black:hover:bg-white/75"
                     }`}
                  />
               ))}
            </div>

            <hr className="mt-4" />

            <div>
               <h3 className="text-xl font-medium text-foreground">{product.title}</h3>
               <div className="flex items-center text-muted-foreground text-sm mt-2 pb-4 border-b">
                  <DollarSign className="w-5 h-5 mr-1 text-green-600" />
                  <span className="text-green-600 font-semibold text-lg">
                     {product.price}
                  </span>
               </div>
            </div>

            <div className="space-y-2">
               <div className="flex items-center text-muted-foreground text-sm">
                  <Calendar className="w-4 h-4 mr-2" />
                  {product.year}
               </div>
               <div className="flex items-center text-muted-foreground text-sm">
                  <HashIcon className="w-4 h-4 mr-2" />
                  {product.category}
               </div>
               <div className="flex items-center text-muted-foreground text-sm">
                  <Ruler className="w-4 h-4 mr-2" />
                  {product.size}
               </div>
            </div>

            <div className="text-muted-foreground bg-accent p-2 leading-relaxed text-sm flex-1">
               {product.technique}
            </div>

            <Button onClick={() => openForm("edit", product.id, product)}>
               <PencilLine /> Editar
            </Button>
         </div>
      </div>
   );
};
