import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TitleHeader from "../TitleHeader";
import { expCards } from "@/constant";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const Experience = () => {
    useGSAP(() => {
        const timelineCards = gsap.utils.toArray<HTMLElement>(".timeline-card");
        const expTexts = gsap.utils.toArray<HTMLElement>(".expText");
        const timeline = document.querySelector(".timeline");

        if (!timelineCards.length || !expTexts.length || !timeline) return;

        timelineCards.forEach((card) => {
            gsap.from(card, {
                xPercent: -100,
                opacity: 0,
                duration: 1,
                ease: "power2.inOut",
                scrollTrigger: {
                    trigger: card,
                    start: "top 80%",
                    toggleActions: "play none none none"
                },
            });
        });

        gsap.to(timeline, {
            scrollTrigger: {
                trigger: ".timeline",
                start: "top center",
                end: "70% center",
                onUpdate: (self: ScrollTrigger) => {
                    gsap.to(".timeline", {
                        scaleY: 1 - self.progress,
                        ease: "power1.inOut"
                    });
                }
            }
        });

        expTexts.forEach((text) => {
            gsap.from(text, {
                opacity: 0,
                x: 50,
                duration: 1,
                ease: "power2.inOut",
                scrollTrigger: {
                    trigger: text,
                    start: "top 75%",
                    toggleActions: "play none none none"
                },
            });
        });
    }, []);

    return (
        <section
            id="experience"
            className="flex-center md:mt-40 mt-20 section-padding xl:px-0 relative"
        >
            <div className="w-full h-full mb-28 md:px-20 px-5">
                <TitleHeader
                    title="Professional Work Experience"
                    sub=" "
                    className="mb-24"
                />

                <div className="relative">
                    <div className="relative z-50 xl:space-y-32 space-y-10">
                        {expCards.map((card) => (
                            <div
                                key={card.title}
                                className="exp-card-wrapper timeline-card"
                            >
                                <div className="xl:w-4/6">
                                    <div className="flex items-start">
                                        <div className="timeline-wrapper">
                                            <div className="timeline" />
                                            <div className="gradient-line w-1 h-full" />
                                        </div>
                                        <div className="expText flex xl:gap-20 md:gap-10 gap-5 relative z-20">
                                            <div className="timeline-logo">
                                                <img
                                                    src={card.logoPath}
                                                    className="rounded-full"
                                                    alt="logo"
                                                    width={60}
                                                    height={60}
                                                />
                                            </div>
                                            <div>
                                                <h1 className="font-semibold text-3xl">{card.title}</h1>
                                                <p className="my-5 text-white-50">
                                                    🗓️&nbsp;{card.date}
                                                </p>
                                                <p className="text-[#839CB5] italic mb-4"> {/* Added margin-bottom */}
                                                    Responsibilities
                                                </p>
                                                <ul className="list-disc ms-5 text-white-50 space-y-1"> {/* Using Tailwind's space-y-1 */}
                                                    {card.responsibilities.map(
                                                        (responsibility: string, index: number) => (
                                                            <li key={index} className="text-lg">
                                                                {responsibility}
                                                            </li>
                                                        )
                                                    )}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Experience;