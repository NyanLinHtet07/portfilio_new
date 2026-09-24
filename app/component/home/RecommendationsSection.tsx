"use client";

import { IconQuote } from "@tabler/icons-react";
import { useScrollReveal } from "../../hooks/useScrollReveal";

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
  const recommendationRef = useScrollReveal();

  return (
    <section id="recommendations" ref={recommendationRef} className="scroll-reveal bg-slate-950 px-6 py-16 text-white sm:px-12 lg:px-20">
      <p className="section-kicker text-[#b8863d]">Recommendations</p>
      <h2 className="mt-2 font-serif text-3xl font-semibold sm:text-4xl">What My Colleagues Say</h2>
      <div className="recommendation-grid mt-9">
        {recommendations.map((item) => (
          <article key={item.author} className="recommendation-card">
            <IconQuote size={34} className="text-[#b8863d]" />
            <p>{item.quote}</p>
            <a href={item.link} target="_blank" rel="noreferrer">
              <strong>{item.author}</strong>
              <span>{item.role}</span>
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
