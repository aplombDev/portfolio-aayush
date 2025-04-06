"use client"

import CoreSkills from "@/components/custom/coreSkills";
import { ModeToggle } from "@/hooks/useDarkMode";
import Image from 'next/image';
import * as React from "react";

export default function Home() {
  return (
    <main className="min-h-screen p-5 flex flex-col items-center bg-gradient-to-br from-background to-muted/20">
      <div className="w-full max-w-4xl flex justify-between items-center mb-20">
        <div className="w-[100px] h-[100px] relative">
          <Image
            src="/images/user-logo.png"
            fill
            alt="User Logo"
            className="object-contain"
          />
        </div>
        <ModeToggle />
      </div>

      <div className="w-full max-w-4xl flex flex-col md:flex-row items-center gap-10 relative">
        <div className="flex-1 space-y-4 order-2 md:order-1 z-10">
          <h1 className="text-4xl font-extralight tracking-tight text-foreground sm:text-6xl lg:text-7xl">Aayush Joshi</h1>
          <p className="bg-gradient-to-r from-blue-800 via-cyan-800 to-cyan-500 bg-clip-text text-2xl font-medium tracking-tight text-transparent sm:text-4xl">React Software Developer</p>
        </div>

        <div className="relative order-1 md:order-2 z-10">
          <div className="absolute inset-0 w-[350px] h-[350px] rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 blur-xl -z-10 animate-pulse-slow" />
          <div className="absolute inset-0 w-[320px] h-[320px] rounded-full bg-gradient-to-tr from-primary/10 to-secondary/10 blur-md -z-20" />

          <div className="w-[300px] h-[300px] relative rounded-full overflow-hidden border-4 border-primary/20">
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
      <CoreSkills />
    </main>
  );
}