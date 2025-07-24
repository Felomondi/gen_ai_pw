"use client";

import React, { useRef, useEffect } from 'react';

const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Particle[] = [];
    const particleCount = 70;
    const connectDistance = 120;
    let mouse = { x: -1000, y: -1000 };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      width: number;
      height: number;

      constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2 + 1;
        this.speedX = (Math.random() * 2 - 1) * 0.5;
        this.speedY = (Math.random() * 2 - 1) * 0.5;
      }

      update() {
        if (this.x > this.width || this.x < 0) this.speedX *= -1;
        if (this.y > this.height || this.y < 0) this.speedY *= -1;
        this.x += this.speedX;
        this.y += this.speedY;
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const init = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(canvas.width, canvas.height));
      }
    };

    const connectParticles = () => {
        if (!ctx) return;
        for (let a = 0; a < particles.length; a++) {
            for (let b = a; b < particles.length; b++) {
                const dx = particles[a].x - particles[b].x;
                const dy = particles[a].y - particles[b].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < connectDistance) {
                    const opacity = 1 - distance / connectDistance;
                    ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(particles[a].x, particles[a].y);
                    ctx.lineTo(particles[b].x, particles[b].y);
                    ctx.stroke();
                }
            }
        }
    };
    
    const connectToMouse = () => {
        if (!ctx) return;
        for (let i = 0; i < particles.length; i++) {
            const dx = particles[i].x - mouse.x;
            const dy = particles[i].y - mouse.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < connectDistance + 50) {
                const opacity = 1 - distance / (connectDistance + 50);
                ctx.strokeStyle = `rgba(192, 132, 252, ${opacity})`; // Purple lines to mouse
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(mouse.x, mouse.y);
                ctx.stroke();
            }
        }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      connectParticles();
      connectToMouse();
      requestAnimationFrame(animate);
    };

    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    };

    const handleMouseOut = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener('resize', () => {
      resizeCanvas();
      init();
    });
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseOut);

    resizeCanvas();
    init();
    animate();

    return () => {
      window.removeEventListener('resize', () => {
        resizeCanvas();
        init();
      });
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed top-0 left-0 -z-10" />;
};

export default ParticleBackground;
