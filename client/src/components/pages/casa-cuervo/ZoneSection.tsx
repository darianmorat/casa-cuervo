import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";

const zones = [
   {
      id: 1,
      name: "Patio",
      description:
         "Un espacio al aire libre perfecto para relajarse y conectar con la naturaleza",
      image: "https://res.cloudinary.com/dxlhxvgzc/image/upload/v1757468920/473368825_18474682114024094_7048284083203549906_n._siycn6.jpg",
   },
   {
      id: 2,
      name: "Zona de talleres",
      description:
         "Espacio dedicado a la creatividad, el aprendizaje y las actividades manuales",
      image: "https://picsum.photos/600/400",
   },
   {
      id: 3,
      name: "Living",
      description: "Área de estar cómoda y acogedora para compartir momentos especiales",
      image: "https://res.cloudinary.com/dxlhxvgzc/image/upload/v1757468920/473368825_18474682114024094_7048284083203549906_n._siycn6.jpg",
   },
   {
      id: 4,
      name: "Comedor",
      description:
         "Mesa compartida donde se crean conversaciones y se comparten alimentos",
      image: "https://picsum.photos/600/400",
   },
   {
      id: 5,
      name: "Cocina",
      description: "El corazón del hogar donde se preparan comidas con amor y cuidado",
      image: "https://res.cloudinary.com/dxlhxvgzc/image/upload/v1757468920/473368825_18474682114024094_7048284083203549906_n._siycn6.jpg",
   },
];

export const ZoneSection = () => {
   const [currentIndex, setCurrentIndex] = useState(0);
   const [isAutoPlay, setIsAutoPlay] = useState(false); // Toggle this to enable/disable auto-slide

   // Auto-slide functionality
   useEffect(() => {
      if (!isAutoPlay) return;

      const interval = setInterval(() => {
         setCurrentIndex((prevIndex) =>
            prevIndex === zones.length - 1 ? 0 : prevIndex + 1,
         );
      }, 4000); // Change slide every 4 seconds

      return () => clearInterval(interval);
   }, [isAutoPlay]);

   const goToPrevious = () => {
      setCurrentIndex(currentIndex === 0 ? zones.length - 1 : currentIndex - 1);
   };

   const goToNext = () => {
      setCurrentIndex(currentIndex === zones.length - 1 ? 0 : currentIndex + 1);
   };

   const goToSlide = (index: number) => {
      setCurrentIndex(index);
   };

   return (
      <section className="py-16 px-4 border-t">
         <Container>
            <div className="text-center mb-10">
               <h2 className="text-4xl font-thin tracking-wide mb-6">Espacios</h2>
               <div className="w-24 h-px bg-gradient-to-r from-transparent via-foreground/40 to-transparent mx-auto" />
            </div>

            <div className="flex justify-center mb-8">
               <Button
                  onClick={() => setIsAutoPlay(!isAutoPlay)}
                  variant={`${isAutoPlay ? "default" : "outline"}`}
               >
                  Auto-slide: {isAutoPlay ? "ON" : "OFF"}
               </Button>
            </div>

            <div className="bg-muted/30">
               <div className="overflow-hidden">
                  <div
                     className="flex transition-transform duration-500 ease-in-out"
                     style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                  >
                     {zones.map((zone) => (
                        <div key={zone.id} className="w-full flex-shrink-0">
                           <div className="grid md:grid-cols-2 items-center border">
                              <div className="space-y-4 p-6">
                                 <h3 className="text-2xl font-light text-gray-800">
                                    {zone.name}
                                 </h3>
                                 <p className="text-gray-600 leading-relaxed">
                                    {zone.description}
                                 </p>
                                 <Button
                                    onClick={() => window.open(zone.image, "_blank")}
                                 >
                                    Explorar espacio
                                 </Button>
                              </div>
                              <div className="relative order-first md:order-last">
                                 <img
                                    src={zone.image}
                                    alt={zone.name}
                                    className="w-full h-64 md:h-85 object-cover"
                                 />
                                 <button
                                    onClick={goToPrevious}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white shadow-lg hover:bg-gray-50 transition-colors z-10"
                                    aria-label="Anterior"
                                 >
                                    <ChevronLeft className="w-6 h-6 text-gray-800" />
                                 </button>

                                 <button
                                    onClick={goToNext}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white shadow-lg hover:bg-gray-50 transition-colors z-10"
                                    aria-label="Siguiente"
                                 >
                                    <ChevronRight className="w-6 h-6 text-gray-800" />
                                 </button>
                              </div>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </div>

            <div className="flex justify-center space-x-2 mt-8">
               {zones.map((_, index) => (
                  <button
                     key={index}
                     onClick={() => goToSlide(index)}
                     className={`w-3 h-3 transition-colors ${
                        index === currentIndex
                           ? "bg-gray-800"
                           : "bg-gray-300 hover:bg-gray-400"
                     }`}
                     aria-label={`Ir al slide ${index + 1}`}
                  />
               ))}
            </div>

            <div className="text-center mt-4 text-sm text-gray-500">
               {currentIndex + 1} de {zones.length}
            </div>
         </Container>
      </section>
   );
};
