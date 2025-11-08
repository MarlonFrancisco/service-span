'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@repo/ui';
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
  <button
    onClick={onClick}
    className="group p-4 bg-white rounded-xl border-2 border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-200 cursor-pointer w-full"
  >
    <div className="text-2xl mb-2">{category.icon}</div>
    <div className="text-sm font-medium text-gray-900 mb-1">
      {category.name}
    </div>
  </button>
);

export const CategoriesGrid = () => {
  const { handleCategoryClick } = useCategoriesGrid();

  return (
    <>
      {/* Mobile Carousel */}
      <div className="md:hidden" id="service-snap-categories-mobile">
        <Carousel className="w-full" opts={{ slidesToScroll: 2 }}>
          <CarouselContent>
            {featuredCategories.map((category, index) => (
              <CarouselItem key={index} className="basis-[60%]">
                <CategoryCard
                  category={category}
                  onClick={() => handleCategoryClick(category.name)}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex -left-8 hover:bg-gray-100" />
          <CarouselNext className="hidden sm:flex -right-8 hover:bg-gray-100" />
        </Carousel>
      </div>

      {/* Desktop Grid */}
      <div
        className="hidden md:grid grid-cols-3 lg:grid-cols-6 gap-4 animate-in"
        id="service-snap-categories"
      >
        {featuredCategories.map((category, index) => (
          <CategoryCard
            key={index}
            category={category}
            onClick={() => handleCategoryClick(category.name)}
          />
        ))}
      </div>
    </>
  );
};
