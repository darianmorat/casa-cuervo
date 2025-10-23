import { Container } from "@/components/layout/Container";
import { AboutSection } from "@/components/pages/portfolio/AboutSection";
import { ArtworkSection } from "@/components/pages/portfolio/ArtworkSection";
import { ContactSection } from "@/components/pages/portfolio/ContactSection";
import { GallerySection } from "@/components/pages/portfolio/GallerySection";
import { ProductSection } from "@/components/pages/portfolio/ProductSection";
import { useParams } from "react-router-dom";

export const Portfolio = () => {
   const { tab } = useParams<{ tab?: string }>();

   const getCurrentTab = (): "" | "acerca" | "contacto" | "obras" | "productos" => {
      if (tab === "acerca") return "acerca";
      if (tab === "contacto") return "contacto";
      if (tab === "obras") return "obras";
      if (tab === "productos") return "productos";
      return "";
   };

   const activeTab = getCurrentTab();

   return (
      <div className="relative min-h-screen text-foreground flex flex-col bg-black/12">
         <Container className="py-16 flex-1 relative z-90">
            {activeTab === "" && <GallerySection />}
            {activeTab === "acerca" && <AboutSection />}
            {activeTab === "contacto" && <ContactSection />}
            {activeTab === "obras" && <ArtworkSection />}
            {activeTab === "productos" && <ProductSection />}
         </Container>

         <footer className="border-t border-foreground/10 py-8 mt-auto relative z-10 bg-muted/20 backdrop-blur-sm">
            <div className="text-center">
               <p className="text-xs font-mono tracking-widest text-muted-foreground/60">
                  CON AMOR POR EL ARTE
               </p>
            </div>
         </footer>
      </div>
   );
};
