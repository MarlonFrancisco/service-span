'use client';

import {
  CategoriesGrid,
  HeroBadge,
  HeroSearchBar,
  HeroSubtitle,
  HeroTitle,
} from './components';

export const HeroSection = () => {
  return (
    <section className="relative text-center fade-in max-w-7xl mx-auto px-6 mb-55 md:mb-20">
      {/* Hero Badge */}
      <HeroBadge />

      {/* Hero Title */}
      <HeroTitle />

      {/* Hero Subtitle */}
      <HeroSubtitle />

      {/* Hero Search Bar - Uses its own hook internally */}
      <HeroSearchBar />

      {/* Categories Grid - Uses its own hook internally */}
      <CategoriesGrid />
    </section>
  );
};
