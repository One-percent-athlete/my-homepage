"use client";

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

const LogoShowcase: FC = () => {
  const [flags, setFlags] = useState<string[]>([]);

  useEffect(() => {
    // Preload flag URLs
    const urls = countries.map(code => `https://flagcdn.com/w40/${code}.png`);
    setFlags(urls);
  }, []);

  return (
    <div className="overflow-hidden w-full py-4 relative">
      {/* Top row */}
      <div className="flex animate-marquee gap-4 sm:gap-6 md:gap-8">
        {Array(4) // repeat for smooth infinite scroll
          .fill(flags)
          .flat()
          .map((src, idx) => (
            <img key={idx} src={src} alt="flag" className="w-10 h-10 sm:w-12 sm:h-12 object-cover" />
          ))}
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-100%); }
        }

        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 300s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default LogoShowcase;
