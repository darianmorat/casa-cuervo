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
   XCircleIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { EditProduct } from "./product/EditProduct";
import { productSchema, type ProductFormData } from "./product/ProductSchema";
import { useProductStore } from "@/stores/useProductStore";
import { CreateProduct } from "./product/CreateProduct";
import { DeleteProduct } from "./product/DeleteProduct";

type Image = {
   id: string;
   image: string;
};

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
   const [selectedImage, setSelectedImage] = useState<Image | null>(null);
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
         image: "",
         available: true,
      },
   });

   const handleCreateProduct = (
      data: z.infer<typeof productSchema>,
      files: FileWithPreview[],
   ) => {
      createProduct(data, files);
      closeForm();
   };

   const handleEditProduct = (
      data: z.infer<typeof productSchema>,
      files: FileWithPreview[],
   ) => {
      if (!showForm.id) return;

      editProduct(data, files, showForm.id);
      closeForm();
   };

   const openForm = (formType: string, id?: string, object?: ProductFormData) => {
      setShowForm({ open: true, for: formType, id, object });
   };

   const closeForm = () => {
      setShowForm({ open: true, for: "" });
      productForm.reset();
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
                     (artwork) => artwork.category === category,
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
                                       src={product.image}
                                       alt={product.title}
                                       className="w-full h-90 object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <Fullscreen
                                       size={25}
                                       onClick={() => setSelectedImage(product)}
                                       className="absolute z-10 bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity text-white cursor-pointer"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-200" />
                                 </div>

                                 <div className="p-6 space-y-4 flex-1 flex flex-col">
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
      </div>
   );
};
