"use client";

import { motion, useReducedMotion } from "framer-motion";
import { IconBook, IconCamera, IconPlane, IconTargetArrow, type Icon } from "@tabler/icons-react";
import { Reveal, Stagger, StaggerItem } from "../motion/reveal";

type Language = {
  name: string;
  level: string;
};

type Hobby = {
  title: string;
  body: string;
  icon: string;
};

type LanguageHobbySectionProps = {
  languages: Language[];
  hobbies: Hobby[];
  awards: string[];
};

const hobbyIcons: Record<string, Icon> = {
  plane: IconPlane,
  book: IconBook,
  target: IconTargetArrow,
  camera: IconCamera,
};

export default function LanguageHobbySection({ languages, hobbies, awards }: LanguageHobbySectionProps) {
  const reduceMotion = useReducedMotion();

  return (
    <section id="whoAmI" className="surface-deep future-grid text-white">
      <div className="px-6 py-16 sm:px-12 lg:px-20">
        <Reveal as="p" className="section-kicker text-[#d6a85d]">
          Language &amp; Hobby
        </Reveal>

        <Reveal as="h2" className="mt-2 font-serif text-3xl font-semibold sm:text-4xl" delay={0.06}>
          Multilingual Skills
        </Reveal>

        <Stagger className="language-grid mt-10" amount={0.05} gap={0.07}>
          {languages.map((language) => (
            <StaggerItem as="div" className="language-meter" key={language.name}>
              <span>{language.name}</span>
              <strong>{language.level}</strong>
              <div>
                <motion.i
                  initial={reduceMotion ? false : { width: 0 }}
                  style={reduceMotion ? { width: language.level } : undefined}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  viewport={{ once: true, amount: 0.6 }}
                  whileInView={{ width: language.level }}
                />
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>

      <div className="surface-mid relative overflow-hidden px-6 py-16 text-white sm:px-12 lg:px-20">
        <div aria-hidden="true" className="future-globe" />

        <Reveal as="p" className="section-kicker text-[#b8863d]">
          Beyond Logistics
        </Reveal>

        <Reveal as="h2" className="mt-2 font-serif text-3xl font-semibold sm:text-4xl" delay={0.06}>
          Hobbies &amp; Recognitions
        </Reveal>

        <Stagger className="mt-10 grid gap-8 sm:grid-cols-2" amount={0.05} gap={0.08}>
          {hobbies.map((item) => {
            const HobbyIcon = hobbyIcons[item.icon] ?? IconTargetArrow;

            return (
              <StaggerItem as="div" className="hobby-item" key={item.title}>
                <HobbyIcon aria-hidden="true" size={34} />
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </StaggerItem>
            );
          })}
        </Stagger>

        <Stagger className="future-list mt-10" amount={0.05} gap={0.1}>
          {awards.map((award) => (
            <StaggerItem as="div" key={award}>
              <strong>Award</strong>
              <p>{award}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}