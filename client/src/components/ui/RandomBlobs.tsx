import { useMemo } from "react";

function RandomBlobs() {
   const blobs = useMemo(() => {
      const colors = [
         "bg-blue-500/20 dark:bg-blue-500/20",
         "bg-purple-500/20 dark:bg-purple-500/20",
         "bg-emerald-500/20 dark:bg-emerald-500/20",
         "bg-cyan-500/20 dark:bg-cyan-500/20",
         "bg-pink-500/20 dark:bg-pink-500/20",
         "bg-yellow-500/20 dark:bg-yellow-500/20",
         "bg-indigo-500/20 dark:bg-indigo-500/20",
         "bg-teal-500/20 dark:bg-teal-500/20",
      ];

      const minDistance = 20; // minimum distance in percentage units
      const generated: {
         top: number;
         left: number;
         size: number;
         delay: string;
         color: string;
      }[] = [];

      for (let i = 0; i < 8; i++) {
         let top: number, left: number, size: number;
         let tries = 0;
         do {
            top = Math.random() * 80; // keep margin inside container
            left = Math.random() * 80;
            size = 6 + Math.random() * 10; // 6–16rem
            tries++;
            // keep trying until far enough OR too many tries
         } while (
            generated.some((b) => Math.hypot(b.top - top, b.left - left) < minDistance) &&
            tries < 50
         );

         generated.push({
            top,
            left,
            size,
            delay: `${i * 3}s`,
            color: colors[i % colors.length],
         });
      }

      return generated;
   }, []);

   return (
      <div className="absolute inset-0 pointer-events-none">
         {blobs.map((b, i) => (
            <div
               key={i}
               className={`absolute rounded-full blur-xl animate-pulse ${b.color}`}
               style={{
                  top: `${b.top}%`,
                  left: `${b.left}%`,
                  width: `${b.size}rem`,
                  height: `${b.size}rem`,
                  animationDelay: b.delay,
               }}
            />
         ))}
      </div>
   );
}

export default RandomBlobs;
