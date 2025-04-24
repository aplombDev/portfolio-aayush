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
    const smartGKRef = useRef<HTMLDivElement>(null);

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
            { ref: smartGKRef.current, index: 3 },
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
            <div className="w-full h-full max-w-7xl mx-auto md:px-10 px-4">
                <div className="showcaselayout">
                    <div className="first-project-wrapper" ref={rydeRef}>
                        <a
                            href="https://mobilekhata.checkmysite.live/login"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block"
                        >
                            <div className="image-wrapper cursor-pointer h-[400px] w-full relative overflow-hidden rounded-lg">
                                <img
                                    src="/images/mobilekhataa.png"
                                    alt="Mobile Khata"
                                    className="absolute h-full w-full object-cover object-center"
                                />
                            </div>
                            <div className="text-content mt-4">
                                <h2 className="text-2xl font-bold">Mobile Khata</h2>
                                <p className="text-white-50 md:text-xl mt-2">
                                    A digital ledger app for vendors to track transactions.
                                </p>
                            </div>
                        </a>
                    </div>

                    <div className="project-list-wrapper overflow-hidden">
                        <div className="project" ref={libraryRef}>
                            <a
                                href="https://customer.subisu.net.np/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block w-full h-full"
                            >
                                <div className="image-wrapper bg-[#FFEFDB] cursor-pointer h-[300px] w-full relative overflow-hidden rounded-lg">
                                    <img
                                        src="/images/Subisu.png"
                                        alt="Subisu Portal"
                                        className="absolute h-full w-full object-contain object-center p-4"
                                    />
                                </div>
                                <h2 className="text-2xl font-bold mt-4">Subisu Customer Portal</h2>
                            </a>
                        </div>

                        <div className="project" ref={ycDirectoryRef}>
                            <a
                                href="https://kathmandutradinggroup.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block w-full h-full"
                            >
                                <div className="image-wrapper bg-[#FFE7EB] cursor-pointer h-[300px] w-full relative overflow-hidden rounded-lg">
                                    <img
                                        src="/images/kathmanduTraders.png"
                                        alt="Kathmandu Trading"
                                        className="absolute h-full w-full object-contain object-center p-4"
                                    />
                                </div>
                                <h2 className="text-2xl font-bold mt-4">Kathmandu Trading Group</h2>
                            </a>
                        </div>

                        <div className="project" ref={smartGKRef}>
                            <a
                                href="https://www.smartgkacademy.com/all-courses"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block w-full h-full"
                            >
                                <div className="image-wrapper bg-[#E7F1FF] cursor-pointer h-[300px] w-full relative overflow-hidden rounded-lg">
                                    <img
                                        src="/images/smartgk.png"
                                        alt="Smart GK Academy"
                                        className="absolute h-full w-full object-contain object-center p-4"
                                    />
                                </div>
                                <h2 className="text-2xl font-bold mt-4">Smart GK Academy</h2>
                                <p className="text-white-50 md:text-xl mt-2">
                                    Online platform for competitive exam preparation.
                                </p>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Project;