import { Container } from "@/components/layout/Container";

export const GallerySection = () => {
   const galleryImages = [
      {
         id: 1,
         src: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=600&fit=crop",
         className: "h-80",
      },
      {
         id: 2,
         src: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
         className: "h-60",
      },
      {
         id: 3,
         src: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=400&fit=crop",
         className: "h-72",
      },
      {
         id: 4,
         src: "https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=400&h=500&fit=crop",
         className: "h-96",
      },
      {
         id: 5,
         src: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=400&h=300&fit=crop",
         className: "h-64",
      },
      {
         id: 6,
         src: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=700&fit=crop&sig=2",
         className: "h-80",
      },
      {
         id: 7,
         src: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=400&fit=crop&sig=3",
         className: "h-72",
      },
      {
         id: 8,
         src: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop&sig=4",
         className: "h-64",
      },
   ];

   return (
      <section id="galeria" className="bg-muted/30 py-20 border-t border-foreground/10">
         <Container>
            <div className="text-center mb-16">
               <h2 className="text-4xl font-light text-foreground mb-4 tracking-wide">
                  Galería
               </h2>
               <div className="w-16 h-px bg-border mx-auto" />
            </div>

            <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6">
               {galleryImages.map((image) => (
                  <div
                     key={image.id}
                     className="break-inside-avoid mb-6 group cursor-pointer"
                  >
                     <div className="relative overflow-hidden bg-card shadow-sm hover:shadow-md transition-all duration-300">
                        <img
                           src={image.src}
                           alt={`Galería ${image.id}`}
                           className={`w-full object-cover group-hover:scale-105 transition-transform duration-500 ${image.className}`}
                        />
                        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-all duration-300" />
                     </div>
                  </div>
               ))}
            </div>
         </Container>
      </section>
   );
};
