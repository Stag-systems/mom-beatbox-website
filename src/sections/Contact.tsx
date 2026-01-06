import { siteConfig } from '../content/siteConfig';
import { getLocalizedText, Language } from '../lib/i18n';

interface ContactProps {
  language: Language;
}

export function Contact({ language }: ContactProps) {
  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
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

        <form
          id="contact-form"
          action={`mailto:${siteConfig.hero.bookingEmail}`}
          method="post"
          encType="text/plain"
          className="rounded-[6px] bg-white p-6 text-black shadow-sm md:p-10"
        >
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-[0.2em] text-black/70" htmlFor="contact-to">
              {getLocalizedText(siteConfig.contactCopy.fields.to, language)}
            </label>
            <input
              id="contact-to"
              name="to"
              type="email"
              value={siteConfig.hero.bookingEmail}
              readOnly
              aria-readonly="true"
              className="w-full cursor-not-allowed rounded-[6px] border border-black/20 border-hairline bg-black/5 px-4 py-3 text-sm text-black/70 focus:outline-none"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-[0.2em] text-black/70" htmlFor="contact-name">
                {getLocalizedText(siteConfig.contactCopy.fields.name, language)}
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                className="w-full rounded-[6px] border border-black/20 border-hairline bg-white px-4 py-3 text-sm text-black placeholder-black/30 focus:outline-none focus:ring-2 focus:ring-black/20 focus:ring-offset-2 focus:ring-offset-white"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-[0.2em] text-black/70" htmlFor="contact-email">
                {getLocalizedText(siteConfig.contactCopy.fields.email, language)}
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                className="w-full rounded-[6px] border border-black/20 border-hairline bg-white px-4 py-3 text-sm text-black placeholder-black/30 focus:outline-none focus:ring-2 focus:ring-black/20 focus:ring-offset-2 focus:ring-offset-white"
              />
            </div>
          </div>

          <div className="mt-4 space-y-2">
            <label className="text-xs uppercase tracking-[0.2em] text-black/70" htmlFor="contact-subject">
              {getLocalizedText(siteConfig.contactCopy.fields.subject, language)}
            </label>
            <input
              id="contact-subject"
              name="subject"
              type="text"
              className="w-full rounded-[6px] border border-black/20 border-hairline bg-white px-4 py-3 text-sm text-black placeholder-black/30 focus:outline-none focus:ring-2 focus:ring-black/20 focus:ring-offset-2 focus:ring-offset-white"
            />
          </div>

          <div className="mt-4 space-y-2">
              <label className="text-xs uppercase tracking-[0.2em] text-black/70" htmlFor="contact-message">
                {getLocalizedText(siteConfig.contactCopy.fields.message, language)}
              </label>
              <textarea
                id="contact-message"
                name="body"
                rows={5}
              className="w-full resize-none rounded-[6px] border border-black/20 border-hairline bg-white px-4 py-3 text-sm text-black placeholder-black/30 focus:outline-none focus:ring-2 focus:ring-black/20 focus:ring-offset-2 focus:ring-offset-white"
            />
          </div>

        </form>
        <div className="mt-6 flex justify-center">
          <button
            type="submit"
            form="contact-form"
            className="rounded-[6px] border border-black/20 bg-white px-12 py-2.5 text-sm font-medium uppercase tracking-wider text-black transition hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-black/20 focus:ring-offset-2 focus:ring-offset-white"
          >
            {getLocalizedText(siteConfig.contactCopy.fields.send, language)}
          </button>
        </div>
      </div>
    </section>
  );
}
