"use client";

import { IconBook, IconCamera, IconPlane, IconTargetArrow, type Icon } from "@tabler/icons-react";
import { useScrollReveal } from "../../hooks/useScrollReveal";

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
  const languageRef = useScrollReveal();

  return (
    <section id="whoAmI" ref={languageRef} className="future-grid scroll-reveal bg-slate-950 text-white">
      <div className="px-6 py-16 sm:px-12 lg:px-20">
        <p className="section-kicker text-[#d6a85d]">Language & Hobby</p>
        <h2 className="mt-2 font-serif text-3xl font-semibold sm:text-4xl">Multilingual Skills</h2>
        <div className="language-grid mt-10">
          {languages.map((language) => (
            <div key={language.name} className="language-meter">
              <span>{language.name}</span>
              <strong>{language.level}</strong>
              <div>
                <i style={{ width: language.level }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="relative overflow-hidden bg-slate-900 px-6 py-16 text-white sm:px-12 lg:px-20">
        <div className="future-globe" />
        <p className="section-kicker text-[#b8863d]">Beyond Logistics</p>
        <h2 className="mt-2 font-serif text-3xl font-semibold sm:text-4xl">Hobbies & Recognitions</h2>
        <div className="mt-10 grid gap-8 sm:grid-cols-2">
          {hobbies.map((item) => {
            const HobbyIcon = hobbyIcons[item.icon] ?? IconTargetArrow;

            return (
              <div key={item.title} className="hobby-item">
                <HobbyIcon size={34} />
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </div>
            );
          })}
        </div>
        <div className="future-list mt-10">
          {awards.map((award) => (
            <div key={award}>
              <strong>Award</strong>
              <p>{award}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
