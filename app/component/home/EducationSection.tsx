"use client";

import {
  IconBook,
  IconBriefcase,
  IconPlane,
  IconSchool,
  IconTruckDelivery,
  IconWorld,
} from "@tabler/icons-react";
import { Reveal, Stagger, StaggerItem } from "../motion/reveal";

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
  return (
    <section id="education" className="surface-light px-6 py-14 sm:px-12 lg:px-20">
      <Reveal as="p" className="section-kicker">
        Education
      </Reveal>

      <Reveal as="h2" className="mt-2 font-serif text-3xl font-semibold sm:text-4xl" delay={0.06}>
        Academic Foundation
      </Reveal>

      <Stagger className="journey-line mt-12" amount={0.08} gap={0.08}>
        {education.map((item, index) => {
          const Icon = educationIcons[index] ?? IconBook;

          return (
            <StaggerItem
              as="article"
              className={`journey-node ${item.note ? "is-active" : ""}`}
              key={`${item.degree}-${item.detail}`}
            >
              <div className="journey-icon">
                <Icon size={25} />
              </div>
              <h3>{item.degree}</h3>
              <p>{item.detail}</p>
              <p>{item.school}</p>
              <span>{item.note ? `${item.period} · ${item.note}` : item.period}</span>
            </StaggerItem>
          );
        })}
      </Stagger>
    </section>
  );
}