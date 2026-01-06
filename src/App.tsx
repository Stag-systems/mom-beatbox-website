import { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { LogoSlider } from './sections/LogoSlider';
import { WhatWeDo } from './sections/WhatWeDo';
import { YouTube } from './sections/YouTube';
import { Calendar } from './sections/Calendar';
import { Contact } from './sections/Contact';
import { Footer } from './sections/Footer';
import { Language } from './lib/i18n';
import { siteConfig } from './content/siteConfig';

const STORAGE_KEY = 'mom-language';
function App() {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window === 'undefined') return siteConfig.language.default;
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === 'de' ? 'de' : siteConfig.language.default;
  });
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((current) => (current === 'en' ? 'de' : 'en'));
  };

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Header language={language} onToggleLanguage={toggleLanguage} />
      <div className="fixed inset-0 z-0">
        <Hero language={language} />
      </div>
      <div className="h-screen" aria-hidden="true" />
      <div className="relative z-10 bg-[#060a12]">
        <About language={language} />
        <LogoSlider language={language} />
        <WhatWeDo language={language} />
        <YouTube language={language} />
        <Calendar language={language} />
        <Contact language={language} />
        <Footer />
      </div>
    </div>
  );
}

export default App;
