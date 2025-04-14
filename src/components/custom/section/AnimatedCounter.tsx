import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { counterItems } from "@/constant";

gsap.registerPlugin(ScrollTrigger);

const AnimatedCounter = () => {
    const counterRef = useRef<HTMLDivElement>(null);
    const countersRef = useRef<(HTMLDivElement | null)[]>([]);

    countersRef.current = new Array(counterItems.length).fill(null);

    useGSAP(() => {
        countersRef.current.forEach((counter, index) => {
            if (!counter) return;

            const numberElement = counter.querySelector(".counter-number");
            if (!numberElement) return;

            const item = counterItems[index];

            gsap.set(numberElement, { innerText: "0" });

            gsap.to(numberElement, {
                innerText: item.value,
                duration: 2.5,
                ease: "power2.out",
                snap: { innerText: 1 },
                scrollTrigger: {
                    trigger: counterRef.current,
                    start: "top center",
                },
                onComplete: () => {
                    numberElement.textContent = `${item.value}${item.suffix}`;
                },
            });
        });
    }, []);

    return (
        <div
            id="counter"
            ref={counterRef}
            className="w-full flex items-center justify-center p-1"
        >
            <div className="w-full max-w-7xl">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {counterItems.map((item, index) => (
                        <div
                            key={index}
                            ref={(el) => {
                                countersRef.current[index] = el;
                            }}
                            className="bg-black-200 rounded-xl p-4 flex flex-col items-center justify-center h-full min-h-[250px]"
                        >
                            <div className="counter-number text-white text-6xl font-bold mb-4 text-center">
                                0{item.suffix}
                            </div>
                            <div className="text-white text-xl text-center">{item.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AnimatedCounter;