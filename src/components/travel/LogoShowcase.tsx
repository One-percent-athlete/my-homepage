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
      <div className={`flex ${direction === "left" ? "animate-marquee" : "animate-marquee-reverse"} gap-4 sm:gap-6 md:gap-8`}>
        {Array(4)
          .fill(flags)
          .flat()
          .map((src, idx) => (
            <Image
              height={20}
              width={20}
              key={idx}
              src={src}
              alt="flag"
              className="object-cover"
            />
          ))}
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(10%);
          }
          100% {
            transform: translateX(-100%);
          }
        }

        @keyframes marquee-reverse {
          0% {
            transform: translateX(-100%);
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
      `}</style>
    </div>
  );
};

export default LogoShowcase;
