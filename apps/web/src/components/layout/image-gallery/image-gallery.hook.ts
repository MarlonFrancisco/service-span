import { useCallback, useEffect, useState } from 'react';
import type { TUseImageGalleryConfig } from './image-gallery.types';

export const useImageGallery = ({
  images,
  initialIndex = 0,
  isOpen,
}: TUseImageGalleryConfig) => {
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());

  // Reset when gallery opens or images change
  useEffect(() => {
    if (isOpen) {
      setActiveIndex(initialIndex);
      setIsLoading(true);
    }
  }, [isOpen, initialIndex]);

  // Preload adjacent images
  useEffect(() => {
    if (!isOpen || !images.length) return;

    const preloadImage = (index: number) => {
      if (loadedImages.has(index) || !images[index]) return;

      const img = new Image();
      img.onload = () => {
        setLoadedImages((prev) => new Set(prev).add(index));
      };
      img.src = images[index];
    };

    // Preload current and adjacent images
    preloadImage(activeIndex);
    preloadImage(activeIndex - 1);
    preloadImage(activeIndex + 1);
  }, [activeIndex, images, isOpen, loadedImages]);

  const goToNext = useCallback(() => {
    if (images.length <= 1) return;
    setActiveIndex((prev) => (prev + 1) % images.length);
    setIsLoading(true);
  }, [images.length]);

  const goToPrevious = useCallback(() => {
    if (images.length <= 1) return;
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
    setIsLoading(true);
  }, [images.length]);

  const goToIndex = useCallback(
    (index: number) => {
      if (index >= 0 && index < images.length) {
        setActiveIndex(index);
        setIsLoading(true);
      }
    },
    [images.length],
  );

  const handleImageLoad = useCallback(() => {
    setIsLoading(false);
  }, []);

  return {
    activeIndex,
    isLoading,
    goToNext,
    goToPrevious,
    goToIndex,
    handleImageLoad,
    isImagePreloaded: (index: number) => loadedImages.has(index),
  };
};
