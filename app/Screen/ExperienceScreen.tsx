"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Building2, Calendar } from "lucide-react";

interface Experience {
  company: string;
  title: string;
  duration: string;
  position: "left" | "right";
}

interface TimelineItemProps {
  exp: Experience;
  index: number;
}

const experiences: Experience[] = [
  {
    company: "Owaay Travel Myanmar",
    title: "Airline Ticketing Specialist",
    duration: "25 Dec 2019 - 30 Oct 2020",
    position: "left",
  },
  {
    company: "Global Green Future Co., Ltd",
    title: "Business Development Internship",
    duration: "12 Oct 2020 - 20 Jan 2021",
    position: "right",
  },
  {
    company: "Nordic Group Limited",
    title: "Procurement Associate",
    duration: "25 Jan 2021 - 30 June 2022",
    position: "left",
  },
  {
    company: "Nordic Group Limited",
    title: "Business Development Executive",
    duration: "1 July 2022 - 31 July 2023",
    position: "right",
  },
  {
    company: "Nordic Group Limited",
    title: "Senior Business Development Executive",
    duration: "1 Aug 2023 - 17 May 2024",
    position: "left",
  },
];

const ExperienceScreen = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen bg-gradient-to-b from-slate-50 to-slate-200 text-slate-900 py-24 overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-400/20 rounded-full blur-3xl -z-10" />

      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-24"
        >
          <h2 className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Experience Timeline
          </h2>
          <p className="text-slate-600 max-w-xl mx-auto mt-4">
            A visual journey through my professional milestones.
          </p>
        </motion.div>

        <div className="relative w-full mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[3px] bg-slate-300/60">
            <motion.div
              style={{ height: lineHeight }}
              className="absolute top-0 w-full bg-gradient-to-b from-blue-500 via-purple-500 to-blue-500 shadow-[0_0_12px_rgba(139,92,246,0.6)]"
            />
          </div>

          <div className="space-y-20">
            {experiences.map((exp, index) => (
              <TimelineItem exp={exp} index={index} key={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const TimelineItem = ({ exp, index }: TimelineItemProps) => {
  const isLeft = exp.position === "left";

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -80 : 80 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`relative flex ${
        isLeft ? "justify-start" : "justify-end"
      } items-center`}
    >
      {/* Connector Dot */}
      <div className="absolute left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white border-4 border-purple-500 shadow-xl flex items-center justify-center">
        <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
      </div>

      {/* Card */}
      <div
        className={`w-full md:w-5/12 ${
          isLeft ? "pr-12 text-right" : "pl-12 text-left"
        }`}
      >
        <div
          className="
            relative p-6 rounded-2xl bg-white/70 backdrop-blur-lg
            border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.05)]
            hover:shadow-[0_8px_40px_rgba(99,102,241,0.2)]
            transition-all duration-300
          "
        >
          <h3 className="text-2xl font-bold text-slate-800">
            {exp.title}
          </h3>

          <div
            className={`flex items-center gap-2 text-slate-600 mt-2 ${
              isLeft ? "justify-end" : "justify-start"
            }`}
          >
            <Building2 size={16} />
            <span className="font-medium">{exp.company}</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 mt-4 rounded-full border border-blue-500/40 bg-blue-100/40 text-xs text-slate-700">
            <Calendar size={14} />
            {exp.duration}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ExperienceScreen;
