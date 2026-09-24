"use client";

import { IconArrowRight, IconBuildingSkyscraper, IconExternalLink } from "@tabler/icons-react";
import { useScrollReveal } from "../../hooks/useScrollReveal";

type ProjectsSectionProps = {
  projects: string[];
};

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  const projectRef = useScrollReveal();
  const projectStories = projects.map((project, index) => ({
    number: String(index + 1).padStart(2, "0"),
    title: project,
    body: "Accomplished logistics and supply chain project from the existing portfolio resource.",
  }));

  return (
    <section id="projects" ref={projectRef} className="scroll-reveal bg-slate-900 px-6 py-16 text-white sm:px-12 lg:px-20">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="section-kicker text-[#b8863d]">Projects</p>
          <h2 className="mt-2 font-serif text-3xl font-semibold sm:text-4xl">Accomplished Projects</h2>
        </div>
        <a href="#projects" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em]">
          View All Cases <IconArrowRight size={15} />
        </a>
      </div>

      <div className="stories-grid mt-9">
        {projectStories.map((story) => (
          <article key={story.number} className="story-card">
            <div>
              <span>{story.number}</span>
              <h3>{story.title}</h3>
              <p>{story.body}</p>
              <a href="#recommendations">
                <IconExternalLink size={16} /> View Project
              </a>
            </div>
            <div className="story-visual">
              <IconBuildingSkyscraper size={58} />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
