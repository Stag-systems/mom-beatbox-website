import { siteConfig } from '../content/siteConfig';

export function WhatWeDo() {
  return (
    <section id="service" className="bg-black py-24 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <p className="text-xs font-medium tracking-[0.3em] uppercase text-gray-400 mb-4">
            USED BY GLOBAL POWERHOUSE
          </p>
          <h2 className="text-5xl font-black tracking-tight text-white sm:text-6xl md:text-7xl">
            POWER UND ECHTE<br />PUBLIKUMSNÄHE AUF JEDER<br />BÜHNE
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3 mt-20">
          {siteConfig.whatWeDo.map((item, index) => (
            <div
              key={item.title}
              className="group relative overflow-hidden bg-black"
            >
              {/* Image placeholder */}
              <div className="aspect-[3/4] bg-gray-800 mb-6 overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
                  <span className="text-6xl">{item.icon}</span>
                </div>
              </div>

              {/* Title */}
              <h3 className="mb-3 text-2xl font-black text-white uppercase tracking-wide">
                {item.title}
              </h3>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <a
            href="#contact"
            className="inline-block border-2 border-white px-10 py-3 text-sm font-medium tracking-wider uppercase text-white transition-all hover:bg-white hover:text-black focus:outline-none"
          >
            JETZT ANFRAGEN
          </a>
        </div>
      </div>
    </section>
  );
}
