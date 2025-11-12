'use client';

import type { CarouselApi } from '@repo/ui';
import { Carousel, CarouselContent, CarouselItem } from '@repo/ui';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { featuredCategories } from '../../../../homepage.mock';
import { useCategoriesGrid } from './categories-grid.hook';

interface CategoryCardProps {
  category: {
    icon: string;
    name: string;
  };
  onClick: () => void;
}

const CategoryCard = ({ category, onClick }: CategoryCardProps) => (
  <motion.button
    onClick={onClick}
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.95 }}
    transition={{ duration: 0.2 }}
    className="group relative p-5 bg-gradient-to-br from-white to-gray-50 rounded-2xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-200 cursor-pointer w-full overflow-hidden"
  >
    {/* Gradient overlay on hover */}
    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

    {/* Content */}
    <div className="relative z-10 flex flex-col items-center gap-2">
      <div className="text-3xl mb-1 group-hover:scale-110 transition-transform duration-200">
        {category.icon}
      </div>
      <div className="text-xs font-semibold text-gray-700 group-hover:text-gray-900 transition-colors duration-200 text-center">
        {category.name}
      </div>
    </div>

    {/* Shine effect on hover */}
    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
    </div>
  </motion.button>
);

export const CategoriesGrid = () => {
  const { handleCategoryClick } = useCategoriesGrid();
  const [api, setApi] = useState<CarouselApi>();

  // Auto-scroll effect
  useEffect(() => {
    if (!api) return;

    const interval = setInterval(() => {
      api.scrollNext();
    }, 3000); // Move every 3 seconds

    return () => clearInterval(interval);
  }, [api]);

  return (
    <>
      {/* Mobile & Tablet Carousel with Auto-scroll */}
      <div
        className="lg:hidden pb-6 pt-2 -mb-6 -mt-2 overflow-visible"
        id="service-snap-categories-mobile"
      >
        <Carousel
          className="w-full overflow-visible"
          opts={{
            align: 'start',
            loop: true,
            slidesToScroll: 1,
          }}
          setApi={setApi}
        >
          <CarouselContent className="-ml-3 overflow-visible">
            {featuredCategories.map((category, index) => (
              <CarouselItem
                key={index}
                className="pl-3 basis-[45%] sm:basis-[30%] md:basis-[25%]"
              >
                <CategoryCard
                  category={category}
                  onClick={() => handleCategoryClick(category.name)}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      {/* Desktop Carousel with Auto-scroll */}
      <div
        className="hidden lg:block mt-2 overflow-visible"
        id="service-snap-categories"
      >
        <Carousel
          className="w-full overflow-visible"
          opts={{
            align: 'start',
            loop: true,
            slidesToScroll: 1,
          }}
          setApi={setApi}
        >
          <CarouselContent className="pt-2 overflow-visible">
            {featuredCategories.map((category, index) => (
              <CarouselItem
                key={index}
                className="pl-4 basis-[16.666%] xl:basis-[12.5%]"
              >
                <CategoryCard
                  category={category}
                  onClick={() => handleCategoryClick(category.name)}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </>
  );
};
