import React from 'react';
import Seo from '@/components/Seo';
import Hero from '@/components/home/Hero';
import { StatsStrip, ServicesGrid, ProcessRail, GreenAI } from '@/components/home/CoreSections';
import ArchitectDemo from '@/components/home/ArchitectDemo';
import ImpactTabs from '@/components/home/ImpactTabs';

import {
  FeaturedWork,
  StackMarquee,
  SecurityTrust,
  Testimonials,
  InsightsPreview,
  Faq,
  FinalCta,
} from '@/components/home/ShowcaseSections';

/** Home page. */
const AppLayout: React.FC = () => {
  return (
    <>
      <Seo
        title="AI-Native Digital Engineering"
        description="BotifyX designs, builds and scales secure, AI-native digital platforms that drive growth while maintaining an industry-leading low-carbon footprint."
        path="/"
      />
      <Hero />
      <StatsStrip />
      <ServicesGrid />
      <ProcessRail />
      <GreenAI />
      <ArchitectDemo />
      <FeaturedWork />
      <StackMarquee />
      <SecurityTrust />
      <ImpactTabs />
      <Testimonials />

      <InsightsPreview />
      <Faq />
      <FinalCta />
    </>
  );
};

export default AppLayout;
