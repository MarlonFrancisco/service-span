'use client';

import useSearchStore from '@/store/search/search.store';
import { IStoreSearchListItem } from '@/store/search/search.types';
import { Badge, Button, Card } from '@repo/ui';
import { MapPin, Star } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ImageCarousel } from '../image-carousel';

interface ServiceCardProps {
  store: IStoreSearchListItem;
  isSelected: boolean;
  onClick: () => void;
}

export function ServiceCard({ store, isSelected, onClick }: ServiceCardProps) {
  const router = useRouter();
  const setSelectedStore = useSearchStore((state) => state.setSelectedStore);

  const { name, rating, reviewCount, location, price, images, services } =
    store;

  const allImages = images;

  const handleSchedule = () => {
    setSelectedStore(store);
    router.push(`/booking/${store.id}`);
  };

  return (
    <Card
      className={`group overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-0 shadow-lg bg-white p-0 ${
        isSelected ? 'ring-2 ring-black shadow-2xl scale-[1.02]' : ''
      }`}
      onClick={onClick}
    >
      <div className="md:flex">
        {/* Image */}
        <div className="md:w-80 flex-shrink-0">
          <div className="h-64 md:h-full relative overflow-hidden">
            <ImageCarousel
              images={allImages}
              alt={name}
              showCounter={allImages.length > 1}
              showFullscreenButton={false}
              rounded={false}
              className="h-full"
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-black transition-colors">
                {name}
              </h3>
              <div className="flex items-center gap-1 mb-3">
                <Star className="h-4 w-4 fill-black text-black" />
                <span className="font-medium">{rating}</span>
                <span className="text-gray-500">·</span>
                <span className="text-gray-600">{reviewCount} avaliações</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="h-4 w-4" />
                <span>{location}</span>
              </div>
            </div>
            <div className="text-right ml-4">
              <div className="text-lg font-semibold text-gray-900">{price}</div>
              <div className="text-sm text-gray-500">por serviço</div>
            </div>
          </div>

          {/* Services Section */}
          {services && services.length > 0 && (
            <div className="pt-4 pb-4 border-t border-gray-100">
              <div className="text-sm font-semibold text-gray-900 mb-2">
                Serviços Disponíveis
              </div>
              <div className="flex gap-2 flex-wrap">
                {services.slice(0, 3).map((service) => (
                  <Badge
                    key={service.id}
                    className="bg-blue-100 text-blue-800 border-0 text-xs"
                  >
                    {service.name}
                  </Badge>
                ))}
                {services.length > 3 && (
                  <Badge className="bg-gray-100 text-gray-800 border-0 text-xs">
                    +{services.length - 3}
                  </Badge>
                )}
              </div>
            </div>
          )}

          <div className="flex justify-between items-center pt-4 border-t border-gray-100">
            <div className="text-sm text-gray-600">Disponível hoje</div>
            <Button
              className="cursor-pointer"
              variant="outline"
              onClick={handleSchedule}
            >
              Ver agenda e agendar
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
