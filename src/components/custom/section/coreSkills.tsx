"use client";
import gsap from 'gsap';
import Image from "next/image";
import { Card } from '../../ui/card';
import GsapMagnet from '../GsapMagnet';
import React, { useRef, useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CoreSkills = () => {
    const skillGroups = [
        [
            { name: "React", logo: "/logo/React.png" },
            { name: "JavaScript", logo: "/logo/JavaScript.png" },
            { name: "Jest", logo: "/logo/Jest.png" },
            { name: "Babel", logo: "/logo/Babel.png" },
        ],
        [
            { name: "Linux", logo: "/logo/Linux.png" },
            { name: "Tailwind", logo: "/logo/Tailwind-CSS.png" },
            { name: "Git", logo: "/logo/Git.png" },
            { name: "Redux", logo: "/logo/Redux.png" },

        ]
    ];


    const containerRef = useRef<HTMLDivElement>(null);
    const sectionRef = useRef<HTMLDivElement>(null);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        cardRefs.current = [];
    }, []);

    const addToCardRefs = (el: HTMLDivElement | null, index: number) => {
        cardRefs.current[index] = el;
    };

    useEffect(() => {
        if (!sectionRef.current) return;

        // Set initial 3D perspective and position
        gsap.set(sectionRef.current, {
            autoAlpha: 0,
            rotationX: 15,
            scale: 0.8,
            transformPerspective: 1000,
            transformOrigin: "center center"
        });

        // 3D zoom scroll animation
        ScrollTrigger.create({
            trigger: sectionRef.current,
            start: "top bottom-=100px",
            end: "bottom top",
            onEnter: () => {
                gsap.to(sectionRef.current, {
                    autoAlpha: 1,
                    rotationX: 0,
                    scale: 1,
                    duration: 1.5,
                    ease: "power3.out"
                });
            },
            onLeaveBack: () => {
                gsap.to(sectionRef.current, {
                    autoAlpha: 0,
                    rotationX: 15,
                    scale: 0.8,
                    duration: 0.8
                });
            }
        });

        // Card animations with 3D effect
        const animateCards = () => {
            const validCardRefs = cardRefs.current.filter(Boolean) as HTMLDivElement[];

            if (validCardRefs.length > 0) {
                gsap.from(validCardRefs, {
                    y: 50,
                    rotationX: 45,
                    opacity: 0,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: "back.out(1.7)",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 70%",
                        toggleActions: "play none none none",
                    }
                });

                // Add hover 3D tilt effect to each card
                validCardRefs.forEach((card) => {
                    card.addEventListener("mousemove", (e) => {
                        const rect = card.getBoundingClientRect();
                        const x = e.clientX - rect.left;
                        const y = e.clientY - rect.top;
                        const centerX = rect.width / 2;
                        const centerY = rect.height / 2;

                        gsap.to(card, {
                            rotationY: (x - centerX) / 20,
                            rotationX: -(y - centerY) / 20,
                            duration: 0.5,
                            ease: "power2.out"
                        });
                    });

                    card.addEventListener("mouseleave", () => {
                        gsap.to(card, {
                            rotationY: 0,
                            rotationX: 0,
                            duration: 0.7,
                            ease: "elastic.out(1, 0.5)"
                        });
                    });
                });
            }
        };

        const timer = setTimeout(() => {
            animateCards();
        }, 100);

        return () => {
            clearTimeout(timer);
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            className="w-full py-12"
            style={{
                perspective: "1000px",
                transformStyle: "preserve-3d",
            }}
        >
            <div
                className="flex-grow flex flex-col justify-center items-center w-full"
                style={{
                    perspective: "1000px",
                    transformStyle: "preserve-3d"
                }}
            >
                {/* Skills container with top padding */}
                <div ref={containerRef} className="w-full max-w-4xl mx-auto px-4">
                    <div className="flex flex-col gap-8 items-center">
                        {skillGroups.map((group, groupIndex) => (
                            <div
                                key={groupIndex}
                                className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full"
                                style={{
                                    transformStyle: "preserve-3d"
                                }}
                            >
                                {group.map((skill, skillIndex) => {
                                    const cardIndex = skillGroups
                                        .slice(0, groupIndex)
                                        .reduce((sum, g) => sum + g.length, 0) + skillIndex;

                                    return (
                                        <Card
                                            key={`${groupIndex}-${skillIndex}`}
                                            ref={(el) => addToCardRefs(el, cardIndex)}
                                            className="flex flex-col items-center justify-center p-6 gap-3 w-full transition-transform duration-300"
                                            style={{
                                                transformStyle: "preserve-3d",
                                                backfaceVisibility: "visible"
                                            }}
                                        >
                                            <GsapMagnet>
                                                <div className="relative h-20 w-20 cursor-pointer">
                                                    <Image
                                                        src={skill.logo}
                                                        alt={`${skill.name} Logo`}
                                                        fill
                                                        className="object-contain"
                                                    />
                                                </div>
                                            </GsapMagnet>
                                            <span className="text-lg font-medium">{skill.name}</span>
                                        </Card>
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CoreSkills;