import { Rating } from '@/components/layout/rating/rating';
import { Badge } from '@repo/ui/index';
import { Star } from 'lucide-react';
import type { TBusinessDetailsConfig } from '../business-showcase.types';

export const BusinessDetails = ({
  category,
  address,
  rating,
  reviewCount,
}: TBusinessDetailsConfig) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left Column - Main Info */}
      <div className="lg:col-span-2">
        <div className="mb-6">
          <h2 className="text-xl text-[#1a2b4c] mb-2">
            {category} em {address?.split(',')[0]}
          </h2>
          <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
            <Badge variant="outline">Ar condicionado</Badge>
            <Badge variant="outline">Banheiro privativo</Badge>
            <Badge variant="outline">Wi-Fi</Badge>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <Rating>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-black text-black" />
                <span className="font-medium">{rating}</span>
                <span>·</span>
                <span className="underline">{reviewCount} avaliações</span>
              </div>
            </Rating>
            <span>·</span>
            <span className="underline">{address}</span>
          </div>
        </div>
      </div>

      {/* Right Column - Price Info */}
      <div className="lg:col-span-1">
        <div className="text-right">
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <p className="text-sm text-gray-600 mb-2">
              Os preços incluem todas as taxas
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
