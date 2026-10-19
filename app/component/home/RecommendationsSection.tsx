"use client";

import { IconQuote } from "@tabler/icons-react";
import { Reveal, Stagger, StaggerItem } from "../motion/reveal";

type Recommendation = {
  quote: string;
  author: string;
  role: string;
  link: string;
};

type RecommendationsSectionProps = {
  recommendations: Recommendation[];
};

export default function RecommendationsSection({ recommendations }: RecommendationsSectionProps) {
  return (
    <section id="recommendations" className="surface-mid px-6 py-16 text-white sm:px-12 lg:px-20">
      <Reveal as="p" className="section-kicker text-[#b8863d]">
        Recommendations
      </Reveal>

      <Reveal as="h2" className="mt-2 font-serif text-3xl font-semibold sm:text-4xl" delay={0.06}>
        What My Colleagues Say
      </Reveal>

      <Stagger className="recommendation-grid mt-9" amount={0.05} gap={0.12}>
        {recommendations.map((item) => (
          <StaggerItem as="article" className="recommendation-card" key={item.author}>
            <IconQuote aria-hidden="true" className="text-[#b8863d]" size={34} />
            <p>{item.quote}</p>
            <a href={item.link} target="_blank" rel="noreferrer">
              <strong>{item.author}</strong>
              <span>{item.role}</span>
            </a>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}