import { HeroSection } from "@/components/pages/casa-cuervo/HeroSection";
import { ActivitySection } from "@/components/pages/casa-cuervo/ActivitySection";
import { GallerySection } from "@/components/pages/casa-cuervo/GallerySection";
import { RentingSection } from "@/components/pages/casa-cuervo/RentingSection";

export const CasaCuervo = () => {
   return (
      <>
         <HeroSection />
         <ActivitySection />
         <GallerySection />
         <RentingSection />

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
