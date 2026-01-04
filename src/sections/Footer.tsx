import { siteConfig } from '../content/siteConfig';

export function Footer() {
  return (
    <footer className="border-t border-white/10 border-hairline py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div className="flex flex-col items-center gap-4 md:items-start">
            <a href="#hero" className="inline-flex items-center">
              <img src="/Logo.svg" alt="MOM logo" className="h-28 w-auto" />
            </a>
          </div>

          <div id="downloads" className="text-center md:text-right">
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-white/60">
              Downloads
            </p>
            <div className="mt-4 space-y-2">
              <a
                href="/press-kit.pdf"
                download
                className="block text-sm uppercase tracking-wide text-white/70 underline underline-offset-4 transition hover:text-white"
              >
                Press kit
              </a>
              <a
                href="/technical-rider.pdf"
                download
                className="block text-sm uppercase tracking-wide text-white/70 underline underline-offset-4 transition hover:text-white"
              >
                Technical rider
              </a>
              <a
                href="/imprint.html"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm uppercase tracking-wide text-white/70 underline underline-offset-4 transition hover:text-white"
              >
                Imprint
              </a>
            </div>
          </div>
        </div>
        <div className="mt-10 flex flex-col items-center gap-4 border-t border-white/10 border-hairline pt-6 text-center text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <p>
            MORE THAN BEATBOX
            <br />
            Copyright © 2025 MOM. All rights reserved.
          </p>
          <div className="flex items-center justify-center gap-4">
            <a
              href={siteConfig.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-white transition"
              aria-label="Instagram"
            >
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4Zm10 2H7a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Zm-5 3.2A3.8 3.8 0 1 1 8.2 12 3.8 3.8 0 0 1 12 8.2Zm0 2A1.8 1.8 0 1 0 13.8 12 1.8 1.8 0 0 0 12 10.2Zm4.7-2.9a1 1 0 1 1-1 1 1 1 0 0 1 1-1Z" />
              </svg>
            </a>
            <a
              href={siteConfig.social.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-white transition"
              aria-label="YouTube"
            >
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M23.5 6.2a2.9 2.9 0 0 0-2-2.1C19.7 3.5 12 3.5 12 3.5s-7.7 0-9.5.6a2.9 2.9 0 0 0-2 2.1A30.7 30.7 0 0 0 0 12a30.7 30.7 0 0 0 .5 5.8 2.9 2.9 0 0 0 2 2.1c1.8.6 9.5.6 9.5.6s7.7 0 9.5-.6a2.9 2.9 0 0 0 2-2.1A30.7 30.7 0 0 0 24 12a30.7 30.7 0 0 0-.5-5.8ZM9.7 15.5V8.5l6.2 3.5-6.2 3.5Z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
