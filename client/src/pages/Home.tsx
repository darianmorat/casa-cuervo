import { Container } from "@/components/layout/Container";
import RandomBlobs from "@/components/ui/RandomBlobs";
import { Briefcase, HomeIcon, VideoIcon } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface ButtonConfig {
   id: string;
   title: string;
   route: string;
   gradient: string;
   glowColor: string;
   borderColor: string;
   icon: React.ReactNode;
}

export const Home: React.FC = () => {
   const [hoveredButton, setHoveredButton] = useState<string | null>(null);
   const navigate = useNavigate();

   const buttons: ButtonConfig[] = [
      {
         id: "video",
         title: "Video",
         route: "/video",
         gradient: "from-blue-500/20 via-cyan-500/20 to-blue-600/20",
         glowColor: "shadow-blue-500/30",
         borderColor: "border-blue-500/30",
         icon: <VideoIcon className="w-8 h-8 text-foreground opacity-60 z-10" />,
      },
      {
         id: "casa-cuervo",
         title: "Casa Cuervo",
         route: "/casa-cuervo",
         gradient: "from-purple-500/20 via-pink-500/20 to-purple-600/20",
         glowColor: "shadow-purple-500/30",
         borderColor: "border-purple-500/30",
         icon: <HomeIcon className="w-8 h-8 text-foreground opacity-60 z-10" />,
      },
      {
         id: "portfolio",
         title: "Portafolio",
         route: "/portfolio",
         gradient: "from-emerald-500/20 via-teal-500/20 to-emerald-600/20",
         glowColor: "shadow-emerald-500/30",
         borderColor: "border-emerald-500/30",
         icon: <Briefcase className="w-8 h-8 text-foreground opacity-60 z-10" />,
      },
   ];

   const handleNavigation = (route: string): void => {
      navigate(route);
   };

   return (
      <div className="relative min-h-screen bg-background relative overflow-visible md:overflow-hidden flex items-center">
         <RandomBlobs />

         <div className="z-10 flex items-center justify-center p-4 flex-1">
            <Container size="large">
               <div className="text-center mb-14">
                  <h1 className="text-5xl font-thin tracking-wider uppercase">
                     Bienvenido
                  </h1>
                  <div className="w-24 h-[1.5px] bg-gradient-to-r from-transparent via-foreground/30 to-transparent mx-auto mt-4" />
               </div>

               <div className="grid grid-cols-1 md:grid-cols-3 gap-8 h-190 md:h-96">
                  {buttons.map((button) => (
                     <button
                        key={button.id}
                        className={`
                           group relative overflow-hidden
                           bg-black/2 dark:bg-card/50 backdrop-blur-sm
                           border transition-all duration-500 ease-out
                           hover:scale-105 p-8
                           shadow-xl shadow-background/50
                           ${
                              hoveredButton === button.id
                                 ? `${button.borderColor} shadow-2xl ${button.glowColor}`
                                 : "border-border hover:border-border/80"
                           }
                         `}
                        onMouseEnter={() => setHoveredButton(button.id)}
                        onMouseLeave={() => setHoveredButton(null)}
                        onClick={() => handleNavigation(button.route)}
                     >
                        <div
                           className={`
                           absolute inset-0 bg-gradient-to-br ${button.gradient}
                           opacity-0 group-hover:opacity-100
                           transition-opacity duration-500
                         `}
                        />

                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                           <div
                              className={`absolute inset-0 bg-gradient-to-r ${button.gradient} blur-sm`}
                           />
                        </div>

                        <div className="relative z-10 h-full flex flex-col items-center justify-center">
                           <div
                              className={`
                                w-16 h-16 mb-6
                                bg-gradient-to-br ${button.gradient}
                                border border-border/50
                                flex items-center justify-center
                                group-hover:scale-110 transition-transform duration-300
                              `}
                           >
                              {button.icon}
                           </div>

                           <h2 className="text-2xl font-light text-foreground tracking-wide mb-4 group-hover:text-foreground transition-colors">
                              {button.title}
                           </h2>

                           <div
                              className={`
                                w-0 h-[1.5px] bg-gradient-to-r from-transparent via-foreground/50 to-transparent
                                group-hover:w-20 transition-all duration-500 delay-100
                              `}
                           />

                           <div
                              className={`
                                mt-6 text-xs font-mono text-muted-foreground tracking-widest
                                opacity-0 group-hover:opacity-100 
                                transform translate-y-2 group-hover:translate-y-0
                                transition-all duration-300 delay-200
                              `}
                           >
                              ENTRAR
                           </div>
                        </div>

                        <div className="absolute top-4 left-4 w-3 h-3 border-t-2 border-l-2 border-foreground/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="absolute bottom-4 right-4 w-3 h-3 border-b-2 border-r-2 border-foreground/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                     </button>
                  ))}
               </div>

               <div className="text-center mt-14">
                  <p className="text-muted-foreground text-sm font-mono tracking-widest">
                     SELECCIONA TU DESTINO
                  </p>
               </div>
            </Container>
         </div>
      </div>
   );
};
