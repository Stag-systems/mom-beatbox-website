import { siteConfig } from '../content/siteConfig';
import { getLocalizedText, Language } from '../lib/i18n';

interface ContactProps {
  language: Language;
}

export function Contact({ language }: ContactProps) {
  return (
    <section
      id="contact"
      className="relative py-24 px-4 sm:px-6 lg:px-8"
    >
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[260px] w-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/15 blur-[70px] md:h-[350px] md:w-[350px]"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <p className="text-xs font-medium tracking-[0.3em] uppercase text-gray-300 mb-[6px]">
            {getLocalizedText(siteConfig.contactCopy.eyebrow, language)}
          </p>
          <h2 className="text-[2.16rem] leading-[1.1] font-black tracking-[0.02em] text-white uppercase sm:text-6xl md:text-7xl">
            {getLocalizedText(siteConfig.contactCopy.title, language)}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-gray-300">
            {getLocalizedText(siteConfig.contactCopy.description, language)}
          </p>
        </div>
        <div className="flex justify-center">
          <a
            href={`mailto:${siteConfig.hero.bookingEmail}`}
            className="rounded-[6px] bg-white px-12 py-2.5 text-sm font-medium uppercase tracking-wider text-black transition hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-white/60 focus:ring-offset-2 focus:ring-offset-black"
          >
            {getLocalizedText(siteConfig.contactCopy.ctaLabel, language)}
          </a>
        </div>
      </div>
    </section>
  );
}
