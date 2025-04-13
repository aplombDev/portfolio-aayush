"use client";
import { useEffect, useRef, useState } from "react";

export default function FluidBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<any[]>([]);
    const animationIdRef = useRef<number | null>(null);
    const mousePosRef = useRef<{ x: number; y: number; active: boolean }>({ x: 0, y: 0, active: false });
    const [isVisible] = useState(true); // ✅ Now ESLint won't complain

    useEffect(() => {
        if (!canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Enhanced configuration
        const config = {
            particleDensity: 5000, // Lower number = more particles
            baseSpeed: 1.2,
            sizeVariation: 2,
            connectionDistance: 150,
            maxOpacity: 0.7,
            mouseRepelRadius: 150,
            mouseRepelStrength: 5,
            mouseAttractRadius: 100,
            mouseAttractStrength: 3,
            colorThemes: {
                light: [
                    'rgba(180, 180, 255, 0.7)',  // Soft blue
                    'rgba(255, 180, 180, 0.7)',  // Soft pink
                    'rgba(180, 255, 180, 0.7)'   // Soft green
                ],
                dark: [
                    'rgba(100, 100, 255, 0.8)',  // Deep blue
                    'rgba(255, 100, 100, 0.8)',  // Deep red
                    'rgba(100, 255, 100, 0.8)'   // Deep green
                ]
            },
            interactivity: {
                enableMouse: true,
                enableTouch: true,
                enableClickEffect: true
            }
        };

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        };

        const getColorTheme = () => {
            return window.matchMedia('(prefers-color-scheme: dark)').matches
                ? config.colorThemes.dark
                : config.colorThemes.light;
        };

        const initParticles = () => {
            particlesRef.current = [];
            const particleCount = Math.floor((window.innerWidth * window.innerHeight) / config.particleDensity);
            const palette = getColorTheme();

            for (let i = 0; i < particleCount; i++) {
                particlesRef.current.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: Math.random() * config.sizeVariation + 1,
                    speedX: (Math.random() - 0.5) * config.baseSpeed * 2,
                    speedY: (Math.random() - 0.5) * config.baseSpeed * 2,
                    color: palette[Math.floor(Math.random() * palette.length)],
                    originalColor: palette[Math.floor(Math.random() * palette.length)],
                    targetSize: Math.random() * config.sizeVariation + 1,
                    pulseSpeed: 0.01 + Math.random() * 0.02
                });
            }
        };

        const updateParticles = () => {
            const particles = particlesRef.current;
            const width = canvas.width;
            const height = canvas.height;
            const mouse = mousePosRef.current;

            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];

                // Apply natural movement
                p.speedX += (Math.random() - 0.5) * 0.05;
                p.speedY += (Math.random() - 0.5) * 0.05;

                // Mouse interaction
                if (mouse.active && config.interactivity.enableMouse) {
                    const dx = p.x - mouse.x;
                    const dy = p.y - mouse.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < config.mouseRepelRadius) {
                        // Repel particles near mouse
                        const force = config.mouseRepelStrength * (1 - distance / config.mouseRepelRadius);
                        const angle = Math.atan2(dy, dx);
                        p.speedX += Math.cos(angle) * force;
                        p.speedY += Math.sin(angle) * force;
                    } else if (distance < config.mouseAttractRadius) {
                        // Gently attract particles further away
                        const force = -config.mouseAttractStrength * (1 - distance / config.mouseAttractRadius) * 0.3;
                        const angle = Math.atan2(dy, dx);
                        p.speedX += Math.cos(angle) * force;
                        p.speedY += Math.sin(angle) * force;
                    }
                }

                // Normalize speed
                const speed = Math.sqrt(p.speedX * p.speedX + p.speedY * p.speedY);
                if (speed > config.baseSpeed * 2) {
                    p.speedX = (p.speedX / speed) * config.baseSpeed * 2;
                    p.speedY = (p.speedY / speed) * config.baseSpeed * 2;
                }

                // Update position
                p.x += p.speedX;
                p.y += p.speedY;

                // Bounce off edges with slight randomness
                if (p.x < 0 || p.x > width) {
                    p.speedX *= -1 * (0.9 + Math.random() * 0.2);
                    p.x = p.x < 0 ? 0 : width;
                }
                if (p.y < 0 || p.y > height) {
                    p.speedY *= -1 * (0.9 + Math.random() * 0.2);
                    p.y = p.y < 0 ? 0 : height;
                }

                // Pulsing effect
                p.size += (p.targetSize - p.size) * p.pulseSpeed;
                if (Math.abs(p.size - p.targetSize) < 0.1) {
                    p.targetSize = Math.random() * config.sizeVariation + 1;
                }
            }
        };

        const renderParticles = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const particles = particlesRef.current;
            const mouse = mousePosRef.current;

            // Draw connections
            for (let i = 0; i < particles.length; i++) {
                const p1 = particles[i];

                // Draw connection to mouse if close enough
                if (mouse.active) {
                    const dx = p1.x - mouse.x;
                    const dy = p1.y - mouse.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < config.connectionDistance * 1.5) {
                        const opacity = 1 - distance / (config.connectionDistance * 1.5);
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.3})`;
                        ctx.lineWidth = 0.5 + opacity * 1.5;
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(mouse.x, mouse.y);
                        ctx.stroke();
                    }
                }

                // Draw connections between particles
                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx = p1.x - p2.x;
                    const dy = p1.y - p2.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < config.connectionDistance) {
                        const opacity = 1 - distance / config.connectionDistance;
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(150, 150, 255, ${opacity * 0.4})`;
                        ctx.lineWidth = 0.5 + opacity * 1.5;
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }
            }

            // Draw particles
            for (const p of particles) {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);

                // Fixed gradient creation
                const gradient = ctx.createRadialGradient(
                    p.x, p.y, 0,
                    p.x, p.y, p.size * 3
                );

                // Extract the RGB components from the color
                const colorParts = p.color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?/);
                if (colorParts) {
                    const r = colorParts[1];
                    const g = colorParts[2];
                    const b = colorParts[3];
                    gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.8)`);
                    gradient.addColorStop(0.7, `rgba(${r}, ${g}, ${b}, 0.2)`);
                    gradient.addColorStop(1, 'rgba(0,0,0,0)');
                }

                ctx.fillStyle = gradient;
                ctx.fill();
            }

            // Draw mouse effect if active
            if (mouse.active) {
                ctx.beginPath();
                ctx.arc(mouse.x, mouse.y, 10, 0, Math.PI * 2);
                const mouseGradient = ctx.createRadialGradient(
                    mouse.x, mouse.y, 0,
                    mouse.x, mouse.y, config.mouseRepelRadius
                );
                mouseGradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
                mouseGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
                ctx.fillStyle = mouseGradient;
                ctx.fill();
            }
        };

        const animate = () => {
            updateParticles();
            renderParticles();
            animationIdRef.current = requestAnimationFrame(animate);
        };

        // Initialize
        resizeCanvas();
        animate();

        // Event listeners for interactivity
        const handleMouseMove = (e: MouseEvent) => {
            mousePosRef.current = {
                x: e.clientX,
                y: e.clientY,
                active: true
            };
        };

        const handleMouseLeave = () => {
            mousePosRef.current.active = false;
        };

        const handleTouchMove = (e: TouchEvent) => {
            if (e.touches.length > 0) {
                mousePosRef.current = {
                    x: e.touches[0].clientX,
                    y: e.touches[0].clientY,
                    active: true
                };
            }
        };

        const handleTouchEnd = () => {
            mousePosRef.current.active = false;
        };

        const handleClick = (e: MouseEvent) => {
            if (config.interactivity.enableClickEffect) {
                // Create a burst effect on click
                const clickX = e.clientX;
                const clickY = e.clientY;
                const palette = getColorTheme();

                for (let i = 0; i < 10; i++) {
                    particlesRef.current.push({
                        x: clickX,
                        y: clickY,
                        size: Math.random() * 3 + 1,
                        speedX: (Math.random() - 0.5) * 10,
                        speedY: (Math.random() - 0.5) * 10,
                        color: palette[Math.floor(Math.random() * palette.length)],
                        originalColor: palette[Math.floor(Math.random() * palette.length)],
                        targetSize: 0, // These particles will shrink and disappear
                        pulseSpeed: 0.05
                    });
                }
            }
        };

        // Add event listeners
        if (config.interactivity.enableMouse) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseleave', handleMouseLeave);
            window.addEventListener('click', handleClick);
        }

        if (config.interactivity.enableTouch) {
            window.addEventListener('touchmove', handleTouchMove);
            window.addEventListener('touchend', handleTouchEnd);
        }

        // Handle color scheme changes
        const colorSchemeQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleColorSchemeChange = () => {
            const palette = getColorTheme();
            particlesRef.current.forEach(p => {
                p.color = palette[Math.floor(Math.random() * palette.length)];
                p.originalColor = p.color;
            });
        };
        colorSchemeQuery.addEventListener('change', handleColorSchemeChange);

        // Handle resize
        window.addEventListener('resize', resizeCanvas);

        return () => {
            if (animationIdRef.current) cancelAnimationFrame(animationIdRef.current);
            window.removeEventListener('resize', resizeCanvas);
            colorSchemeQuery.removeEventListener('change', handleColorSchemeChange);

            if (config.interactivity.enableMouse) {
                window.removeEventListener('mousemove', handleMouseMove);
                window.removeEventListener('mouseleave', handleMouseLeave);
                window.removeEventListener('click', handleClick);
            }

            if (config.interactivity.enableTouch) {
                window.removeEventListener('touchmove', handleTouchMove);
                window.removeEventListener('touchend', handleTouchEnd);
            }
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className={`fixed top-0 left-0 w-full h-full -z-50 opacity-70 dark:opacity-80 pointer-events-none transition-opacity duration-500 ${isVisible ? 'block' : 'hidden'}`}
        />
    );
}