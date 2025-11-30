import HeroSection from './components/landing/HeroSection';
import ScrollPhoto from './components/landing/ScrollPhoto';
import { TextScroll } from './components/landing/TesxtScroll';
import Testimonial from './components/landing/Testimonial';
import CTA from './components/landing/CTA';

export default function LandingPage() {
  return (
    <main>
      <HeroSection />
      <ScrollPhoto />
      {<TextScroll/> }
      {<Testimonial />}
      { <CTA /> }
    </main>
  );
}