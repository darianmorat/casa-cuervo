import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/Modal";
import { useArtworkStore } from "@/stores/useArtworkStore";
import { useAuthStore } from "@/stores/useAuthStore";
import { usePortfolioStore } from "@/stores/usePortfolioStore";
import { ExternalLink, Fullscreen, XCircleIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

type Image = {
   id: string;
   image: string;
};

export const Portfolio = () => {
   const { artworks, getArtworks } = useArtworkStore();
   const { images, getImages } = usePortfolioStore();
   const { getPhone } = useAuthStore();

   const [selectedImage, setSelectedImage] = useState<Image | null>(null);
   const [categories, setCategories] = useState<string[]>([]);

   const handleBuyBtn = async (artTitle: string) => {
      const phone = await getPhone();

      const message = `Hola, me gustaría comprar la obra "${artTitle}"`;
      const url = `https://wa.me/57${phone}?text=${encodeURIComponent(message)}`;

      window.open(url, "_blank");
   };

   const { tab } = useParams<{ tab?: string }>();

   const getCurrentTab = (): "gallery" | "acerca" | "contacto" | "obras" => {
      if (tab === "acerca") return "acerca";
      if (tab === "contacto") return "contacto";
      if (tab === "obras") return "obras";
      return "gallery";
   };

   const activeTab = getCurrentTab();
   const navigate = useNavigate();

   const handleTabChange = (newTab: "gallery" | "acerca" | "contacto" | "obras") => {
      if (newTab === "gallery") {
         navigate("/");
      } else {
         navigate(`/${newTab}`);
      }
   };

   useEffect(() => {
      getArtworks();
      getImages();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   const renderGallery = () => (
      <>
         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-16">
            {[...images]
               .sort((a, b) => Number(a.id) - Number(b.id))
               .map((image, index) => (
                  <div
                     key={image.id}
                     className={`${index % 2 === 0 ? "mt-8" : ""} group cursor-pointer`}
                  >
                     <div className="relative overflow-hidden bg-muted/10 aspect-[3/4] shadow-lg hover:shadow-2xl transition-all duration-500 group">
                        <img
                           src={image.image}
                           className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <Fullscreen
                           size={25}
                           onClick={() => setSelectedImage(image)}
                           className="absolute z-10 bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity text-white cursor-pointer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-200" />
                     </div>
                  </div>
               ))}
         </div>

         <div className="flex justify-center gap-8 md:gap-16 mb-12 flex-wrap">
            <button
               onClick={() => handleTabChange("acerca")}
               className="text-sm tracking-[0.3em] hover:text-blue-400 transition-all duration-300 relative group px-2 py-1"
            >
               ACERCA DE
               <div className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-300" />
            </button>
            <button
               onClick={() => handleTabChange("contacto")}
               className="text-sm tracking-[0.3em] hover:text-blue-400 transition-all duration-300 relative group px-2 py-1"
            >
               CONTACTO
               <div className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-300" />
            </button>
            <button
               onClick={() => handleTabChange("obras")}
               className="text-sm tracking-[0.3em] hover:text-blue-400 transition-all duration-300 relative group px-2 py-1"
            >
               OBRAS
               <div className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-300" />
            </button>
         </div>

         <div className="text-center mb-10">
            <h1 className="text-5xl md:text-6xl font-thin tracking-widest mb-6 bg-gradient-to-r from-foreground via-blue-400 to-foreground bg-clip-text text-transparent">
               LA CUERVO
            </h1>
            <div className="w-32 h-[2px] bg-gradient-to-r from-transparent via-blue-400/60 via-purple-400/60 to-transparent mx-auto mb-6" />
            <p className="text-sm tracking-[0.4em] text-muted-foreground/80 font-light">
               ARTISTA VISUAL
            </p>
            <div className="mt-8 mb-8 animate-pulse">
               <div className="w-1 h-10 bg-gradient-to-b from-blue-400/60 to-transparent mx-auto" />
            </div>
            <div className="flex flex-col items-center">
               <div className="relative w-full">
                  <div>
                     <iframe
                        className="w-full aspect-video"
                        src="https://www.youtube.com/embed/tik0ror2jdo?si=S5t4AXdIpQ_ZfEUo"
                        title="Video"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                     />
                  </div>
               </div>
               <div className="mt-8 animate-pulse">
                  <div className="w-1 h-10 bg-gradient-to-t from-blue-400/60 to-transparent mx-auto" />
               </div>
               <Button
                  variant={"ghost"}
                  size={"lg"}
                  onClick={() => navigate("/casa-cuervo")}
                  className={`mt-8 w-fit font-normal tracking-widest border transition-all duration-300 hover:text-blue-400 hover:border-blue-400/60 hover:shadow-md hover:shadow-blue-400/20 hover:bg-blue-400/5`}
               >
                  - EXPLORAR CASA CUERVO -
               </Button>
            </div>
            <div className="mt-8 animate-pulse">
               <div className="w-1 h-10 bg-gradient-to-t from-blue-400/60 to-transparent mx-auto" />
            </div>
         </div>
      </>
   );

   const renderAcerca = () => (
      <div className="animate-in fade-in duration-500">
         <button
            onClick={() => handleTabChange("gallery")}
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

   const renderContacto = () => (
      <div className="animate-in fade-in duration-500">
         <button
            onClick={() => handleTabChange("gallery")}
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

   useEffect(() => {
      const categories = [...new Set(artworks.map((artwork) => artwork.category))];
      setCategories(categories);
   }, [artworks]);

   const renderObras = () => (
      <div className="animate-in fade-in duration-500">
         <button
            onClick={() => handleTabChange("gallery")}
            className="text-sm tracking-widest hover:text-blue-400 transition-all duration-300 mb-8 flex items-center gap-2 group"
         >
            <span className="group-hover:-translate-x-1 transition-transform duration-300">
               ←
            </span>
            VOLVER
         </button>

         <div className="text-center mb-16">
            <h2 className="text-4xl font-thin tracking-wide mb-6">Obras</h2>
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-foreground/40 to-transparent mx-auto" />
         </div>

         {artworks.length <= 0 ? (
            <div className="text-center text-muted-foreground">
               Upps! Parece que no hay obras
            </div>
         ) : (
            <div className="space-y-12">
               {categories.map((category) => {
                  const categoryArtworks = artworks.filter(
                     (artwork) => artwork.category === category,
                  );

                  return (
                     <div key={category} className="space-y-6">
                        <h3 className="text-xl font-semibold capitalize border-b pb-2">
                           {category}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                           {categoryArtworks.map((artwork) => {
                              return (
                                 <div
                                    key={artwork.id}
                                    className="relative group cursor-pointer flex flex-col h-full"
                                 >
                                    <div className="relative overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
                                       <img
                                          src={artwork.image}
                                          alt={artwork.title}
                                          className="w-full h-100 object-cover transition-transform duration-500 group-hover:scale-110"
                                       />
                                       <Fullscreen
                                          size={25}
                                          onClick={() => setSelectedImage(artwork)}
                                          className="absolute z-10 bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity text-white cursor-pointer"
                                       />

                                       <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />

                                       <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                                          <h3 className="text-lg font-medium mb-1">
                                             {artwork.title}
                                          </h3>
                                          <p className="text-sm opacity-90">
                                             {artwork.size} • {artwork.year}
                                          </p>
                                       </div>
                                    </div>

                                    {artwork.available ? (
                                       <div className="absolute top-2 right-2 bg-emerald-100 text-emerald-600 m-2 py-1 px-2 font-medium text-xs">
                                          DISPONIBLE
                                       </div>
                                    ) : (
                                       <div className="absolute top-2 right-2 bg-red-100 text-red-600 m-2 py-1 px-2 font-medium text-xs">
                                          VENDIDO
                                       </div>
                                    )}

                                    <div className="space-y-3 p-4 bg-gradient-to-b from-muted/90 to-muted/10 border-x border-b border-foreground/10 flex-1 flex flex-col">
                                       <div className="text-sm text-muted-foreground mb-4 flex-1">
                                          {artwork.technique}
                                       </div>
                                       <div className="flex justify-between items-center">
                                          <span className="text-lg font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                             $ {artwork.price}
                                          </span>
                                          <button
                                             onClick={() => handleBuyBtn(artwork.title)}
                                             disabled={artwork.available === false}
                                             className={`text-xs tracking-widest px-4 py-2 border transition-all duration-300 ${
                                                artwork.available
                                                   ? "hover:text-blue-400 hover:border-blue-400/60 hover:shadow-md hover:shadow-blue-400/20 hover:bg-blue-400/5"
                                                   : "opacity-50 cursor-not-allowed"
                                             }`}
                                          >
                                             COMPRAR
                                          </button>
                                       </div>
                                    </div>
                                 </div>
                              );
                           })}
                        </div>
                     </div>
                  );
               })}
            </div>
         )}
      </div>
   );

   return (
      <div className="relative min-h-screen bg-gradient-to-br from-background via-background to-muted/20 text-foreground flex flex-col">
         {/* PENDING: */}
         {/* make the renders its own file, to be more modular */}
         <Container className="py-16 flex-1 relative z-10">
            {activeTab === "gallery" && renderGallery()}
            {activeTab === "acerca" && renderAcerca()}
            {activeTab === "contacto" && renderContacto()}
            {activeTab === "obras" && renderObras()}
         </Container>

         <footer className="border-t border-foreground/10 py-8 mt-auto relative z-10 bg-muted/20 backdrop-blur-sm">
            <div className="text-center">
               <p className="text-xs font-mono tracking-widest text-muted-foreground/60">
                  CON AMOR POR EL ARTE
               </p>
            </div>
         </footer>

         {selectedImage && (
            <Modal onClose={() => setSelectedImage(null)} className="backdrop-blur-sm">
               <div className="relative max-w-7xl max-h-[90vh] m-4">
                  <div
                     className="absolute right-0 top-0 text-white/80 hover:text-white hover:cursor-pointer p-3"
                     onClick={() => setSelectedImage(null)}
                  >
                     <XCircleIcon size={30} />
                  </div>
                  <img
                     src={selectedImage.image}
                     className="max-w-full max-h-[85vh] object-contain"
                  />
               </div>
            </Modal>
         )}
      </div>
   );
};
