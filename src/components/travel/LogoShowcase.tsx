"use client";

import Image from "next/image";
import { FC, useEffect, useState } from "react";

// Full list of 63 country codes
const countries = [
  "ar","au","at","be","bo","br","bw","ca","cl","cn","co","cr",
  "hr","cz","ec","eg","sv","fr","de","gr","hu","is","in","it",
  "jp","jo","ke","li","lk","my","mm","mx","na","nl","nz","ni",
  "np","pa","py","pe","pt","sg","sk","si","za","es","ch","tw",
  "th","tr","gb","us","uy","vn","xk","ba","mk","me","mc","va",
  "kh","la","bd"
];

interface LogoShowcaseProps {
  direction?: "left" | "right";
}

const LogoShowcase: FC<LogoShowcaseProps> = ({ direction = "left" }) => {
  const [flags, setFlags] = useState<string[]>([]);

  useEffect(() => {
    const urls = countries.map((code) => `https://flagcdn.com/w40/${code}.png`);
    setFlags(urls);
  }, []);

  return (
    <div className="overflow-hidden w-full py-4 relative">
      <div
          className={`flex ${
            direction === "left" ? "animate-marquee" : "animate-marquee-reverse"
          } gap-2 sm:gap-4 md:gap-6`}
        >
        {Array(4)
          .fill(flags)
          .flat()
          .map((src, idx) => (
            <Image
              key={idx}
              src={src}
              alt="flag"
              height={30}
              width={30}
              className="object-cover w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10"
            />
          ))}
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-100%);
          }
        }

        @keyframes marquee-reverse {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 500s linear infinite;
        }

        .animate-marquee-reverse {
          display: flex;
          width: max-content;
          animation: marquee-reverse 500s linear infinite;
        }

        /* Mobile adjustments */
        @media (max-width: 640px) {
          .animate-marquee {
            animation-duration: 200s; /* faster */
          }
          .animate-marquee-reverse {
            animation-duration: 200s;
          }
        }
      `}</style>

    </div>
  );
};

export default LogoShowcase;
