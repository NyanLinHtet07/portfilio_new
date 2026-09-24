"use client";

import { IconMail, IconMapPin, IconWorld } from "@tabler/icons-react";
import { useScrollReveal } from "../../hooks/useScrollReveal";

type FooterSectionProps = {
  person: {
    name: string;
    nickname: string;
    tagline: string;
  };
  contact: {
    email: string;
    linkedin: string;
  };
};

export default function FooterSection({ person, contact }: FooterSectionProps) {
  const footerRef = useScrollReveal();

  return (
    <section ref={footerRef} className="scroll-reveal bg-slate-950 px-6 py-8 text-white sm:px-12 lg:px-20">
      <div className="flex flex-col gap-6 border-t border-white/10 pt-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-5">
          <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#d6a85d]/60">
            <IconMail size={28} />
          </div>
          <div>
            <h2 className="font-serif text-2xl font-semibold">
              {person.name} @ {person.nickname}
            </h2>
            <p className="text-sm text-slate-300">{person.tagline}</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-5 text-sm text-slate-300">
          <a className="inline-flex items-center gap-2" href={`mailto:${contact.email}`}>
            <IconMail size={17} /> {contact.email}
          </a>
          <a className="inline-flex items-center gap-2" href={contact.linkedin} target="_blank" rel="noreferrer">
            <IconWorld size={17} /> LinkedIn
          </a>
          <a className="outline-button" href="#home">
            Let&apos;s Connect <IconMapPin size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
