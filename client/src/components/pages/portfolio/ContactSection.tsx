import { useNavigate } from "react-router-dom";

export const ContactSection = () => {
   const navigate = useNavigate();

   const handleTabChange = (
      newTab: "" | "acerca" | "contacto" | "obras" | "productos",
   ) => {
      if (newTab === "") {
         navigate("/");
      } else {
         navigate(`/${newTab}`);
      }
   };

   return (
      <div className="animate-in fade-in duration-400">
         <button
            onClick={() => handleTabChange("")}
            className="text-sm tracking-widest hover:text-blue-400 transition-all duration-300 mb-8 flex items-center gap-2 group"
         >
            <span className="group-hover:-translate-x-1 transition-transform duration-300">
               ←
            </span>
            VOLVER
         </button>

         <div className="text-center mb-16">
            <h2 className="text-4xl font-thin tracking-wide mb-6">Contacto</h2>
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-foreground/40 to-transparent mx-auto" />
         </div>

         <div className="max-w-2xl mx-auto space-y-12 text-center">
            <div className="p-8 bg-gradient-to-br from-muted/40 to-muted/20 backdrop-blur-sm border border-foreground/10">
               <p className="text-muted-foreground mb-8 text-lg">
                  Para consultas sobre obras, comisiones o colaboraciones
               </p>

               <a
                  href="mailto:v.cuervo1683@gmail.com"
                  className="inline-block text-xl tracking-wide hover:text-blue-400 transition-all duration-300 border-b-2 border-foreground/30 hover:border-blue-400/80 pb-2 px-4 py-2 hover:bg-blue-400/5"
               >
                  v.cuervo1683@gmail.com
               </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
               <div className="p-6 bg-muted/20 border border-foreground/10 hover:border-blue-400/30 transition-all duration-300">
                  <h4 className="text-xs tracking-widest mb-2 text-blue-400">
                     UBICACIÓN
                  </h4>
                  <p className="text-sm text-muted-foreground">Neiva, Colombia</p>
               </div>
               <div className="p-6 bg-muted/20 border border-foreground/10 hover:border-blue-400/30 transition-all duration-300">
                  <h4 className="text-xs tracking-widest mb-2 text-blue-400">HORARIO</h4>
                  <p className="text-sm text-muted-foreground">
                     Lunes - Viernes
                     <br />
                     9:00 - 18:00
                  </p>
               </div>
               <div className="p-6 bg-muted/20 border border-foreground/10 hover:border-blue-400/30 transition-all duration-300">
                  <h4 className="text-xs tracking-widest mb-2 text-blue-400">
                     RESPUESTA
                  </h4>
                  <p className="text-sm text-muted-foreground">24-48 horas</p>
               </div>
            </div>
         </div>
      </div>
   );
};
