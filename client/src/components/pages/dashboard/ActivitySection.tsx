import { Button } from "@/components/ui/button";
import { useActivityStore } from "@/stores/useActivityStore";
import { X, Plus, MapPin, Calendar, Clock, Ticket, PencilLine } from "lucide-react";
import { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CreateActivity } from "./activity/CreateActivity";
import { DeleteActivity } from "./activity/DeleteActivity";
import { EditActivity } from "./activity/EditActivity";
import { activitySchema } from "./activity/ActivitySchema";

type ActivityFormData = {
   title: string;
   date: string;
   time: string;
   image: string;
   description: string;
   spots: string;
};

type ShowFormState = {
   open: boolean;
   for: string;
   id?: string;
   object?: ActivityFormData;
};

export const ActivitySection = () => {
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
      },
   });

   const handleCreateActivity = (data: z.infer<typeof activitySchema>) => {
      createActivity(data);
      closeForm();
   };

   const handleEditActivity = (data: z.infer<typeof activitySchema>) => {
      if (!showForm.id) return;

      editActivity(data, showForm.id);
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
                        className="relative bg-card border overflow-hidden group"
                     >
                        <X
                           className="absolute z-10 top-0 right-0 w-8 h-8 bg-red-400 text-white p-1 hover:bg-red-500 hover:cursor-pointer opacity-0 group-hover:opacity-100 transition"
                           onClick={() => openForm("delete", activity.id)}
                        />
                        <div className="bg-card transition-all duration-300 hover:shadow-lg h-full flex flex-col">
                           <div className="relative overflow-hidden">
                              <img
                                 src={activity.image}
                                 alt={activity.title}
                                 className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                              />
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
                              </div>
                              <p className="text-muted-foreground bg-accent p-2 leading-relaxed text-sm h-full">
                                 {activity.description}
                              </p>
                              <Button
                                 onClick={() => openForm("edit", activity.id, activity)}
                              >
                                 <PencilLine /> Editar
                              </Button>
                           </div>
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
      </div>
   );
};
