"use client";

import { IconBoxSeam, IconBriefcase, IconPuzzle, IconSchool, IconTargetArrow, IconTruckDelivery, IconUsers, type Icon } from "@tabler/icons-react";
import { useScrollReveal } from "../../hooks/useScrollReveal";

type JourneyItem = {
  role: string;
  company: string;
  period: string;
};

type ExpertiseItem = {
  title: string;
  body: string;
};

type Objective = {
  title: string;
  body?: string;
};

type ExperienceSectionProps = {
  journey: JourneyItem[];
  expertise: ExpertiseItem[];
  objective: Objective;
};

const expertiseIcons = [IconBoxSeam, IconUsers, IconTruckDelivery, IconSchool, IconBriefcase];

export default function ExperienceSection({ journey, expertise, objective }: ExperienceSectionProps) {
  const experienceRef = useScrollReveal();
  const nodeSpacing = 190;
  const roadmapWidth = Math.max(860, journey.length * nodeSpacing + 160);
  const roadPath = buildRoadPath(journey.length, nodeSpacing);

  const expertiseItems = expertise.map((item, index) => ({
    ...item,
    icon: expertiseIcons[index] ?? IconPuzzle,
  }));

  return (
    <section id="experiences" ref={experienceRef} className="scroll-reveal bg-slate-950 px-6 py-16 text-white sm:px-12 lg:px-20">
      <div className="experience-heading">
        <div>
          <p className="section-kicker text-[#d6a85d]">Experience</p>
          <h2 className="mt-2 font-serif text-3xl font-semibold sm:text-4xl">Professional Journey</h2>
        </div>
        <p>{objective.body ?? objective.title}</p>
      </div>

      <div className="proposal-roadmap mt-12">
        <div className="proposal-roadmap-track" style={{ width: roadmapWidth }}>
          <svg className="proposal-roadmap-svg" viewBox={`0 0 ${roadmapWidth} 360`} aria-hidden="true">
            <path className="proposal-road-line-shadow" d={roadPath} />
            <path className="proposal-road-line" d={roadPath} />
            <path className="proposal-road-line-active" d={roadPath} />
          </svg>
          <span className="proposal-road-label proposal-road-start">Start</span>
          <span className="proposal-road-label proposal-road-end">End</span>

          {journey.map((item, index) => {
            const x = 80 + index * nodeSpacing;
            const isBottom = index % 2 === 1;
            const periodLabel = getPeriodLabel(item.period);

            return (
              <article
                key={`${item.role}-${item.period}`}
                className={`proposal-stop ${isBottom ? "is-bottom" : "is-top"}`}
                style={{ left: x }}
              >
                <div className="proposal-copy">
                  <h3>{item.role}</h3>
                  <p>{item.company}</p>
                  <small>{item.period}</small>
                </div>
                <div className={`proposal-node ${isBottom ? "is-green" : ""}`}>
                  <span>{periodLabel}</span>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <div className="next-strip dark-strip mt-12">
        <div className="flex items-center gap-3 font-semibold uppercase tracking-[0.18em]">
          <IconTargetArrow size={28} />
          Next Destination
        </div>
        <p>{objective.title}</p>
        <p>Maersk · MSC · DHL · Kuehne+Nagel · DB Schenker</p>
      </div>

      <div className="expertise-grid mt-9">
        {expertiseItems.map((item) => {
          const IconComponent = item.icon as Icon;
          return (
            <article key={item.title} className="expertise-card">
              <IconComponent size={34} />
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function buildRoadPath(count: number, spacing: number) {
  const startX = 0;
  const centerY = 180;
  const firstX = 80;
  const lastX = firstX + Math.max(0, count - 1) * spacing;
  const endX = lastX + 100;

  if (count <= 0) {
    return `M${startX} ${centerY} H${endX}`;
  }

  let path = `M${startX} ${centerY} H${firstX - 56}`;

  for (let index = 0; index < count; index += 1) {
    const x = firstX + index * spacing;
    const nextX = firstX + (index + 1) * spacing;
    const dipY = index % 2 === 0 ? 118 : 242;

    path += ` C${x - 28} ${centerY} ${x - 58} ${dipY} ${x} ${dipY}`;
    path += ` C${x + 58} ${dipY} ${x + 28} ${centerY} ${x + 56} ${centerY}`;

    if (index < count - 1) {
      path += ` H${nextX - 56}`;
    }
  }

  return `${path} H${endX}`;
}

function getPeriodLabel(period: string) {
  const years = period.match(/\d{4}/g);

  if (!years?.length) {
    return "Next";
  }

  return years[years.length - 1];
}
