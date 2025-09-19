import { useState } from "react";
import { Edit, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/stores/useAuthStore";

export const PersonalSection = () => {
   const { isLoading, user, updateUserPhone } = useAuthStore();
   const [isEditing, setIsEditing] = useState(false);
   const [newPhone, setNewPhone] = useState("");

   const handleEdit = () => {
      setIsEditing(true);
      setNewPhone(user?.phone || "");
   };

   const handleCancel = () => {
      setIsEditing(false);
      setNewPhone("");
   };

   const handleSave = async () => {
      await updateUserPhone(newPhone);
      setIsEditing(false);
   };

   return (
      <div className="space-y-6">
         <div>
            <h2 className="text-2xl font-bold">Mi información</h2>
            <p className="text-muted-foreground mt-1">Gestiona tu información personal</p>
         </div>

         <div className="border bg-accent/40 p-6">
            <div className="">
               <Label className="text-base font-medium">Número celular:</Label>
               <p className="text-sm text-muted-foreground mb-3">
                  Este número se usa en el botón COMPRAR de tus obras
               </p>

               {!isEditing ? (
                  <div className="flex items-center justify-between">
                     <span className="font-mono text-lg">+57 {user?.phone || ""}</span>
                     <Button variant="outline" size="sm" onClick={handleEdit}>
                        <Edit className="w-4 h-4 mr-2" />
                        Editar
                     </Button>
                  </div>
               ) : (
                  <div className="space-y-4">
                     <div className="flex gap-2">
                        <span className="flex items-center px-3 border bg-muted">
                           +57
                        </span>
                        <Input
                           value={newPhone}
                           onChange={(e) =>
                              setNewPhone(e.target.value.replace(/\D/g, ""))
                           }
                           maxLength={10}
                        />
                     </div>

                     <div className="flex gap-2">
                        <Button
                           onClick={handleSave}
                           disabled={isLoading || !newPhone || newPhone === user?.phone}
                           size="sm"
                        >
                           <Save className="w-4 h-4 mr-2" />
                           {isLoading ? "Guardando..." : "Guardar"}
                        </Button>
                        <Button variant="outline" size="sm" onClick={handleCancel}>
                           <X className="w-4 h-4 mr-2" />
                           Cancelar
                        </Button>
                     </div>
                  </div>
               )}
            </div>
         </div>
      </div>
   );
};
