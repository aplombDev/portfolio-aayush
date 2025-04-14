"use client";
import gsap from "gsap";
import Image from "next/image";
import { words } from "@/constant";
import { useGSAP } from "@gsap/react";
import { useRef, useState } from "react";
import Project from "@/components/custom/section/Project";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ContactUs from "@/components/custom/Contactus";
import CoreSkills from "@/components/custom/section/coreSkills";
import LoadingPage from "@/components/custom/loadingPage";
import LogoImg from "@/components/custom/LogoImg";
import AnimatedCounter from "@/components/custom/section/AnimatedCounter";
import Experience from "@/components/custom/section/Experience";
import Testimonials from "@/components/custom/section/Testimonials";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const boxRefs = useRef<HTMLDivElement[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [showContent, setShowContent] = useState(false);
  const coreSkillsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!boxRefs.current || !wrapperRef.current || !containerRef.current) return;

    const tl = gsap.timeline({
      onComplete: () => setShowContent(true)
    });

    tl.to(boxRefs.current, {
      scale: 0.5,
      duration: 1,
      ease: "power2.inOut",
      stagger: {
        amount: 1,
        from: "center"
      }
    });

    tl.to(boxRefs.current, {
      y: 0,
      rotation: 360,
      opacity: 0,
      duration: 1.5,
      ease: "power2.in",
      stagger: {
        amount: 1,
        from: "center"
      }
    });

    tl.to(containerRef.current, {
      scale: 0,
      duration: 0.5,
      ease: "power2.in"
    });

    tl.to(wrapperRef.current, {
      opacity: 0,
      duration: 0.3,
      display: "none"
    });

  }, { scope: wrapperRef });

  return (
    <>
      <LoadingPage
        ref={boxRefs}
        wrapperRef={wrapperRef}
        containerRef={containerRef}
      />

      {showContent && (
        <>
          <main className="min-h-screen p-5 flex flex-col items-center relative">
            {/* Header with logo and mode toggle */}
            <div className="w-full flex justify-between items-center absolute top-5 px-[5%] gap-8 z-50">
              <div className="h-10 w-2xl relative">
                <LogoImg />
              </div>
            </div>

            {/* Main content */}
            <div className="flex-grow flex items-center justify-center w-full pt-20">
              <div className="w-full max-w-6xl flex flex-col md:flex-row items-center gap-10 px-5">
                {/* Text Content */}
                <div className="flex-1 md:order-1 order-2">
                  <section id="hero">
                    <header className="flex flex-col justify-start">
                      <div className="flex flex-col gap-4">
                        <div className="hero-text space-y-4">
                          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                            Shaping
                            <span className="slide block h-16 md:h-20 overflow-hidden">
                              <span className="wrapper inline-block">
                                {words.map((word, index) => (
                                  <span
                                    key={`${word.text}-${index}`}
                                    className="flex items-center gap-2 md:gap-3"
                                  >
                                    <img
                                      src={word.imgPath}
                                      alt={word.text}
                                      className="w-7 h-7 md:w-10 md:h-10 xl:w-12 xl:h-12 p-1 md:p-2 rounded-full bg-white-50"
                                    />
                                    <span>{word.text}</span>
                                  </span>
                                ))}
                              </span>
                            </span>
                          </h1>
                          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                            into Real Projects
                          </h1>
                          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                            that Deliver Results
                          </h1>
                        </div>
                        <h5 className="text-white-50 md:text-xl relative z-10 pointer-events-none mb-6">
                          Hi, I'm Aayush, a developer based in Nepal with a passion for code.
                        </h5>
                      </div>
                    </header>
                  </section>
                </div>

                {/* Image */}
                <div className="md:order-2 order-1 flex-shrink-0 relative">
                  <div className="w-[250px] h-[250px] md:w-[350px] md:h-[350px] rounded-full overflow-hidden border-4 border-primary/20">
                    <Image
                      src="/images/user-profile.jpg"
                      alt="Profile Picture"
                      width={350}
                      height={350}
                      className="object-cover w-full h-full"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>

            <AnimatedCounter />
          </main>

          <div ref={coreSkillsRef} >
            <div className="h-screen flex flex-col justify-center items-center space-y-8">
              <CoreSkills />
            </div>
          </div>

          <div className="min-h-screen py-20 flex justify-center items-center">
            <Project />
          </div>

          <div className="min-h-screen py-20 flex justify-center items-center">
            <Experience />
          </div>


          <div className="min-h-screen py-20 flex justify-center items-center">
            <Testimonials />
          </div>

          <div className="min-h-screen py-20 flex justify-center items-center">
            <ContactUs />
          </div>
        </>
      )}
    </>
  );
}