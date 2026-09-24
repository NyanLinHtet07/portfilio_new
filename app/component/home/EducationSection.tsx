"use client";

import {
  IconBook,
  IconBriefcase,
  IconPlane,
  IconSchool,
  IconTruckDelivery,
  IconWorld,
} from "@tabler/icons-react";
import { useScrollReveal } from "../../hooks/useScrollReveal";

type EducationItem = {
  degree: string;
  detail: string;
  school: string;
  period: string;
  note?: string;
};

type EducationSectionProps = {
  education: EducationItem[];
};

const educationIcons = [IconSchool, IconBook, IconTruckDelivery, IconWorld, IconPlane, IconBriefcase];

export default function EducationSection({ education }: EducationSectionProps) {
  const educationRef = useScrollReveal();

  return (
    <section id="education" ref={educationRef} className="scroll-reveal bg-slate-900 px-6 py-14 text-white sm:px-12 lg:px-20">
      <p className="section-kicker text-[#b8863d]">Education</p>
      <h2 className="mt-2 font-serif text-3xl font-semibold sm:text-4xl">Academic Foundation</h2>

      <div className="journey-line mt-12">
        {education.map((item, index) => {
          const Icon = educationIcons[index] ?? IconBook;
          return (
            <article key={`${item.degree}-${item.detail}`} className={`journey-node ${item.note ? "is-active" : ""}`}>
              <div className="journey-icon">
                <Icon size={25} />
              </div>
              <h3>{item.degree}</h3>
              <p>{item.detail}</p>
              <p>{item.school}</p>
              <span>{item.note ? `${item.period} · ${item.note}` : item.period}</span>
            </article>
          );
        })}
      </div>
    </section>
  );
}
