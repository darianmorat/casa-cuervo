import { Button } from "@/components/ui/button";
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { UseFormReturn } from "react-hook-form";
import { X, Save } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { DropImage } from "@/components/ui/DropZone";
import { useEffect, useState } from "react";
import type { ActivityFormData } from "./ActivitySchema";

interface FileWithPreview extends File {
   preview: string;
   id: string;
}

interface CreateActivityProps {
   activityForm: UseFormReturn<ActivityFormData>;
   handleCreateActivity: (data: ActivityFormData, files: FileWithPreview[]) => void;
   closeForm: () => void;
}

export const CreateActivity = ({
   activityForm,
   handleCreateActivity,
   closeForm,
}: CreateActivityProps) => {
   const [files, setFiles] = useState<FileWithPreview[]>([]);

   // Add useEffect to update form field when files change
   useEffect(() => {
      if (files.length > 0) {
         activityForm.setValue("image", files[0].name);
         activityForm.clearErrors("image");
      } else {
         activityForm.setValue("image", "");
      }
   }, [files, activityForm]);

   return (
      <Modal onClose={closeForm} orientation="right">
         <div className="relative bg-background dark:bg-card p-6 w-full max-w-lg overflow-y-scroll">
            <h3 className="text-lg font-semibold mb-4">Nueva actividad</h3>

            <Button
               type="button"
               variant={"ghost"}
               className="absolute right-2 top-2 text-muted-foreground"
               onClick={closeForm}
            >
               <X className="w-6 h-6" />
            </Button>

            <Form {...activityForm}>
               <form
                  onSubmit={activityForm.handleSubmit((data) =>
                     handleCreateActivity(data, files),
                  )}
                  className="space-y-6"
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
                              <Input {...field} placeholder="Cantidad disponible" />
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

                  <div className="grid grid-cols-2 gap-2 pt-4">
                     <Button type="submit">
                        <Save className="w-4 h-4 mr-2" /> Guardar
                     </Button>
                     <Button type="button" onClick={closeForm} variant={"outline"}>
                        Cancelar
                     </Button>
                  </div>
               </form>
            </Form>
         </div>
      </Modal>
   );
};
