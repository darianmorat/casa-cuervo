import { Container } from "@/components/layout/Container";
import { useState } from "react";
import { Send, Phone, Mail, User } from "lucide-react";

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
   );
};
