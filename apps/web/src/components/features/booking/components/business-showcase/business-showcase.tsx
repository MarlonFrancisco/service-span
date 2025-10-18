'use client';

import { ImageGallery } from '@/components/layout/image-gallery';
import { ReviewsModal } from '@/components/layout/reviews-modal';
import { useReviews } from '@/store';
import {
  Badge,
  Button,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@repo/ui';
import { Clock, Heart, Images, MapPinIcon, Share, Star } from 'lucide-react';
import Image from 'next/image';
import { useBusinessShowcase } from './business-showcase.hook';
import type { TBusinessShowcaseConfig } from './business-showcase.types';

const OPENING_HOURS = 'Seg-Sex: 9h-19h | Sáb: 9h-17h';
const AMENITIES = [
  'Wi-Fi gratuito',
  'Estacionamento',
  'Ar condicionado',
  'Acessível',
];

export function BusinessShowcase({
  businessName,
  businessAddress,
  rating = 0,
  reviewCount = 0,
  category,
  description,
  images,
}: TBusinessShowcaseConfig) {
  const {
    displayImages,
    showAllPhotos,
    selectedImageIndex,
    handleImageClick,
    handleShare,
    handleCloseGallery,
  } = useBusinessShowcase({ images });
  const { toggleReviewsModalAction } = useReviews();

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Business Name and Actions */}
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <div className="flex-1 min-w-0">
            <h1 className="text-xl md:text-2xl text-[#1a2b4c] truncate">
              {businessName}
            </h1>
          </div>

          <div className="flex items-center gap-2 md:gap-3">
            <div className="relative">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleShare()}
                className="flex items-center gap-2 rounded-lg border-gray-300 hover:bg-gray-50"
              >
                <Share className="h-4 w-4" />
                Compartilhar
              </Button>
            </div>

            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2 rounded-lg border-gray-300 hover:bg-gray-50"
            >
              <Heart className="h-4 w-4" />
              Salvar
            </Button>
          </div>
        </div>

        {/* Images Gallery */}
        <div className="mb-4 md:mb-8 relative">
          {/* Desktop Grid */}
          <div className="hidden md:grid grid-cols-4 gap-1 h-[420px] rounded-xl overflow-hidden">
            {/* Main Image - Left Side */}
            <div className="col-span-2 relative group cursor-pointer overflow-hidden">
              <Image
                src={displayImages[0] || ''}
                width={600}
                height={500}
                alt={businessName}
                className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl aspect-square"
                onClick={() => handleImageClick(0)}
              />
            </div>

            {/* Right Side Grid */}
            <div className="col-span-2 grid grid-cols-2 gap-1">
              {displayImages.slice(1, 5).map((image, index) => (
                <div
                  key={index}
                  className="relative group cursor-pointer overflow-hidden"
                  onClick={() => handleImageClick(index + 1)}
                >
                  <Image
                    fill
                    sizes="100px"
                    src={image}
                    alt={`${businessName} - ${index + 2}`}
                    className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Image Carousel with Swipe */}
          <div className="md:hidden relative rounded-xl overflow-hidden">
            <Carousel
              className="w-full"
              opts={{
                loop: true,
                align: 'start',
              }}
            >
              <CarouselContent>
                {images.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="relative h-64">
                      <Image
                        width={500}
                        height={256}
                        src={image}
                        alt={`${businessName} - ${index + 1}`}
                        className="w-full h-full object-cover cursor-pointer"
                        onClick={() => handleImageClick(index)}
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>

              {images.length > 1 && (
                <>
                  <CarouselPrevious className="left-2 bg-white/90 hover:bg-white border-0 shadow-lg" />
                  <CarouselNext className="right-2 bg-white/90 hover:bg-white border-0 shadow-lg" />

                  {/* Photo Counter */}
                  <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-sm pointer-events-none">
                    1 / {images.length}
                  </div>

                  {/* View All Button */}
                  <Button
                    variant="outline"
                    size="sm"
                    className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm hover:bg-white"
                    onClick={() => handleImageClick(0)}
                  >
                    <Images className="h-4 w-4 mr-1" />
                    Ver todas
                  </Button>
                </>
              )}
            </Carousel>
          </div>

          {/* Show All Photos Button - Bottom Right (Desktop Only) */}
          {!showAllPhotos && images.length > 0 && (
            <Button
              variant="outline"
              className="hidden md:flex absolute bottom-4 right-4 bg-white text-black border-black hover:bg-gray-100 rounded-lg shadow-lg"
              onClick={() => handleImageClick(0)}
            >
              <Images className="h-4 w-4 mr-2" />
              Ver todas ({images.length})
            </Button>
          )}
        </div>

        {/* Business Info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8">
          {/* Left Column - Main Info */}
          <div className="lg:col-span-2">
            <div className="mb-4 md:mb-6">
              <h2 className="text-lg md:text-xl text-[#1a2b4c] mb-3 md:mb-4">
                {category} em {businessAddress.split(',')[0]}
              </h2>
              <p className="text-gray-600 mb-4">{description}</p>

              {/* Amenities - Above Reviews */}
              {AMENITIES.length > 0 && (
                <div className="mb-4 pb-4 border-b border-gray-200">
                  <div className="flex flex-wrap gap-2">
                    {AMENITIES.map((amenity, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="border-gray-300 text-gray-700 hover:bg-gray-50"
                      >
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Reviews */}
              <div className="flex items-center gap-1 text-sm">
                <Star className="h-4 w-4 fill-black text-black" />
                <span className="font-medium">{rating}</span>
                <span>·</span>
                <button
                  onClick={() => toggleReviewsModalAction(true)}
                  className="underline cursor-pointer hover:text-gray-700 transition-colors"
                >
                  {reviewCount} avaliações
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Opening Hours */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="h-4 w-4 text-[#20b2aa]" />
                <h3 className="text-[#1a2b4c]">Horário de Funcionamento</h3>
              </div>
              <p className="text-sm text-gray-600">{OPENING_HOURS}</p>

              <div className="flex items-start gap-2 mt-4 pt-4 border-t border-gray-200">
                <MapPinIcon className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-gray-600">{businessAddress}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Modern Photo Gallery */}
        <ImageGallery
          isOpen={showAllPhotos}
          onClose={handleCloseGallery}
          images={images}
          businessName={businessName}
          currentIndex={selectedImageIndex}
        />

        {/* Reviews Modal */}
        <ReviewsModal />
      </div>
    </div>
  );
}
