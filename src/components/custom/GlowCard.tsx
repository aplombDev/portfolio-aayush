import { useRef, ReactNode } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface BaseCard {
    name: string;
    mentions: string;
    review: string;
    imgPath: string;
}

interface GlowCardProps {
    card: BaseCard;
    index?: number;
    children?: ReactNode;
}

const GlowCard = ({ card, index = 0, children }: GlowCardProps) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const glowRef = useRef<HTMLDivElement>(null);
    const borderRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const imgRef = useRef<HTMLImageElement>(null);

    useGSAP(() => {
        const cardEl = cardRef.current;
        const glowEl = glowRef.current;
        const borderEl = borderRef.current;
        const contentEl = contentRef.current;
        const imgEl = imgRef.current;

        if (!cardEl || !glowEl || !borderEl || !contentEl) return;

        gsap.set([glowEl, borderEl], { opacity: 0 });
        gsap.set(glowEl, {
            scale: 0.95,
            background: 'conic-gradient(from 0deg, #FFD700, #FFA500, #FF8C00, #FFA500, #FFD700)'
        });
        gsap.set(contentEl.children, { y: 10, opacity: 0 });
        if (imgEl) gsap.set(imgEl, { scale: 0.9, opacity: 0 });

        const entranceTl = gsap.timeline({
            defaults: { ease: "power3.out" },
            delay: index * 0.15
        });

        entranceTl
            .to(cardEl, {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: "back.out(1.7)"
            })
            .to(glowEl, {
                opacity: 0.2,
                scale: 1,
                duration: 0.6
            }, "-=0.6")
            .to(borderEl, {
                opacity: 0.4,
                duration: 0.4
            }, "-=0.5")
            .to(contentEl.children, {
                y: 0,
                opacity: 1,
                stagger: 0.1,
                duration: 0.5
            }, "-=0.4")
            .to(imgEl, {
                scale: 1,
                opacity: 1,
                duration: 0.5,
                ease: "elastic.out(1, 0.5)"
            }, "-=0.5");

        const handleMouseEnter = () => {
            const hoverTl = gsap.timeline({ defaults: { ease: "power2.out" } });

            hoverTl
                .to(glowEl, {
                    opacity: 0.8,
                    scale: 1.05,
                    duration: 0.4,
                    background: 'conic-gradient(from 180deg, #FFD700, #FFA500, #FF8C00, #FFA500, #FFD700)'
                })
                .to(borderEl, {
                    opacity: 1,
                    borderWidth: '2px',
                    boxShadow: '0 0 20px rgba(255, 215, 0, 0.5)',
                    duration: 0.3
                }, "-=0.3")
                .to(cardEl, {
                    y: -8,
                    scale: 1.02,
                    duration: 0.4,
                    ease: "back.out(1.7)"
                }, "-=0.4")
                .to(contentEl.children, {
                    y: -2,
                    duration: 0.3,
                    stagger: 0.05
                }, "-=0.3")
                .to(imgEl, {
                    scale: 1.1,
                    borderColor: '#FFD700',
                    duration: 0.3
                }, "-=0.3");
        };

        const handleMouseLeave = () => {
            const leaveTl = gsap.timeline({ defaults: { ease: "power2.out" } });

            leaveTl
                .to(glowEl, {
                    opacity: 0.2,
                    scale: 1,
                    duration: 0.5
                })
                .to(borderEl, {
                    opacity: 0.4,
                    borderWidth: '1px',
                    boxShadow: '0 0 15px rgba(255, 215, 0, 0.1)',
                    duration: 0.4
                }, "-=0.4")
                .to(cardEl, {
                    y: 0,
                    scale: 1,
                    duration: 0.5
                }, "-=0.5")
                .to(contentEl.children, {
                    y: 0,
                    duration: 0.3
                }, "-=0.4")
                .to(imgEl, {
                    scale: 1,
                    borderColor: '#FFA50080',
                    duration: 0.3
                }, "-=0.3");
        };

        // Click animation
        const handleClick = () => {
            gsap.to(cardEl, {
                scale: 0.98,
                duration: 0.2,
                yoyo: true,
                repeat: 1
            });
        };

        cardEl.addEventListener('mouseenter', handleMouseEnter);
        cardEl.addEventListener('mouseleave', handleMouseLeave);
        cardEl.addEventListener('click', handleClick);

        return () => {
            cardEl.removeEventListener('mouseenter', handleMouseEnter);
            cardEl.removeEventListener('mouseleave', handleMouseLeave);
            cardEl.removeEventListener('click', handleClick);
        };
    }, { scope: cardRef });

    return (
        <div
            ref={cardRef}
            className="relative rounded-2xl p-8 h-full overflow-hidden will-change-transform"
            style={{
                background: 'rgba(15, 23, 42, 0.7)',
                backdropFilter: 'blur(8px)',
                opacity: 0,
                transform: 'translateY(30px)'
            }}
        >
            <div
                ref={borderRef}
                className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{
                    border: '1px solid rgba(255, 215, 0, 0.3)',
                    transition: 'all 0.3s ease'
                }}
            ></div>

            <div
                ref={glowRef}
                className="absolute inset-0 -z-10 rounded-2xl pointer-events-none"
                style={{
                    padding: '1px',
                    backgroundClip: 'padding-box',
                    filter: 'blur(12px)',
                    transition: 'all 0.4s ease'
                }}
            ></div>

            <div ref={contentRef} className="relative z-10 h-full flex flex-col">
                {children}
            </div>
        </div>
    );
};

export default GlowCard;