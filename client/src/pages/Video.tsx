import { Container } from "@/components/layout/Container";

export const Video = () => {
   return (
      <div className="relative min-h-screen bg-background text-foreground overflow-hidden">
         <div className="absolute inset-0 opacity-10 hidden md:block">
            <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-red-500 to-orange-500 transform rotate-45 -translate-x-48 -translate-y-48" />
            <div className="absolute top-1/3 right-0 w-80 h-80 bg-gradient-to-br from-blue-500 to-purple-500 transform rotate-12 translate-x-40" />
            <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-gradient-to-br from-green-500 to-teal-500 transform -rotate-12 translate-y-32" />
         </div>

         <Container className="relative z-10 py-4 md:py-8">
            <div className="mb-8 md:mb-16">
               <div className="flex items-center justify-between border-b-2 md:border-b-4 border-foreground pb-2 md:pb-4">
                  <h1 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter uppercase leading-none">
                     Video
                  </h1>
                  <div className="text-right">
                     <div className="w-12 h-12 md:w-16 md:h-16 bg-foreground flex items-center justify-center">
                        <span className="text-background font-black text-lg md:text-2xl">
                           01
                        </span>
                     </div>
                  </div>
               </div>
            </div>

            <div className="block md:hidden mb-8">
               <div className="relative mb-6">
                  <div className="border-2 md:border-4 border-foreground bg-black">
                     <iframe
                        className="w-full aspect-video"
                        src="https://www.youtube.com/embed/tik0ror2jdo?si=S5t4AXdIpQ_ZfEUo"
                        title="Video"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                     />
                  </div>
               </div>

               <div className="bg-foreground text-background p-4 mb-6">
                  <h3 className="font-black uppercase text-sm tracking-wider mb-2">
                     Contenido
                  </h3>
                  <p className="text-xs uppercase tracking-widest">Video destacado</p>
               </div>
            </div>

            <div className="hidden md:grid grid-cols-12 gap-8 mb-16">
               <div className="col-span-12 lg:col-span-3">
                  <div className="sticky top-8">
                     <div className="bg-foreground text-background p-6 mb-6">
                        <h3 className="font-black uppercase text-sm tracking-wider mb-3">
                           Contenido
                        </h3>
                        <p className="text-xs uppercase tracking-widest">
                           Video destacado
                        </p>
                     </div>

                     <div className="space-y-4">
                        <div className="h-1 bg-red-500" />
                        <div className="h-1 bg-blue-500" />
                        <div className="h-1 bg-green-500" />
                     </div>
                  </div>
               </div>

               <div className="col-span-12 lg:col-span-9">
                  <div className="relative">
                     <div className="border-4 border-foreground bg-black">
                        <iframe
                           className="w-full aspect-video"
                           src="https://www.youtube.com/embed/tik0ror2jdo?si=S5t4AXdIpQ_ZfEUo"
                           title="Video"
                           allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                           allowFullScreen
                        />
                     </div>
                  </div>
               </div>
            </div>

            <div className="grid grid-cols-3 gap-px bg-foreground">
               <div className="bg-background p-4 md:p-8 text-center">
                  <div className="text-2xl md:text-4xl font-black mb-1 md:mb-2">2025</div>
                  <div className="text-xs uppercase tracking-widest">Año</div>
               </div>
               <div className="bg-background p-4 md:p-8 text-center">
                  <div className="text-2xl md:text-4xl font-black mb-1 md:mb-2">HD</div>
                  <div className="text-xs uppercase tracking-widest">Calidad</div>
               </div>
               <div className="bg-background p-4 md:p-8 text-center">
                  <div className="text-2xl md:text-4xl font-black mb-1 md:mb-2">WEB</div>
                  <div className="text-xs uppercase tracking-widest">Formato</div>
               </div>
            </div>
         </Container>

         <div className="border-t-2 md:border-t-4 border-zinc-100 mt-8 md:mt-16">
            <Container className="py-4 md:py-8">
               <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                  <p className="text-xs font-mono uppercase tracking-[0.3em] text-zinc-400">
                     Con amor por el video
                  </p>
                  <div className="flex space-x-2">
                     <div className="w-3 h-3 bg-red-500" />
                     <div className="w-3 h-3 bg-blue-500" />
                     <div className="w-3 h-3 bg-green-500" />
                  </div>
               </div>
            </Container>
         </div>
      </div>
   );
};
