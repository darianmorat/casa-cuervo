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
import { LoaderCircle, X } from "lucide-react";
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
   const [existingImages, setExistingImages] = useState<string[]>(product.images);
   const { isLoading, deleteAsset } = useProductStore();

   const productForm = useForm({
      resolver: zodResolver(productSchema),
      defaultValues: {
         title: product.title,
         category: product.category,
         technique: product.technique,
         price: product.price,
         size: product.size,
         year: product.year,
         images: product.images,
         available: product.available,
      },
   });

   useEffect(() => {
      const totalImages = existingImages.length + files.length;

      if (totalImages > 0) {
         productForm.clearErrors("images");
      } else {
         productForm.setError("images", {
            message: "Al menos una imagen es requerida",
         });
      }
   }, [files, existingImages, productForm]);

   const removeExistingImage = (index: number) => {
      setExistingImages((prev) => prev.filter((_, i) => i !== index));
   };

   const handleFormSubmit = async (data: ProductFormData) => {
      const deletedImages = product.images.filter((img) => !existingImages.includes(img));

      if (deletedImages.length > 0) {
         await deleteAsset(deletedImages);
      }

      const remainingImages = product.images.filter((img) =>
         existingImages.includes(img),
      );
      const updatedData = {
         ...data,
         images: remainingImages,
      };

      handleEditProduct(updatedData, files);
   };

   const handleCancel = () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
      setFiles([]);
      setExistingImages(product.images);
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
                                 <SelectItem value="camisetas">Camisetas</SelectItem>
                                 <SelectItem value="bolsas">Tote bag</SelectItem>
                                 <SelectItem value="otro">Otro</SelectItem>
                              </SelectContent>
                           </Select>
                           <FormMessage />
                        </FormItem>
                     )}
                  />

                  <FormField
                     control={productForm.control}
                     name="images"
                     render={() => (
                        <FormItem>
                           <FormLabel>Subir Imagen</FormLabel>
                           <FormControl>
                              <DropImage files={files} setFiles={setFiles} maxFiles={5} />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />

                  {existingImages.length > 0 && (
                     <div className="space-y-4 mb-5">
                        <p className="text-sm">
                           <span className="font-semibold tex">
                              {existingImages.length > 1
                                 ? "Imágenes actuales"
                                 : "Imagen actual"}
                           </span>{" "}
                           <span className="text-muted-foreground">
                              ({existingImages.length})
                           </span>
                        </p>
                        <div className="grid grid-cols-3 gap-3 bg-accent p-3">
                           {existingImages.map((imageUrl, index) => (
                              <div
                                 key={imageUrl}
                                 className="relative group aspect-square"
                              >
                                 <img
                                    src={imageUrl}
                                    alt={`Existing ${index + 1}`}
                                    className="w-full h-full object-cover border-2 border-black/40"
                                 />
                                 <button
                                    type="button"
                                    onClick={() => removeExistingImage(index)}
                                    className="absolute top-2 right-2 bg-red-500 text-white w-6 h-6 flex items-center justify-center hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                                 >
                                    <X size={16} />
                                 </button>
                              </div>
                           ))}
                        </div>
                     </div>
                  )}

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

                  <div className="grid grid-cols-2 gap-2 pt-4">
                     <Button type="submit" disabled={isLoading}>
                        {isLoading && <LoaderCircle className="animate-spin" />}
                        {isLoading ? "Guardando" : "Guardar"}
                     </Button>
                     <Button
                        type="button"
                        onClick={handleCancel}
                        disabled={isLoading}
                        variant={"outline"}
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
