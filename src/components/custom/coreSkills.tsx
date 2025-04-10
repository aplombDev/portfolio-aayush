"use client";
import gsap from 'gsap';
import Image from "next/image";
import { Card } from '../ui/card';
import GsapMagnet from './GsapMagnet';
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

        gsap.set(sectionRef.current, { autoAlpha: 0, y: 100 });

        ScrollTrigger.create({
            trigger: sectionRef.current,
            start: "top bottom-=100px",
            end: "bottom top",
            onEnter: () => {
                gsap.to(sectionRef.current, {
                    autoAlpha: 1,
                    y: 0,
                    duration: 1,
                    ease: "power3.out"
                });
            },
            onLeaveBack: () => {
                gsap.to(sectionRef.current, {
                    autoAlpha: 0,
                    y: 100,
                    duration: 0.5
                });
            }
        });

        const animateCards = () => {
            const validCardRefs = cardRefs.current.filter(Boolean) as HTMLDivElement[];

            if (validCardRefs.length > 0) {
                gsap.from(validCardRefs, {
                    y: 50,
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
            className="w-full min-h-screen flex flex-col items-center"
        >
            <div className="w-full py-8 flex justify-center">
                <h2 className="text-3xl font-bold">Core Skills</h2>
            </div>

            <div className="flex-grow flex flex-col justify-center items-center w-full">
                <div ref={containerRef} className="w-full max-w-4xl mx-auto py-4 px-4">
                    <div className="flex flex-col gap-8 items-center">
                        {skillGroups.map((group, groupIndex) => (
                            <div
                                key={groupIndex}
                                className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full"
                            >
                                {group.map((skill, skillIndex) => {
                                    const cardIndex = skillGroups
                                        .slice(0, groupIndex)
                                        .reduce((sum, g) => sum + g.length, 0) + skillIndex;

                                    return (
                                        <Card
                                            key={`${groupIndex}-${skillIndex}`}
                                            ref={(el) => addToCardRefs(el, cardIndex)}
                                            className="flex flex-col items-center justify-center p-6 gap-3 w-full"
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