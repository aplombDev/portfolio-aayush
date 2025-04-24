import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GlowCard from "../GlowCard";
import { testimonials } from "@/constant";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const Testimonials = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    const setCardRef = (index: number) => (el: HTMLDivElement | null) => {
        cardsRef.current[index] = el;
    };

    useGSAP(() => {
        gsap.from(titleRef.current, {
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: "back.out(1.2)",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 90%",
                toggleActions: "play none none none"
            }
        });

        cardsRef.current.forEach((card, i) => {
            if (!card) return;

            gsap.from(card, {
                y: 50 + (i % 3) * 20,
                opacity: 0,
                scale: 0.95,
                duration: 0.8,
                delay: i * 0.1,
                ease: "back.out(1.5)",
                scrollTrigger: {
                    trigger: card,
                    start: "top 80%",
                    toggleActions: "play none none none"
                }
            });

            gsap.to(card, {
                y: -5,
                duration: 3,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                delay: i * 0.2
            });
        });
    }, { scope: containerRef });

    return (
        <section id="testimonials" className="flex-center section-padding" ref={containerRef}>
            <div className="w-full h-full max-w-7xl mx-auto md:px-10 px-4">
                <h2 ref={titleRef} className="text-4xl font-bold text-center mb-16 text-amber-100 opacity-0">
                    What People Say
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 cursor-pointer">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            ref={setCardRef(index)}
                            className="h-full"
                        >
                            <GlowCard card={testimonial} index={index}>
                                <div className="flex items-center gap-4 mb-6">
                                    <img
                                        src={testimonial.imgPath}
                                        alt={testimonial.name}
                                        className="w-14 h-14 rounded-full object-cover border-2 border-amber-400/50 transition-all duration-300"
                                    />
                                    <div>
                                        <p className="font-bold text-lg text-amber-100">{testimonial.name}</p>
                                        <p className="text-white-50">{testimonial.mentions}</p>
                                    </div>
                                </div>
                                <p className="text-white-90 leading-relaxed flex-grow">{testimonial.review}</p>
                            </GlowCard>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;