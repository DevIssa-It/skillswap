'use client';

import { Navbar } from './Navbar';
import { HeroSection } from './HeroSection';
import { StatsSection } from './StatsSection';
import { SkillCategoriesSection } from './SkillCategoriesSection';
import { HowItWorksSection } from './HowItWorksSection';
import { StoriesSection } from './StoriesSection';
import { Footer } from './Footer';

export function HomeView() {
  return (
    <div className="min-h-screen bg-[#080302] overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <StatsSection />
      <SkillCategoriesSection />
      <HowItWorksSection />
      <StoriesSection />
      <Footer />
    </div>
  );
}
