"use client";

import Image from "next/image";
import Navigation from "./component/navigation";
import VerticalNav from "./component/vertical-nav";
import { useScrollReveal } from "./hooks/useScrollReveal";
import {
  IconBrandLinkedin,
  IconBrandWhatsapp,
  IconPhoneCall,
  IconMail,
  IconPhone,
} from "@tabler/icons-react";
import EduScreen from "./Screen/EduScreen";
import ExperienceScreen from "./Screen/ExperienceScreen";
import RecommendationScreen from "./Screen/RecommendationScreen";

export default function Home() {
  const heroRef = useScrollReveal();
  const whoAmIRef = useScrollReveal();
  const edu = useScrollReveal();
  const exp = useScrollReveal();
  const recom = useScrollReveal();

  return (
    <div className="relative">
      <Navigation />
      <VerticalNav />
      <main className="flex flex-col gap-8 sm:gap-6 items-center sm:items-start px-4 sm:px-10 py-6 sm:py-10">
        <section id="home" ref={heroRef} className="w-full h-screen grid grid-cols-1 md:grid-cols-3 gap-8 items-center scroll-reveal">
          <div className=" col-span-2 space-y-4 border border-black/5 rounded-2xl p-6 sm:p-8 fade-in   hover:border-b-2 hover:border-blue-900 hover:drop-shadow-blue-950 hover:drop-shadow-2xl duration-500 ease-in">
            <h1 className="text-4xl sm:text-6xl font-bold accent slide-up">I AM</h1>
            <h1 className=" text-4xl sm:text-6xl font-bold accent slide-up" style={{ animationDelay: '60ms' }}>
              Kumari Kadial @ Ju Ju
            </h1>
            <p className=" mt-11 text-blue-950 text-lg font-semibold max-w-prose slide-up" style={{ animationDelay: '120ms' }}>
              I am a person who is Guided by solutions, powered by results,
              and always elevating through learning and new challenging opportunities.
            </p>
            <div className="mt-11 flex flex-wrap items-center gap-2 slide-up" style={{ animationDelay: '180ms' }}>
              <a href="mailto:someone@example.com" className="btn-minimal flex items-center gap-2 text-sm hover-lift">
                <IconMail className="w-4 h-4" /> Email
              </a>
              <a href="tel:+123456789" className="btn-minimal flex items-center gap-2 text-sm hover-lift">
                <IconPhone className="w-4 h-4" /> Call
              </a>
              <a href="#projects" className="btn-minimal flex items-center gap-2 text-sm hover-lift">
                <IconBrandWhatsapp className="w-4 h-4" /> Whatsapp
              </a>
              <a href="#projects" className="btn-minimal flex items-center gap-2 text-sm hover-lift">
                <IconPhoneCall className="w-4 h-4" /> Viber
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="btn-minimal flex items-center gap-2 text-sm hover-lift">
                <IconBrandLinkedin className="w-4 h-4" /> LinkedIn
              </a>
            </div>
          </div>

          <div className=" col-span-1 flex justify-center md:justify-end fade-in" style={{ animationDelay: '200ms' }}>
            <div className="relative group">
              <div className="absolute -inset-4 bg-transparent rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
              <Image src="/pp_bgremove.png" width={300} height={300} alt="profile" className="relative hover-lift drop-shadow-2xl float-animation" />
            </div>
          </div>
        </section>

        <section id="whoAmI" ref={whoAmIRef} className="w-full min-h-screen space-y-8 scroll-reveal">
          {/* Section Header */}


          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">

            {/* Right Side - Content */}
            <div className="space-y-6 col-span-2">
              <div className="relative w-10/12 mx-auto">
                <div className="absolute  mx-auto inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-2xl transform rotate-1"></div>
                <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-white/30 shadow-lg">
                  <h3 className="text-2xl font-bold text-gray-800 mb-6">Professional Journey</h3>
                  <p className="text-gray-700 leading-relaxed text-lg mb-6">
                    I am a dedicated Logistics Specialist with over three years of practical experience and a strong academic foundation from various universities and colleges.
                  </p>
                  <p className="text-gray-700 leading-relaxed text-lg mb-6">
                    My role at Nordic Group Limited has involved collaborating with leading industry players such as <span className="font-semibold text-blue-900">Maersk, MSC, DHL, Kuehne+Nagel, and DB Schenker</span>.
                  </p>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    This diverse experience has refined my expertise in logistics and supply chain management, with a strong focus on compliance standards. I am enthusiastic about leveraging my skills to make impactful contributions and drive success to your esteemed organization.
                  </p>
                </div>
              </div>

              {/* Industry Sectors */}
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4 sm:p-6 w-10/12 mx-auto backdrop-blur-2xl drop-shadow-2xl">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">Industry Expertise</h4>
                <div className="flex flex-wrap gap-2">
                  {['Garment Trading', 'Automotive', 'Pharmaceuticals', 'Food & Beverage', 'Chemicals', 'NGO/INGO'].map((sector, index) => (
                    <span key={index} className="px-3 py-1 bg-white rounded-full text-sm text-gray-700 border border-gray-200 hover:bg-blue-50 hover:border-blue-300 transition-colors duration-200">
                      {sector}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Background Decorative Elements */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-200/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-200/20 rounded-full blur-3xl"></div>
          </div>
        </section>

        {/* Education Section */}
        <section id="education" ref={edu} className="w-full min-h-screen flex flex-col items-center space-y-4 justify-center scroll-reveal">
          <div className="text-center space-y-4">
            <h2 className="text-4xl sm:text-5xl font-bold accent slide-up">Accomplished Academic Achievements</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-900 to-purple-200 mx-auto rounded-full"></div>
          </div>

          <EduScreen />

        </section>

        {/* Experience Section */}
        <section id="experiences" ref={exp} className="w-full min-h-screen flex items-center justify-center scroll-reveal">
          <div className="text-center space-y-4">
            <ExperienceScreen/>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="w-full min-h-screen flex items-center justify-center scroll-reveal">
          <div className="text-center space-y-4">
            <h2 className="text-4xl sm:text-5xl font-bold accent">Projects</h2>
            <p className="text-gray-600 text-lg">Coming Soon...</p>
          </div>
        </section>

        {/* Recommendations Section */}
        <section id="recommendations" className="w-full min-h-screen flex items-center justify-center scroll-reveal">
          <div className="text-center space-y-4">
            <RecommendationScreen/>
            </div>
        </section>

      </main>
    </div>
  );
}

