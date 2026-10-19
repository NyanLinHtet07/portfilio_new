"use client";

import { IconArrowRight, IconBuildingSkyscraper, IconExternalLink } from "@tabler/icons-react";
import { Reveal, Stagger, StaggerItem } from "../motion/reveal";

type ProjectsSectionProps = {
  projects: string[];
};

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  const projectStories = projects.map((project, index) => ({
    number: String(index + 1).padStart(2, "0"),
    title: project,
    body: "Accomplished logistics and supply chain project from the existing portfolio resource.",
  }));

  return (
    <section id="projects" className="surface-light px-6 py-16 sm:px-12 lg:px-20">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <Reveal as="p" className="section-kicker">
            Projects
          </Reveal>
          <Reveal as="h2" className="mt-2 font-serif text-3xl font-semibold sm:text-4xl" delay={0.06}>
            Accomplished Projects
          </Reveal>
        </div>

        <Reveal as="a" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] transition-colors duration-200 hover:text-[#8a6320]" delay={0.12} href="#projects">
          View All Cases <IconArrowRight size={15} />
        </Reveal>
      </div>

      <Stagger className="stories-grid mt-9" amount={0.05} gap={0.07}>
        {projectStories.map((story) => (
          <StaggerItem as="article" className="story-card" key={story.number}>
            <div>
              <span>{story.number}</span>
              <h3>{story.title}</h3>
              <p>{story.body}</p>
              <a href="#recommendations">
                <IconExternalLink aria-hidden="true" size={16} /> View Project
              </a>
            </div>
            <div className="story-visual">
              <IconBuildingSkyscraper aria-hidden="true" size={58} />
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}