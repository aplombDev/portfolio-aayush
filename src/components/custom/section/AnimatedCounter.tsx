import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { counterItems } from "@/constant";

gsap.registerPlugin(ScrollTrigger);
gsap.config({
    force3D: true,
    autoSleep: 60,
    nullTargetWarn: false
});

const AnimatedCounter = () => {
    const counterRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const cards = gsap.utils.toArray(".counter-card") as HTMLElement[];

        cards.forEach((card, index) => {
            gsap.to(card, {
                y: -10,
                duration: 1.2,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                delay: index * 0.07,
                immediateRender: false
            });

            const number = card.querySelector(".counter-number")!;
            const item = counterItems[index];

            gsap.fromTo(number,
                { innerText: 0 },
                {
                    innerText: item.value,
                    duration: 1.8,
                    ease: "power2.out",
                    snap: { innerText: 1 },
                    scrollTrigger: {
                        trigger: counterRef.current,
                        start: "top 70%",
                    },
                    onComplete: () => {
                        number.textContent = `${item.value}${item.suffix}`;
                    }
                }
            );
        });

        ScrollTrigger.config({
            limitCallbacks: true,
            syncInterval: 16
        });

    }, []);

    return (
        <div ref={counterRef} className="w-full flex-center p-1">
            <div className="w-full max-w-6xl">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {counterItems.map((item, index) => (
                        <div
                            key={index}
                            className="counter-card p-4 flex-col flex-center h-[220px] will-change-transform"
                        >
                            <div className="counter-number text-white text-5xl font-bold mb-3">
                                0{item.suffix}
                            </div>
                            <div className="text-white/80 text-lg text-center">
                                {item.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AnimatedCounter;