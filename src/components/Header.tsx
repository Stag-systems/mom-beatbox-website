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
        isScrolled ? 'bg-black/90 backdrop-blur-sm' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <a
            href="#hero"
            className="text-2xl font-bold tracking-tight text-white hover:text-gray-300 transition-colors"
          >
            MOM
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
            <button
              type="button"
              onClick={onToggleLanguage}
              className="flex h-8 w-8 items-center justify-center rounded-[6px] border border-white/30 text-sm text-white hover:border-white hover:bg-white/10 transition-colors"
              aria-label={getLocalizedText(siteConfig.language.toggleLabel, language)}
              title={getLocalizedText(siteConfig.language.toggleLabel, language)}
            >
              <span aria-hidden="true">{language === 'en' ? '🇬🇧' : '🇩🇪'}</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden rounded-[6px] p-1 text-white hover:bg-white/10"
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
          <ul className="mt-4 space-y-3 rounded-[6px] border border-white/10 bg-black/95 p-4">
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
