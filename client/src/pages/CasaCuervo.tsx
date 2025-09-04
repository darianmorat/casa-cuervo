import { Container } from "@/components/layout/Container";
import { useState } from "react";
import { Circle, Calendar, Clock, Send, Phone, Mail, User } from "lucide-react";
import base3 from "../assets/base-3.jpg";

export const CasaCuervo = () => {
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

   const galleryImages = [
      {
         id: 1,
         src: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=600&fit=crop",
         className: "h-80",
      },
      {
         id: 2,
         src: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
         className: "h-60",
      },
      {
         id: 3,
         src: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=400&fit=crop",
         className: "h-72",
      },
      {
         id: 4,
         src: "https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=400&h=500&fit=crop",
         className: "h-96",
      },
      {
         id: 5,
         src: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=400&h=300&fit=crop",
         className: "h-64",
      },
      {
         id: 6,
         src: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=700&fit=crop&sig=2",
         className: "h-80",
      },
      {
         id: 7,
         src: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=400&fit=crop&sig=3",
         className: "h-72",
      },
      {
         id: 8,
         src: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop&sig=4",
         className: "h-64",
      },
   ];

   const [formData, setFormData] = useState({
      name: "",
      tel: "",
      email: "",
      message: "",
   });

   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      console.log("Form submitted:", formData);
      alert("¡Mensaje enviado! Te contactaremos pronto.");
      setFormData({ name: "", tel: "", email: "", message: "" });
   };

   return (
      <>
         <div className="relative flex-1 bg-[#cd7746] text-white dark:text-black">
            <Container className="relative h-screen">
               <nav>
                  <ul className="flex gap-10 justify-center">
                     <li>
                        <a
                           className="hover:underline hover:cursor-pointer"
                           href="#actividades"
                        >
                           Actividades
                        </a>
                     </li>
                     <li>
                        <a
                           className="hover:underline hover:cursor-pointer"
                           href="#galeria"
                        >
                           Galeria
                        </a>
                     </li>
                     <li>
                        <a
                           className="hover:underline hover:cursor-pointer"
                           href="#alquiler"
                        >
                           Alquiler
                        </a>
                     </li>
                  </ul>

                  <img
                     src={base3}
                     className="left-1/2 -translate-x-1/2 w-120 absolute bottom-0"
                  />
               </nav>
            </Container>

            <div className="flex flex-col items-center absolute left-0 md:left-13 top-25 md:top-30 font-medium text-6xl md:text-9xl w-full md:w-fit">
               <p className="">CASA</p>
               <p className="mt-[-50px] font-normal hidden md:block">---</p>
            </div>
            <div className="flex flex-col items-center absolute top-42 md:top-60 font-medium text-6xl md:text-9xl right-0 md:right-[-100px] rotate-0 md:rotate-90 w-full md:w-fit">
               <p className="">CUERVO</p>
               <p className="mt-[-50px] font-normal hidden md:block">---</p>
            </div>

            <p className="absolute bottom-0 m-4 flex flex-col gap-2 font-[cursive] text-sm md:text-normal">
               <Circle size={13} />
               With love for art...
            </p>
         </div>

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
                        <div className="bg-card border border-border hover:border-muted-foreground/20 transition-all duration-300 hover:shadow-lg">
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

                           <div className="p-6 space-y-4">
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

                              <p className="text-muted-foreground leading-relaxed text-sm">
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

         <section
            id="galeria"
            className="bg-muted/30 py-20 border-t border-foreground/10"
         >
            <Container>
               <div className="text-center mb-16">
                  <h2 className="text-4xl font-light text-foreground mb-4 tracking-wide">
                     Galería
                  </h2>
                  <div className="w-16 h-px bg-border mx-auto" />
               </div>

               <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6">
                  {galleryImages.map((image) => (
                     <div
                        key={image.id}
                        className="break-inside-avoid mb-6 group cursor-pointer"
                     >
                        <div className="relative overflow-hidden bg-card shadow-sm hover:shadow-md transition-all duration-300">
                           <img
                              src={image.src}
                              alt={`Galería ${image.id}`}
                              className={`w-full object-cover group-hover:scale-105 transition-transform duration-500 ${image.className}`}
                           />
                           <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-all duration-300" />
                        </div>
                     </div>
                  ))}
               </div>
            </Container>
         </section>

         <section
            id="alquiler"
            className="bg-background py-20 border-t border-foreground/10"
         >
            <Container>
               <div className="text-center mb-16">
                  <h2 className="text-4xl font-light text-foreground mb-4 tracking-wide">
                     Alquiler de Espacio
                  </h2>
                  <div className="w-16 h-px bg-border mx-auto" />
                  <p className="text-muted-foreground mt-6 max-w-2xl mx-auto">
                     Solicita información para eventos, talleres y exposiciones
                  </p>
               </div>

               <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12">
                  <div className="lg:col-span-3">
                     <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                           <div>
                              <label className="block text-sm font-medium text-foreground mb-2">
                                 Nombre
                              </label>
                              <div className="relative">
                                 <User
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                                    size={18}
                                 />
                                 <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) =>
                                       setFormData({ ...formData, name: e.target.value })
                                    }
                                    className="w-full pl-10 pr-4 py-3 border border-border focus:border-foreground focus:outline-none transition-colors duration-200 bg-background"
                                    required
                                 />
                              </div>
                           </div>

                           <div>
                              <label className="block text-sm font-medium text-foreground mb-2">
                                 Teléfono
                              </label>
                              <div className="relative">
                                 <Phone
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                                    size={18}
                                 />
                                 <input
                                    type="tel"
                                    value={formData.tel}
                                    onChange={(e) =>
                                       setFormData({ ...formData, tel: e.target.value })
                                    }
                                    className="w-full pl-10 pr-4 py-3 border border-border focus:border-foreground focus:outline-none transition-colors duration-200 bg-background"
                                    required
                                 />
                              </div>
                           </div>
                        </div>

                        <div>
                           <label className="block text-sm font-medium text-foreground mb-2">
                              Correo Electrónico
                           </label>
                           <div className="relative">
                              <Mail
                                 className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                                 size={18}
                              />
                              <input
                                 type="email"
                                 value={formData.email}
                                 onChange={(e) =>
                                    setFormData({ ...formData, email: e.target.value })
                                 }
                                 className="w-full pl-10 pr-4 py-3 border border-border focus:border-foreground focus:outline-none transition-colors duration-200 bg-background"
                                 required
                              />
                           </div>
                        </div>

                        <div>
                           <label className="block text-sm font-medium text-foreground mb-2">
                              Mensaje
                           </label>
                           <textarea
                              value={formData.message}
                              onChange={(e) =>
                                 setFormData({ ...formData, message: e.target.value })
                              }
                              rows={5}
                              className="w-full px-4 py-3 border border-border focus:border-foreground focus:outline-none transition-colors duration-200 resize-none bg-background"
                              placeholder="Cuéntanos sobre tu evento o consulta..."
                              required
                           />
                        </div>

                        <button
                           type="submit"
                           className="w-full bg-foreground hover:bg-foreground/90 text-background font-medium py-4 px-6 transition-colors duration-300 flex items-center justify-center gap-2"
                        >
                           <Send size={18} />
                           Enviar Consulta
                        </button>
                     </form>
                  </div>

                  <div className="lg:col-span-2 space-y-8">
                     <div className="bg-muted/50 p-6 border-l-2 border-foreground">
                        <h4 className="text-lg font-medium text-foreground mb-4">
                           Información del Espacio
                        </h4>
                        <div className="space-y-3 text-sm text-muted-foreground">
                           <p>• Capacidad: 50-80 personas</p>
                           <p>• Sistema de sonido incluido</p>
                           <p>• Iluminación profesional</p>
                           <p>• Catering disponible</p>
                           <p>• Estacionamiento cerca</p>
                        </div>
                     </div>

                     <div className="bg-muted/50 p-6 border-l-2 border-foreground">
                        <h4 className="text-lg font-medium text-foreground mb-4">
                           Contacto Directo
                        </h4>
                        <div className="space-y-2 text-sm text-muted-foreground">
                           <p>casa@casacuervo.com</p>
                           <p>+57 (1) 234-5678</p>
                           <p className="pt-2 text-xs text-muted-foreground/70">
                              Respuesta en 24-48 horas
                           </p>
                        </div>
                     </div>
                  </div>
               </div>
            </Container>
         </section>

         <footer className="border-t border-foreground/10 py-8 mt-auto relative z-10 bg-muted/20 backdrop-blur-sm">
            <div className="text-center">
               <p className="text-xs font-mono tracking-widest text-muted-foreground/60">
                  CON AMOR POR EL ARTE
               </p>
            </div>
         </footer>
      </>
   );
};
