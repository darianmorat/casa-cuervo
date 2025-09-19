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
import { artworkSchema, type ArtworkFormData } from "./ArtworkSchema";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useActivityStore } from "@/stores/useActivityStore";
import { useEffect, useState } from "react";
import { DropImage } from "@/components/ui/DropZone";

interface FileWithPreview extends File {
   preview: string;
   id: string;
}

interface EditArtworkProps {
   artwork: ArtworkFormData;
   artworkForm: UseFormReturn<ArtworkFormData>;
   handleEditArtwork: (data: ArtworkFormData, files: FileWithPreview[]) => void;
   closeForm: () => void;
}

export const EditArtwork = ({
   artwork,
   handleEditArtwork,
   closeForm,
}: EditArtworkProps) => {
   const [files, setFiles] = useState<FileWithPreview[]>([]);
   const [isExistingImageDeleted, setIsExistingImageDeleted] = useState(false);
   const { deleteAsset } = useActivityStore();

   const artworkForm = useForm({
      resolver: zodResolver(artworkSchema),
      defaultValues: {
         title: artwork.title,
         category: artwork.category,
         technique: artwork.technique,
         price: artwork.price,
         size: artwork.size,
         year: artwork.year,
         image: artwork.image,
         available: artwork.available,
      },
   });

   useEffect(() => {
      if (files.length > 0) {
         artworkForm.setValue("image", files[0].name);
         artworkForm.clearErrors("image");
      } else if (isExistingImageDeleted) {
         artworkForm.setValue("image", "");
      } else {
         artworkForm.setValue("image", artwork.image);
      }
   }, [files, isExistingImageDeleted, artworkForm, artwork.image]);

   const handleMarkExistingImageForDeletion = () => {
      setIsExistingImageDeleted(true);
   };

   const handleFormSubmit = async (data: ArtworkFormData) => {
      await deleteAsset(artwork.image);
      handleEditArtwork(data, files);
   };

   const handleCancel = () => {
      setFiles([]);
      setIsExistingImageDeleted(false);
      closeForm();
   };

   return (
      <Modal onClose={closeForm} orientation="right">
         <div className="relative bg-background dark:bg-card p-6 w-full max-w-lg overflow-y-scroll">
            <h3 className="text-lg font-semibold mb-4">Editar obra</h3>

            <Button
               type="button"
               variant={"ghost"}
               className="absolute right-2 top-2 text-muted-foreground"
               onClick={closeForm}
            >
               <X className="w-6 h-6" />
            </Button>

            <Form {...artworkForm}>
               <form
                  onSubmit={artworkForm.handleSubmit(handleFormSubmit)}
                  className="space-y-4"
               >
                  <div className="bg-accent/50">
                     <FormField
                        control={artworkForm.control}
                        name="available"
                        render={({ field }) => (
                           <FormItem className="flex flex-row items-center justify-between border-y p-4 mb-6">
                              <div className="space-y-0.5">
                                 <FormLabel className="text-base">
                                    Disponibilidad
                                 </FormLabel>
                                 <div className="text-sm text-muted-foreground">
                                    {field.value
                                       ? "Esta obra está disponible para la venta"
                                       : "Esta obra ya fue vendida"}
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
                     control={artworkForm.control}
                     name="title"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Título</FormLabel>
                           <FormControl>
                              <Input {...field} placeholder="Nombre de la obra" />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />

                  <FormField
                     control={artworkForm.control}
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
                                    <SelectValue placeholder="Selecciona el tipo de obra" />
                                 </SelectTrigger>
                              </FormControl>
                              <SelectContent className="z-99">
                                 <SelectItem value="pintura">Pintura</SelectItem>
                                 <SelectItem value="mural">Mural</SelectItem>
                                 <SelectItem value="esculturas">Esculturas</SelectItem>
                                 <SelectItem value="grabado">Grabado</SelectItem>
                              </SelectContent>
                           </Select>
                           <FormMessage />
                        </FormItem>
                     )}
                  />

                  <FormField
                     control={artworkForm.control}
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
                          artwork.image && (
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
                                            src={artwork.image}
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
                     control={artworkForm.control}
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
                        control={artworkForm.control}
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
                        control={artworkForm.control}
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
                     control={artworkForm.control}
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
