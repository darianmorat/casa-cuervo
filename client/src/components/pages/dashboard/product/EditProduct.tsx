import { Button } from "@/components/ui/button";
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/Modal";
import { Save, X } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useEffect, useState } from "react";
import { DropImage } from "@/components/ui/DropZone";
import { productSchema, type ProductFormData } from "./ProductSchema";
import { useProductStore } from "@/stores/useProductStore";

interface FileWithPreview extends File {
   preview: string;
   id: string;
}

interface EditProductProps {
   product: ProductFormData;
   productForm: UseFormReturn<ProductFormData>;
   handleEditProduct: (data: ProductFormData, files: FileWithPreview[]) => void;
   closeForm: () => void;
}

export const EditProduct = ({
   product,
   handleEditProduct,
   closeForm,
}: EditProductProps) => {
   const [files, setFiles] = useState<FileWithPreview[]>([]);
   const [isExistingImageDeleted, setIsExistingImageDeleted] = useState(false);
   const { deleteAsset } = useProductStore();

   const productForm = useForm({
      resolver: zodResolver(productSchema),
      defaultValues: {
         title: product.title,
         category: product.category,
         technique: product.technique,
         price: product.price,
         size: product.size,
         year: product.year,
         image: product.image,
         available: product.available,
      },
   });

   useEffect(() => {
      if (files.length > 0) {
         productForm.setValue("image", files[0].name);
         productForm.clearErrors("image");
      } else if (isExistingImageDeleted) {
         productForm.setValue("image", "");
      } else {
         productForm.setValue("image", product.image);
      }
   }, [files, isExistingImageDeleted, productForm, product.image]);

   const handleMarkExistingImageForDeletion = () => {
      setIsExistingImageDeleted(true);
   };

   const handleFormSubmit = async (data: ProductFormData) => {
      if (files.length > 0 && product.image) {
         await deleteAsset(product.image);
      }

      handleEditProduct(data, files);
   };

   const handleCancel = () => {
      setFiles([]);
      setIsExistingImageDeleted(false);
      closeForm();
   };

   return (
      <Modal onClose={closeForm} orientation="right">
         <div className="relative bg-background dark:bg-card p-6 w-full max-w-lg overflow-y-scroll">
            <h3 className="text-lg font-semibold mb-4">Editar producto</h3>

            <Button
               type="button"
               variant={"ghost"}
               className="absolute right-2 top-2 text-muted-foreground"
               onClick={closeForm}
            >
               <X className="w-6 h-6" />
            </Button>

            <Form {...productForm}>
               <form
                  onSubmit={productForm.handleSubmit(handleFormSubmit)}
                  className="space-y-4"
               >
                  <div className="bg-accent/50">
                     <FormField
                        control={productForm.control}
                        name="available"
                        render={({ field }) => (
                           <FormItem className="flex flex-row items-center justify-between border-y p-4 mb-6">
                              <div className="space-y-0.5">
                                 <FormLabel className="text-base">
                                    Disponibilidad
                                 </FormLabel>
                                 <div className="text-sm text-muted-foreground">
                                    {field.value
                                       ? "Esta producto está disponible para la venta"
                                       : "Esta producto ya fue vendida"}
                                 </div>
                              </div>
                              <FormControl>
                                 <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                 />
                              </FormControl>
                           </FormItem>
                        )}
                     />
                  </div>

                  <FormField
                     control={productForm.control}
                     name="title"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Título</FormLabel>
                           <FormControl>
                              <Input {...field} placeholder="Nombre del producto" />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />

                  <FormField
                     control={productForm.control}
                     name="category"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Tipo</FormLabel>
                           <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                           >
                              <FormControl>
                                 <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Selecciona el tipo de producto" />
                                 </SelectTrigger>
                              </FormControl>
                              <SelectContent className="z-99">
                                 <SelectItem value="pintura">Camisetas</SelectItem>
                                 <SelectItem value="mural">Tote bag</SelectItem>
                                 <SelectItem value="grabado">Otro</SelectItem>
                              </SelectContent>
                           </Select>
                           <FormMessage />
                        </FormItem>
                     )}
                  />

                  <FormField
                     control={productForm.control}
                     name="image"
                     render={() => (
                        <FormItem>
                           <FormLabel>Subir Imagen</FormLabel>
                           <FormControl>
                              <DropImage files={files} setFiles={setFiles} maxFiles={1} />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <div className="">
                     {files.length > 0
                        ? null
                        : !isExistingImageDeleted &&
                          product.image && (
                             <>
                                <div className="space-y-4 pt-1">
                                   <p className="text-sm -mt-1 flex gap-2">
                                      <span className="font-semibold">
                                         Imagen actual:
                                      </span>
                                      <span className="text-muted-foreground">
                                         (max 1)
                                      </span>
                                   </p>

                                   <div className="flex flex-row gap-3 flex-wrap justify-center bg-accent p-5">
                                      <div className="h-30 w-30 relative group bg-accent">
                                         <img
                                            src={product.image}
                                            className="h-full w-full object-cover border-2 border-black/40"
                                         />
                                         <button
                                            type="button"
                                            onClick={handleMarkExistingImageForDeletion}
                                            className="absolute top-2 right-2 bg-red-500 text-white w-6 h-6 flex items-center justify-center text-xs hover:bg-red-400 opacity-0 group-hover:opacity-100 cursor-pointer"
                                            title="Marcar para eliminar"
                                         >
                                            <X size={18} />
                                         </button>
                                      </div>
                                   </div>
                                </div>
                             </>
                          )}
                  </div>

                  <FormField
                     control={productForm.control}
                     name="technique"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Tecnica</FormLabel>
                           <FormControl>
                              <Textarea
                                 {...field}
                                 rows={4}
                                 placeholder="Descripción de tecnica usada..."
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                     <FormField
                        control={productForm.control}
                        name="price"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Precio</FormLabel>
                              <FormControl>
                                 <Input {...field} placeholder="$2,400" />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />

                     <FormField
                        control={productForm.control}
                        name="size"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Tamaño</FormLabel>
                              <FormControl>
                                 <Input {...field} placeholder="60x80 cm" />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                  </div>

                  <FormField
                     control={productForm.control}
                     name="year"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Año</FormLabel>
                           <FormControl>
                              <Input {...field} placeholder="2024" />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />

                  <div className="flex gap-2 pt-4">
                     <Button type="submit" className="flex-1">
                        <Save className="w-4 h-4 mr-2" /> Guardar
                     </Button>
                     <Button
                        type="button"
                        onClick={handleCancel}
                        variant={"outline"}
                        className="flex-1"
                     >
                        Cancelar
                     </Button>
                  </div>
               </form>
            </Form>
         </div>
      </Modal>
   );
};
