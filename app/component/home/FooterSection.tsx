"use client";

import { IconMail, IconMapPin, IconWorld } from "@tabler/icons-react";
import { Reveal } from "../motion/reveal";

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
  return (
    <section className="surface-deep px-6 py-8 text-white sm:px-12 lg:px-20">
      <Reveal
        className="flex flex-col gap-6 border-t border-white/10 pt-8 lg:flex-row lg:items-center lg:justify-between"
        amount={0.4}
      >
        <div className="flex items-center gap-5">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-[#d6a85d]/60 text-[#f2c978] transition-colors duration-300 hover:bg-[#d6a85d]/12">
            <IconMail aria-hidden="true" size={28} />
          </div>
          <div>
            <h2 className="font-serif text-2xl font-semibold">
              {person.name} @ {person.nickname}
            </h2>
            <p className="mt-1 text-sm text-slate-300">{person.tagline}</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-5 text-sm text-slate-300">
          <a
            className="inline-flex items-center gap-2 transition-colors duration-200 hover:text-[#f2c978]"
            href={`mailto:${contact.email}`}
          >
            <IconMail aria-hidden="true" size={17} /> {contact.email}
          </a>
          <a
            className="inline-flex items-center gap-2 transition-colors duration-200 hover:text-[#f2c978]"
            href={contact.linkedin}
            target="_blank"
            rel="noreferrer"
          >
            <IconWorld aria-hidden="true" size={17} /> LinkedIn
          </a>
          <a className="outline-button" href="#home">
            Let&apos;s Connect <IconMapPin aria-hidden="true" size={16} />
          </a>
        </div>
      </Reveal>
    </section>
  );
}