import React, { useState } from "react";
import {
   Calendar,
   Edit3,
   LogOut,
   UserPenIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/useAuthStore";
import { Container } from "@/components/layout/Container";
import { ActivitySection } from "@/components/pages/dashboard/ActivitySection";
import { ArtworkSection } from "@/components/pages/dashboard/ArtworkSection";
import { PersonalSection } from "@/components/pages/dashboard/PersonalSection";

export const Dashboard: React.FC = () => {
   const [activeTab, setActiveTab] = useState<"activities" | "artworks" | "personal">(
      "activities",
   );
   const { logout } = useAuthStore();

   return (
      <div className="min-h-screen bg-background">
         <Container size="large" className="flex justify-between items-center">
            <div className="flex items-center justify-between h-16">
               <div>
                  <h1 className="text-xl font-semibold">Casa Cuervo Admin</h1>
                  <p className="text-sm text-muted-foreground">Panel de administración</p>
               </div>
            </div>
            <Button variant={"destructive"} onClick={() => logout()}>
               <LogOut /> Cerrar sesión
            </Button>
         </Container>

         <div className="bg-accent border-b border-t">
            <Container size="large" className="flex justify-between items-center py-0">
               <nav className="flex space-x-8">
                  <button
                     onClick={() => setActiveTab("activities")}
                     className={`py-4 px-1 border-b-2 font-medium text-sm ${
                        activeTab === "activities"
                           ? "border-primary text-primary"
                           : "border-transparent text-muted-foreground hover:text-foreground"
                     }`}
                  >
                     <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span>Activities</span>
                     </div>
                  </button>
                  <button
                     onClick={() => setActiveTab("artworks")}
                     className={`py-4 px-1 border-b-2 font-medium text-sm ${
                        activeTab === "artworks"
                           ? "border-primary text-primary"
                           : "border-transparent text-muted-foreground hover:text-foreground"
                     }`}
                  >
                     <div className="flex items-center space-x-2">
                        <Edit3 className="w-4 h-4" />
                        <span>Artworks</span>
                     </div>
                  </button>
                  <button
                     onClick={() => setActiveTab("personal")}
                     className={`py-4 px-1 border-b-2 font-medium text-sm ${
                        activeTab === "personal"
                           ? "border-primary text-primary"
                           : "border-transparent text-muted-foreground hover:text-foreground"
                     }`}
                  >
                     <div className="flex items-center space-x-2">
                        <UserPenIcon className="w-5 h-5" />
                        <span>Personal</span>
                     </div>
                  </button>
               </nav>
            </Container>
         </div>

         <Container size="large">
            {activeTab === "activities" && <ActivitySection />}
            {activeTab === "artworks" && <ArtworkSection />}
            {activeTab === "personal" && <PersonalSection />}
         </Container>
      </div>
   );
};
