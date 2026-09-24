"use client";

import Navigation from "./component/navigation";
import VerticalNav from "./component/vertical-nav";
import EducationSection from "./component/home/EducationSection";
import ExperienceSection from "./component/home/ExperienceSection";
import FooterSection from "./component/home/FooterSection";
import HeroSection from "./component/home/HeroSection";
import LanguageHobbySection from "./component/home/LanguageHobbySection";
import ProjectsSection from "./component/home/ProjectsSection";
import RecommendationsSection from "./component/home/RecommendationsSection";
import { portfolio } from "./data/portfolio";

export default function Home() {
  return (
    <div className="portfolio-shell relative min-h-screen overflow-hidden">
      <Navigation />
      <VerticalNav />

      <main>
        <HeroSection person={portfolio.person} />

        <EducationSection education={portfolio.education} />
        <ExperienceSection journey={portfolio.journey} expertise={portfolio.expertise} objective={portfolio.objective} />
        <ProjectsSection projects={portfolio.projects} />
        <RecommendationsSection recommendations={portfolio.recommendations} />
        <LanguageHobbySection languages={portfolio.languages} hobbies={portfolio.hobbies} awards={portfolio.awards} />
        <FooterSection person={portfolio.person} contact={portfolio.contact} />
      </main>
    </div>
  );
}
