"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { IconArrowRight, IconDownload } from "@tabler/icons-react";
import GlobalRouteGlobe from "../GlobalRouteGlobe";
import { Enter } from "../motion/reveal";

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
  const sectionRef = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, 72]);
  const globeY = useTransform(scrollYProgress, [0, 1], [0, -56]);
  const copyFade = useTransform(scrollYProgress, [0, 0.75], [1, 0.25]);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="surface-hero relative min-h-[calc(100vh-84px)] overflow-hidden px-6 py-16 text-white sm:px-12 lg:px-20"
    >
      <div aria-hidden="true" className="absolute inset-0 opacity-50">
        <div className="world-map" />
      </div>

      <div className="hero-grid relative z-10 min-h-[74vh] items-center gap-10">
        <motion.div
          className="max-w-xl"
          style={reduceMotion ? undefined : { opacity: copyFade }}
        >
          <Enter as="p" className="section-kicker text-[#d6a85d]" delay={0.05}>
            {person.title}
          </Enter>

          <Enter as="h1" className="mt-5 font-serif text-4xl font-semibold leading-[1.04] tracking-normal sm:text-6xl lg:text-5xl" delay={0.13}>
            {person.name}{" "}
            <span className="text-[#d6a85d]">@ {person.nickname}</span>
          </Enter>

          <Enter as="h2" className="mt-4 font-serif text-2xl font-semibold leading-[1.08] tracking-normal text-white/92 sm:text-3xl lg:text-4xl" delay={0.21}>
            {person.heroHeadline}{" "}
            <span className="text-[#d6a85d]">{person.heroHighlight}</span>
          </Enter>

          <Enter as="p" className="mt-6 max-w-lg text-sm leading-7 text-slate-200 sm:text-base" delay={0.3}>
            {person.tagline}
          </Enter>

          <Enter as="p" className="mt-4 max-w-lg text-sm leading-7 text-slate-300" delay={0.37}>
            {person.heroBody}
          </Enter>

          <div className="mt-9 flex flex-wrap gap-4">
            <Enter as="a" className="gold-button" delay={0.45} href="#education">
              Explore My Journey <IconArrowRight size={16} />
            </Enter>
            <Enter as="a" className="outline-button" delay={0.53} download href="/certificate.png">
              Download CV <IconDownload size={16} />
            </Enter>
          </div>

          <Enter className="mt-10 flex items-center gap-3 text-[11px] uppercase tracking-[0.24em] text-slate-400" delay={0.62}>
            <span aria-hidden="true" className="mouse-mark" />
            Scroll to explore
          </Enter>
        </motion.div>

        <motion.div
          className="relative flex justify-center self-end"
          style={reduceMotion ? undefined : { y: portraitY }}
        >
          <div aria-hidden="true" className="absolute bottom-0 h-72 w-72 rounded-full bg-[#d6a85d]/10 blur-3xl" />
          <Image
            src="/pp_bgremove.png"
            width={470}
            height={620}
            priority
            alt={person.name}
            className="relative max-h-[68vh] w-auto object-contain drop-shadow-[0_35px_55px_rgba(0,0,0,0.45)]"
          />
        </motion.div>

        <motion.div
          aria-label="Global logistics route map"
          className="route-panel relative min-h-[430px]"
          style={reduceMotion ? undefined : { y: globeY }}
        >
          <GlobalRouteGlobe />
        </motion.div>
      </div>
    </section>
  );
}