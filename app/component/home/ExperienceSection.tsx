"use client";

import { motion, useReducedMotion } from "framer-motion";
import { IconBoxSeam, IconBriefcase, IconPuzzle, IconSchool, IconTargetArrow, IconTruckDelivery, IconUsers, type Icon } from "@tabler/icons-react";
import { Reveal, Stagger, StaggerItem } from "../motion/reveal";

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
  const reduceMotion = useReducedMotion();
  const nodeSpacing = 190;
  const roadmapWidth = Math.max(860, journey.length * nodeSpacing + 160);
  const roadPath = buildRoadPath(journey.length, nodeSpacing);

  const expertiseItems = expertise.map((item, index) => ({
    ...item,
    icon: expertiseIcons[index] ?? IconPuzzle,
  }));

  return (
    <section id="experiences" className="surface-deep px-6 py-16 text-white sm:px-12 lg:px-20">
      <div className="experience-heading">
        <div>
          <Reveal as="p" className="section-kicker text-[#d6a85d]">
            Experience
          </Reveal>
          <Reveal as="h2" className="mt-2 font-serif text-3xl font-semibold sm:text-4xl" delay={0.06}>
            Professional Journey
          </Reveal>
        </div>
        <Reveal as="p" delay={0.12}>
          {objective.body ?? objective.title}
        </Reveal>
      </div>

      <Reveal className="proposal-roadmap mt-12" amount={0.12}>
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
              <motion.article
                className={`proposal-stop ${isBottom ? "is-bottom" : "is-top"}`}
                initial={reduceMotion ? false : { opacity: 0, scale: 0.94, x: "-50%" }}
                key={`${item.role}-${item.period}`}
                style={{ left: x }}
                transition={{ duration: 0.5, delay: reduceMotion ? 0 : 0.1 + index * 0.08 }}
                viewport={{ once: true, amount: 0.4 }}
                whileInView={{ opacity: 1, scale: 1, x: "-50%" }}
              >
                <div className="proposal-copy">
                  <h3>{item.role}</h3>
                  <p>{item.company}</p>
                  <small>{item.period}</small>
                </div>
                <div className={`proposal-node ${isBottom ? "is-green" : ""}`}>
                  <span>{periodLabel}</span>
                </div>
              </motion.article>
            );
          })}
        </div>
      </Reveal>

      <Reveal className="next-strip dark-strip mt-12" amount={0.3}>
        <div className="flex items-center gap-3 font-semibold uppercase tracking-[0.18em]">
          <IconTargetArrow size={28} />
          Next Destination
        </div>
        <p>{objective.title}</p>
        <p>Maersk · MSC · DHL · Kuehne+Nagel · DB Schenker</p>
      </Reveal>

      <Stagger className="expertise-grid mt-9" amount={0.05} gap={0.07}>
        {expertiseItems.map((item) => {
          const IconComponent = item.icon as Icon;

          return (
            <StaggerItem as="article" className="expertise-card" key={item.title}>
              <IconComponent size={34} />
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </StaggerItem>
          );
        })}
      </Stagger>
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