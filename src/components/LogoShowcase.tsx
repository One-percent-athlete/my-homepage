"use client";

import { FC } from "react";
import {
  SiPython,
  SiDjango,
  SiMongodb,
  SiReact,
  SiNodedotjs,
  SiTypescript,
  SiTailwindcss,
  SiDocker,
  SiGithub,
  SiPostgresql,
} from "react-icons/si";

const coloredLogos = [
  { Icon: SiDocker, color: "#2496ED" },
  { Icon: SiGithub, color: "#181717" },
  { Icon: SiPostgresql, color: "#336791" },
  { Icon: SiGithub, color: "#181717" },
  { Icon: SiDocker, color: "#2496ED" },
  { Icon: SiReact, color: "#61DAFB" },
  { Icon: SiNodedotjs, color: "#339933" },
  { Icon: SiTypescript, color: "#3178C6" },
  { Icon: SiTailwindcss, color: "#38BDF8" },
  { Icon: SiPython, color: "#3776AB" },
  { Icon: SiDjango, color: "#092E20" },
  { Icon: SiMongodb, color: "#47A248" },
  { Icon: SiReact, color: "#61DAFB" },
  { Icon: SiNodedotjs, color: "#339933" },
  { Icon: SiTypescript, color: "#3178C6" },
  { Icon: SiTailwindcss, color: "#38BDF8" },
  { Icon: SiDocker, color: "#2496ED" },
  { Icon: SiGithub, color: "#181717" },
  { Icon: SiPostgresql, color: "#336791" },
];



const LogoShowcase: FC = () => {
  return (
    <div className="overflow-hidden w-full bg-transparent pt-12 space-y-4">
      {/* Top row */}
      {/* Top row */}
        <div className="flex animate-marquee gap-8 sm:gap-12 md:gap-16">
        {Array(4) // repeat logos 4 times for smooth infinite scroll
            .fill(coloredLogos)
            .flat()
            .map(({ Icon, color }, idx) => (
            <div key={idx} className="flex-shrink-0 w-18 sm:w-14 h-18 sm:h-14 flex items-center justify-center text-4xl">
                <Icon style={{ color }} />
            </div>
        ))}
        </div>

        {/* Bottom row */}
        <div className="flex animate-marquee-reverse gap-8 sm:gap-12 md:gap-16">
        {Array(4)
            .fill(coloredLogos)
            .flat()
            .map(({ Icon, color }, idx) => (
            <div key={idx} className="flex-shrink-0 w-18 sm:w-14 h-18 sm:h-14 flex items-center justify-center text-4xl">
                <Icon style={{ color }} />
            </div>
        ))}
        </div>

      <style jsx>{`
        /* Top row animation */
        @keyframes marquee {
          0% { transform: translateX(0%); }
          20% { transform: translateX(-20%); }
          25% { transform: translateX(-20%); }
          45% { transform: translateX(-45%); }
          50% { transform: translateX(-45%); }
          70% { transform: translateX(-70%); }
          75% { transform: translateX(-70%); }
          98% { transform: translateX(-98%); }
          100% { transform: translateX(-100%); }
        }

        /* Bottom row animation in opposite direction, starting fully visible */
        @keyframes marquee-reverse {
          0% { transform: translateX(0%); }
          20% { transform: translateX(20%); }
          25% { transform: translateX(20%); }
          45% { transform: translateX(45%); }
          50% { transform: translateX(45%); }
          70% { transform: translateX(70%); }
          75% { transform: translateX(70%); }
          98% { transform: translateX(98%); }
          100% { transform: translateX(100%); }
        }

        @keyframes marquee-reverse {
            0% { transform: translateX(-50%); } /* start offset to align with top row */
            100% { transform: translateX(0%); }
            }

            .animate-marquee {
            display: flex;
            width: max-content;
            animation: marquee 105s linear infinite;
            }

            .animate-marquee-reverse {
            display: flex;
            width: max-content;
            animation: marquee-reverse 90s linear infinite;
            }
      `}</style>
    </div>
  );
};

export default LogoShowcase;
