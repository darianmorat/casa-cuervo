import { Container } from "@/components/layout/Container";
import { useState } from "react";

export const Portfolio = () => {
   const [activeSection, setActiveSection] = useState("gallery");

   const phone = 3176980920;
   const message = "Hola, me gustaría saber mas acerca de tus obras!";
   const url = `https://wa.me/57${phone}?text=${encodeURIComponent(message)}`;

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
      <>
         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-16">
            {galleryImages.map((image, index) => (
               <div
                  key={image.id}
                  className={`${index % 2 === 0 ? "mt-8" : ""} group cursor-pointer`}
               >
                  <div className="relative overflow-hidden bg-muted/10 aspect-[3/4] shadow-lg hover:shadow-2xl transition-all duration-500">
                     <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                     />
                  </div>
               </div>
            ))}
         </div>

         <div className="flex justify-center gap-8 md:gap-16 mb-12 flex-wrap">
            <button
               onClick={() => setActiveSection("acerca")}
               className="text-sm tracking-[0.3em] hover:text-blue-400 transition-all duration-300 relative group px-2 py-1"
            >
               ACERCA DE
               <div className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-300" />
            </button>
            <button
               onClick={() => setActiveSection("contacto")}
               className="text-sm tracking-[0.3em] hover:text-blue-400 transition-all duration-300 relative group px-2 py-1"
            >
               CONTACTO
               <div className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-300" />
            </button>
            <button
               onClick={() => setActiveSection("obras")}
               className="text-sm tracking-[0.3em] hover:text-blue-400 transition-all duration-300 relative group px-2 py-1"
            >
               OBRAS
               <div className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-300" />
            </button>
         </div>

         <div className="text-center mb-20">
            <h1 className="text-5xl md:text-6xl font-thin tracking-widest mb-6 bg-gradient-to-r from-foreground via-blue-400 to-foreground bg-clip-text text-transparent">
               MARÍA CUERVO
            </h1>
            <div className="w-32 h-[2px] bg-gradient-to-r from-transparent via-blue-400/60 via-purple-400/60 to-transparent mx-auto mb-6" />
            <p className="text-sm tracking-[0.4em] text-muted-foreground/80 font-light">
               ARTISTA VISUAL
            </p>
            <div className="mt-8 animate-pulse">
               <div className="w-1 h-8 bg-gradient-to-b from-blue-400/60 to-transparent mx-auto" />
            </div>
         </div>
      </>
   );

   const renderAcerca = () => (
      <div className="animate-in fade-in duration-500">
         <button
            onClick={() => setActiveSection("gallery")}
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
                  "Artista visual dedicada a explorar la intersección entre lo onírico y
                  lo tangible, creando obras que invitan a la contemplación y el diálogo
                  interior."
               </p>
               <div className="absolute -top-4 -left-4 text-6xl text-blue-400/20 font-serif">
                  "
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12">
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

            <div className="pt-12 flex justify-center gap-8">
               <a
                  href="#"
                  className="text-xs tracking-widest hover:text-blue-400 transition-all duration-300 border border-foreground/20 hover:border-blue-400/60 px-6 py-3 hover:shadow-lg hover:shadow-blue-400/20"
               >
                  INSTAGRAM
               </a>
               <a
                  href="#"
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
            onClick={() => setActiveSection("gallery")}
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
                  href="mailto:maria@casacuervo.com"
                  className="inline-block text-xl tracking-wide hover:text-blue-400 transition-all duration-300 border-b-2 border-foreground/30 hover:border-blue-400/80 pb-2 px-4 py-2 hover:bg-blue-400/5"
               >
                  maria@casacuervo.com
               </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
               <div className="p-6 bg-muted/20 border border-foreground/10 hover:border-blue-400/30 transition-all duration-300">
                  <h4 className="text-xs tracking-widest mb-2 text-blue-400">
                     UBICACIÓN
                  </h4>
                  <p className="text-sm text-muted-foreground">Bogotá, Colombia</p>
               </div>
               <div className="p-6 bg-muted/20 border border-foreground/10 hover:border-blue-400/30 transition-all duration-300">
                  <h4 className="text-xs tracking-widest mb-2 text-blue-400">HORARIO</h4>
                  <p className="text-sm text-muted-foreground">
                     Lun - Vie
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

   const renderObras = () => (
      <div className="animate-in fade-in duration-500">
         <button
            onClick={() => setActiveSection("gallery")}
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

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {artworks.map((artwork) => (
               <div key={artwork.id} className="relative group cursor-pointer">
                  <div className="relative overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
                     <img
                        src={`https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&h=800&fit=crop&sig=${artwork.id}`}
                        alt={artwork.title}
                        className="w-full aspect-[3/4] object-cover transition-transform duration-500 group-hover:scale-110"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />

                     <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                        <h3 className="text-lg font-medium mb-1">{artwork.title}</h3>
                        <p className="text-sm opacity-90">
                           {artwork.size} • {artwork.year}
                        </p>
                     </div>
                  </div>

                  <span
                     className={`absolute top-0 right-0 m-2 px-2 py-1 text-xs font-medium ${
                        artwork.available
                           ? "text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30"
                           : "text-red-500 bg-red-100 dark:bg-red-900/30"
                     }`}
                  >
                     {artwork.available ? "DISPONIBLE" : "ENTREGADA"}
                  </span>

                  <div className="space-y-3 p-4 bg-gradient-to-b from-muted/90 to-muted/10 border-x border-b border-foreground/10">
                     {artwork.available ? (
                        <div className="flex justify-between items-center">
                           <span className="text-lg font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                              {artwork.price}
                           </span>
                           <button
                              onClick={() => window.open(url, "_blank")}
                              className="text-xs tracking-widest hover:text-blue-400 transition-all duration-300 border border-foreground/20 hover:border-blue-400/60 px-4 py-2 hover:shadow-md hover:shadow-blue-400/20 hover:bg-blue-400/5"
                           >
                              CONSULTAR
                           </button>
                        </div>
                     ) : (
                        <div className="flex justify-center items-center">
                           <button
                              disabled={true}
                              className="text-xs tracking-widest border border-foreground/20 px-4 py-2 cursor-not-allowed text-black/50"
                           >
                              NO DISPONIBLE
                           </button>
                        </div>
                     )}
                  </div>
               </div>
            ))}
         </div>
      </div>
   );

   return (
      <div className="relative min-h-screen bg-gradient-to-br from-background via-background to-muted/20 text-foreground flex flex-col">
         <Container className="py-16 flex-1 relative z-10">
            {activeSection === "gallery" && renderGallery()}
            {activeSection === "acerca" && renderAcerca()}
            {activeSection === "contacto" && renderContacto()}
            {activeSection === "obras" && renderObras()}
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
