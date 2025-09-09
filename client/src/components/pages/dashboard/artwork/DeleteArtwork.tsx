import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/Modal";
import { useArtworkStore } from "@/stores/useArtworkStore";
import { X } from "lucide-react";

type DeleteArtworkProps = {
   artworkId: string;
   closeForm: () => void;
};

export const DeleteArtwork = ({ artworkId, closeForm }: DeleteArtworkProps) => {
   const { deleteArtwork } = useArtworkStore();

   return (
      <Modal onClose={closeForm}>
         <div className="relative bg-background dark:bg-card p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold">Eliminar Obra</h3>
            <p>Esta seguro de que desea remover esta obra?</p>
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
                  onClick={() => {
                     deleteArtwork(artworkId);
                     closeForm();
                  }}
                  className="flex-1"
               >
                  Confirmar
               </Button>
               <Button variant={"outline"} onClick={closeForm} className="flex-1">
                  Cancelar
               </Button>
            </div>
         </div>
      </Modal>
   );
};
