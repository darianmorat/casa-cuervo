import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { useActivityStore } from "@/stores/useActivityStore";
import { Calendar, Clock } from "lucide-react";
import { useEffect } from "react";

export const ActivitySection = () => {
   const { activities, getActivities } = useActivityStore();

   useEffect(() => {
      getActivities();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   return (
      <section id="actividades" className="bg-background py-20">
         <Container>
            <div className="text-center mb-16">
               <h2 className="text-4xl font-light text-foreground mb-4 tracking-wide">
                  Actividades
               </h2>
               <div className="w-16 h-px bg-border mx-auto" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               {activities
                  .sort((a, b) => b.date.localeCompare(a.date))
                  .slice(0, 4)
                  .map((activity) => (
                     <div key={activity.id} className="group">
                        <div className="bg-card border border-border hover:border-muted-foreground/20 transition-all duration-300 hover:shadow-lg h-full flex flex-col">
                           <div className="relative overflow-hidden">
                              <img
                                 src={activity.image}
                                 alt={activity.title}
                                 className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                              <div className="absolute top-4 right-4 bg-white/85 text-black px-3 py-1 text-xs font-medium">
                                 {activity.spots} cupos
                              </div>
                           </div>

                           <div className="p-6 space-y-4 flex-1 flex flex-col">
                              <h3 className="text-xl font-medium text-foreground">
                                 {activity.title}
                              </h3>

                              <div className="flex items-center gap-6 text-muted-foreground text-sm">
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
                              <Button>MAS INFORMACIÓN</Button>
                           </div>
                        </div>
                     </div>
                  ))}
            </div>
         </Container>
      </section>
   );
};
