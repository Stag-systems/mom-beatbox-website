import { useEffect, useRef } from 'react';
import { siteConfig } from '../content/siteConfig';
import { getLocalizedText, Language } from '../lib/i18n';

interface WhatWeDoProps {
  language: Language;
}

export function WhatWeDo({ language }: WhatWeDoProps) {
  const title = getLocalizedText(siteConfig.whatWeDoCopy.title, language);
  const titleLines = title.split('\n');
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const isAdjusting = useRef(false);
  const tripledItems = [
    ...siteConfig.whatWeDo,
    ...siteConfig.whatWeDo,
    ...siteConfig.whatWeDo
  ];

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    const setWidth = carousel.scrollWidth / 3;
    carousel.scrollLeft = setWidth;
  }, []);

  const handleScroll = () => {
    const carousel = carouselRef.current;
    if (!carousel || isAdjusting.current) return;

    const setWidth = carousel.scrollWidth / 3;
    const left = carousel.scrollLeft;
    const min = setWidth * 0.25;
    const max = setWidth * 1.75;

    if (left < min) {
      isAdjusting.current = true;
      carousel.scrollLeft = left + setWidth;
      requestAnimationFrame(() => {
        isAdjusting.current = false;
      });
    } else if (left > max) {
      isAdjusting.current = true;
      carousel.scrollLeft = left - setWidth;
      requestAnimationFrame(() => {
        isAdjusting.current = false;
      });
    }
  };

  return (
    <section id="service" className="bg-black py-24 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <p className="text-xs font-medium tracking-[0.3em] uppercase text-gray-400 mb-4">
            {getLocalizedText(siteConfig.whatWeDoCopy.eyebrow, language)}
          </p>
          <h2 className="text-5xl font-black tracking-tight text-white sm:text-6xl md:text-7xl">
            {titleLines.map((line, index) => (
              <span key={`${line}-${index}`}>
                {line}
                {index < titleLines.length - 1 && <br />}
              </span>
            ))}
          </h2>
        </div>

        <div className="mt-20 md:hidden">
          <div
            ref={carouselRef}
            onScroll={handleScroll}
            className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 px-6"
          >
            {tripledItems.map((item, index) => (
              <div
                key={`${item.key}-${index}`}
                className="group relative min-w-[80%] snap-center overflow-hidden bg-black"
              >
                {/* Image placeholder */}
                <div className="relative mb-6 aspect-[3/4] overflow-hidden bg-gray-800">
                  <img
                    src="/placeholder.svg"
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover opacity-20"
                    aria-hidden="true"
                  />
                  <div className="relative flex h-full w-full items-center justify-center bg-gradient-to-br from-gray-700/80 to-gray-900/80">
                    <span className="text-6xl">{item.icon}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="mb-3 text-2xl font-black text-white uppercase tracking-wide">
                  {getLocalizedText(item.title, language)}
                </h3>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 hidden gap-6 md:grid md:grid-cols-2 lg:grid-cols-4">
          {siteConfig.whatWeDo.map((item) => (
            <div
              key={item.key}
              className="group relative overflow-hidden bg-black"
            >
              {/* Image placeholder */}
              <div className="relative mb-6 aspect-[3/4] overflow-hidden bg-gray-800">
                <img
                  src="/placeholder.svg"
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover opacity-20"
                  aria-hidden="true"
                />
                <div className="relative flex h-full w-full items-center justify-center bg-gradient-to-br from-gray-700/80 to-gray-900/80">
                  <span className="text-6xl">{item.icon}</span>
                </div>
              </div>

              {/* Title */}
              <h3 className="mb-3 text-2xl font-black text-white uppercase tracking-wide">
                {getLocalizedText(item.title, language)}
              </h3>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <a
            href="#contact"
            className="inline-block rounded-[6px] border-2 border-white px-10 py-3 text-sm font-medium tracking-wider uppercase text-white transition-all hover:bg-white hover:text-black focus:outline-none"
          >
            {getLocalizedText(siteConfig.whatWeDoCopy.ctaLabel, language)}
          </a>
        </div>
      </div>
    </section>
  );
}
