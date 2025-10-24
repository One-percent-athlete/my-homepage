"use client";

import React, { useRef, useEffect, useState } from "react";

const WebBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let particles: Particle[] = [];
    
    // Performance-optimized settings based on device
    const isMobile = window.innerWidth < 768;
    const NUM_PARTICLES = isMobile ? 20 : 40;
    const LINE_DISTANCE = isMobile ? 120 : 180;

    // Modern color palette - cyber/tech theme
    const colors = {
      primary: [0, 255, 255],    // Cyan
      secondary: [138, 43, 226], // Purple
      accent: [0, 255, 127],     // Spring Green
      glow: [64, 224, 208]       // Turquoise
    };

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: number[];
      pulse: number;
      pulseSpeed: number;
      originalRadius: number;

      constructor(width: number, height: number) {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * (isMobile ? 0.4 : 0.8);
        this.vy = (Math.random() - 0.5) * (isMobile ? 0.4 : 0.8);
        this.originalRadius = isMobile ? 1.2 : 2 + Math.random() * 1.5;
        this.radius = this.originalRadius;
        
        // Assign different colors for variety
        const colorKeys = Object.keys(colors);
        const randomColor = colorKeys[Math.floor(Math.random() * colorKeys.length)] as keyof typeof colors;
        this.color = colors[randomColor];
        
        this.pulse = Math.random() * Math.PI * 2;
        this.pulseSpeed = 0.01 + Math.random() * 0.02; // Slower pulsing
      }

      update(width: number, height: number) {
        this.x += this.vx;
        this.y += this.vy;
        
        // Smooth bounce with easing
        if (this.x < 0 || this.x > width) {
          this.vx *= -0.98;
          this.x = Math.max(0, Math.min(width, this.x));
        }
        if (this.y < 0 || this.y > height) {
          this.vy *= -0.98;
          this.y = Math.max(0, Math.min(height, this.y));
        }
        
        // Gentle pulsing effect
        this.pulse += this.pulseSpeed;
        this.radius = this.originalRadius * (0.9 + Math.sin(this.pulse) * 0.1); // Much more subtle pulsing
      }

      draw(ctx: CanvasRenderingContext2D) {
        // Core particle with smooth gradient
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.radius * 3
        );
        gradient.addColorStop(0, `rgba(${this.color.join(',')}, 0.9)`);
        gradient.addColorStop(0.5, `rgba(${this.color.join(',')}, 0.4)`);
        gradient.addColorStop(1, `rgba(${this.color.join(',')}, 0)`);
        
        ctx.fillStyle = gradient;
        ctx.shadowColor = `rgb(${this.color.join(',')})`;
        ctx.shadowBlur = 20;
        ctx.fill();
      }
    }

    function init(c: HTMLCanvasElement) {
      const width = window.innerWidth;
      const height = window.innerHeight;
      c.width = width;
      c.height = height;
      setDimensions({ width, height });
      
      particles = [];
      for (let i = 0; i < NUM_PARTICLES; i++) {
        particles.push(new Particle(width, height));
      }
    }

    function drawGrid(context: CanvasRenderingContext2D, width: number, height: number) {
      const gridSize = 80; // Larger grid for smoother look
      const opacity = 0.02; // More subtle
      
      context.strokeStyle = `rgba(0, 255, 255, ${opacity})`;
      context.lineWidth = 0.3;
      context.shadowBlur = 0;

      // Vertical lines
      for (let x = 0; x <= width; x += gridSize) {
        context.beginPath();
        context.moveTo(x, 0);
        context.lineTo(x, height);
        context.stroke();
      }

      // Horizontal lines
      for (let y = 0; y <= height; y += gridSize) {
        context.beginPath();
        context.moveTo(0, y);
        context.lineTo(width, y);
        context.stroke();
      }
    }

    function drawConnections(context: CanvasRenderingContext2D, particles: Particle[], width: number, height: number) {
      const time = Date.now() * 0.001; // Smooth time for animations
      
      particles.forEach((p, i) => {
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < LINE_DISTANCE) {
            const opacity = 0.6 - (dist / LINE_DISTANCE) * 0.5; // More consistent opacity
            const lineWidth = 0.5 - (dist / LINE_DISTANCE) * 0.3;
            
            // Create smooth gradient for the line
            const gradient = context.createLinearGradient(p.x, p.y, p2.x, p2.y);
            gradient.addColorStop(0, `rgba(${p.color.join(',')}, ${opacity})`);
            gradient.addColorStop(0.5, `rgba(255, 255, 255, ${opacity * 0.7})`);
            gradient.addColorStop(1, `rgba(${p2.color.join(',')}, ${opacity})`);

            context.beginPath();
            context.moveTo(p.x, p.y);
            context.lineTo(p2.x, p2.y);
            context.strokeStyle = gradient;
            context.lineWidth = lineWidth;
            context.shadowColor = `rgba(${p.color.join(',')}, 0.3)`;
            context.shadowBlur = 5;
            context.stroke();

            // Smooth data stream effect (less frequent and smoother)
            if (dist < LINE_DISTANCE * 0.5 && Math.sin(time + i + j) > 0.8) {
              const progress = (Math.sin(time * 2) * 0.5 + 0.5) * dist;
              const streamX = p.x + (dx / dist) * progress;
              const streamY = p.y + (dy / dist) * progress;
              
              context.beginPath();
              context.arc(streamX, streamY, 0.8, 0, Math.PI * 2);
              
              const streamGradient = context.createRadialGradient(
                streamX, streamY, 0,
                streamX, streamY, 2
              );
              streamGradient.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
              streamGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
              
              context.fillStyle = streamGradient;
              context.shadowColor = "rgba(255, 255, 255, 0.8)";
              context.shadowBlur = 8;
              context.fill();
            }
          }
        }
      });
    }

    function animate(c: HTMLCanvasElement, context: CanvasRenderingContext2D) {
      animationId = requestAnimationFrame(() => animate(c, context));
      
      // Clear with very subtle fade for smooth trails
      context.fillStyle = 'rgba(10, 10, 20, 0.05)'; // More transparent for longer trails
      context.fillRect(0, 0, c.width, c.height);

      // Draw subtle grid (less frequent updates for performance)
      if (Math.random() > 0.7) { // Only redraw grid occasionally
        drawGrid(context, c.width, c.height);
      }

      // Update and draw particles
      particles.forEach((p) => {
        p.update(c.width, c.height);
        p.draw(context);
      });

      // Draw connections
      drawConnections(context, particles, c.width, c.height);
    }

    // Initialize and start animation
    init(canvas);
    animate(canvas, ctx);

    const handleResize = () => {
      cancelAnimationFrame(animationId);
      init(canvas);
      animate(canvas, ctx);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none"
      style={{ 
        zIndex: -10,
        background: 'radial-gradient(ellipse at center, #0a0a14 0%, #000000 100%)'
      }}
      width={dimensions.width}
      height={dimensions.height}
    />
  );
};

export default WebBackground;