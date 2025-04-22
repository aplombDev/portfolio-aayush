import { useRef, ReactNode } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface BaseCard {
    review?: string;
    imgPath?: string;
    logoPath?: string;
    title?: string;
    date?: string;
    responsibilities?: string[];
}

interface GlowCardProps<TCard extends BaseCard> {
    card: TCard;
    index?: number;
    children?: ReactNode;
}

const GlowCard = <TCard extends BaseCard>({ card, index = 0, children }: GlowCardProps<TCard>) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const glowRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const cardEl = cardRef.current;
        const glowEl = glowRef.current;

        if (!cardEl || !glowEl) return;

        gsap.set(glowEl, {
            opacity: 0,
            scale: 0.95,
            background: 'conic-gradient(from 0deg, #f59e0b, #ec4899, #f59e0b)'
        });

        const handleMouseEnter = () => {
            gsap.to(glowEl, {
                opacity: 1,
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });
        };

        const handleMouseLeave = () => {
            gsap.to(glowEl, {
                opacity: 0,
                scale: 0.95,
                duration: 0.3,
                ease: "power2.out"
            });
        };

        cardEl.addEventListener('mouseenter', handleMouseEnter);
        cardEl.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            cardEl.removeEventListener('mouseenter', handleMouseEnter);
            cardEl.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, { scope: cardRef });

    return (
        <div
            ref={cardRef}
            className="relative rounded-xl p-10 mb-5 overflow-hidden"
            style={{
                background: 'rgba(15, 23, 42, 0.5)',
                border: '1px solid rgba(255, 255, 255, 0.1)'
            }}
        >
            <div
                ref={glowRef}
                className="absolute inset-0 -z-10 rounded-xl pointer-events-none"
                style={{
                    padding: '1px',
                    backgroundClip: 'padding-box',
                    filter: 'blur(8px)'
                }}
            ></div>

            <div className="flex items-center gap-1 mb-5">
                {Array.from({ length: 5 }, (_, i) => (
                    <img key={i} src="/images/star.png" alt="star" className="size-5" />
                ))}
            </div>
            <div className="mb-5">
                <p className="text-white-50 text-lg">{card.review}</p>
            </div>
            {children}
        </div>
    );
};

export default GlowCard;