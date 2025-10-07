'use client';

import { Button, Dialog, DialogContent } from '@repo/ui';
import {
  ChevronLeft,
  ChevronRight,
  Copy,
  Download,
  Grid3X3,
  Heart,
  Instagram,
  MessageCircle,
  RotateCcw,
  Share,
  X,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import Image from 'next/image';
import { useImageGallery } from './image-gallery.hook';
import type { TImageGalleryConfig } from './image-gallery.types';
import { useGalleryControls } from './use-gallery-controls.hook';

export const ImageGallery = ({
  isOpen,
  onClose,
  images,
  businessName,
  currentIndex = 0,
}: TImageGalleryConfig) => {
  const {
    activeIndex,
    isLoading: isImageLoading,
    goToNext,
    goToPrevious,
    goToIndex,
    handleImageLoad,
  } = useImageGallery({
    images,
    initialIndex: currentIndex,
    isOpen,
  });

  const {
    showThumbnails,
    zoom,
    showShareMenu,
    setShowThumbnails,
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
  } = useGalleryControls({
    businessName,
    images,
    activeIndex,
    goToNext,
    goToPrevious,
    onClose,
    isOpen,
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-full! max-h-full w-full p-0 border-0 bg-black/95 backdrop-blur-md">
        <div className="relative w-full h-screen flex flex-col">
          {/* Header */}
          <div
            className={`absolute top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/80 to-transparent p-6 transition-opacity duration-300 opacity-100`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="h-10 w-10 p-0 rounded-full bg-white/10 hover:bg-white/20 text-white"
                >
                  <X className="h-5 w-5" />
                </Button>
                <div className="text-white">
                  <h2 className="font-semibold text-lg">{businessName}</h2>
                  <p className="text-sm text-white/70">
                    {activeIndex + 1} de {images.length} fotos
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* Zoom Controls */}
                <div className="flex items-center gap-1 bg-white/10 rounded-xl p-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleZoomOut}
                    disabled={zoom <= 0.5}
                    className="h-8 w-8 p-0 text-white hover:bg-white/20 disabled:opacity-50"
                  >
                    <ZoomOut className="h-4 w-4" />
                  </Button>
                  <span className="text-white text-sm min-w-[3rem] text-center">
                    {Math.round(zoom * 100)}%
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleZoomIn}
                    disabled={zoom >= 3}
                    className="h-8 w-8 p-0 text-white hover:bg-white/20 disabled:opacity-50"
                  >
                    <ZoomIn className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={resetZoom}
                    className="h-8 w-8 p-0 text-white hover:bg-white/20"
                  >
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                </div>

                {/* Action Buttons */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowThumbnails(!showThumbnails)}
                  className="h-10 w-10 p-0 rounded-full bg-white/10 hover:bg-white/20 text-white"
                >
                  <Grid3X3 className="h-5 w-5" />
                </Button>

                <div className="relative">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleShare()}
                    className="h-10 w-10 p-0 rounded-full bg-white/10 hover:bg-white/20 text-white"
                  >
                    <Share className="h-5 w-5" />
                  </Button>

                  {/* Share Menu */}
                  {showShareMenu && (
                    <div className="absolute top-12 right-0 bg-white rounded-2xl shadow-xl p-4 min-w-[250px] z-60">
                      <h3 className="font-semibold text-gray-900 mb-3">
                        Compartilhar
                      </h3>
                      <div className="space-y-1">
                        <Button
                          variant="ghost"
                          onClick={() => handleShare('copy')}
                          className="w-full justify-start h-11 hover:bg-gray-100 rounded-lg"
                        >
                          <Copy className="h-4 w-4 mr-3 text-gray-600" />
                          <span>Copiar link</span>
                        </Button>
                        <Button
                          variant="ghost"
                          onClick={() => handleShare('whatsapp')}
                          className="w-full justify-start h-11 hover:bg-gray-100 rounded-lg"
                        >
                          <MessageCircle className="h-4 w-4 mr-3 text-green-600" />
                          <span>WhatsApp</span>
                        </Button>
                        <Button
                          variant="ghost"
                          onClick={() => handleShare('facebook')}
                          className="w-full justify-start h-11 hover:bg-gray-100 rounded-lg"
                        >
                          <svg
                            className="h-4 w-4 mr-3 text-blue-600"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                          </svg>
                          <span>Facebook</span>
                        </Button>
                        <Button
                          variant="ghost"
                          onClick={() => handleShare('twitter')}
                          className="w-full justify-start h-11 hover:bg-gray-100 rounded-lg"
                        >
                          <svg
                            className="h-4 w-4 mr-3 text-blue-400"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                          </svg>
                          <span>Twitter</span>
                        </Button>
                        <Button
                          variant="ghost"
                          onClick={() => handleShare('instagram')}
                          className="w-full justify-start h-11 hover:bg-gray-100 rounded-lg"
                        >
                          <Instagram className="h-4 w-4 mr-3 text-pink-600" />
                          <span>Instagram</span>
                        </Button>
                      </div>
                    </div>
                  )}
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleDownload}
                  className="h-10 w-10 p-0 rounded-full bg-white/10 hover:bg-white/20 text-white"
                >
                  <Download className="h-5 w-5" />
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  className="h-10 w-10 p-0 rounded-full bg-white/10 hover:bg-white/20 text-white"
                >
                  <Heart className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>

          {/* Main Image Area */}
          <div
            className="flex-1 flex items-center justify-center relative"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Navigation Buttons */}
            {images.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={goToPrevious}
                  className={`absolute left-6 top-1/2 transform -translate-y-1/2 z-40 h-14 w-14 p-0 rounded-full bg-black/30 hover:bg-black/50 text-white backdrop-blur-sm transition-all duration-300 opacity-100`}
                >
                  <ChevronLeft className="h-7 w-7" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={goToNext}
                  className={`absolute right-6 top-1/2 transform -translate-y-1/2 z-40 h-14 w-14 p-0 rounded-full bg-black/30 hover:bg-black/50 text-white backdrop-blur-sm transition-all duration-300 opacity-100`}
                >
                  <ChevronRight className="h-7 w-7" />
                </Button>
              </>
            )}

            {/* Image Container */}
            <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
              {isImageLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm">
                  <div className="flex flex-col items-center gap-4">
                    <div className="relative">
                      <div className="w-12 h-12 border-3 border-white/20 border-t-white rounded-full animate-spin"></div>
                      <div className="absolute inset-0 w-12 h-12 border-3 border-transparent border-r-white/50 rounded-full animate-spin animate-reverse"></div>
                    </div>
                    <div className="text-center">
                      <p className="text-white/90 text-sm font-medium">
                        Carregando imagem...
                      </p>
                      <p className="text-white/60 text-xs mt-1">
                        {activeIndex + 1} de {images.length}
                      </p>
                    </div>
                  </div>
                </div>
              )}
              <Image
                src={images[activeIndex]!}
                alt={`${businessName} - Foto ${activeIndex + 1}`}
                className={`max-w-full max-h-full object-contain transition-all duration-500 ease-out ${
                  isImageLoading
                    ? 'opacity-0 scale-95'
                    : 'opacity-100 scale-100'
                }`}
                style={{
                  transform: `scale(${zoom})`,
                  cursor: zoom > 1 ? 'grab' : 'default',
                  transition: 'transform 0.3s ease-out',
                }}
                onLoad={handleImageLoad}
                onDoubleClick={handleDoubleClick}
                draggable={false}
                fill
              />
            </div>
          </div>

          {/* Bottom Thumbnails */}
          {showThumbnails && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6 transition-opacity duration-300 opacity-100">
              <div className="flex justify-center gap-3 overflow-x-auto scrollbar-hide py-3">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => goToIndex(index)}
                    className={`
                      flex-shrink-0 w-24 h-16 rounded-xl overflow-hidden border-3 transition-all duration-200
                      ${
                        index === activeIndex
                          ? 'border-white scale-110 shadow-lg'
                          : 'border-white/40 hover:border-white/70 hover:scale-105'
                      }
                    `}
                  >
                    <Image
                      src={image}
                      alt={`Miniatura ${index + 1}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      width={90}
                      height={58}
                    />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Image Counter Dots */}
          {images.length > 1 && !showThumbnails && (
            <div
              className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-opacity duration-300 opacity-100`}
            >
              <div className="flex gap-2 bg-black/30 backdrop-blur-sm rounded-full px-4 py-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToIndex(index)}
                    className={`
                      w-2.5 h-2.5 rounded-full transition-all duration-200
                      ${
                        index === activeIndex
                          ? 'bg-white scale-125'
                          : 'bg-white/50 hover:bg-white/75 hover:scale-110'
                      }
                    `}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Click outside overlay */}
        {showShareMenu && (
          <div
            className="fixed inset-0 z-50"
            onClick={() => setShowShareMenu(false)}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};
