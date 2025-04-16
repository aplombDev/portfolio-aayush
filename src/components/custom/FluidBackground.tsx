"use client";
import { useEffect, useRef } from "react";

export default function SimpleDotBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            drawDots();
        };

        const drawDots = () => {
            if (!canvas) return;

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#000';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Calculate number of dots based on screen size
            const dotCount = Math.floor((canvas.width * canvas.height) / 5000);
            const dotSize = 1.5;

            ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';

            for (let i = 0; i < dotCount; i++) {
                const x = Math.random() * canvas.width;
                const y = Math.random() * canvas.height;

                ctx.beginPath();
                ctx.arc(x, y, dotSize, 0, Math.PI * 2);
                ctx.fill();
            }
        };

        // Initial setup
        resizeCanvas();

        // Handle resize
        window.addEventListener('resize', resizeCanvas);

        return () => {
            window.removeEventListener('resize', resizeCanvas);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full h-full -z-50 bg-black pointer-events-none"
        />
    );
}