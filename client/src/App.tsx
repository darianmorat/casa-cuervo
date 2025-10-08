import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Default } from "./layouts/Default";
import { Video } from "./pages/Video";
import { CasaCuervo } from "./pages/CasaCuervo";
import { Portfolio } from "./pages/Portfolio";
import { Secret } from "./pages/Secret";
import { Dashboard } from "./pages/Dashboard";
import { useEffect, useLayoutEffect, type ReactNode } from "react";
import { useAuthStore } from "./stores/useAuthStore";
import { LoadingSpinner } from "./components/ui/LoadingSpinner";
import { Bounce, ToastContainer } from "react-toastify";
import { NotFound } from "./pages/NotFound";

function App() {
   const { isAuth, checkingAuth, checkAuth } = useAuthStore();

   useEffect(() => {
      checkAuth();
   }, [checkAuth]);

   if (checkingAuth) {
      return <LoadingSpinner />;
   }

   const Wrapper = ({ children }: { children: ReactNode }) => {
      const location = useLocation();

      useLayoutEffect(() => {
         window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      }, [location.pathname]);

      return children;
   };

   return (
      <>
         <Wrapper>
            <Routes>
               <Route element={<Default />}>
                  <Route path="/" element={<Portfolio />} />
                  <Route path="/:tab?" element={<Portfolio />} />
                  <Route path="/casa-cuervo" element={<CasaCuervo />} />
                  <Route path="/video" element={<Video />} />

                  <Route path="*" element={<NotFound />} />

                  <Route
                     path="/secret"
                     element={isAuth ? <Navigate to="/dashboard" /> : <Secret />}
                  />
                  <Route
                     path="/dashboard"
                     element={isAuth ? <Dashboard /> : <Navigate to="/secret" />}
                  />
                  <Route
                     path="/dashboard/:tab?"
                     element={isAuth ? <Dashboard /> : <Navigate to="/secret" />}
                  />
               </Route>
            </Routes>
         </Wrapper>

         <ToastContainer
            className="mb-[-15px] rounded-none"
            theme="colored"
            autoClose={4000}
            position="bottom-right"
            transition={Bounce}
            pauseOnHover={false}
         />
      </>
   );
}

export default App;
