'use client';

import { Footer, Header } from '@/components/layout';
import { motion } from 'motion/react';
import { lazy, Suspense } from 'react';
import { HeroSection } from './components';
import { FeaturesSkeleton } from './components/features-skeleton';
import { RecommendationsSkeleton } from './components/recomendations/components/recommendations-skeleton';

const Recomendations = lazy(() =>
  import('./components/recomendations').then((module) => ({
    default: module.Recomendations,
  })),
);

const Features = lazy(() =>
  import('./components/features').then((module) => ({
    default: module.Features,
  })),
);

export const Homepage = () => {
  return (
    <Header>
      <motion.div className="pt-12">
        <HeroSection />

        <Suspense fallback={<RecommendationsSkeleton />}>
          <Recomendations />
        </Suspense>

        <Suspense fallback={<FeaturesSkeleton />}>
          <Features />
        </Suspense>

        <Footer />
      </motion.div>
    </Header>
  );
};
