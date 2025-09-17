"use client";

import React, { useRef, useEffect } from "react";

const WebBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return; // Exit if canvas is null

    const ctx = canvas.getContext("2d");
    if (!ctx) return; // Exit if context is null

    let animationId: number;
    let particles: Particle[] = [];
    const NUM_PARTICLES = 100;
    const LINE_DISTANCE = 100;

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;

      constructor(width: number, height: number) {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = 0.5 + Math.random();
      }

      update(width: number, height: number) {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(100, 255, 200, 0.8)";
        ctx.fill();
      }
    }

    // Pass the canvas element as an argument to ensure it's not null.
    function init(c: HTMLCanvasElement) {
      c.width = window.innerWidth;
      c.height = window.innerHeight;
      particles = [];
      for (let i = 0; i < NUM_PARTICLES; i++) {
        particles.push(new Particle(c.width, c.height));
      }
    }

    // Pass canvas and ctx to the animate function.
    function animate(c: HTMLCanvasElement, context: CanvasRenderingContext2D) {
      animationId = requestAnimationFrame(() => animate(c, context));
      context.clearRect(0, 0, c.width, c.height);

      particles.forEach((p, i) => {
        p.update(c.width, c.height);
        p.draw(context);

        // Draw connecting lines
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < LINE_DISTANCE) {
            context.beginPath();
            context.moveTo(p.x, p.y);
            context.lineTo(p2.x, p2.y);
            const opacity = 1 - dist / LINE_DISTANCE;
            context.strokeStyle = `rgba(100, 255, 200, ${opacity})`;
            context.lineWidth = 0.5;
            context.stroke();
          }
        }
      });
    }

    // Initialize and start animation with the non-null canvas and ctx
    init(canvas);
    animate(canvas, ctx);

    // Handle resizing
    const handleResize = () => {
      init(canvas);
    };
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full"
      style={{ zIndex: -10 }}
    />
  );
};

export default WebBackground;