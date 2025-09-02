import { Container } from "@/components/layout/Container";
import base3 from "../assets/base-3.jpg";
import { Circle } from "lucide-react";

export const CasaCuervo = () => {
   return (
      <>
         <div className="relative flex-1 bg-[#cd7746] text-white dark:text-black">
            <Container className="relative h-screen">
               <nav>
                  <ul className="flex gap-10 justify-center">
                     <li>
                        <a className="hover:underline hover:cursor-pointer" href="#">
                           Actividades
                        </a>
                     </li>
                     <li>
                        <a className="hover:underline hover:cursor-pointer" href="#">
                           Galeria
                        </a>
                     </li>
                     <li>
                        <a className="hover:underline hover:cursor-pointer" href="#">
                           Alquiler
                        </a>
                     </li>
                  </ul>

                  <img
                     src={base3}
                     className="left-1/2 -translate-x-1/2 w-120 absolute bottom-0"
                  />
               </nav>
            </Container>

            <div className="flex flex-col items-center absolute left-10 top-30 text-9xl font-medium">
               <p className="">CASA</p>
               <p className="mt-[-50px] font-normal">---</p>
            </div>
            <div className="flex flex-col items-center absolute top-60 right-[-100px] text-9xl rotate-90 font-medium">
               <p className="">CUERVO</p>
               <p className="mt-[-50px] font-normal">---</p>
            </div>

            <p className="absolute bottom-0 m-10 flex flex-col gap-2 font-[cursive]">
               <Circle size={13} />
               With love for art...
            </p>
         </div>
         <div>
            The rest of the page
         </div>
      </>
   );
};
