import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';
import type { TSharePlatform } from './image-gallery.types';

type TUseGalleryControlsConfig = {
  businessName: string;
  images: string[];
  activeIndex: number;
  goToNext: () => void;
  goToPrevious: () => void;
  onClose: () => void;
  isOpen: boolean;
};

export const useGalleryControls = ({
  businessName,
  images,
  activeIndex,
  goToNext,
  goToPrevious,
  onClose,
  isOpen,
}: TUseGalleryControlsConfig) => {
  const [showThumbnails, setShowThumbnails] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // Reset zoom when image changes
  useEffect(() => {
    setZoom(1);
  }, [activeIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goToPrevious();
      if (e.key === 'ArrowRight') goToNext();
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, goToNext, goToPrevious, onClose]);

  const handleShare = useCallback(
    async (platform?: TSharePlatform) => {
      const shareText = `Confira essas fotos incríveis do ${businessName}!`;
      const shareUrl = window.location.href;

      try {
        switch (platform) {
          case 'copy':
            if (navigator.clipboard) {
              await navigator.clipboard.writeText(shareUrl);
              toast.success('Link copiado para a área de transferência!');
            }
            break;
          case 'facebook':
            window.open(
              `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
              '_blank',
            );
            break;
          case 'twitter':
            window.open(
              `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
              '_blank',
            );
            break;
          case 'whatsapp':
            window.open(
              `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`,
              '_blank',
            );
            break;
          case 'instagram':
            toast.info('Abra o Instagram e compartilhe manualmente');
            break;
          default:
            if (navigator.share) {
              try {
                await navigator.share({
                  title: businessName,
                  text: shareText,
                  url: shareUrl,
                });
              } catch (err) {
                const error = err as Error;
                if (error.name !== 'AbortError') {
                  setShowShareMenu(true);
                }
              }
            } else {
              setShowShareMenu(true);
            }
            return;
        }
      } catch (err) {
        console.error('Share error:', err);
        toast.error('Erro ao compartilhar');
      }

      setShowShareMenu(false);
    },
    [businessName],
  );

  const handleDownload = useCallback(async () => {
    try {
      const imageUrl = images[activeIndex];
      if (!imageUrl) return;

      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${businessName}-foto-${activeIndex + 1}.jpg`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      toast.success('Imagem baixada com sucesso!');
    } catch {
      toast.error('Erro ao baixar imagem');
    }
  }, [images, activeIndex, businessName]);

  const handleZoomIn = useCallback(() => {
    setZoom((prev) => Math.min(prev * 1.5, 3));
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoom((prev) => Math.max(prev / 1.5, 0.5));
  }, []);

  const resetZoom = useCallback(() => {
    setZoom(1);
  }, []);

  const handleDoubleClick = useCallback(() => {
    if (zoom === 1) {
      setZoom(2);
    } else {
      setZoom(1);
    }
  }, [zoom]);

  // Touch handlers
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setTouchStart(e.targetTouches[0]?.clientX || 0);
    }
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setTouchEnd(e.targetTouches[0]?.clientX || 0);
    }
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (!touchStart || !touchEnd || zoom > 1) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && images.length > 1) {
      goToNext();
    }
    if (isRightSwipe && images.length > 1) {
      goToPrevious();
    }

    setTouchStart(0);
    setTouchEnd(0);
  }, [touchStart, touchEnd, zoom, images.length, goToNext, goToPrevious]);

  return {
    showThumbnails,
    setShowThumbnails,
    zoom,
    showShareMenu,
    setShowShareMenu,
    handleShare,
    handleDownload,
    handleZoomIn,
    handleZoomOut,
    resetZoom,
    handleDoubleClick,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  };
};
