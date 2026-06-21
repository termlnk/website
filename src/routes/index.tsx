import { createFileRoute } from '@tanstack/react-router';
import { NoiseGrain } from '@/components/effects/noise-grain';
import { BentoSection } from '@/sections/bento/bento-section';
import { FaqSection } from '@/sections/faq-section';
import { GettingStartedSection } from '@/sections/getting-started-section';
import { HeroSection } from '@/sections/hero/hero-section';

export const Route = createFileRoute('/')({
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <NoiseGrain />
      <HeroSection />
      <BentoSection />
      <GettingStartedSection />
      <FaqSection />
    </>
  );
}
