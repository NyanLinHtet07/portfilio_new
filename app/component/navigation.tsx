import React from "react";
import Image from "next/image";

const Navigation = () => {
    return (
        <nav className="mt-3 mx-4 rounded-2xl px-2 py-3 sm:px-4 sm:py-3 border border-black/5 bg-white/70 fade-in drop-shadow-2xl">
            <div className="flex items-center justify-between">
                <a className="flex items-center gap-3 hover-lift" href="#home" aria-label="Home">
                    <Image src="/logo.png" width={40} height={40} alt="Logo" className="object-cover" />
                    <span className="hidden sm:inline text-lg font-semibold tracking-wide accent">Kumari Kadial</span>
                </a>

                <div className="hidden md:flex items-center gap-4 text-xs tracking-wide">
                    <a className="btn-minimal link-underline" href="#education">Education</a>
                    <a className="btn-minimal link-underline" href="#experiences">Experiences</a>
                    <a className="btn-minimal link-underline" href="#projects">Projects</a>
                    <a className="btn-minimal link-underline" href="#recommendations">Recommendations</a>
                </div>

                <button className="md:hidden btn-minimal hover-lift" aria-label="Open menu">
                    <span className="sr-only">Open menu</span>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                </button>
            </div>
        </nav>

    )
}

export default Navigation;