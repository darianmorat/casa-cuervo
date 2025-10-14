import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/Modal";
import { useArtworkStore } from "@/stores/useArtworkStore";
import { LoaderCircle, X } from "lucide-react";

type DeleteArtworkProps = {
   artworkId: string;
   closeForm: () => void;
};

export const DeleteArtwork = ({ artworkId, closeForm }: DeleteArtworkProps) => {
   const { isLoading, deleteArtwork } = useArtworkStore();

   const handleDelete = async () => {
      await deleteArtwork(artworkId);
      closeForm();
   };

   return (
      <Modal onClose={closeForm}>
         <div className="relative bg-background dark:bg-card p-6 w-full max-w-md">
            <p>Esta seguro de que desea remover esta obra?</p>
            <Button
               type="button"
               variant={"ghost"}
               className="absolute right-2 top-2 text-muted-foreground"
               onClick={closeForm}
            >
               <X className="w-6 h-6" />
            </Button>
            <div className="grid grid-cols-2 gap-2 pt-4">
               <Button onClick={() => handleDelete()} disabled={isLoading}>
                  {isLoading && <LoaderCircle className="animate-spin" />}
                  {isLoading ? "Eliminando" : "Confirmar"}
               </Button>
               <Button variant={"outline"} onClick={closeForm} disabled={isLoading}>
                  Cancelar
               </Button>
            </div>
         </div>
      </Modal>
   );
};
