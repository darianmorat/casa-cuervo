import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
   Plus,
   Calendar,
   DollarSign,
   Ruler,
   X,
   PencilLine,
   HashIcon,
   Fullscreen,
   ChevronLeft,
   ChevronRight,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { EditProduct } from "./product/EditProduct";
import { productSchema, type ProductFormData } from "./product/ProductSchema";
import { useProductStore } from "@/stores/useProductStore";
import { CreateProduct } from "./product/CreateProduct";
import { DeleteProduct } from "./product/DeleteProduct";

interface FileWithPreview extends File {
   preview: string;
   id: string;
}

type ShowFormState = {
   open: boolean;
   for: string;
   id?: string;
   object?: ProductFormData;
};

export const ProductSection = () => {
   const [selectedImage, setSelectedImage] = useState<string[] | null>(null);
   const [showForm, setShowForm] = useState<ShowFormState>({ open: false, for: "" });
   const [categories, setCategories] = useState<string[]>([]);
   const { products, getProducts, createProduct, editProduct } = useProductStore();

   useEffect(() => {
      getProducts();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   useEffect(() => {
      const categories = [...new Set(products.map((product) => product.category))];
      setCategories(categories);
   }, [products]);

   const productForm = useForm({
      resolver: zodResolver(productSchema),
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

   const handleCreateProduct = async (
      data: z.infer<typeof productSchema>,
      files: FileWithPreview[],
   ) => {
      await createProduct(data, files);
      closeForm();
   };

   const handleEditProduct = async (
      data: z.infer<typeof productSchema>,
      files: FileWithPreview[],
   ) => {
      if (!showForm.id) return;

      await editProduct(data, files, showForm.id);
      closeForm();
   };

   const openForm = (formType: string, id?: string, object?: ProductFormData) => {
      setShowForm({ open: true, for: formType, id, object });
   };

   const closeForm = () => {
      setShowForm({ open: true, for: "" });
      productForm.reset();
   };

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
      <div>
         <div className="flex gap-6 items-start justify-between mb-8 flex-col sm:flex-row sm:items-center">
            <div>
               <h2 className="text-2xl font-bold">Mercha Store</h2>
               <p className="text-muted-foreground mt-1">
                  Gestiona el catálogo de productos
               </p>
            </div>
            <Button onClick={() => openForm("create")} className="m-auto sm:m-0">
               <Plus /> Nuevo producto
            </Button>
         </div>

         {products.length <= 0 ? (
            <div className="text-center w-full">Upps! Parece que no hay productos</div>
         ) : (
            <div className="space-y-12">
               {categories.map((category) => {
                  const categoryProducts = products.filter(
                     (product) => product.category === category,
                  );

                  return (
                     <div key={category} className="space-y-6">
                        <h3 className="text-xl font-semibold capitalize border-b pb-2">
                           {category}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                           {categoryProducts.map((product) => (
                              <div
                                 key={product.id}
                                 className="relative bg-card border border-border hover:border-muted-foreground/20 transition-all duration-300 hover:shadow-lg h-full flex flex-col group"
                              >
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
                                             onClick={(e) =>
                                                prevImage(e, product.images.length)
                                             }
                                             className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                          >
                                             <ChevronLeft size={24} />
                                          </button>
                                          <button
                                             onClick={(e) =>
                                                nextImage(e, product.images.length)
                                             }
                                             className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                          >
                                             <ChevronRight size={24} />
                                          </button>
                                       </>
                                    )}

                                    <Fullscreen
                                       size={25}
                                       onClick={() => setSelectedImage(product.images)}
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
                                       <h3 className="text-xl font-medium text-foreground">
                                          {product.title}
                                       </h3>
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

                                    <Button
                                       onClick={() =>
                                          openForm("edit", product.id, product)
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
            <CreateProduct
               productForm={productForm}
               handleCreateProduct={handleCreateProduct}
               closeForm={closeForm}
            />
         )}

         {showForm.for === "edit" && showForm.object && (
            <EditProduct
               product={showForm.object}
               productForm={productForm}
               handleEditProduct={handleEditProduct}
               closeForm={closeForm}
            />
         )}

         {showForm.for === "delete" && showForm.id && (
            <DeleteProduct productId={showForm.id} closeForm={closeForm} />
         )}

         {selectedImage && (
            <Modal onClose={() => setSelectedImage(null)} className="backdrop-blur-sm">
               {selectedImage.length > 1 && (
                  <>
                     <button
                        onClick={(e) => prevImage(e, selectedImage.length)}
                        className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full"
                     >
                        <ChevronLeft size={24} />
                     </button>
                     <button
                        onClick={(e) => nextImage(e, selectedImage.length)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full"
                     >
                        <ChevronRight size={24} />
                     </button>
                  </>
               )}

               <div className="relative max-w-7xl max-h-[90vh] m-4">
                  <img
                     src={selectedImage[currentImageIndex]}
                     alt={`Image ${currentImageIndex + 1}`}
                     className="max-w-full max-h-[85vh] object-contain"
                  />
               </div>

               <div className="absolute bottom-5 text-white text-lg">
                  {currentImageIndex + 1}/{selectedImage.length}
               </div>
            </Modal>
         )}
      </div>
   );
};
