import { createFileRoute } from '@tanstack/react-router';
import { GodrayCanvas } from '@/components/effects/godray-canvas';
import { NoiseGrain } from '@/components/effects/noise-grain';
import { DemoSection } from '@/sections/demo/demo-section';
import { FaqSection } from '@/sections/faq-section';
import { FeaturesSection } from '@/sections/features-section';
import { HeroSection } from '@/sections/hero/hero-section';

export const Route = createFileRoute('/')({
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <GodrayCanvas />
      <NoiseGrain />
      <HeroSection />
      <DemoSection />
      <FeaturesSection />
      <FaqSection />
    </>
  );
}
