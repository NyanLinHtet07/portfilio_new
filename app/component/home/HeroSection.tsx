"use client";

import Image from "next/image";
import { IconArrowRight, IconDownload } from "@tabler/icons-react";
import GlobalRouteGlobe from "../GlobalRouteGlobe";
import { useScrollReveal } from "../../hooks/useScrollReveal";

type HeroSectionProps = {
  person: {
    name: string;
    nickname: string;
    title: string;
    tagline: string;
    heroHeadline: string;
    heroHighlight: string;
    heroBody: string;
  };
};

export default function HeroSection({ person }: HeroSectionProps) {
  const heroRef = useScrollReveal();

  return (
    <section
      id="home"
      ref={heroRef}
      className="scroll-reveal relative min-h-[calc(100vh-84px)] overflow-hidden bg-slate-950 px-6 py-16 text-white sm:px-12 lg:px-20"
    >
      <div className="absolute inset-0 opacity-50">
        <div className="world-map" />
      </div>

      <div className="hero-grid relative z-10 min-h-[74vh] items-center gap-10">
        <div className="max-w-xl">
          <p className="section-kicker text-[#d6a85d]">{person.title}</p>
          <h1 className="mt-5 font-serif text-4xl font-semibold leading-[1.04] tracking-normal sm:text-6xl lg:text-5xl">
            {person.name} <span className="text-[#d6a85d]">@ {person.nickname}</span>
          </h1>
          <h2 className="mt-4 font-serif text-2xl font-semibold leading-[1.08] tracking-normal text-white/92 sm:text-3xl lg:text-4xl">
            {person.heroHeadline} <span className="text-[#d6a85d]">{person.heroHighlight}</span>
          </h2>
          <p className="mt-6 max-w-lg text-sm leading-7 text-slate-200 sm:text-base">
            {person.tagline}
          </p>
          <p className="mt-4 max-w-lg text-sm leading-7 text-slate-300">
            {person.heroBody}
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <a href="#education" className="gold-button">
              Explore My Journey <IconArrowRight size={16} />
            </a>
            <a href="/certificate.png" className="outline-button" download>
              Download CV <IconDownload size={16} />
            </a>
          </div>

          <div className="mt-10 flex items-center gap-3 text-[11px] uppercase tracking-[0.24em] text-slate-400">
            <span className="mouse-mark" />
            Scroll to explore
          </div>
        </div>

        <div className="relative flex justify-center self-end">
          <div className="absolute bottom-0 h-72 w-72 rounded-full bg-[#d6a85d]/10 blur-3xl" />
          <Image
            src="/pp_bgremove.png"
            width={470}
            height={620}
            priority
            alt={person.name}
            className="relative max-h-[68vh] w-auto object-contain drop-shadow-[0_35px_55px_rgba(0,0,0,0.45)]"
          />
        </div>

        <div className="route-panel relative min-h-[430px]" aria-label="Global logistics route map">
          <GlobalRouteGlobe />
        </div>
      </div>
    </section>
  );
}
