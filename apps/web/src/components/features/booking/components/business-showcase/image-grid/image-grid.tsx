import { Button } from '@repo/ui';
import { Images } from 'lucide-react';
import Image from 'next/image';
import type { TImageGridConfig } from '../../business-showcase.types';

export const ImageGrid = ({
  images,
  businessName,
  onImageClick,
  onShowAll,
}: TImageGridConfig) => {
  const displayImages = images.slice(0, 5);

  if (displayImages.length === 0) {
    return null;
  }

  return (
    <div className="mb-4 relative">
      <div className="grid grid-cols-4 gap-2 h-96 rounded-xl overflow-hidden">
        {/* Main Image - Left Side */}
        <div
          className="col-span-2 relative group cursor-pointer"
          onClick={() => onImageClick(0)}
        >
          <Image
            src={displayImages[0] || ''}
            alt={businessName}
            className="w-auto h-auto object-cover group-hover:brightness-90 transition-all"
            fill
            style={{ objectPosition: 'top' }}
          />
        </div>

        {/* Right Side Grid */}
        <div className="col-span-2 grid grid-cols-2 gap-2">
          {displayImages.slice(1, 5).map((image, index) => (
            <div
              key={index}
              className="relative group cursor-pointer"
              onClick={() => onImageClick(index + 1)}
            >
              <Image
                src={image}
                alt={`${businessName} - ${index + 2}`}
                className="w-auto h-auto object-cover group-hover:brightness-90 transition-all"
                fill
                style={{ objectPosition: 'top' }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Show All Photos Button - Bottom Right */}
      {images.length > 0 && (
        <Button
          variant="outline"
          className="absolute bottom-4 right-4 bg-white text-black hover:bg-gray-100 rounded-lg shadow-lg"
          onClick={onShowAll}
        >
          <Images className="h-4 w-4 mr-2" />
          Ver todas ({images.length})
        </Button>
      )}
    </div>
  );
};
