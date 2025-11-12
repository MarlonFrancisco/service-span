'use client';

import useSearchStore from '@/store/search/search.store';
import { formatBusinessHours } from '@/utils/helpers/business-hours.helper';
import {
  Badge,
  Button,
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  Separator,
} from '@repo/ui';
import { Calendar, Clock, MapPin, Phone, Star } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ImageCarousel } from '../image-carousel';

export function StoreDetailsDrawer() {
  const router = useRouter();
  const selectedStore = useSearchStore((state) => state.selectedStore);
  const mobileDrawerOpen = useSearchStore((state) => state.mobileDrawerOpen);
  const setMobileDrawerOpen = useSearchStore(
    (state) => state.setMobileDrawerOpen,
  );

  if (!selectedStore) return null;

  const handleBooking = () => {
    router.push(`/booking/${selectedStore.id}`);
  };

  return (
    <Drawer open={mobileDrawerOpen} onOpenChange={setMobileDrawerOpen}>
      <DrawerContent className="p-0">
        <DrawerHeader className="sr-only">
          <DrawerTitle>Detalhes da Loja</DrawerTitle>
        </DrawerHeader>

        {/* Scrollable content */}
        <div className="overflow-y-auto">
          <div className="space-y-4 pb-6">
            {/* Images */}
            <ImageCarousel
              images={selectedStore.images}
              alt={selectedStore.name}
              className="w-full rounded-t-none rounded-b-none!"
              showCounter={selectedStore.images.length > 1}
              showFullscreenButton={selectedStore.images.length > 1}
              aspectRatio={16 / 9}
            />

            {/* Header */}
            <div className="space-y-3 px-4">
              <div className="flex items-start justify-between gap-3">
                <h2 className="text-xl font-semibold text-gray-900 leading-tight">
                  {selectedStore.name}
                </h2>
                <Badge className="bg-black text-white shrink-0 text-xs font-medium">
                  {selectedStore.price}
                </Badge>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-md">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold text-sm">
                    {selectedStore.rating}
                  </span>
                </div>
                <span className="text-sm text-gray-500">
                  ({selectedStore.reviewCount} avaliações)
                </span>
              </div>
            </div>

            <Separator />

            {/* Description */}
            <div className="space-y-2 px-4">
              <h3 className="text-sm font-semibold text-gray-900">Sobre</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {selectedStore.description}
              </p>
            </div>

            <Separator />

            {/* Services */}
            {selectedStore.services && selectedStore.services.length > 0 && (
              <>
                <div className="space-y-3 px-4">
                  <h3 className="text-sm font-semibold text-gray-900">
                    Serviços
                  </h3>
                  <div className="flex gap-2 flex-wrap">
                    {selectedStore.services.map((service) => (
                      <Badge
                        key={service.id}
                        variant="secondary"
                        className="bg-blue-50 text-blue-700 border-blue-200 font-normal text-xs"
                      >
                        {service.name}
                      </Badge>
                    ))}
                  </div>
                </div>
                <Separator />
              </>
            )}

            {/* Contact Info */}
            <div className="space-y-3 px-4">
              <h3 className="text-sm font-semibold text-gray-900">
                Informações
              </h3>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="h-4 w-4 text-gray-400 shrink-0" />
                  <a
                    href={`tel:${selectedStore.phone}`}
                    className="text-blue-600 hover:underline font-normal"
                  >
                    {selectedStore.phone}
                  </a>
                </div>

                <div className="flex items-start gap-3 text-sm">
                  <MapPin className="h-4 w-4 text-gray-400 mt-0.5 shrink-0" />
                  <div className="text-gray-600">
                    <p>
                      {selectedStore.address}, {selectedStore.city} -{' '}
                      {selectedStore.state}
                    </p>
                    <p className="text-gray-500 text-xs mt-0.5">
                      {selectedStore.zipCode}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Clock className="h-4 w-4 text-gray-400 shrink-0" />
                  <span>
                    {formatBusinessHours(
                      selectedStore.openTime,
                      selectedStore.closeTime,
                      selectedStore.businessDays,
                    )}
                  </span>
                </div>
              </div>
            </div>

            <Separator />

            {/* Reviews */}
            <div className="space-y-3 px-4">
              <h3 className="text-sm font-semibold text-gray-900">
                Avaliações Recentes
              </h3>

              <div className="space-y-2.5">
                {selectedStore.reviews && selectedStore.reviews.length > 0 ? (
                  selectedStore.reviews.slice(0, 3).map((review) => (
                    <div key={review.id} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-1.5">
                        <div className="flex">
                          {Array.from({ length: review.rating }).map((_, i) => (
                            <Star
                              key={i}
                              className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400"
                            />
                          ))}
                        </div>
                        <span className="text-xs text-gray-500 font-medium">
                          Usuário Anônimo
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {review.comment}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="p-4 bg-gray-50 rounded-lg text-center">
                    <p className="text-sm text-gray-500">
                      Nenhuma avaliação disponível
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Fixed bottom CTA */}
        <div className="border-t bg-white p-4 shadow-lg">
          <Button
            className="w-full bg-black hover:bg-gray-800 text-white font-medium"
            size="lg"
            onClick={handleBooking}
          >
            <Calendar className="h-5 w-5 mr-2" />
            Ver Agenda e Agendar
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
