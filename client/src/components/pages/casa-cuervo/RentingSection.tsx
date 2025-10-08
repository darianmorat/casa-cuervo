import { Container } from "@/components/layout/Container";
import { useAuthStore } from "@/stores/useAuthStore";
import {
   Mail,
   Phone,
   Send,
   User,
   Clock,
   Users,
   Calendar,
   Home,
   Truck,
   Palette,
   MessageCircle,
} from "lucide-react";
import { useState } from "react";

export const RentingSection = () => {
   const { getPhone } = useAuthStore();

   const [formData, setFormData] = useState({
      name: "",
      tel: "",
      email: "",
      eventType: "",
      date: "",
      numberOfPeople: "",
      requiredSpaces: "",
      extraDays: "",
      artworkTypes: "",
      message: "",
   });

   const eventTypes = [
      "Matrimonio",
      "Cumpleaños",
      "Talleres",
      "Evento privado",
      "Activación de marca",
      "Sesión de fotos",
      "Exposición",
      "Desfile de moda",
      "Otros",
   ];

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      const phoneNumber = await getPhone();
      const message = `¡Hola! Soy *${formData.name}*

Me gustaría solicitar información sobre un evento:

*DETALLES DEL EVENTO*
- Tipo: ${formData.eventType}
- Fecha: ${formData.date}
- Personas: ${formData.numberOfPeople}
- Espacios: ${formData.requiredSpaces}
- Días extra: ${formData.extraDays}
- Obras: ${formData.artworkTypes}

*INFORMACIÓN DE CONTACTO*
- Teléfono: ${formData.tel}
- Email: ${formData.email}

*MENSAJE ADICIONAL*
${formData.message || "Sin mensaje adicional"}

Quedo atento a su respuesta. ¡Gracias!`;

      const whatsappURL = `https://wa.me/57${phoneNumber}?text=${encodeURIComponent(message)}`;
      window.open(whatsappURL, "_blank");

      setFormData({
         name: "",
         tel: "",
         email: "",
         eventType: "",
         date: "",
         numberOfPeople: "",
         requiredSpaces: "",
         extraDays: "",
         artworkTypes: "",
         message: "",
      });
   };

   return (
      <section id="alquiler" className="bg-muted/30 py-20 border-t border-foreground/10">
         <Container>
            <div className="text-center mb-16">
               <h2 className="text-4xl font-thin tracking-wide mb-6">
                  Alquiler de Espacio
               </h2>
               <div className="w-24 h-px bg-gradient-to-r from-transparent via-foreground/40 to-transparent mx-auto" />
            </div>

            {/* Contact Info Cards - Top Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16">
               <div className="bg-card border border-border p-6 text-center">
                  <Phone className="w-8 h-8 mx-auto mb-3 " />
                  <h4 className="text-sm font-bold uppercase tracking-widest mb-2">
                     Teléfono
                  </h4>
                  <p className="font-thin">+57 (1) 234-5678</p>
               </div>

               <div className="bg-card border border-border p-6 text-center">
                  <Mail className="w-8 h-8 mx-auto mb-3 " />
                  <h4 className="text-sm font-bold uppercase tracking-widest mb-2">
                     Email
                  </h4>
                  <a href="mailto:casa@casacuervo.com" className="font-thin">
                     casa@casacuervo.com
                  </a>
               </div>

               <div className="bg-card border border-border p-6 text-center">
                  <Clock className="w-8 h-8 mx-auto mb-3 " />
                  <h4 className="text-sm font-bold uppercase tracking-widest mb-2">
                     Respuesta
                  </h4>
                  <p className="font-thin">24-48 horas</p>
               </div>
            </div>

            {/* Main Form - Full Width */}
            <div className="max-w-4xl mx-auto">
               <div className="bg-card border border-border p-8 md:p-12">
                  <h3 className="text-2xl font-light mb-8 text-center">
                     Solicitar Información
                  </h3>

                  <form onSubmit={handleSubmit} className="space-y-6">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                                 placeholder="Ej: Jhon Smith"
                                 onChange={(e) =>
                                    setFormData({ ...formData, name: e.target.value })
                                 }
                                 className="w-full pl-10 pr-4 py-3 border border-border focus:border-foreground focus:outline-none bg-background"
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
                                 placeholder="Ej: 111 111 1111"
                                 onChange={(e) =>
                                    setFormData({ ...formData, tel: e.target.value })
                                 }
                                 className="w-full pl-10 pr-4 py-3 border border-border focus:border-foreground focus:outline-none bg-background"
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
                              placeholder="Ej: jhon@gmail.com"
                              value={formData.email}
                              onChange={(e) =>
                                 setFormData({ ...formData, email: e.target.value })
                              }
                              className="w-full pl-10 pr-4 py-3 border border-border focus:border-foreground focus:outline-none bg-background"
                              required
                           />
                        </div>
                     </div>

                     <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                           Tipo de evento
                        </label>
                        <select
                           value={formData.eventType}
                           onChange={(e) =>
                              setFormData({ ...formData, eventType: e.target.value })
                           }
                           className="w-full px-4 py-3 border border-border focus:border-foreground focus:outline-none bg-background"
                           required
                        >
                           <option value="">Selecciona un tipo de evento</option>
                           {eventTypes.map((type) => (
                              <option key={type} value={type}>
                                 {type}
                              </option>
                           ))}
                        </select>
                     </div>

                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                           <label className="block text-sm font-medium text-foreground mb-2">
                              Fecha
                           </label>
                           <div className="relative">
                              <Calendar
                                 className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                                 size={18}
                              />
                              <input
                                 type="date"
                                 value={formData.date}
                                 onChange={(e) =>
                                    setFormData({ ...formData, date: e.target.value })
                                 }
                                 className="w-full pl-10 pr-4 py-3 border border-border focus:border-foreground focus:outline-none bg-background"
                                 required
                              />
                           </div>
                        </div>

                        <div>
                           <label className="block text-sm font-medium text-foreground mb-2">
                              Número de personas
                           </label>
                           <div className="relative">
                              <Users
                                 className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                                 size={18}
                              />
                              <input
                                 type="number"
                                 value={formData.numberOfPeople}
                                 placeholder="Cantidad"
                                 onChange={(e) =>
                                    setFormData({
                                       ...formData,
                                       numberOfPeople: e.target.value,
                                    })
                                 }
                                 className="w-full pl-10 pr-4 py-3 border border-border focus:border-foreground focus:outline-none bg-background"
                                 min="1"
                                 required
                              />
                           </div>
                        </div>
                     </div>

                     <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                           Qué espacios requiere
                        </label>
                        <div className="relative">
                           <Home
                              className="absolute left-3 top-3 text-muted-foreground"
                              size={18}
                           />
                           <textarea
                              value={formData.requiredSpaces}
                              onChange={(e) =>
                                 setFormData({
                                    ...formData,
                                    requiredSpaces: e.target.value,
                                 })
                              }
                              rows={3}
                              className="w-full pl-10 pr-4 py-2 border border-border focus:border-foreground focus:outline-none resize-none bg-background"
                              placeholder="Ej: Patio, zona de talleres, living..."
                              required
                           />
                        </div>
                     </div>

                     <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                           Días extras para montaje y desmontaje
                        </label>
                        <div className="relative">
                           <Truck
                              className="absolute left-3 top-3 text-muted-foreground"
                              size={18}
                           />
                           <textarea
                              value={formData.extraDays}
                              onChange={(e) =>
                                 setFormData({ ...formData, extraDays: e.target.value })
                              }
                              rows={2}
                              className="w-full pl-10 pr-4 py-2 border border-border focus:border-foreground focus:outline-none resize-none bg-background"
                              placeholder="Especifica cuántos días necesitas antes y después del evento..."
                           />
                        </div>
                     </div>

                     <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                           Tipos de obras
                        </label>
                        <div className="relative">
                           <Palette
                              className="absolute left-3 top-3 text-muted-foreground"
                              size={18}
                           />
                           <textarea
                              value={formData.artworkTypes}
                              onChange={(e) =>
                                 setFormData({
                                    ...formData,
                                    artworkTypes: e.target.value,
                                 })
                              }
                              rows={3}
                              className="w-full pl-10 pr-4 py-2 border border-border focus:border-foreground focus:outline-none resize-none bg-background"
                              placeholder="Describe el tipo de arte, obras o instalaciones que planeas mostrar..."
                           />
                        </div>
                     </div>

                     <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                           Mensaje adicional
                        </label>
                        <div className="relative">
                           <MessageCircle
                              className="absolute left-3 top-3 text-muted-foreground"
                              size={18}
                           />
                           <textarea
                              value={formData.message}
                              onChange={(e) =>
                                 setFormData({ ...formData, message: e.target.value })
                              }
                              rows={4}
                              className="w-full pl-10 px-4 py-2 border border-border focus:border-foreground focus:outline-none resize-none bg-background"
                              placeholder="Cuéntanos más detalles sobre tu evento o consulta..."
                           />
                        </div>
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
            </div>

            {/* Additional Info - Bottom Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-16">
               <div className="bg-card border border-border p-6 text-center">
                  <Users className="w-8 h-8 mx-auto mb-3 " />
                  <h4 className="text-sm font-bold uppercase tracking-widest mb-2">
                     Capacidad
                  </h4>
                  <p className="font-light">50-80 personas</p>
               </div>

               <div className="bg-card border border-border p-6">
                  <h4 className="text-sm font-bold uppercase tracking-widest mb-4 text-center">
                     Incluido
                  </h4>
                  <div className="space-y-2 text-sm font-thin">
                     <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400"></div>
                        <span>Sistema de sonido</span>
                     </div>
                     <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400"></div>
                        <span>Iluminación profesional</span>
                     </div>
                     <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400"></div>
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
                        <div className="w-2 h-2 bg-orange-400"></div>
                        <span>Catering disponible</span>
                     </div>
                     <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-orange-400"></div>
                        <span>Montaje personalizado</span>
                     </div>
                     <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-orange-400"></div>
                        <span>Soporte técnico</span>
                     </div>
                  </div>
               </div>
            </div>
         </Container>
      </section>
   );
};
