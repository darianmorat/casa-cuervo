import { Container } from "@/components/layout/Container";
import { Mail, Phone, Send, User, Clock, Users, MapPin } from "lucide-react";
import { useState } from "react";

export const RentingSection = () => {
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
      <section
         id="alquiler"
         className="bg-muted/30 py-20 border-t border-foreground/10"
      >
         <Container>
            <div className="text-center mb-16">
               <h2 className="text-4xl font-thin tracking-wide mb-6">
                  Alquiler de Espacio
               </h2>
               <div className="w-24 h-px bg-gradient-to-r from-transparent via-foreground/40 to-transparent mx-auto" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
               <div className="bg-card border border-border p-8">
                  <h3 className="text-2xl font-light mb-6 text-center">
                     Solicitar Información
                  </h3>

                  <form onSubmit={handleSubmit} className="space-y-6">
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                           rows={4}
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

               <div className="space-y-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                     <div className="bg-card border border-border p-6 text-center">
                        <Users className="w-8 h-8 mx-auto mb-3 text-blue-400" />
                        <h4 className="text-sm font-bold uppercase tracking-widest mb-2">
                           Capacidad
                        </h4>
                        <p className="font-light">50-80 personas</p>
                     </div>

                     <div className="bg-card border border-border p-6 text-center">
                        <Clock className="w-8 h-8 mx-auto mb-3 text-blue-400" />
                        <h4 className="text-sm font-bold uppercase tracking-widest mb-2">
                           Respuesta
                        </h4>
                        <p className="font-light">24-48 horas</p>
                     </div>
                  </div>

                  <div className="bg-card border border-border p-6">
                     <h4 className="text-sm uppercase font-bold mb-4 text-center">
                        Información de Contacto
                     </h4>
                     <div className="space-y-3">
                        <div className="flex items-center gap-3">
                           <Phone className="w-5 h-5 text-blue-400" />
                           <span className="font-thin">+57 (1) 234-5678</span>
                        </div>
                        <div className="flex items-center gap-3">
                           <Mail className="w-5 h-5 text-blue-400" />
                           <a
                              href="mailto:casa@casacuervo.com"
                              className="hover:text-blue-400 font-thin upper"
                           >
                              casa@casacuervo.com
                           </a>
                        </div>
                        <div className="flex items-center gap-3">
                           <MapPin className="w-5 h-5 text-blue-400" />
                           <span className="font-thin">
                              Estacionamiento disponible cerca
                           </span>
                        </div>
                     </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                     <div className="bg-card border border-border p-6">
                        <h4 className="text-sm font-bold uppercase tracking-widest mb-4 text-center">
                           Incluido
                        </h4>
                        <div className="space-y-2 text-sm font-thin">
                           <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-green-400 "></div>
                              <span>Sistema de sonido</span>
                           </div>
                           <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-green-400 "></div>
                              <span>Iluminación profesional</span>
                           </div>
                           <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-green-400 "></div>
                              <span>Estacionamiento cerca</span>
                           </div>
                        </div>
                     </div>

                     <div className="bg-card border border-border p-6">
                        <h4 className="text-sm font-bold uppercase tracking-widest mb-4 text-center">
                           Adicional
                        </h4>
                        <div className="space-y-2 text-sm font-thin">
                           <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-orange-400 "></div>
                              <span>Catering disponible</span>
                           </div>
                           <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-orange-400 "></div>
                              <span>Montaje personalizado</span>
                           </div>
                           <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-orange-400 "></div>
                              <span>Soporte técnico</span>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </Container>
      </section>
   );
};
