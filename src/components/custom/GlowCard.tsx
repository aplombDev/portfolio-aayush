import { useRef, ReactNode } from "react";

interface BaseCard {
    review?: string;
    // Add other card properties here if needed
    imgPath?: string;
    logoPath?: string;
    title?: string;
    date?: string;
    responsibilities?: string[];
}

interface GlowCardProps<TCard extends BaseCard> {
    card: TCard; // remove optional flag
    index?: number;
    children?: ReactNode;
}

const GlowCard = <TCard extends BaseCard>({ card, index = 0, children }: GlowCardProps<TCard>) => {
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

    const handleMouseMove = (index: number) => (e: React.MouseEvent<HTMLDivElement>) => {
        const card = cardRefs.current[index];
        if (!card) return;

        const rect = card.getBoundingClientRect();
        const mouseX = e.clientX - rect.left - rect.width / 2;
        const mouseY = e.clientY - rect.top - rect.height / 2;

        let angle = Math.atan2(mouseY, mouseX) * (180 / Math.PI);
        angle = (angle + 360) % 360;

        card.style.setProperty("--start", `${angle + 60}deg`);
    };

    const setCardRef = (el: HTMLDivElement | null, index: number) => {
        cardRefs.current[index] = el;
    };

    return (
        <div
            ref={(el) => setCardRef(el, index)}
            onMouseMove={handleMouseMove(index)}
            className="card card-border timeline-card rounded-xl p-10 mb-5 break-inside-avoid-column"
        >
            <div className="glow"></div>
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