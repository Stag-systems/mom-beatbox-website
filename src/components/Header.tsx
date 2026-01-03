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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: getLocalizedText(siteConfig.navigation.about, language), href: '#about' },
    { name: getLocalizedText(siteConfig.navigation.service, language), href: '#service' },
    { name: getLocalizedText(siteConfig.navigation.music, language), href: '#music' },
    { name: getLocalizedText(siteConfig.navigation.events, language), href: '#events' },
    { name: getLocalizedText(siteConfig.navigation.downloads, language), href: '#downloads' },
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
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <a
            href="#hero"
            className="flex items-center text-white hover:text-gray-300 transition-colors"
          >
            <img
              src="/Logo.svg"
              alt="MOM logo"
              className="h-8 w-auto sm:h-9"
              loading="eager"
            />
          </a>

          {/* Navigation Links */}
          <ul className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="text-sm font-medium text-white hover:text-gray-300 transition-colors uppercase tracking-wide"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsLangOpen((open) => !open)}
                className="flex items-center gap-2 rounded-[6px] bg-white px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-black shadow-md transition hover:shadow-lg"
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

            {/* Mobile Menu Button */}
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
          </ul>
        </div>
      </nav>
    </header>
  );
}
