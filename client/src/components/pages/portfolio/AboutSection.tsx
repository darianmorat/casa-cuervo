import { ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const AboutSection = () => {
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
            <h2 className="text-4xl font-thin tracking-wide mb-6">Acerca de</h2>
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-foreground/40 to-transparent mx-auto" />
         </div>

         <div className="max-w-4xl mx-auto space-y-12 text-center">
            <div className="relative">
               <p className="text-lg md:text-xl leading-relaxed text-muted-foreground italic">
                  "Artista visual nacida en Neiva, Huila (1993), cuyo trabajo explora la
                  mezcla de colores y texturas en contextos locales, especialmente la
                  fauna y flora colombiana."
               </p>
               <div className="absolute -top-4 -left-4 text-6xl text-blue-400/20 font-serif">
                  "
               </div>
            </div>

            <div className="space-y-6 text-left max-w-3xl mx-auto">
               <p className="text-muted-foreground leading-relaxed">
                  Con una carrera de aproximadamente una década, Valentina ha plasmado un
                  estilo distintivo que combina técnicas tradicionales como pintura,
                  muralismo, cerámica, mosaico y tejidos, con elementos contemporáneos
                  como materiales reciclados, arte digital y pintura experimental.
               </p>
               <p className="text-muted-foreground leading-relaxed">
                  Su obra está profundamente influenciada por el colorido arte mexicano,
                  los ecosistemas y animales sudamericanos, así como por la cultura
                  colombiana. La experimentación con materiales reciclados refleja su
                  compromiso con la sostenibilidad y coherencia en sus enfoques
                  artísticos.
               </p>
            </div>

            <p className="flex w-full justify-center gap-1 text-muted-foreground">
               Para más información
               <a
                  href="/portafolio-general.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-400 hover:underline hover:cursor-pointer flex items-center gap-1"
               >
                  click aqui <ExternalLink size={15} />
               </a>
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-10">
               <div className="space-y-4 p-6 bg-muted/30 backdrop-blur-sm">
                  <h3 className="text-sm tracking-widest text-foreground border-b border-foreground/20 pb-2">
                     FORMACIÓN
                  </h3>
                  <div className="space-y-2">
                     <p className="text-sm text-muted-foreground">
                        Bellas Artes, Universidad Nacional
                     </p>
                     <p className="text-sm text-muted-foreground">
                        Maestría en Artes Visuales, 2018
                     </p>
                  </div>
               </div>

               <div className="space-y-4 p-6 bg-muted/30 backdrop-blur-sm">
                  <h3 className="text-sm tracking-widest text-foreground border-b border-foreground/20 pb-2">
                     EXPOSICIONES
                  </h3>
                  <div className="space-y-2">
                     <p className="text-sm text-muted-foreground">
                        Galería Moderna, Bogotá 2024
                     </p>
                     <p className="text-sm text-muted-foreground">
                        Espacio Artístico, Medellín 2023
                     </p>
                  </div>
               </div>
            </div>

            <div className="pt-12 flex justify-center gap-8 flex-col sm:flex-row">
               <a
                  href="https://linktr.ee/La_cuervo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs tracking-widest hover:text-blue-400 transition-all duration-300 border border-foreground/20 hover:border-blue-400/60 px-6 py-3 hover:shadow-lg hover:shadow-blue-400/20"
               >
                  LINKTR
               </a>
               <a
                  href="https://www.instagram.com/la_cuervog"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs tracking-widest hover:text-blue-400 transition-all duration-300 border border-foreground/20 hover:border-blue-400/60 px-6 py-3 hover:shadow-lg hover:shadow-blue-400/20"
               >
                  INSTAGRAM
               </a>
               <a
                  href="https://www.youtube.com/@lauragomezestrada8896"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs tracking-widest hover:text-blue-400 transition-all duration-300 border border-foreground/20 hover:border-blue-400/60 px-6 py-3 hover:shadow-lg hover:shadow-blue-400/20"
               >
                  YOUTUBE
               </a>
            </div>
         </div>
      </div>
   );
};
