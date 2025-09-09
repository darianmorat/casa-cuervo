import { Button } from "@/components/ui/button";
import { useActivityStore } from "@/stores/useActivityStore";
import { X, Plus, MapPin, Calendar, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CreateActivity } from "./activity/CreateActivity";
import { DeleteActivity } from "./activity/DeleteActivity";

type ShowFormState = {
   open: boolean;
   for: string;
   value?: string;
};

const activitySchema = z.object({
   title: z.string().min(1, { message: "Título es requerido" }),
   date: z.string().min(1, { message: "Fecha es requerida" }),
   time: z.string().min(1, { message: "Hora es requerida" }),
   image: z.url({ message: "URL de imagen inválida" }),
   description: z
      .string()
      .min(10, { message: "Descripción debe tener al menos 10 caracteres" }),
   spots: z.string().min(1, { message: "Información de cupos es requerida" }),
});

export const ActivitySection = () => {
   const [showForm, setShowForm] = useState<ShowFormState>({ open: false, for: "" });
   const { activities, getActivities, createActivity } = useActivityStore();

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

   const openForm = (formType: string, value?: string) => {
      setShowForm({ open: true, for: formType, value: value });
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
               {activities.map((activity) => (
                  <div
                     key={activity.id}
                     className="relative bg-card border overflow-hidden group"
                  >
                     <X
                        className="absolute top-0 right-0 w-8 h-8 bg-red-400 text-white p-1 hover:bg-red-500 hover:cursor-pointer opacity-0 group-hover:opacity-100 transition"
                        onClick={() => openForm("delete", activity.id)}
                     />
                     <div className="aspect-video bg-muted">
                        <img
                           src={activity.image}
                           alt={activity.title}
                           className="w-full h-full object-cover"
                        />
                     </div>
                     <div className="p-6">
                        <h3 className="font-semibold mb-3">{activity.title}</h3>
                        <div className="space-y-2 mb-4">
                           <div className="flex items-center text-muted-foreground text-sm">
                              <Calendar className="w-4 h-4 mr-2" />
                              {activity.date}
                           </div>
                           <div className="flex items-center text-muted-foreground text-sm">
                              <Clock className="w-4 h-4 mr-2" />
                              {activity.time}
                           </div>
                           <div className="flex items-center text-muted-foreground text-sm">
                              <MapPin className="w-4 h-4 mr-2" />
                              {activity.spots}
                           </div>
                        </div>
                        <p className="text-muted-foreground text-sm">
                           {activity.description}
                        </p>
                        <Button variant={"outline"} className="mt-5">
                           Editar actividad
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

         {showForm.for === "delete" && showForm.value && (
            <DeleteActivity activityId={showForm.value} closeForm={closeForm} />
         )}
      </div>
   );
};
