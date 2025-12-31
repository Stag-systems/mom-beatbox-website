import { siteConfig } from '../content/siteConfig';

export function About() {
  return (
    <section id="about" className="bg-black py-24 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <p className="text-xs font-medium tracking-[0.3em] uppercase text-gray-400 mb-4">
            ABOUT US
          </p>
          <h2 className="text-5xl font-black tracking-tight text-white sm:text-6xl md:text-7xl">
            WORLD CHAMPION<br />BEATBOX CREW
          </h2>
        </div>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Image */}
          <div className="relative aspect-square overflow-hidden bg-gray-900 lg:aspect-auto lg:h-[500px]">
            <img
              src={siteConfig.about.imagePlaceholder}
              alt="MOM Beatbox Crew"
              className="h-full w-full object-cover grayscale"
              loading="lazy"
            />
          </div>

          {/* Text Content */}
          <div className="space-y-8">
            <p className="text-base leading-relaxed text-gray-300">
              {siteConfig.about.text}
            </p>
            
            {/* Crew Members */}
            <div className="border-2 border-blue-500 p-6 space-y-4">
              <h3 className="text-xs font-medium tracking-[0.3em] uppercase text-white mb-6">
                CREW MITGLIEDER
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-gray-700 pb-3">
                  <span className="text-2xl font-black text-white">GEORGY</span>
                  <span className="text-white text-2xl">+</span>
                </div>
                <div className="flex items-center justify-between border-b border-gray-700 pb-3">
                  <span className="text-2xl font-black text-white">TIM</span>
                  <span className="text-white text-2xl">+</span>
                </div>
                <div className="flex items-center justify-between pb-3">
                  <span className="text-2xl font-black text-white">ELIAS</span>
                  <span className="text-white text-2xl">+</span>
                </div>
              </div>
            </div>

            <a
              href="#events"
              className="inline-block border-2 border-gray-600 px-8 py-3 text-sm font-medium tracking-wider uppercase text-white transition-all hover:bg-white hover:text-black hover:border-white focus:outline-none"
            >
              KALENDER
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
