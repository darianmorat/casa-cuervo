import { Route, Routes } from "react-router-dom";
import { Default } from "./layouts/Default";
import { Home } from "./pages/Home";
import { Video } from "./pages/Video";
import { CasaCuervo } from "./pages/CasaCuervo";
import { Portfolio } from "./pages/Portfolio";
import { Secret } from "./pages/Secret";

function App() {
   return (
      <>
         <Routes>
            <Route element={<Default />}>
               <Route path="/" element={<Home />} />
               <Route path="/video" element={<Video />} />
               <Route path="/casa-cuervo" element={<CasaCuervo />} />
               <Route path="/portfolio" element={<Portfolio />} />
               <Route path="/secret" element={<Secret />} />
            </Route>
         </Routes>
      </>
   );
}

export default App;
