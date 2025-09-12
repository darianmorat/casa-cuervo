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
import { activitySchema } from "./ActivitySchema";

type ActivityFormData = {
   title: string;
   date: string;
   time: string;
   image: string;
   description: string;
   spots: string;
   phone: string;
};

interface CreateActivityProps {
   activity: ActivityFormData;
   activityForm: UseFormReturn<ActivityFormData>;
   handleEditActivity: (data: ActivityFormData) => void;
   closeForm: () => void;
}

export const EditActivity = ({
   activity,
   handleEditActivity,
   closeForm,
}: CreateActivityProps) => {
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

   return (
      <Modal onClose={closeForm} orientation="right">
         <div className="relative bg-background dark:bg-card p-6 w-full max-w-lg">
            <h3 className="text-lg font-semibold mb-4">Editar actividad</h3>

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
                  onSubmit={activityForm.handleSubmit(handleEditActivity)}
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
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>URL de Imagen</FormLabel>
                           <FormControl>
                              <Input {...field} placeholder="https://..." type="url" />
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
                              <Input {...field} placeholder="Numero representante del evento" />
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
                        onClick={closeForm}
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
