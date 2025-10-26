import { ImageGallery } from '@/components/layout/image-gallery';
import { ImageWithFallback } from '@/components/ui/image-with-fallback';
import { Badge, Button } from '@repo/ui';
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { useState } from 'react';

interface ImageCarouselProps {
  images: string[];
  alt: string;
  className?: string;
  showCounter?: boolean;
  showFullscreenButton?: boolean;
  aspectRatio?: 'square' | 'video' | 'auto';
  rounded?: boolean;
}

export function ImageCarousel({
  images,
  alt,
  className = '',
  showCounter = true,
  showFullscreenButton = false,
  aspectRatio = 'auto',
  rounded = true,
}: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreenOpen, setIsFullscreenOpen] = useState(false);

  if (!images || images.length === 0) {
    return (
      <div
        className={`bg-gray-200 flex items-center justify-center ${className}`}
      >
        <span className="text-gray-500 text-sm">Sem imagens</span>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToImage = (index: number) => {
    setCurrentIndex(index);
  };

  const getAspectRatioClass = () => {
    switch (aspectRatio) {
      case 'square':
        return 'aspect-square';
      case 'video':
        return 'aspect-video';
      default:
        return 'aspect-[4/3]';
    }
  };

  return (
    <>
      <div
        className={`relative overflow-hidden ${rounded ? 'rounded-xl' : ''} ${className}`}
      >
        {/* Main Image */}
        <div className={`relative bg-gray-200 ${getAspectRatioClass()}`}>
          <ImageWithFallback
            src={images[currentIndex]}
            alt={`${alt} - Imagem ${currentIndex + 1}`}
            className="w-full h-full object-cover"
          />

          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="sm"
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 p-0 bg-white/80 hover:bg-white shadow-sm rounded-full"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 p-0 bg-white/80 hover:bg-white shadow-sm rounded-full"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </>
          )}

          {/* Counter Badge */}
          {showCounter && images.length > 1 && (
            <div className="absolute top-2 right-2">
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
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsFullscreenOpen(true)}
              className="absolute top-2 left-2 w-8 h-8 p-0 bg-white/80 hover:bg-white shadow-sm rounded-full"
            >
              <Maximize2 className="h-4 w-4" />
            </Button>
          )}

          <ImageGallery
            isOpen={isFullscreenOpen}
            onClose={() => setIsFullscreenOpen(false)}
            images={images}
            businessName={alt}
            currentIndex={currentIndex}
          />
        </div>

        {/* Dot Indicators */}
        {images.length > 1 && images.length <= 10 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToImage(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? 'bg-white'
                    : 'bg-white/50 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        )}

        {/* Image Strip (for many images) */}
        {images.length > 10 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1 max-w-[90%] overflow-hidden">
            {images
              .slice(Math.max(0, currentIndex - 2), currentIndex + 3)
              .map((image, index) => {
                const actualIndex = Math.max(0, currentIndex - 2) + index;
                return (
                  <button
                    key={actualIndex}
                    onClick={() => goToImage(actualIndex)}
                    className={`w-8 h-8 rounded overflow-hidden flex-shrink-0 border-2 transition-all ${
                      actualIndex === currentIndex
                        ? 'border-white'
                        : 'border-white/50 hover:border-white/70'
                    }`}
                  >
                    <ImageWithFallback
                      src={image}
                      alt={`Thumbnail ${actualIndex + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                );
              })}
          </div>
        )}
      </div>
    </>
  );
}
