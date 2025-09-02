import { Container } from "@/components/layout/Container";
import { useState } from "react";

export const Portfolio = () => {
   const [activeSection, setActiveSection] = useState("gallery");

   const galleryImages = [
      {
         id: 1,
         src: "https://img3.wallspic.com/previews/3/9/8/5/7/175893/175893-anime-anime_art-cloud-world-building-x750.jpg",
         alt: "Pintura 1",
      },
      {
         id: 2,
         src: "https://img3.wallspic.com/previews/3/9/8/5/7/175893/175893-anime-anime_art-cloud-world-building-x750.jpg",
         alt: "Pintura 2",
      },
      {
         id: 3,
         src: "https://img3.wallspic.com/previews/3/9/8/5/7/175893/175893-anime-anime_art-cloud-world-building-x750.jpg",
         alt: "Pintura 3",
      },
      {
         id: 4,
         src: "https://img3.wallspic.com/previews/3/9/8/5/7/175893/175893-anime-anime_art-cloud-world-building-x750.jpg",
         alt: "Pintura 4",
      },
   ];

   const artworks = [
      {
         id: 1,
         title: "Sueños de Medianoche",
         price: "$2,400",
         size: "60x80cm",
         year: "2024",
         available: true,
      },
      {
         id: 2,
         title: "Reflejos del Alma",
         price: "$1,800",
         size: "50x70cm",
         year: "2024",
         available: true,
      },
      {
         id: 3,
         title: "Caminos Perdidos",
         price: "$3,200",
         size: "80x100cm",
         year: "2023",
         available: false,
      },
      {
         id: 4,
         title: "Luz Interior",
         price: "$2,000",
         size: "55x75cm",
         year: "2024",
         available: true,
      },
      {
         id: 5,
         title: "Memorias Fragmentadas",
         price: "$2,800",
         size: "65x85cm",
         year: "2024",
         available: true,
      },
      {
         id: 6,
         title: "Horizontes Infinitos",
         price: "$4,000",
         size: "90x120cm",
         year: "2023",
         available: true,
      },
   ];

   const renderGallery = () => (
      <div className="space-y-16">
         {/* Image Gallery */}
         <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
            {galleryImages.map((image, index) => (
               <div
                  key={image.id}
                  className={`${index % 2 === 0 ? "mt-8" : ""} group cursor-pointer`}
               >
                  <div className="relative overflow-hidden bg-muted/10 aspect-[3/4]">
                     <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-blue-500/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                  </div>
               </div>
            ))}
         </div>

         {/* Navigation */}
         <div className="flex justify-center gap-16 mb-16">
            <button
               onClick={() => setActiveSection("acerca")}
               className="text-sm tracking-[0.3em] hover:text-blue-400 transition-all duration-300 relative group"
            >
               ACERCA DE
               <div className="absolute -bottom-1 left-0 w-0 h-px bg-blue-400 group-hover:w-full transition-all duration-300" />
            </button>
            <button
               onClick={() => setActiveSection("contacto")}
               className="text-sm tracking-[0.3em] hover:text-blue-400 transition-all duration-300 relative group"
            >
               CONTACTO
               <div className="absolute -bottom-1 left-0 w-0 h-px bg-blue-400 group-hover:w-full transition-all duration-300" />
            </button>
            <button
               onClick={() => setActiveSection("obras")}
               className="text-sm tracking-[0.3em] hover:text-blue-400 transition-all duration-300 relative group"
            >
               OBRAS
               <div className="absolute -bottom-1 left-0 w-0 h-px bg-blue-400 group-hover:w-full transition-all duration-300" />
            </button>
         </div>

         {/* Artist Name */}
         <div className="text-center mb-20">
            <h1 className="text-6xl md:text-8xl font-thin tracking-widest mb-6">
               MARÍA CUERVO
            </h1>
            <div className="w-24 h-[1.5px] bg-gradient-to-r from-transparent via-foreground/30 to-transparent mx-auto mb-4" />
            <p className="text-sm tracking-[0.4em] text-muted-foreground/80 font-light">
               ARTISTA VISUAL
            </p>
         </div>
      </div>
   );

   const renderAcerca = () => (
      <div className="max-w-2xl mx-auto space-y-12 pb-20">
         <button
            onClick={() => setActiveSection("gallery")}
            className="text-sm tracking-widest  hover:text-blue-400 transition-colors mb-8 flex items-center gap-2"
         >
            ← VOLVER
         </button>

         <div className="text-center mb-16">
            <h2 className="text-4xl font-thin tracking-wide mb-4">Acerca de</h2>
            <div className="w-16 h-px bg-foreground/30 mx-auto" />
         </div>

         <div className="space-y-8 text-center">
            <p className="text-lg leading-relaxed text-muted-foreground">
               Artista visual dedicada a explorar la intersección entre lo onírico y lo
               tangible, creando obras que invitan a la contemplación y el diálogo
               interior.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
               <div className="space-y-2">
                  <h3 className="text-sm tracking-widest text-foreground">FORMACIÓN</h3>
                  <p className="text-sm text-muted-foreground">
                     Bellas Artes, Universidad Nacional
                  </p>
                  <p className="text-sm text-muted-foreground">
                     Maestría en Artes Visuales, 2018
                  </p>
               </div>

               <div className="space-y-2">
                  <h3 className="text-sm tracking-widest text-foreground">
                     EXPOSICIONES
                  </h3>
                  <p className="text-sm text-muted-foreground">
                     Galería Moderna, Bogotá 2024
                  </p>
                  <p className="text-sm text-muted-foreground">
                     Espacio Artístico, Medellín 2023
                  </p>
               </div>
            </div>

            <div className="pt-8 flex justify-center gap-8">
               <a
                  href="#"
                  className="text-xs tracking-widest hover:text-muted-foreground transition-colors"
               >
                  INSTAGRAM
               </a>
               <a
                  href="#"
                  className="text-xs tracking-widest hover:text-muted-foreground transition-colors"
               >
                  BEHANCE
               </a>
            </div>
         </div>
      </div>
   );

   const renderContacto = () => (
      <div className="max-w-lg mx-auto space-y-12 pb-20">
         <button
            onClick={() => setActiveSection("gallery")}
            className="text-sm tracking-widest  hover:text-blue-400 transition-colors mb-8 flex items-center gap-2"
         >
            ← VOLVER
         </button>

         <div className="text-center mb-16">
            <h2 className="text-4xl font-thin tracking-wide mb-4">Contacto</h2>
            <div className="w-16 h-px bg-foreground/30 mx-auto" />
         </div>

         <div className="space-y-8 text-center">
            <p className="text-muted-foreground">
               Para consultas sobre obras, comisiones o colaboraciones
            </p>

            <a
               href="mailto:maria@casacuervo.com"
               className="inline-block text-lg tracking-wide hover:text-blue-400 transition-colors border-b border-foreground/20 hover:border-blue-400/60 pb-1"
            >
               maria@casacuervo.com
            </a>
         </div>
      </div>
   );

   const renderObras = () => (
      <div className="space-y-12 pb-20">
         <button
            onClick={() => setActiveSection("gallery")}
            className="text-sm tracking-widest  hover:text-blue-400 transition-colors mb-8 flex items-center gap-2"
         >
            ← VOLVER
         </button>

         <div className="text-center mb-16">
            <h2 className="text-4xl font-thin tracking-wide mb-4">Obras</h2>
            <div className="w-16 h-px bg-foreground/30 mx-auto" />
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {artworks.map((artwork) => (
               <div key={artwork.id} className="">
                  <div className="relative overflow-hidden">
                     <img
                        src={`https://img3.wallspic.com/previews/3/9/8/5/7/175893/175893-anime-anime_art-cloud-world-building-x750.jpg`}
                        alt={artwork.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                     />
                     <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-all duration-500" />
                  </div>

                  <div className="space-y-2 p-4 bg-muted">
                     <h3 className="text-sm tracking-wide">{artwork.title}</h3>
                     <div className="flex justify-between items-center text-xs text-muted-foreground">
                        <span>
                           {artwork.size} • {artwork.year}
                        </span>
                        <span
                           className={
                              artwork.available ? "text-green-600" : "text-red-500"
                           }
                        >
                           {artwork.available ? "DISPONIBLE" : "VENDIDA"}
                        </span>
                     </div>
                     <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{artwork.price}</span>
                        {artwork.available && (
                           <button className="text-xs tracking-widest hover:text-blue-400 transition-colors border-b border-foreground/20 hover:border-blue-400/60">
                              CONSULTAR
                           </button>
                        )}
                     </div>
                  </div>
               </div>
            ))}
         </div>
      </div>
   );

   return (
      <div className="relative min-h-screen bg-background text-foreground flex flex-col">
         <Container className="py-16 flex-1">
            {activeSection === "gallery" && renderGallery()}
            {activeSection === "acerca" && renderAcerca()}
            {activeSection === "contacto" && renderContacto()}
            {activeSection === "obras" && renderObras()}
         </Container>

         {/* Footer */}
         <footer className="border-t border-foreground/10 py-8 mt-auto">
            <div className="text-center">
               <p className="text-xs font-mono tracking-widest text-muted-foreground/60">
                  CON AMOR POR EL ARTE
               </p>
            </div>
         </footer>
      </div>
   );
};
