'use client';

import { BusinessDetails } from './business-details';
import { BusinessHeader } from './business-header';
import { useBusinessShowcase } from './business-showcase.hook';
import type { TBusinessShowcaseConfig } from './business-showcase.types';
import { ImageGallery } from './image-gallery';
import { ImageGrid } from './image-grid';

export const BusinessShowcase = ({
  businessName,
  businessAddress,
  rating = 4.8,
  reviewCount = 124,
  category = 'Salão de Beleza',
  images,
  imageUrl,
  ...props
}: TBusinessShowcaseConfig) => {
  const {
    allImages,
    showAllPhotos,
    selectedImageIndex,
    handleImageClick,
    handleCloseGallery,
    handleShare,
    handleSave,
  } = useBusinessShowcase({ images, imageUrl });

  return (
    <div>
      <div className="max-w-7xl mx-auto px-6 py-2 pt-6">
        <BusinessHeader
          businessName={businessName}
          onShare={handleShare}
          onSave={handleSave}
        />

        <ImageGrid
          images={allImages}
          businessName={businessName}
          onImageClick={handleImageClick}
          onShowAll={() => handleImageClick(0)}
        />

        <BusinessDetails
          category={category}
          address={businessAddress}
          rating={rating}
          reviewCount={reviewCount}
        />
      </div>

      <ImageGallery
        isOpen={showAllPhotos}
        onClose={handleCloseGallery}
        images={allImages}
        businessName={businessName}
        currentIndex={selectedImageIndex}
      />
    </div>
  );
};
