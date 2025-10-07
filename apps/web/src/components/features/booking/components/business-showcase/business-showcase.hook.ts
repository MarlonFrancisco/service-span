import { useCallback, useState } from 'react';
import { toast } from 'sonner';
import { BUSINESS_SHOWCASE_MOCK } from './business-showcase.mock';
import type { TUseBusinessShowcaseConfig } from './business-showcase.types';

export const useBusinessShowcase = ({
  onImageClick,
}: TUseBusinessShowcaseConfig = {}) => {
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Use images array if available, otherwise fallback to single imageUrl or default images
  const allImages = BUSINESS_SHOWCASE_MOCK;

  const displayImages = allImages.slice(0, 5);

  const handleImageClick = useCallback(
    (index: number) => {
      setSelectedImageIndex(index);
      setShowAllPhotos(true);
      onImageClick?.(index);
    },
    [onImageClick],
  );

  const handleCloseGallery = useCallback(() => {
    setShowAllPhotos(false);
  }, []);

  const handleShare = useCallback(() => {
    if (navigator.share) {
      navigator
        .share({
          title: 'Compartilhar negócio',
          url: window.location.href,
        })
        .catch((error) => console.log('Error sharing:', error));
    } else {
      // Fallback: copiar URL para clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  }, []);

  const handleSave = useCallback(() => {
    toast.info('Negócio salvo como favorito');
  }, []);

  return {
    allImages,
    displayImages,
    showAllPhotos,
    selectedImageIndex,
    handleImageClick,
    handleCloseGallery,
    handleShare,
    handleSave,
  };
};
