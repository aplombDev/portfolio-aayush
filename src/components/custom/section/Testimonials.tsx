import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { testimonials } from "@/constant";
import GlowCard from "../GlowCard";
import TitleHeader from "../TitleHeader";

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

    // Store ref callback properly
    const setCardRef = (index: number) => (el: HTMLDivElement | null) => {
        cardsRef.current[index] = el;
    };

    useGSAP(() => {
        // ... (rest of your animation code remains the same)
    }, { scope: containerRef });

    return (
        <section id="testimonials" className="flex-center section-padding" ref={containerRef}>
            <div className="w-full h-full md:px-10 px-5">
                <TitleHeader
                    title="What People Say About Me?"
                    sub=""
                    className="testimonials-title mb-16"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {testimonials.map((testimonial: Testimonial, index: number) => (
                        <div
                            key={index}
                            ref={setCardRef(index)}  // Correct ref assignment
                            className="mb-6"
                        >
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