'use client';

import {
  Button,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@repo/ui';
import { ArrowRight } from 'lucide-react';
import { ReactNode } from 'react';

export interface CarouselSectionProps<T> {
  title: string;
  subtitle?: string;
  items: T[];
  renderItem: (item: T) => ReactNode;
  getItemKey: (item: T) => string | number;
  showViewAll?: boolean;
  onViewAllClick?: () => void;
  viewAllText?: string;
  itemClassName?: string;
  showNavigation?: boolean;
  loop?: boolean;
  containerClassName?: string;
}

export function CarouselSection<T>({
  title,
  subtitle,
  items,
  renderItem,
  getItemKey,
  showViewAll = true,
  onViewAllClick,
  viewAllText = 'Ver todos',
  itemClassName = 'basis-[85%] sm:basis-[45%] md:basis-[32%] lg:basis-[24%] xl:basis-[19%]',
  showNavigation = true,
  loop = true,
  containerClassName = 'px-4 w-full max-w-7xl md:px-6 mx-auto',
}: CarouselSectionProps<T>) {
  return (
    <section className={containerClassName}>
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 md:mb-8 gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl md:text-2xl font-semibold text-gray-900 mb-1 md:mb-2">
            {title}
          </h2>
          {subtitle && (
            <p className="text-sm sm:text-base text-gray-600">{subtitle}</p>
          )}
        </div>
        {showViewAll && (
          <Button
            variant="outline"
            onClick={onViewAllClick}
            className="hidden lg:flex items-center gap-2 border-gray-300 hover:bg-gray-50 whitespace-nowrap"
          >
            {viewAllText} <ArrowRight className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Carousel */}
      <div>
        <Carousel
          opts={{
            align: 'start',
            loop,
          }}
        >
          <CarouselContent>
            {items.map((item) => (
              <CarouselItem key={getItemKey(item)} className={itemClassName}>
                {renderItem(item)}
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Navigation Buttons */}
          {showNavigation && (
            <>
              <div className="absolute -left-4 md:-left-6 right-auto top-1/2 -translate-y-1/2 gap-2 hidden md:flex">
                <CarouselPrevious className="relative left-0 top-0 -translate-y-0 h-8 w-8 hover:bg-gray-100 active:scale-95 shadow-md border-gray-200" />
              </div>

              <div className="absolute -right-4 md:-right-6 left-auto top-1/2 -translate-y-1/2 gap-2 hidden md:flex">
                <CarouselNext className="relative right-0 top-0 -translate-y-0 h-8 w-8 hover:bg-gray-100 active:scale-95 shadow-md border-gray-200" />
              </div>
            </>
          )}
        </Carousel>
      </div>

      {/* "Ver todos" button mobile */}
      {showViewAll && (
        <div className="justify-center mt-8 flex md:hidden">
          <Button
            variant="outline"
            onClick={onViewAllClick}
            className="items-center gap-2 border-gray-300 hover:bg-gray-50 w-full"
          >
            {viewAllText} <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </section>
  );
}
