import { Header } from './components/Header';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { LogoSlider } from './sections/LogoSlider';
import { WhatWeDo } from './sections/WhatWeDo';
import { YouTube } from './sections/YouTube';
import { Calendar } from './sections/Calendar';

function App() {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <Hero />
      <About />
      <LogoSlider />
      <WhatWeDo />
      <YouTube />
      <Calendar />
    </div>
  );
}

export default App;
