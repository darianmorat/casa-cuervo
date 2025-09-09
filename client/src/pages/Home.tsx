import { Container } from "@/components/layout/Container";
import RandomBlobs from "@/components/ui/RandomBlobs";
import { Briefcase, HomeIcon, VideoIcon } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import one from "../assets/1.png";
import two from "../assets/2.png";
import three from "../assets/3.png";

interface ButtonConfig {
   id: string;
   title: string;
   route: string;
   gradient: string;
   glowColor: string;
   borderColor: string;
   icon: React.ReactNode;
   image: string;
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
         icon: <VideoIcon className="w-8 h-8 text-foreground z-10 text-white" />,
         image: one,
      },
      {
         id: "casa-cuervo",
         title: "Casa Cuervo",
         route: "/casa-cuervo",
         gradient: "from-purple-500/20 via-pink-500/20 to-purple-600/20",
         glowColor: "shadow-purple-500/30",
         borderColor: "border-purple-500/30",
         icon: <HomeIcon className="w-8 h-8 text-foreground z-10 text-white" />,
         image: two,
      },
      {
         id: "portfolio",
         title: "Portafolio",
         route: "/portfolio",
         gradient: "from-emerald-500/20 via-teal-500/20 to-emerald-600/20",
         glowColor: "shadow-emerald-500/30",
         borderColor: "border-emerald-500/30",
         icon: <Briefcase className="w-8 h-8 text-foreground z-10 text-white" />,
         image: three,
      },
   ];

   const handleNavigation = (route: string): void => {
      navigate(route);
   };

   return (
      <div className="relative min-h-screen bg-accent dark:bg-card relative overflow-visible md:overflow-hidden flex items-center">
         <RandomBlobs />

         <div className="z-10 flex items-center justify-center p-4 flex-1">
            <Container size="large">
               <div className="grid grid-cols-1 md:grid-cols-3 gap-8 h-190 md:h-115">
                  {buttons.map((button) => (
                     <button
                        key={button.id}
                        className={`
                           group relative overflow-hidden
                           bg-black/60 dark:bg-accent
                           border transition-all duration-300 ease-out
                           hover:scale-105 p-8
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
                        {button.image && (
                           <div className="absolute inset-0">
                              <div
                                 className="w-full h-full bg-cover bg-center bg-no-repeat opacity-50 group-hover:opacity-40 transition-all duration-700 transform group-hover:scale-105"
                                 style={{
                                    backgroundImage: `url(${button.image})`,
                                    filter:
                                       button.image === one
                                          ? "blur(0.5px) brightness(0.9) contrast(1.4)"
                                          : "blur(0.5px) brightness(0.6) contrast(1.4)",
                                    maskImage:
                                       "radial-gradient(ellipse at center, black 30%, rgba(0,0,0,0.8) 60%, rgba(0,0,0,0.3) 100%)",
                                    WebkitMaskImage:
                                       "radial-gradient(ellipse at center, black 30%, rgba(0,0,0,0.8) 60%, rgba(0,0,0,0.3) 100%)",
                                 }}
                              />
                           </div>
                        )}

                        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/60" />

                        <div
                           className={`
                           absolute inset-0 bg-gradient-to-br ${button.gradient}
                           opacity-10 group-hover:opacity-70
                           transition-opacity duration-300 mix-blend-overlay
                         `}
                        />

                        <div className="relative z-10 h-full flex flex-col items-center justify-center">
                           <div
                              className={`
                                 w-16 h-16 mb-6
                                 bg-gradient-to-br from-black/25 to-black/5
                                 dark:bg-gradient-to-br dark:from-white/20 dark:to-white/5
                                 border border-white/30 group-hover:border-white/50
                                 flex items-center justify-center shadow-md
                                 group-hover:scale-110 transition-all duration-200
                                `}
                           >
                              {button.icon}
                           </div>

                           <h2 className="text-2xl font-bold text-white tracking-wide mb-4 text-shadow-lg">
                              {button.title}
                           </h2>

                           <div
                              className={`
                               w-0 h-[2px] bg-gradient-to-r from-transparent via-white to-transparent
                               group-hover:w-20 transition-all duration-300 delay-100
                               drop-shadow-lg
                             `}
                           />

                           <div
                              className={`
                               mt-6 text-xs font-mono text-white/90 tracking-widest
                               opacity-0 group-hover:opacity-100 
                               transform translate-y-2 group-hover:translate-y-0
                               transition-all duration-200 delay-200
                               drop-shadow-lg font-bold
                             `}
                           >
                              ENTRAR
                           </div>
                        </div>

                        <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 opacity-0 group-hover:opacity-100 group-hover:border-white/90 transition-all duration-300" />
                        <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 opacity-0 group-hover:opacity-100 group-hover:border-white/90 transition-all duration-300" />
                     </button>
                  ))}
               </div>

               <div className="text-center mt-14">
                  <p className="text-muted-foreground text-sm font-mono tracking-widest">
                     SELECCIONA TU DESTINO
                  </p>
                  <div className="w-24 h-[1.5px] bg-gradient-to-r from-transparent via-foreground/30 to-transparent mx-auto mt-4" />
               </div>
            </Container>
         </div>
      </div>
   );
};
