"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  IconChevronUp,
  IconChevronDown,
  IconHome,
  IconUser,
  IconSchool,
  IconBriefcase,
  IconCode,
  IconStar,
} from "@tabler/icons-react";
import { useActiveSection } from "../hooks/useActiveSection";
import { useScrolled } from "../hooks/useScrolled";

const sections = [
  { id: "home", label: "Home", icon: IconHome },
  { id: "whoAmI", label: "About", icon: IconUser },
  { id: "education", label: "Education", icon: IconSchool },
  { id: "experiences", label: "Experience", icon: IconBriefcase },
  { id: "projects", label: "Projects", icon: IconCode },
  { id: "recommendations", label: "Reviews", icon: IconStar },
];

const sectionIds = sections.map((section) => section.id);

export default function VerticalNav() {
  const activeSection = useActiveSection(sectionIds, 0.4);
  const isVisible = useScrolled(100);
  const reduceMotion = useReducedMotion();

  const scrollTo = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      className={`side-nav-shell fixed right-2 top-1/2 z-50 hidden -translate-y-1/2 md:block sm:right-4 ${
        isVisible ? "translate-x-0 opacity-100" : "pointer-events-none -translate-x-4 opacity-0"
      }`}
      inert={!isVisible}
    >
      <div className="flex flex-col items-center gap-2 rounded-2xl border border-[#d6a85d]/25 bg-[#020617]/85 p-3 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.95)] backdrop-blur-xl">
        <button
          aria-label="Scroll to top"
          className="side-nav-button group flex rounded-full p-2 text-slate-300 hover:bg-[#d6a85d]/15 hover:text-[#f2c978]"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          type="button"
        >
          <IconChevronUp className="h-4 w-4" />
        </button>

        <div className="flex flex-col gap-3">
          {sections.map((section) => {
            const IconComponent = section.icon;
            const isActive = activeSection === section.id;

            return (
              <button
                aria-current={isActive ? "true" : undefined}
                aria-label={`Go to ${section.label}`}
                className="side-nav-button group relative flex rounded-full p-3 text-slate-400 hover:bg-[#d6a85d]/15 hover:text-[#f2c978] focus-visible:text-[#f2c978]"
                key={section.id}
                onClick={() => scrollTo(section.id)}
                type="button"
              >
                {isActive ? (
                  <motion.span
                    aria-hidden="true"
                    className="absolute inset-0 rounded-full border border-[#d6a85d]/70 bg-[#d6a85d]/18 shadow-[0_0_24px_-6px_rgba(214,168,93,0.85)]"
                    layoutId="side-nav-active"
                    transition={
                      reduceMotion
                        ? { duration: 0 }
                        : { type: "spring", stiffness: 420, damping: 34 }
                    }
                  />
                ) : null}

                <IconComponent
                  aria-hidden="true"
                  className={`relative h-5 w-5 ${isActive ? "text-[#f2c978]" : ""}`}
                />

                <span
                  aria-hidden="true"
                  className="side-nav-tip pointer-events-none absolute right-full top-1/2 z-10 mr-3 whitespace-nowrap rounded-md border border-white/10 bg-[#020617]/95 px-2 py-1 text-xs text-slate-200 shadow-lg"
                >
                  {section.label}
                </span>
              </button>
            );
          })}
        </div>

        <button
          aria-label="Scroll to bottom"
          className="side-nav-button group flex rounded-full p-2 text-slate-300 hover:bg-[#d6a85d]/15 hover:text-[#f2c978]"
          onClick={() =>
            window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })
          }
          type="button"
        >
          <IconChevronDown className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}