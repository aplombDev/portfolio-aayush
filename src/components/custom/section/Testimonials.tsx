import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { testimonials } from "@/constant";
import GlowCard from "../GlowCard";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface Testimonial {
    name: string;
    mentions: string;
    review: string;
    imgPath: string;
}

const Testimonials = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    const setCardRef = (index: number) => (el: HTMLDivElement | null) => {
        cardsRef.current[index] = el;
    };

    useGSAP(() => {
        gsap.from(cardsRef.current, {
            y: 50,
            opacity: 0,
            stagger: 0.1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 80%",
                toggleActions: "play none none none"
            }
        });

        cardsRef.current.forEach((card) => {
            if (!card) return;

            const glow = card.querySelector('.glow-effect') as HTMLElement;

            card.addEventListener('mouseenter', () => {
                gsap.to(glow, {
                    opacity: 1,
                    scale: 1.05,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });

            card.addEventListener('mouseleave', () => {
                gsap.to(glow, {
                    opacity: 0.7,
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
        });
    }, { scope: containerRef });

    return (
        <section id="testimonials" className="flex-center section-padding cursor-pointer" ref={containerRef}>
            <div className="w-full h-full max-w-7xl mx-auto md:px-10 px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {testimonials.map((testimonial: Testimonial, index: number) => (
                        <div
                            key={index}
                            ref={setCardRef(index)}
                            className="mb-6 relative group"
                        >
                            <div className="glow-effect absolute inset-0 bg-gradient-to-r from-amber-400 via-pink-500 to-amber-400 rounded-xl opacity-50 group-hover:opacity-70 blur-md -z-10 transition-all duration-300"></div>

                            <GlowCard card={testimonial} index={index}>
                                <div className="flex items-center gap-3">
                                    <div>
                                        <img
                                            src={testimonial.imgPath}
                                            alt={testimonial.name}
                                            className="w-12 h-12 rounded-full object-cover"
                                        />
                                    </div>
                                    <div>
                                        <p className="font-bold">{testimonial.name}</p>
                                        <p className="text-white-50">{testimonial.mentions}</p>
                                    </div>
                                </div>
                                <p className="mt-4">{testimonial.review}</p>
                            </GlowCard>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;