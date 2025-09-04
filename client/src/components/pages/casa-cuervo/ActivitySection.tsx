import { Container } from "@/components/layout/Container";
import { Calendar, Clock } from "lucide-react";

export const ActivitySection = () => {
   const activities = [
      {
         id: 1,
         title: "Taller de Pintura al Óleo",
         date: "15 Oct 2024",
         time: "14:00 - 17:00",
         img: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=400&h=300&fit=crop",
         description:
            "Descubre las técnicas tradicionales de la pintura al óleo en un ambiente íntimo y creativo. Perfecto para principiantes y artistas experimentados.",
         spots: "8 cupos disponibles",
      },
      {
         id: 2,
         title: "Exposición: Voces Silenciosas",
         date: "22 Oct 2024",
         time: "19:00 - 22:00",
         img: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
         description:
            "Una muestra colectiva que explora la comunicación no verbal a través del arte contemporáneo. Artistas locales e internacionales.",
         spots: "Entrada libre",
      },
      {
         id: 3,
         title: "Círculo de Crítica Artística",
         date: "28 Oct 2024",
         time: "16:00 - 18:30",
         img: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop",
         description:
            "Un espacio de diálogo y reflexión sobre las tendencias actuales del arte. Conversatorio abierto con café y aperitivos.",
         spots: "12 cupos disponibles",
      },
      {
         id: 4,
         title: "Mercado de Arte Independiente",
         date: "5 Nov 2024",
         time: "10:00 - 18:00",
         img: "https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=400&h=300&fit=crop",
         description:
            "Encuentra piezas únicas de artistas emergentes. Desde ilustraciones hasta esculturas en un ambiente bohemio y acogedor.",
         spots: "Evento público",
      },
   ];

   return (
      <section id="actividades" className="bg-background py-20">
         <Container>
            <div className="text-center mb-16">
               <h2 className="text-4xl font-light text-foreground mb-4 tracking-wide">
                  Actividades
               </h2>
               <div className="w-16 h-px bg-border mx-auto" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
               {activities.map((activity) => (
                  <div key={activity.id} className="group">
                     <div className="bg-card border border-border hover:border-muted-foreground/20 transition-all duration-300 hover:shadow-lg h-full flex flex-col">
                        <div className="relative overflow-hidden">
                           <img
                              src={activity.img}
                              alt={activity.title}
                              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                           />
                           <div className="absolute top-4 right-4 bg-white/80 text-black px-3 py-1 text-xs font-medium">
                              {activity.spots}
                           </div>
                        </div>

                        <div className="p-6 space-y-4 flex-1 flex flex-col">
                           <h3 className="text-xl font-medium text-foreground">
                              {activity.title}
                           </h3>

                           <div className="flex items-center gap-6 text-muted-foreground text-sm">
                              <div className="flex items-center gap-2">
                                 <Calendar size={16} />
                                 <span>{activity.date}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                 <Clock size={16} />
                                 <span>{activity.time}</span>
                              </div>
                           </div>

                           <p className="text-muted-foreground leading-relaxed text-sm h-full">
                              {activity.description}
                           </p>

                           <button className="w-full bg-foreground hover:bg-foreground/90 text-background font-medium py-3 px-6 transition-colors duration-300 text-sm tracking-wide">
                              MÁS INFORMACIÓN
                           </button>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </Container>
      </section>
   );
};
