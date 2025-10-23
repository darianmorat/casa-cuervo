import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { EditProduct } from "./product/EditProduct";
import { productSchema, type ProductFormData } from "./product/ProductSchema";
import { useProductStore } from "@/stores/useProductStore";
import { CreateProduct } from "./product/CreateProduct";
import { DeleteProduct } from "./product/DeleteProduct";
import { ProductCard } from "./product/ProductCard";

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
   const [currentModalImageIndex, setCurrentModalImageIndex] = useState(0);
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
                              <ProductCard
                                 key={product.id}
                                 product={product}
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
