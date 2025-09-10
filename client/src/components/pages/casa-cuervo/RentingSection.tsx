import { Container } from "@/components/layout/Container";

export const RentingSection = () => {
   return (
   <section
         id="alquiler"
         className="bg-background py-20 border-t border-foreground/10"
      >
         <Container>
            <div className="text-center mb-16">
               <h2 className="text-4xl font-thin tracking-wide mb-6">Alquiler de Espacio</h2>
               <div className="w-24 h-px bg-gradient-to-r from-transparent via-foreground/40 to-transparent mx-auto" />
            </div>

            <div className="max-w-xl mx-auto text-center space-y-16">
               <div>
                  <p className="text-muted-foreground mb-8 text-lg">
                     Para solicitar información sobre eventos, talleres y exposiciones
                  </p>
                  <a
                     href="mailto:casa@casacuervo.com"
                     className="inline-block text-2xl tracking-wide hover:text-blue-400 transition-all duration-300 border-b border-foreground/30 hover:border-blue-400/80 pb-1"
                  >
                     casa@casacuervo.com
                  </a>
               </div>

               <div className="space-y-12 pt-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                     <div>
                        <h4 className="text-xs tracking-widest mb-3 text-blue-400/70">CAPACIDAD</h4>
                        <p className="text-foreground">50-80 personas</p>
                     </div>
                     <div>
                        <h4 className="text-xs tracking-widest mb-3 text-blue-400/70">TELÉFONO</h4>
                        <p className="text-foreground">+57 (1) 234-5678</p>
                     </div>
                     <div>
                        <h4 className="text-xs tracking-widest mb-3 text-blue-400/70">RESPUESTA</h4>
                        <p className="text-foreground">24-48 horas</p>
                     </div>
                  </div>

                  <div className="w-16 h-px bg-foreground/20 mx-auto" />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-center">
                     <div>
                        <h4 className="text-xs tracking-widest mb-4 text-blue-400/70">INCLUIDO</h4>
                        <div className="space-y-2 text-sm text-muted-foreground">
                           <p>Sistema de sonido</p>
                           <p>Iluminación profesional</p>
                           <p>Estacionamiento cerca</p>
                        </div>
                     </div>
                     <div>
                        <h4 className="text-xs tracking-widest mb-4 text-blue-400/70">ADICIONAL</h4>
                        <div className="space-y-2 text-sm text-muted-foreground">
                           <p>Catering disponible</p>
                           <p>Montaje personalizado</p>
                           <p>Soporte técnico</p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </Container>
      </section>
   );
};
