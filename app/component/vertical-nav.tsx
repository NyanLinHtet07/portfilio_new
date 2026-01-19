"use client";

import React, { useState, useEffect } from "react";
import {
    IconHome,
    IconUser,
    IconSchool,
    IconBriefcase,
    IconCode,
    IconStar,
    IconChevronUp,
    IconChevronDown
} from "@tabler/icons-react";

    const sections = [
        { id: "home", label: "Home", icon: IconHome },
        { id: "whoAmI", label: "About", icon: IconUser },
        { id: "education", label: "Education", icon: IconSchool },
        { id: "experiences", label: "Experience", icon: IconBriefcase },
        { id: "projects", label: "Projects", icon: IconCode },
        { id: "recommendations", label: "Reviews", icon: IconStar },
    ];

const VerticalNav = () => {
    const [activeSection, setActiveSection] = useState("home");
    const [isVisible, setIsVisible] = useState(true);



    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;

            // Show/hide nav based on scroll position
            setIsVisible(scrollY > 100);

            // Determine active section based on scroll position
            sections.forEach((section) => {
                const element = document.getElementById(section.id);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= windowHeight / 2 && rect.bottom >= windowHeight / 2) {
                        setActiveSection(section.id);
                    }
                }
            });
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const scrollToBottom = () => {
        window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    };

    return (
        <div className={`fixed right-2 sm:right-4 top-1/2 transform -translate-y-1/2 z-50 transition-all duration-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
            } hidden md:block`}>
            <div className="flex flex-col items-center space-y-2 bg-white/90 backdrop-blur-md rounded-2xl p-3 shadow-lg border border-black/10">
                {/* Scroll to top button */}
                <button
                    onClick={scrollToTop}
                    className="p-2 rounded-full hover:bg-blue-50 transition-colors duration-200 group"
                    aria-label="Scroll to top"
                >
                    <IconChevronUp className="w-4 h-4 text-gray-600 group-hover:text-blue-900" />
                </button>

                {/* Section navigation dots */}
                <div className="flex flex-col space-y-3">
                    {sections.map((section) => {
                        const IconComponent = section.icon;
                        const isActive = activeSection === section.id;

                        return (
                            <button
                                key={section.id}
                                onClick={() => scrollToSection(section.id)}
                                className={`relative p-3 rounded-full transition-all duration-300 group ${isActive
                                    ? 'bg-blue-900 text-white shadow-lg scale-110'
                                    : 'bg-white/70 text-gray-600 hover:bg-blue-50 hover:text-blue-900'
                                    }`}
                                aria-label={`Go to ${section.label}`}
                            >
                                <IconComponent className="w-5 h-5" />

                                {/* Tooltip */}
                                <div className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                                    {section.label}
                                </div>

                                {/* Active indicator */}
                                {isActive && (
                                    <div className="absolute -right-1 top-1/2 transform -translate-y-1/2 w-1 h-6 bg-blue-900 rounded-full"></div>
                                )}
                            </button>
                        );
                    })}
                </div>

                {/* Scroll to bottom button */}
                <button
                    onClick={scrollToBottom}
                    className="p-2 rounded-full hover:bg-blue-50 transition-colors duration-200 group"
                    aria-label="Scroll to bottom"
                >
                    <IconChevronDown className="w-4 h-4 text-gray-600 group-hover:text-blue-600" />
                </button>
            </div>
        </div>
    );
};

export default VerticalNav;
