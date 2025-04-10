"use client";
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface GsapMagnetProps {
    children: React.ReactElement<{
        ref?: React.Ref<HTMLElement>;
        style?: React.CSSProperties;
    }>;
    strength?: number;
    range?: number;
}

const GsapMagnet: React.FC<GsapMagnetProps> = ({
    children,
    strength = 0.5,
    range = 100
}) => {
    const ref = useRef<HTMLElement>(null);
    const active = useRef(false);
    const lastPos = useRef({ x: 0, y: 0 });

    useEffect(() => {
        if (!ref.current) return;

        const element = ref.current;
        const xTo = gsap.quickTo(element, "x", {
            duration: 0.8,
            ease: "elastic.out(1.5, 0.5)"
        });
        const yTo = gsap.quickTo(element, "y", {
            duration: 0.8,
            ease: "elastic.out(1.5, 0.5)"
        });
        const scaleTo = gsap.quickTo(element, "scale", {
            duration: 0.3,
            ease: "power2.out"
        });

        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const { width, height, left, top } = element.getBoundingClientRect();
            const centerX = left + width / 2;
            const centerY = top + height / 2;

            const dx = clientX - centerX;
            const dy = clientY - centerY;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < range) {
                active.current = true;
                const power = 1 - (distance / range);

                xTo(dx * strength * power);
                yTo(dy * strength * power);

                scaleTo(1 + power * 0.1);

                lastPos.current = { x: dx, y: dy };
            } else if (active.current) {
                resetElement();
            }
        };

        const handleMouseLeave = () => {
            if (active.current) {
                resetElement();
            }
        };

        const resetElement = () => {
            active.current = false;
            xTo(0);
            yTo(0);
            scaleTo(1);
        };

        element.addEventListener('mousemove', handleMouseMove);
        element.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            element.removeEventListener('mousemove', handleMouseMove);
            element.removeEventListener('mouseleave', handleMouseLeave);
            gsap.killTweensOf(element);
        };
    }, [strength, range]);

    return React.cloneElement(children, {
        ref,
        style: {
            ...(children.props.style || {}),
            display: 'inline-block',
            willChange: 'transform',
            transformOrigin: 'center center'
        }
    });
};

export default GsapMagnet;