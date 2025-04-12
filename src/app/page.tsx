"use client";
import gsap from "gsap";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { useRef, useState } from "react";
import Blog from "@/components/custom/Blog";
import { ModeToggle } from "@/hooks/useDarkMode";
import Project from "@/components/custom/Project";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ContactUs from "@/components/custom/Contactus";
import CoreSkills from "@/components/custom/coreSkills";
import Experience from "@/components/custom/Experience";
import LoadingPage from "@/components/custom/loadingPage";
import LogoImg from "@/components/custom/LogoImg";

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
      scale: 0,
      y: 60,
      rotation: 200,
      duration: 3.5,
      repeat: 1,
      yoyo: true,
      delay: 0.5,
      stagger: {
        amount: 1.5,
        from: "start",
        axis: "x",
        grid: [3, 3]
      }
    });

    tl.to(containerRef.current, {
      rotate: "-405deg",
      scale: 0,
      duration: 1
    });

    tl.to(wrapperRef.current, {
      opacity: 0,
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
          <main className="min-h-screen p-5 flex flex-col items-center">
            <div className="w-full flex justify-between items-center absolute top-5 px-[5%] gap-8">
              <div className="h-10 w-2xl relative">
                <LogoImg />
              </div>
              <div className="mr-0">
                <ModeToggle />
              </div>
            </div>

            <div className="flex-grow flex items-center justify-center w-full">
              <div className="w-full max-w-4xl flex flex-col md:flex-row items-center gap-10 relative">
                <div className="flex-1 space-y-4 order-2 md:order-1 z-10">
                  <h1 className="text-4xl font-extralight tracking-tight text-foreground sm:text-6xl lg:text-7xl">
                    Aayush Joshi
                  </h1>
                  <p className="bg-gradient-to-r from-blue-500 via-blue-300 to-blue-100 bg-clip-text text-2xl font-medium tracking-tight text-transparent sm:text-4xl">
                    React Software Developer
                  </p>
                </div>

                <div className="relative order-1 md:order-2 z-10">
                  <div className="w-[350px] h-[350px] relative rounded-full overflow-hidden border-4 border-primary/20">
                    <Image
                      src="/images/user-profile.jpg"
                      fill
                      alt="Profile Picture"
                      className="object-cover"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
          </main>

          <div ref={coreSkillsRef} className="min-h-screen justify-center items-center">
            <CoreSkills />
          </div>

          <div className="min-h-screen justify-center items-center">
            <Experience />
          </div>

          <div className="min-h-screen justify-center items-center">
            <Project />
          </div>

          <div className="min-h-screen justify-center items-center">
            <Blog />
          </div>

          <div className="min-h-screen justify-center items-center">
            <ContactUs />
          </div>
        </>
      )}
    </>
  );
}