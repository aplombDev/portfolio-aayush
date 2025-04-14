import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const Project = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const rydeRef = useRef<HTMLDivElement>(null);
    const libraryRef = useRef<HTMLDivElement>(null);
    const ycDirectoryRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (sectionRef.current) {
            gsap.fromTo(
                sectionRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 1.5 }
            );
        }

        const cards = [
            { ref: rydeRef.current, index: 0 },
            { ref: libraryRef.current, index: 1 },
            { ref: ycDirectoryRef.current, index: 2 },
        ];

        cards.forEach(({ ref, index }) => {
            if (ref) {
                gsap.fromTo(
                    ref,
                    { y: 50, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 1,
                        delay: 0.3 * (index + 1),
                        scrollTrigger: { trigger: ref, start: "top bottom-=100" },
                    }
                );
            }
        });
    }, []);

    return (
        <div id="work" ref={sectionRef} className="app-showcase">
            <div className="w-full">
                <div className="showcaselayout">
                    {/* Mobile Khata - Wrapped in link without affecting layout */}
                    <div className="first-project-wrapper" ref={rydeRef}>
                        <a
                            href="https://mobilekhata.checkmysite.live/login"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full h-full" // Makes entire area clickable
                        >
                            <div className="image-wrapper cursor-pointer">
                                <img src="/images/mobilekhataa.png" alt="Mobile Khata" />
                            </div>
                            <div className="text-content">
                                <h2>Mobile Khata</h2>
                                <p className="text-white-50 md:text-xl">
                                    A digital ledger app for vendors to track transactions.
                                </p>
                            </div>
                        </a>
                    </div>

                    <div className="project-list-wrapper overflow-hidden">
                        {/* Subisu - Link preserves original styling */}
                        <div className="project" ref={libraryRef}>
                            <a
                                href="https://customer.subisu.net.np/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block w-full h-full"
                            >
                                <div className="image-wrapper bg-[#FFEFDB] cursor-pointer">
                                    <img src="/images/Subisu.png" alt="Subisu Portal" />
                                </div>
                                <h2>Subisu Customer Portal</h2>
                            </a>
                        </div>

                        {/* Kathmandu Trading - Maintains identical visual appearance */}
                        <div className="project" ref={ycDirectoryRef}>
                            <a
                                href="https://kathmandutradinggroup.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block w-full h-full"
                            >
                                <div className="image-wrapper bg-[#FFE7EB] cursor-pointer">
                                    <img src="/images/kathmanduTraders.png" alt="Kathmandu Trading" />
                                </div>
                                <h2>Kathmandu Trading Group</h2>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Project;