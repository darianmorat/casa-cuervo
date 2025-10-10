import { Button } from "@/components/ui/button";
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm, type UseFormReturn } from "react-hook-form";
import { X, Save } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { activitySchema, type ActivityFormData } from "./ActivitySchema";
import { useEffect, useState } from "react";
import { DropImage } from "@/components/ui/DropZone";
import { useActivityStore } from "@/stores/useActivityStore";

interface FileWithPreview extends File {
   preview: string;
   id: string;
}

interface CreateActivityProps {
   activity: ActivityFormData;
   activityForm: UseFormReturn<ActivityFormData>;
   handleEditActivity: (data: ActivityFormData, files: FileWithPreview[]) => void;
   closeForm: () => void;
}

export const EditActivity = ({
   activity,
   handleEditActivity,
   closeForm,
}: CreateActivityProps) => {
   const [files, setFiles] = useState<FileWithPreview[]>([]);
   const [isExistingImageDeleted, setIsExistingImageDeleted] = useState(false);
   const { deleteAsset } = useActivityStore();

   const activityForm = useForm({
      resolver: zodResolver(activitySchema),
      defaultValues: {
         title: activity.title,
         date: activity.date,
         time: activity.time,
         image: activity.image,
         description: activity.description,
         spots: activity.spots,
         phone: activity.phone,
      },
   });

   useEffect(() => {
      if (files.length > 0) {
         activityForm.setValue("image", files[0].name);
         activityForm.clearErrors("image");
      } else if (isExistingImageDeleted) {
         activityForm.setValue("image", "");
      } else {
         activityForm.setValue("image", activity.image);
      }
   }, [files, isExistingImageDeleted, activityForm, activity.image]);

   const handleMarkExistingImageForDeletion = () => {
      setIsExistingImageDeleted(true);
   };

   const handleFormSubmit = async (data: ActivityFormData) => {
      if (files.length > 0 && activity.image) {
         await deleteAsset(activity.image);
      }

      handleEditActivity(data, files);
   };

   const handleCancel = () => {
      setFiles([]);
      setIsExistingImageDeleted(false);
      closeForm();
   };

   return (
      <Modal onClose={handleCancel} orientation="right">
         <div className="relative bg-background dark:bg-card p-6 w-full max-w-lg overflow-y-scroll">
            <h3 className="text-lg font-semibold mb-4">Editar actividad</h3>

            <Button
               type="button"
               variant={"ghost"}
               className="absolute right-2 top-2 text-muted-foreground"
               onClick={handleCancel}
            >
               <X className="w-6 h-6" />
            </Button>

            <Form {...activityForm}>
               <form
                  onSubmit={activityForm.handleSubmit(handleFormSubmit)}
                  className="space-y-4"
               >
                  <FormField
                     control={activityForm.control}
                     name="title"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Título</FormLabel>
                           <FormControl>
                              <Input {...field} placeholder="Nombre de la actividad" />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                     <FormField
                        control={activityForm.control}
                        name="date"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Fecha</FormLabel>
                              <FormControl>
                                 <Input
                                    {...field}
                                    type="date"
                                    className="text-black/60"
                                 />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />

                     <FormField
                        control={activityForm.control}
                        name="time"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Hora</FormLabel>
                              <FormControl>
                                 <Input {...field} placeholder="14:00 - 17:00" />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                  </div>

                  <FormField
                     control={activityForm.control}
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
                          activity.image && (
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
                                            src={activity.image}
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
                     control={activityForm.control}
                     name="description"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Descripción</FormLabel>
                           <FormControl>
                              <Textarea
                                 {...field}
                                 rows={4}
                                 placeholder="Descripción detallada de la actividad..."
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />

                  <FormField
                     control={activityForm.control}
                     name="spots"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Cupos</FormLabel>
                           <FormControl>
                              <Input {...field} placeholder="8 cupos disponibles" />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />

                  <FormField
                     control={activityForm.control}
                     name="phone"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Celular:</FormLabel>
                           <FormControl>
                              <Input
                                 {...field}
                                 placeholder="Numero representante del evento"
                              />
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
