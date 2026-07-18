
'use client';

import React, { useRef, useEffect, useState } from 'react';
import { BRAND } from '@/lib/data';
import { cn } from '@/lib/utils';

class Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    color: string;

    constructor(w: number, h: number, color: string) {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 1.5 + 0.5;
        this.color = color;
    }

    update(canvas: HTMLCanvasElement, mouse: { x: number, y: number }) {
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.hypot(dx, dy);
        const maxRepelDist = 150;
        
        if (dist < maxRepelDist) {
            const force = (maxRepelDist - dist) / maxRepelDist;
            const angle = Math.atan2(dy, dx);
            this.vx += Math.cos(angle) * force * 0.2;
            this.vy += Math.sin(angle) * force * 0.2;
        }

        this.x += this.vx;
        this.y += this.vy;
        
        this.vx *= 0.99;
        this.vy *= 0.99;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

export function HeroAnimation({ className }: { className?: string }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const mouse = useRef({ x: -1000, y: -1000 });
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;

        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        const particles: Particle[] = [];
        const numParticles = 120;
        const colors = [BRAND.purple, BRAND.yellow, BRAND.purpleLight];

        const resizeCanvas = () => {
            if (!container) return;
            canvas.width = container.offsetWidth;
            canvas.height = container.offsetHeight;
            
            particles.length = 0;
            for (let i = 0; i < numParticles; i++) {
                particles.push(new Particle(canvas.width, canvas.height, colors[i % colors.length]));
            }
        };

        resizeCanvas();

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouse.current = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            };
        };

        const connectParticles = () => {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dist = Math.hypot(particles[i].x - particles[j].x, particles[i].y - particles[j].y);
                    if (dist < 150) {
                        const opacity = (1 - dist / 150) * 0.15;
                        ctx.strokeStyle = `rgba(76, 2, 153, ${opacity})`;
                        ctx.lineWidth = 0.5;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
        };

        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(p => {
                p.update(canvas, mouse.current);
                p.draw(ctx);
            });
            connectParticles();
            
            animationFrameId = window.requestAnimationFrame(render);
        };
        
        render();

        window.addEventListener('resize', resizeCanvas);
        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [mounted]);

    return (
        <div ref={containerRef} className={cn("absolute inset-0 z-0 overflow-hidden pointer-events-none", className)}>
            <canvas ref={canvasRef} className="w-full h-full opacity-60" />
        </div>
    );
}
