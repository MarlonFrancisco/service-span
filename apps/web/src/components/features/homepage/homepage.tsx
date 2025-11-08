'use client';

import { Footer, Header } from '@/components/layout';
import { motion } from 'motion/react';
import { Features, HeroSection, Recomendations } from './components';
import { useHomepage } from './homepage.hook';

export const Homepage = () => {
  useHomepage();

  return (
    <Header>
      <motion.div className="pt-12">
        {/* Hero Section - Composed of Badge, Title, Subtitle, SearchBar, and CategoriesGrid */}
        <HeroSection />

        <Recomendations />

        <Features />

        <Footer />
      </motion.div>
    </Header>
  );
};
