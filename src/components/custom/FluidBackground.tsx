/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useRef } from "react";

export default function FluidBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (!canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        const particles: any = [];
        const particleCount = Math.floor(window.innerWidth * window.innerHeight / 8000);
        const colors = [
            'rgba(150, 150, 150, 0.4)',
            'rgba(100, 100, 100, 0.5)',
            'rgba(200, 200, 200, 0.3)'
        ];
        const darkModeColors = [
            'rgba(80, 80, 80, 0.5)',
            'rgba(120, 120, 120, 0.4)',
            'rgba(60, 60, 60, 0.6)'
        ];

        for (let i = 0; i < particleCount; i++) {
            const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
            const palette = isDarkMode ? darkModeColors : colors;

            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 2 + 1,
                speedX: Math.random() * 1.5 - 0.75,
                speedY: Math.random() * 1.5 - 0.75,
                color: palette[Math.floor(Math.random() * palette.length)]
            });
        }

        let animationId: number;
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];

                p.x += p.speedX;
                p.y += p.speedY;

                if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
                if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.fill();

                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const distance = Math.sqrt(Math.pow(p.x - p2.x, 2) + Math.pow(p.y - p2.y, 2));

                    if (distance < 120) {
                        ctx.beginPath();
                        const opacity = 1 - distance / 120;
                        ctx.strokeStyle = `rgba(150, 150, 150, ${opacity * 0.4})`;
                        if (p.color.includes('80, 80, 80')) {
                            ctx.strokeStyle = `rgba(100, 100, 100, ${opacity * 0.5})`;
                        }
                        ctx.lineWidth = 0.8;
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }
            }

            animationId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener('resize', resizeCanvas);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full h-full -z-50 opacity-50 dark:opacity-40 pointer-events-none transition-opacity duration-500"
        />
    );
}