import { Button } from "@/components/ui/button";
import { useActivityStore } from "@/stores/useActivityStore";
import {
   X,
   Plus,
   Calendar,
   Clock,
   Ticket,
   PencilLine,
   Phone,
   Fullscreen,
   XCircleIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CreateActivity } from "./activity/CreateActivity";
import { DeleteActivity } from "./activity/DeleteActivity";
import { EditActivity } from "./activity/EditActivity";
import { activitySchema, type ActivityFormData } from "./activity/ActivitySchema";
import { Modal } from "@/components/ui/Modal";

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
   object?: ActivityFormData;
};

export const ActivitySection = () => {
   const [selectedImage, setSelectedImage] = useState<Image | null>(null);
   const [showForm, setShowForm] = useState<ShowFormState>({ open: false, for: "" });
   const { activities, getActivities, createActivity, editActivity } = useActivityStore();

   useEffect(() => {
      getActivities();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   const activityForm = useForm({
      resolver: zodResolver(activitySchema),
      defaultValues: {
         title: "",
         date: "",
         time: "",
         image: "",
         description: "",
         spots: "",
         phone: "",
      },
   });

   const handleCreateActivity = (
      data: z.infer<typeof activitySchema>,
      files: FileWithPreview[],
   ) => {
      createActivity(data, files);
      closeForm();
   };

   const handleEditActivity = (
      data: z.infer<typeof activitySchema>,
      files: FileWithPreview[],
   ) => {
      if (!showForm.id) return;

      editActivity(data, files, showForm.id);
      closeForm();
   };

   const openForm = (formType: string, id?: string, object?: ActivityFormData) => {
      setShowForm({ open: true, for: formType, id, object });
   };

   const closeForm = () => {
      setShowForm({ open: false, for: "" });
      activityForm.reset();
   };

   return (
      <div>
         <div className="flex gap-6 items-start justify-between mb-8 flex-col sm:flex-row sm:items-center">
            <div>
               <h2 className="text-2xl font-bold">Actividades</h2>
               <p className="text-muted-foreground mt-1">
                  Gestiona las actividades de Casa Cuervo
               </p>
            </div>
            <Button onClick={() => openForm("create")} className="m-auto sm:m-0">
               <Plus /> Nueva Actividad
            </Button>
         </div>

         {activities.length <= 0 ? (
            <div className="text-center w-full">Upps! Parece que no hay actividades</div>
         ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {activities
                  .sort((a, b) => b.date.localeCompare(a.date))
                  .map((activity) => (
                     <div
                        key={activity.id}
                        className="relative bg-card border border-border hover:border-muted-foreground/20 transition-all duration-300 hover:shadow-lg h-full flex flex-col group"
                     >
                        <X
                           className="absolute z-10 top-4 right-4 w-6 h-6 bg-red-500 text-white p-1 hover:bg-red-400 hover:cursor-pointer opacity-0 group-hover:opacity-100 transition"
                           onClick={() => openForm("delete", activity.id)}
                        />

                        <div className="relative overflow-hidden">
                           <img
                              src={activity.image}
                              alt={activity.title}
                              className="w-full h-50 object-cover group-hover:scale-105 transition-transform duration-500"
                           />
                           <Fullscreen
                              size={25}
                              onClick={() => setSelectedImage(activity)}
                              className="absolute z-10 bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity text-white cursor-pointer"
                           />
                           <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-200" />
                        </div>

                        <div className="p-6 space-y-4 flex-1 flex flex-col">
                           <h3 className="text-xl font-medium text-foreground">
                              {activity.title}
                           </h3>

                           <div className="flex flex-col gap-2 text-muted-foreground text-sm">
                              <div className="flex items-center gap-2">
                                 <Ticket size={16} />
                                 <span>{activity.spots} cupos</span>
                              </div>
                              <div className="flex items-center gap-2">
                                 <Calendar size={16} />
                                 <span>
                                    {new Date(activity.date).toLocaleDateString("es", {
                                       day: "2-digit",
                                       month: "short",
                                       year: "numeric",
                                       timeZone: "UTC",
                                    })}
                                 </span>
                              </div>
                              <div className="flex items-center gap-2">
                                 <Clock size={16} />
                                 <span>{activity.time}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                 <Phone size={16} />
                                 <span>{activity.phone}</span>
                              </div>
                           </div>

                           <div className="text-muted-foreground bg-accent p-2 border leading-relaxed text-sm flex-1">
                              {activity.description}
                           </div>

                           <Button
                              onClick={() => openForm("edit", activity.id, activity)}
                           >
                              <PencilLine /> Editar
                           </Button>
                        </div>
                     </div>
                  ))}
            </div>
         )}

         {showForm.for === "create" && (
            <CreateActivity
               activityForm={activityForm}
               handleCreateActivity={handleCreateActivity}
               closeForm={closeForm}
            />
         )}

         {showForm.for === "edit" && showForm.object && (
            <EditActivity
               activity={showForm.object}
               activityForm={activityForm}
               handleEditActivity={handleEditActivity}
               closeForm={closeForm}
            />
         )}

         {showForm.for === "delete" && showForm.id && (
            <DeleteActivity activityId={showForm.id} closeForm={closeForm} />
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
