'use client';

import { ImageGallery } from '@/components/layout/image-gallery';
import { ImageWithFallback } from '@/components/ui/image-with-fallback';
import {
  AspectRatio,
  Badge,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@repo/ui';
import { Maximize2 } from 'lucide-react';
import { useCallback, useState } from 'react';

interface ImageCarouselProps {
  images: string[];
  alt: string;
  className?: string;
  showCounter?: boolean;
  showFullscreenButton?: boolean;
  rounded?: boolean;
  aspectRatio?: number;
}

export function ImageCarousel({
  images,
  alt,
  className = '',
  showCounter = true,
  showFullscreenButton = false,
  rounded = true,
  aspectRatio = 1 / 1,
}: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreenOpen, setIsFullscreenOpen] = useState(false);

  const handleSelectChange = useCallback((api: CarouselApi) => {
    if (api) {
      setCurrentIndex(api.selectedScrollSnap());
    }
  }, []);

  if (!images || images.length === 0) {
    return (
      <div
        className={`bg-gray-200 flex items-center justify-center ${className}`}
      >
        <span className="text-gray-500 text-sm">Sem imagens</span>
      </div>
    );
  }

  return (
    <>
      <div
        className={`relative ${rounded ? 'rounded-xl' : ''} ${className}`}
        style={{ overflow: 'hidden' }}
      >
        <Carousel
          opts={{
            align: 'start',
            loop: images.length > 1,
          }}
          setApi={(api: CarouselApi) => {
            if (api) {
              api.on('select', () => handleSelectChange(api));
            }
          }}
          className="w-full h-full relative group"
        >
          <CarouselContent className="m-0">
            {images.map((image, index) => (
              <CarouselItem key={index} className="p-0">
                <div className="relative bg-gray-200">
                  <AspectRatio ratio={aspectRatio}>
                    <ImageWithFallback
                      src={image}
                      alt={`${alt} - Imagem ${index + 1}`}
                      fill
                      sizes="(min-width: 728px) 400px, 150px"
                    />
                  </AspectRatio>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Navigation Buttons */}
          {images.length > 1 && (
            <>
              <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 p-0 bg-white/80 hover:bg-white shadow-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 p-0 bg-white/80 hover:bg-white shadow-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </>
          )}

          {/* Counter Badge */}
          {showCounter && images.length > 1 && (
            <div className="absolute top-2 right-2 z-10">
              <Badge
                variant="secondary"
                className="bg-black/60 text-white text-xs"
              >
                {currentIndex + 1} / {images.length}
              </Badge>
            </div>
          )}

          {/* Fullscreen Button */}
          {showFullscreenButton && (
            <button
              onClick={() => setIsFullscreenOpen(true)}
              className="absolute top-2 left-2 z-10 w-8 h-8 p-0 bg-white/80 hover:bg-white shadow-sm rounded-full flex items-center justify-center transition-colors"
            >
              <Maximize2 className="h-4 w-4" />
            </button>
          )}

          {/* Dot Indicators */}
          {images.length > 1 && images.length <= 10 && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    // Navigate to specific slide
                    const carousel = document.querySelector('[role="region"]');
                    if (carousel) {
                      carousel.scrollLeft =
                        (carousel.scrollWidth / images.length) * index;
                    }
                  }}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? 'bg-white'
                      : 'bg-white/50 hover:bg-white/70'
                  }`}
                />
              ))}
            </div>
          )}
        </Carousel>

        <ImageGallery
          isOpen={isFullscreenOpen}
          onClose={() => setIsFullscreenOpen(false)}
          images={images}
          businessName={alt}
          currentIndex={currentIndex}
        />
      </div>
    </>
  );
}
