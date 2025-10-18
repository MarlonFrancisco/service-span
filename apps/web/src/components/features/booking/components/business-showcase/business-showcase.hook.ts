'use client';

import { useCallback, useState } from 'react';
import { toast } from 'sonner';

export const useBusinessShowcase = ({ images }: { images: string[] }) => {
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const displayImages = images.slice(0, 5);

  const handleImageClick = useCallback((index: number) => {
    setSelectedImageIndex(index);
    setShowAllPhotos(true);
  }, []);

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
    displayImages,
    showAllPhotos,
    selectedImageIndex,
    handleImageClick,
    handleCloseGallery,
    handleShare,
    handleSave,
  };
};
