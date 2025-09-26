import Image from "next/image";
import Navigation from "./component/navigation";
import {
  IconBrandLinkedin,
  IconBrandWhatsapp,
  IconPhoneCall,
  IconMail,
  IconPhone
} from "@tabler/icons-react";

export default function Home() {
  return (
    <div className="">
      <Navigation />
      <main className="flex flex-col gap-8 sm:gap-6 items-center sm:items-start px-4 sm:px-10 py-6 sm:py-10">
        <section className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
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
            <Image src="/pp_bgremove.png" width={300} height={300} alt="profile" className="hover-lift rounded-xl border" />
          </div>
        </section>

        {/* <h1 className="text-[32px] sm:text-[48px] font-bold text-center">
          The Best Website will be here soon.
        </h1> */}

      </main>
    </div>
  );
}

