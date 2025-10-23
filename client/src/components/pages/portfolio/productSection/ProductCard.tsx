import { ChevronLeft, ChevronRight, Fullscreen } from "lucide-react";
import { useState } from "react";

interface Product {
   id: string;
   title: string;
   images: string[];
   category: string;
   size: string;
   year: string;
   technique: string;
   price: string;
   available: boolean;
}

interface ProductCardProps {
   product: Product;
   onImageClick: (images: string[]) => void;
   onBuyClick: (productTitle: string) => void;
}

export const ProductCard = ({ product, onImageClick, onBuyClick }: ProductCardProps) => {
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
      <div className="relative group cursor-pointer flex flex-col h-full">
         <div className="relative overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
            <img
               src={product.images[currentImageIndex]}
               alt={`${product.title} - Image ${currentImageIndex + 1}`}
               className="w-full h-100 object-cover transition-transform duration-500 group-hover:scale-110"
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

            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />

            <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
               <h3 className="text-lg font-medium mb-1">{product.title}</h3>
               <p className="text-sm opacity-90">
                  {product.size} • {product.year}
               </p>
            </div>
         </div>

         {product.available ? (
            <div className="absolute top-2 right-2 bg-emerald-100 text-emerald-600 m-2 py-1 px-2 font-medium text-xs">
               DISPONIBLE
            </div>
         ) : (
            <div className="absolute top-2 right-2 bg-red-100 text-red-600 m-2 py-1 px-2 font-medium text-xs">
               VENDIDO
            </div>
         )}

         <div className="relative space-y-3 p-4 bg-white/50 border-x border-b border-black/20 flex-1 flex flex-col overflow-hidden">
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

            <hr className="mt-6" />

            <div className="text-sm text-muted-foreground mb-4 flex-1">
               {product.technique}
            </div>
            <div className="flex justify-between items-center">
               <span className="text-lg font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  $ {product.price}
               </span>
               <button
                  onClick={() => onBuyClick(product.title)}
                  disabled={!product.available}
                  className={`text-xs tracking-widest px-4 py-2 border border-black/20 transition-all duration-300 ${
                     product.available
                        ? "hover:text-blue-400 hover:border-blue-400/60 hover:shadow-md hover:shadow-blue-400/20 hover:bg-blue-400/5"
                        : "opacity-50 cursor-not-allowed"
                  }`}
               >
                  COMPRAR
               </button>
            </div>
         </div>
      </div>
   );
};
