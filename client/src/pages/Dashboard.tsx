import React from "react";
import {
   BriefcaseBusiness,
   Calendar,
   Edit3,
   LogOut,
   Package,
   UserPenIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/useAuthStore";
import { Container } from "@/components/layout/Container";
import { ActivitySection } from "@/components/pages/dashboard/ActivitySection";
import { ArtworkSection } from "@/components/pages/dashboard/ArtworkSection";
import { PersonalSection } from "@/components/pages/dashboard/PersonalSection";
import { PortfolioSection } from "@/components/pages/dashboard/PortfolioSection";
import { useNavigate, useParams } from "react-router-dom";
import { ProductSection } from "@/components/pages/dashboard/ProductSection";

export const Dashboard: React.FC = () => {
   const navigate = useNavigate();
   const { tab } = useParams<{ tab?: string }>();
   const { logout } = useAuthStore();

   const getCurrentTab = ():
      | "activities"
      | "artworks"
      | "portfolio"
      | "products"
      | "personal" => {
      if (tab === "artworks") return "artworks";
      if (tab === "portfolio") return "portfolio";
      if (tab === "products") return "products";
      if (tab === "personal") return "personal";
      return "activities";
   };

   const activeTab = getCurrentTab();

   const handleTabChange = (
      newTab: "activities" | "artworks" | "portfolio" | "products" | "personal",
   ) => {
      if (newTab === "activities") {
         navigate("/dashboard");
      } else {
         navigate(`/dashboard/${newTab}`);
      }
   };

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
                     onClick={() => handleTabChange("activities")}
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
                     onClick={() => handleTabChange("artworks")}
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
                     onClick={() => handleTabChange("portfolio")}
                     className={`py-4 px-1 border-b-2 font-medium text-sm ${
                        activeTab === "portfolio"
                           ? "border-primary text-primary"
                           : "border-transparent text-muted-foreground hover:text-foreground"
                     }`}
                  >
                     <div className="flex items-center space-x-2">
                        <BriefcaseBusiness className="w-5 h-5" />
                        <span>Portfolio</span>
                     </div>
                  </button>
                  <button
                     onClick={() => handleTabChange("products")}
                     className={`py-4 px-1 border-b-2 font-medium text-sm ${
                        activeTab === "products"
                           ? "border-primary text-primary"
                           : "border-transparent text-muted-foreground hover:text-foreground"
                     }`}
                  >
                     <div className="flex items-center space-x-2">
                        <Package className="w-5 h-5" />
                        <span>Products</span>
                     </div>
                  </button>
                  <button
                     onClick={() => handleTabChange("personal")}
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
            {activeTab === "portfolio" && <PortfolioSection />}
            {activeTab === "products" && <ProductSection />}
            {activeTab === "personal" && <PersonalSection />}
         </Container>
      </div>
   );
};
