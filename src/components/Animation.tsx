"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import SplitType from "split-type";

export default function Animation() {
  useEffect(() => {
    const preloader = document.querySelector(".preloader") as HTMLElement;
    const overlay = document.querySelector(".overlay") as HTMLElement;
    const overlayFeatured = document.querySelector(".overlay-featured") as HTMLElement;
    const overlayNavLinks = document.querySelectorAll(".overlay nav ul li a");
    const overlayFooterItems = document.querySelectorAll(".overlay footer ul li a");

    /* Scramble Text Effect */
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const terminalTexts = document.querySelectorAll(".terminal-text");

    function scrambleText(element: HTMLElement, delay: number) {
      const text = element.dataset.text || "";
      let iteration = 0;

      setTimeout(() => {
        const interval = setInterval(() => {
          element.innerText = text
            .split("")
            .map((letter, index) => {
              if (index < iteration) return text[index];
              return letters[Math.floor(Math.random() * 26)];
            })
            .join("");

          if (iteration >= text.length) clearInterval(interval);
          iteration += 1 / 2.5;
        }, 30);
      }, delay);
    }

    terminalTexts.forEach((text, index) =>
      scrambleText(text as HTMLElement, index * 600)
    );

    /* Glitch Effect */
    function glitchEffect() {
      const allSpans = document.querySelectorAll(".terminal-text span");
      const randomSpans = Array.from(allSpans).sort(() => 0.5 - Math.random()).slice(0, 5);

      randomSpans.forEach((span) => {
        gsap.fromTo(
          span,
          { opacity: 1, skewX: 0 },
          {
            opacity: 0.3,
            skewX: 15,
            duration: 0.08,
            repeat: 3,
            yoyo: true,
            ease: "power2.inOut",
          }
        );
      });
    }

    setInterval(glitchEffect, 2000);

    /* Preloader Timeline */
    const tl = gsap.timeline();

    tl.to(".progress-bar", {
      width: "100%",
      duration: 3,
      ease: "power2.inOut",
    })
      .to(".line", {
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
      })
      .to(".preloader", {
        clipPath: "inset(0 0 100% 0)",
        duration: 1,
        ease: "power4.inOut",
        onComplete: () => {
          preloader.style.visibility = "hidden"; // smoother than display:none
          preloader.style.pointerEvents = "none";
          preloader.setAttribute("aria-hidden", "true");
        },
      })
      .from(".quote p span", {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.05,
        ease: "power4.out",
      });

    /* SplitText Nav Animation */
    overlayNavLinks.forEach((link) => {
      const splitLink = new SplitType(link as HTMLElement, { types: "words,chars" });

      link.addEventListener("mouseenter", () => {
        gsap.to(splitLink.chars, {
          y: -10,
          stagger: 0.02,
          ease: "power2.out",
        });
      });

      link.addEventListener("mouseleave", () => {
        gsap.to(splitLink.chars, {
          y: 0,
          stagger: 0.02,
          ease: "power2.in",
        });
      });
    });

    /* Overlay Menu Animation */
    const menuOpen = document.querySelector(".menu-open") as HTMLElement;
    const menuClose = document.querySelector(".close-btn") as HTMLElement;
    const tlOverlay = gsap.timeline({ paused: true });

    tlOverlay
      .to(overlay, {
        clipPath: "circle(150% at 50% 50%)",
        duration: 1,
        ease: "power4.inOut",
      })
      .from(overlayFeatured, {
        opacity: 0,
        y: 100,
        duration: 1,
        ease: "power4.out",
      })
      .from(overlayNavLinks, {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power4.out",
      })
      .from(overlayFooterItems, {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.05,
        ease: "power2.out",
      });

    menuOpen.addEventListener("click", () => {
      overlay.setAttribute("aria-hidden", "false");
      tlOverlay.play();
    });

    menuClose.addEventListener("click", () => {
      tlOverlay.reverse();
      overlay.setAttribute("aria-hidden", "true");
    });
  }, []);

  return (
    <>
      {/* Preloader */}
      <div
        className="preloader fixed inset-0 bg-black z-50 flex flex-col items-center justify-center overflow-hidden"
        aria-hidden="false"
      >
        {/* Noise Overlay */}
        <div className="noise absolute inset-0 opacity-10 pointer-events-none"></div>

        {/* Scanline Overlay */}
        <div className="scanline absolute inset-0 pointer-events-none"></div>

        {/* Terminal Text */}
        <div
          className="terminal-text text-green-400 text-lg mb-2 relative z-10"
          data-text="Initializing..."
        >
          Initializing...
        </div>
        <div
          className="terminal-text text-green-400 text-lg mb-2 relative z-10"
          data-text="Loading modules..."
        >
          Loading modules...
        </div>
        <div
          className="terminal-text text-green-400 text-lg mb-2 relative z-10"
          data-text="Fetching data..."
        >
          Fetching data...
        </div>

        {/* Progress Bar */}
        <div className="progress-bar h-1 bg-green-400 w-0 relative z-10"></div>
      </div>

      {/* Quote Section */}
      <section className="quote relative z-10 flex items-center justify-center min-h-screen bg-black text-white">
        <p className="text-4xl font-bold">
          {"Innovation distinguishes between a leader and a follower."
            .split("")
            .map((char, index) => (
              <span key={index} className="inline-block">
                {char}
              </span>
            ))}
        </p>
      </section>

      {/* Overlay Menu */}
      <div
        className="overlay fixed inset-0 bg-black z-40 clip-circle-0 flex flex-col items-center justify-center"
        aria-hidden="true"
      >
        <button className="close-btn absolute top-4 right-4 text-white text-2xl">
          ✕
        </button>
        <div className="overlay-featured text-white mb-8 hidden md:block">
          <h2 className="text-3xl font-bold">Featured Project</h2>
          <p className="text-lg">
            Check out this amazing work we did recently!
          </p>
        </div>
        <nav className="mb-8">
          <ul className="space-y-4 text-center">
            {["Home", "About", "Services", "Contact"].map((item, index) => (
              <li key={index}>
                <a href="#" className="text-2xl text-white">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <footer>
          <ul className="flex space-x-6 text-white">
            {["Twitter", "LinkedIn", "GitHub"].map((item, index) => (
              <li key={index}>
                <a href="#">{item}</a>
              </li>
            ))}
          </ul>
        </footer>
      </div>

      {/* Menu Open Button */}
      <button className="menu-open fixed top-4 left-4 z-50 text-white text-2xl">
        ☰
      </button>
    </>
  );
}
