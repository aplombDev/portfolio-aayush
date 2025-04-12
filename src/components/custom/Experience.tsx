"use client";
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Experience = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current || !textRef.current) return;

        // Initial hidden state
        gsap.set(textRef.current, {
            opacity: 0,
            y: 50,
            scale: 0.8
        });

        // Animation timeline
        const tl = gsap.timeline({
            defaults: { ease: "power3.out" }
        });

        tl.to(textRef.current, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1
        })
            .to(textRef.current, {
                y: -10,
                repeat: -1,
                yoyo: true,
                duration: 2
            }, "+=0.5");

        // Clean up
        return () => {
            tl.kill();
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="min-h-screen w-full flex flex-col justify-center items-center"
        >
            <div
                ref={textRef}
                className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-500 p-8 shadow-lg"
            >
                This page is under Maintenance
            </div>
        </div>
    );
};

export default Experience;