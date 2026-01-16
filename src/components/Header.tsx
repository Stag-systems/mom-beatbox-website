import { useState, useEffect } from 'react';
import { siteConfig } from '../content/siteConfig';
import { getLocalizedText, Language } from '../lib/i18n';

interface HeaderProps {
  language: Language;
  onToggleLanguage: () => void;
}

export function Header({ language, onToggleLanguage }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks
      .map((link) => document.querySelector(link.href))
      .filter((section): section is HTMLElement => Boolean(section));

    const onScroll = () => {
      if (window.scrollY < 200) {
        setActiveSection('');
        return;
      }
      const offset = 140;
      const current = sections.find((section) => {
        const rect = section.getBoundingClientRect();
        return rect.top <= offset && rect.bottom > offset;
      });
      if (current) {
        setActiveSection(`#${current.id}`);
      }
    };

    onScroll();
    window.addEventListener('scroll', onScroll);
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [language]);

  const navLinks = [
    { name: getLocalizedText(siteConfig.navigation.about, language), href: '#about' },
    { name: getLocalizedText(siteConfig.navigation.service, language), href: '#service' },
    { name: getLocalizedText(siteConfig.navigation.music, language), href: '#music' },
    { name: getLocalizedText(siteConfig.navigation.events, language), href: '#events' },
    { name: getLocalizedText(siteConfig.navigation.downloads, language), href: '#footer' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-black/50 backdrop-blur-md border-b border-white/10 border-hairline'
          : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center">

          {/* Navigation Links */}
          <ul className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  onClick={() => setActiveSection(link.href)}
                  className={`text-xs font-medium uppercase tracking-wide transition-colors ${
                    activeSection === link.href
                      ? 'text-white border-b border-white'
                      : 'text-white/80 hover:text-white'
                  }`}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>

          {/* Center Logo (desktop), left on mobile */}
          <a
            href="#hero"
            className="flex items-center text-white hover:text-gray-300 transition-colors md:absolute md:left-1/2 md:-translate-x-1/2"
          >
            <img
              src="/Logo.svg"
              alt="MOM logo"
              className="h-8 w-auto sm:h-9"
              loading="eager"
            />
          </a>

          <div className="ml-auto flex items-center gap-4">
            <div className="hidden md:flex items-center gap-4">
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-white transition"
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
                href={siteConfig.social.spotify}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-white transition"
                aria-label="Spotify"
              >
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12 0C5.371 0 0 5.371 0 12s5.371 12 12 12 12-5.371 12-12S18.629 0 12 0zm5.438 17.273a.748.748 0 0 1-1.03.248c-2.824-1.726-6.382-2.117-10.575-1.163a.75.75 0 0 1-.333-1.463c4.553-1.037 8.436-.59 11.563 1.324a.75.75 0 0 1 .375 1.054zm1.473-3.285a.937.937 0 0 1-1.289.31c-3.233-1.986-8.163-2.561-11.986-1.401a.937.937 0 0 1-.543-1.793c4.373-1.327 9.803-.684 13.498 1.566a.937.937 0 0 1 .32 1.318zm.126-3.422c-3.876-2.304-10.297-2.514-13.979-1.397a1.125 1.125 0 0 1-.653-2.153c4.213-1.279 11.219-1.032 15.659 1.616a1.125 1.125 0 0 1-1.151 1.934z" />
                </svg>
              </a>
              <a
                href={siteConfig.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-white transition"
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
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsLangOpen((open) => !open)}
                className="hidden md:flex items-center gap-2 rounded-[6px] bg-white px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-black shadow-md transition hover:shadow-lg"
                aria-label={getLocalizedText(siteConfig.language.toggleLabel, language)}
                title={getLocalizedText(siteConfig.language.toggleLabel, language)}
                aria-expanded={isLangOpen}
                aria-haspopup="menu"
              >
                <span aria-hidden="true">
                  {language === 'en' ? 'EN 🇬🇧' : 'DE 🇩🇪'}
                </span>
                <svg
                  className="h-3 w-3"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path d="M5 7l5 6 5-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {isLangOpen && (
                <div
                  className="absolute right-0 mt-2 w-24 rounded-[6px] bg-white p-1 text-xs font-semibold uppercase tracking-wider text-black shadow-lg hidden md:block"
                  role="menu"
                >
                  <button
                    type="button"
                    onClick={() => {
                      if (language !== 'en') onToggleLanguage();
                      setIsLangOpen(false);
                    }}
                    className="block w-full rounded-[4px] px-2 py-1 text-left hover:bg-black/5"
                    role="menuitem"
                  >
                    EN 🇬🇧
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (language !== 'de') onToggleLanguage();
                      setIsLangOpen(false);
                    }}
                    className="block w-full rounded-[4px] px-2 py-1 text-left hover:bg-black/5"
                    role="menuitem"
                  >
                    DE 🇩🇪
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="relative md:hidden">
              <button
                type="button"
                onClick={() => setIsLangOpen((open) => !open)}
                className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-white/80 transition hover:text-white"
                aria-label={getLocalizedText(siteConfig.language.toggleLabel, language)}
                title={getLocalizedText(siteConfig.language.toggleLabel, language)}
                aria-expanded={isLangOpen}
                aria-haspopup="menu"
              >
                <span aria-hidden="true">{language === 'en' ? 'EN' : 'DE'}</span>
                <svg
                  className="h-3 w-3"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path d="M5 7l5 6 5-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {isLangOpen && (
                <div
                  className="absolute right-0 mt-2 w-24 rounded-[6px] bg-white p-1 text-xs font-semibold uppercase tracking-wider text-black shadow-lg"
                  role="menu"
                >
                  <button
                    type="button"
                    onClick={() => {
                      if (language !== 'en') onToggleLanguage();
                      setIsLangOpen(false);
                    }}
                    className="block w-full rounded-[4px] px-2 py-1 text-left hover:bg-black/5"
                    role="menuitem"
                  >
                    EN 🇬🇧
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (language !== 'de') onToggleLanguage();
                      setIsLangOpen(false);
                    }}
                    className="block w-full rounded-[4px] px-2 py-1 text-left hover:bg-black/5"
                    role="menuitem"
                  >
                    DE 🇩🇪
                  </button>
                </div>
              )}
            </div>
            <button
              className="md:hidden p-1 text-white"
              aria-label={getLocalizedText(siteConfig.accessibility.menuToggle, language)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              onClick={() => setIsMenuOpen((open) => !open)}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>

        <div
          id="mobile-menu"
          className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}
        >
          <ul className="glass-panel mt-4 space-y-3 rounded-[6px] p-4">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="block text-sm font-medium uppercase tracking-wide text-white/90 hover:text-white"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </a>
              </li>
            ))}
            <li className="flex items-center gap-4 pt-2">
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-white transition"
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
                href={siteConfig.social.spotify}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-white transition"
                aria-label="Spotify"
              >
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12 0C5.371 0 0 5.371 0 12s5.371 12 12 12 12-5.371 12-12S18.629 0 12 0zm5.438 17.273a.748.748 0 0 1-1.03.248c-2.824-1.726-6.382-2.117-10.575-1.163a.75.75 0 0 1-.333-1.463c4.553-1.037 8.436-.59 11.563 1.324a.75.75 0 0 1 .375 1.054zm1.473-3.285a.937.937 0 0 1-1.289.31c-3.233-1.986-8.163-2.561-11.986-1.401a.937.937 0 0 1-.543-1.793c4.373-1.327 9.803-.684 13.498 1.566a.937.937 0 0 1 .32 1.318zm.126-3.422c-3.876-2.304-10.297-2.514-13.979-1.397a1.125 1.125 0 0 1-.653-2.153c4.213-1.279 11.219-1.032 15.659 1.616a1.125 1.125 0 0 1-1.151 1.934z" />
                </svg>
              </a>
              <a
                href={siteConfig.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-white transition"
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
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
