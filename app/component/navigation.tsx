"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useActiveSection } from "../hooks/useActiveSection";
import { useScrolled } from "../hooks/useScrolled";

const links = [
  { id: "whoAmI", label: "About" },
  { id: "education", label: "Education" },
  { id: "experiences", label: "Experiences" },
  { id: "projects", label: "Projects" },
  { id: "recommendations", label: "Recommendations" },
];

const linkIds = links.map((link) => link.id);

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const scrolled = useScrolled(24);
  const activeSection = useActiveSection(linkIds);

  return (
    <nav
      className={`fade-in drop-shadow-2xl mx-4 mt-3 rounded-2xl border border-black/5 px-2 py-3 transition-all duration-300 sm:px-4 sm:py-3 ${scrolled ? "is-scrolled" : ""}`}
    >
      <div className="flex items-center justify-between">
        <a className="hover-scale flex items-center gap-3" href="#home" aria-label="Ku Mary, back to top">
          <span className="accent hidden text-lg font-semibold tracking-wide sm:inline">
            Ku Mary
          </span>
        </a>

        <div className="hidden items-center gap-4 text-xs tracking-wide md:flex">
          {links.map((link) => (
            <a
              key={link.id}
              aria-current={activeSection === link.id ? "true" : undefined}
              className="btn-minimal link-underline hover-lift transition-colors duration-200"
              href={`#${link.id}`}
            >
              {link.label}
            </a>
          ))}
        </div>

        <button
          aria-controls="primary-menu"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className="btn-minimal hover-lift hover-scale md:hidden"
          onClick={() => setOpen((value) => !value)}
          type="button"
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <svg
            aria-hidden="true"
            fill="none"
            height="22"
            viewBox="0 0 24 24"
            width="22"
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.path
              animate={open ? { d: "M6 6l12 12" } : { d: "M4 7h16" }}
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="2"
              transition={{ duration: 0.25, ease: "easeOut" }}
            />
            <motion.path
              animate={open ? { opacity: 0 } : { opacity: 1 }}
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="2"
              transition={{ duration: 0.18 }}
              d="M4 12h16"
            />
            <motion.path
              animate={open ? { d: "M18 6L6 18" } : { d: "M4 17h16" }}
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="2"
              transition={{ duration: 0.25, ease: "easeOut" }}
            />
          </svg>
        </button>
      </div>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            animate={{ height: "auto", opacity: 1 }}
            className="nav-panel md:hidden"
            exit={{ height: 0, opacity: 0 }}
            id="primary-menu"
            initial={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <ul className="mt-3 flex flex-col gap-1 border-t border-white/10 pt-3">
              {links.map((link, index) => (
                <motion.li
                  animate={{ opacity: 1, y: 0 }}
                  initial={{ opacity: 0, y: -6 }}
                  key={link.id}
                  transition={{ delay: 0.04 * index, duration: 0.25 }}
                >
                  <a
                    aria-current={activeSection === link.id ? "true" : undefined}
                    className="nav-panel-link btn-minimal block w-full text-left text-xs font-semibold uppercase tracking-[0.14em]"
                    href={`#${link.id}`}
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </nav>
  );
}