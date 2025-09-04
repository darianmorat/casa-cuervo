import { Container } from "@/components/layout/Container";
import { Circle } from "lucide-react";
import base3 from "../../../assets/base-3.jpg";

export const HeroSection = () => {
   return (
      <div className="relative flex-1 bg-[#cd7746] text-white dark:text-black">
         <Container className="relative h-screen">
            <nav>
               <ul className="flex gap-10 justify-center">
                  <li>
                     <a
                        className="hover:underline hover:cursor-pointer"
                        href="#actividades"
                     >
                        Actividades
                     </a>
                  </li>
                  <li>
                     <a className="hover:underline hover:cursor-pointer" href="#galeria">
                        Galeria
                     </a>
                  </li>
                  <li>
                     <a className="hover:underline hover:cursor-pointer" href="#alquiler">
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

         <div className="flex flex-col items-center absolute left-0 md:left-13 top-25 md:top-30 font-medium text-6xl md:text-9xl w-full md:w-fit">
            <p className="">CASA</p>
            <p className="mt-[-50px] font-normal hidden md:block">---</p>
         </div>
         <div className="flex flex-col items-center absolute top-42 md:top-60 font-medium text-6xl md:text-9xl right-0 md:right-[-100px] rotate-0 md:rotate-90 w-full md:w-fit">
            <p className="">CUERVO</p>
            <p className="mt-[-50px] font-normal hidden md:block">---</p>
         </div>

         <p className="absolute bottom-0 m-4 flex flex-col gap-2 font-[cursive] text-sm md:text-normal">
            <Circle size={13} />
            With love for art...
         </p>
      </div>
   );
};
