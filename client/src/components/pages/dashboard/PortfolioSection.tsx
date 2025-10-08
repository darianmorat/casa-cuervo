import { Button } from "@/components/ui/button";
import { DropImage } from "@/components/ui/DropZone";
import { Modal } from "@/components/ui/Modal";
import { usePortfolioStore } from "@/stores/usePortfolioStore";
import { Fullscreen, X } from "lucide-react";
import { useEffect, useState } from "react";

interface FileWithPreview extends File {
   preview: string;
   id: string;
}

type ShowFormState = {
   open: boolean;
   for: string;
   id?: string;
};

export const PortfolioSection = () => {
   const [showForm, setShowForm] = useState<ShowFormState>({ open: false, for: "" });
   const [filesByPosition, setFilesByPosition] = useState<
      Record<number, FileWithPreview[]>
   >({});
   const { images, getImages, uploadImage, deleteImage, isLoading } = usePortfolioStore();
   // const images = [
   //    {
   //       id: "1",
   //       image: "https://res.cloudinary.com/dxlhxvgzc/image/upload/v1757468920/473368825_18474682114024094_7048284083203549906_n._siycn6.jpg",
   //    },
   //    {
   //       id: "2",
   //       image: "https://res.cloudinary.com/dxlhxvgzc/image/upload/v1757468919/458383962_18449743495024094_3853524860249220110_n._gc6dyt.jpg",
   //    },
   //    {
   //       id: "3",
   //       image: "https://res.cloudinary.com/dxlhxvgzc/image/upload/v1757468919/448275728_18434292652024094_4885150987941140735_n._ni3cin.jpg",
   //    },
   //    {
   //       id: "4",
   //       image: "https://res.cloudinary.com/dxlhxvgzc/image/upload/v1757468919/448272816_18434292718024094_2129371369259876850_n._cbyhop.jpg",
   //    },
   // ];

   useEffect(() => {
      getImages();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   const openForm = (formType: string, id?: string) => {
      setShowForm({ open: true, for: formType, id });
   };

   const closeForm = () => {
      setShowForm({ open: false, for: "" });
   };

   const handleUpload = async (position: number) => {
      const files = filesByPosition[position];
      if (!files || files.length === 0) return;

      await uploadImage(String(position), files[0]);

      // Clear files after upload
      setFilesByPosition((prev) => ({
         ...prev,
         [position]: [],
      }));
   };

   const handleDelete = async () => {
      if (!showForm.id) return;
      await deleteImage(showForm.id);
      closeForm();
   };

   return (
      <>
         <div className="flex gap-6 items-start justify-between mb-8 flex-col sm:flex-row sm:items-center">
            <div>
               <h2 className="text-2xl font-bold">Galería Principal</h2>
               <p className="text-muted-foreground mt-1">
                  Gestiona las 4 imágenes destacadas de la página de inicio
               </p>
            </div>
         </div>

         <div className="bg-muted/30 border border-border p-4 mb-8">
            <p className="text-sm text-muted-foreground">
               <strong>Nota:</strong> Estas imágenes se muestran en la galería principal
               de tu página de inicio. Selecciona obras representativas de tu trabajo
               artístico.
            </p>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((position) => {
               const image = images.find((img) => img.id === String(position));
               const currentFiles = filesByPosition[position] || [];
               const hasNewFile = currentFiles.length > 0;

               return (
                  <div
                     key={position}
                     className="relative bg-card border border-border hover:border-muted-foreground/20 transition-all duration-300 hover:shadow-lg group"
                  >
                     <div className="absolute top-2 left-2 bg-primary/90 text-primary-foreground m-2 py-1 px-2 font-medium text-xs z-10">
                        POSICIÓN {position}
                     </div>

                     <div className="relative overflow-hidden aspect-[3/4] bg-muted/10">
                        {hasNewFile ? (
                           <div className="relative w-full h-full">
                              <img
                                 src={currentFiles[0].preview}
                                 alt={`Nueva imagen para posición ${position}`}
                                 className="w-full h-full object-cover"
                              />
                           </div>
                        ) : image?.image ? (
                           <>
                              <img
                                 src={image.image}
                                 alt={`Portfolio position ${position}`}
                                 className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                              <Fullscreen
                                 size={25}
                                 onClick={() => window.open(image.image, "_blank")}
                                 className="absolute z-10 bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity text-white cursor-pointer drop-shadow-lg"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-200" />
                           </>
                        ) : (
                           <div className="w-full h-full bg-accent">
                              <DropImage
                                 files={currentFiles}
                                 setFiles={(files) =>
                                    setFilesByPosition((prev) => ({
                                       ...prev,
                                       [position]:
                                          typeof files === "function"
                                             ? files(prev[position] || [])
                                             : files,
                                    }))
                                 }
                                 maxFiles={1}
                                 customTailwind="h-full flex flex-col justify-center"
                              />
                           </div>
                        )}
                     </div>

                     <div>
                        {hasNewFile ? (
                           <div className="flex gap-2 p-4">
                              <Button
                                 onClick={() => handleUpload(position)}
                                 className="flex-1"
                                 disabled={isLoading}
                              >
                                 {isLoading ? "Subiendo..." : "Subir Imagen"}
                              </Button>
                              <Button
                                 onClick={() =>
                                    setFilesByPosition((prev) => ({
                                       ...prev,
                                       [position]: [],
                                    }))
                                 }
                                 variant="outline"
                                 disabled={isLoading}
                              >
                                 <X className="w-4 h-4" />
                              </Button>
                           </div>
                        ) : image?.image ? (
                           <div className="p-4">
                              <Button
                                 onClick={() => openForm("delete", image.id)}
                                 className="w-full"
                                 variant="outline"
                                 disabled={isLoading}
                              >
                                 <X className="w-4 h-4" />
                                 Eliminar Imagen
                              </Button>
                           </div>
                        ) : (
                           <div className="p-4">
                              <Button
                                 className="w-full"
                                 variant="outline"
                                 disabled={true}
                              >
                                 X X X
                              </Button>
                           </div>
                        )}
                     </div>
                  </div>
               );
            })}
         </div>

         <div className="mt-8 p-4 bg-muted/20 border border-border">
            <h3 className="font-semibold mb-2 text-sm">
               Consejos para mejores resultados:
            </h3>
            <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
               <li>Usa imágenes de alta resolución (mínimo 1200px de ancho)</li>
               <li>Mantén una orientación vertical consistente (proporción 3:4)</li>
               <li>Selecciona obras que representen diferentes estilos o técnicas</li>
               <li>Asegúrate de que las imágenes tengan buena iluminación y enfoque</li>
            </ul>
         </div>

         {showForm.for === "delete" && showForm.id && (
            <Modal onClose={closeForm}>
               <div className="relative bg-background dark:bg-card p-6 w-full max-w-md">
                  <p>¿Está seguro de que desea remover esta imagen?</p>
                  <Button
                     type="button"
                     variant={"ghost"}
                     className="absolute right-2 top-2 text-muted-foreground"
                     onClick={closeForm}
                  >
                     <X className="w-6 h-6" />
                  </Button>
                  <div className="flex gap-2 pt-4">
                     <Button
                        onClick={handleDelete}
                        className="flex-1"
                        disabled={isLoading}
                     >
                        {isLoading ? "Eliminando..." : "Aceptar"}
                     </Button>
                     <Button
                        variant={"outline"}
                        onClick={closeForm}
                        className="flex-1"
                        disabled={isLoading}
                     >
                        Cancelar
                     </Button>
                  </div>
               </div>
            </Modal>
         )}
      </>
   );
};
