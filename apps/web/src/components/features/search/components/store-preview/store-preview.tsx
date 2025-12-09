'use client';

import { ImageCarousel } from '@/components/ui/image-carousel';
import { Button, Separator } from '@repo/ui';
import { Calendar, Clock, MapPin, MessageCircle, Star } from 'lucide-react';
import { useStorePreview } from './store-preview.hook';

export function StorePreview() {
  const {
    selectedStore,
    formattedPrice,
    formattedHours,
    whatsAppLink,
    showCarouselControls,
    hasReviews,
    displayReviews,
    handleBookingClick,
  } = useStorePreview();

  if (!selectedStore) return null;

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
      {/* Header com carousel de imagens - Estilo Airbnb */}
      <div className="relative">
        <ImageCarousel
          images={selectedStore.gallery}
          alt={selectedStore.name}
          className="w-full"
          showCounter={showCarouselControls}
          showFullscreenButton={showCarouselControls}
          rounded={false}
          aspectRatio={4 / 3}
        />
      </div>

      {/* Conteúdo */}
      <div className="p-5 space-y-5">
        {/* Header: Nome e Rating */}
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-lg font-semibold text-gray-900 leading-tight">
              {selectedStore.name}
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-gray-900 text-gray-900" />
              <span className="font-semibold text-sm text-gray-900">
                {selectedStore.rating}
              </span>
            </div>
            <span className="text-sm text-gray-500">
              ({selectedStore.reviewCount} avaliações)
            </span>
          </div>

          {/* Preço */}
          <div className="pt-1">
            <span className="text-xl font-semibold text-gray-900">
              {formattedPrice}
            </span>
            <span className="text-sm text-gray-500 ml-1">/ serviço</span>
          </div>
        </div>

        <Separator className="bg-gray-100" />

        {/* Descrição */}
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-gray-900">Sobre</h4>
          <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
            {selectedStore.description}
          </p>
        </div>

        <Separator className="bg-gray-100" />

        {/* Informações de contato */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-gray-900">Informações</h4>

          <div className="space-y-2.5">
            {/* WhatsApp */}
            <a
              href={whatsAppLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-sm px-3 py-2.5 bg-green-50 hover:bg-green-100 rounded-xl transition-colors group"
            >
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <MessageCircle className="h-4 w-4 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-gray-900 font-medium text-sm">
                  Enviar mensagem
                </span>
                <span className="text-gray-500 text-xs">
                  {selectedStore.telephone}
                </span>
              </div>
            </a>

            {/* Endereço */}
            <div className="flex items-start gap-3 text-sm px-3 py-2">
              <MapPin className="h-4 w-4 text-gray-400 mt-0.5 shrink-0" />
              <div className="text-gray-600">
                <p className="line-clamp-2">
                  {selectedStore.address}, {selectedStore.city} -{' '}
                  {selectedStore.state}
                </p>
              </div>
            </div>

            {/* Horário */}
            <div className="flex items-center gap-3 text-sm text-gray-600 px-3 py-2">
              <Clock className="h-4 w-4 text-gray-400 shrink-0" />
              <span>{formattedHours}</span>
            </div>
          </div>
        </div>

        <Separator className="bg-gray-100" />

        {/* Avaliações em destaque */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-gray-900">
            Avaliações recentes
          </h4>

          <div className="space-y-2">
            {displayReviews.map((review) => (
              <div
                key={review.id}
                className="p-3 bg-gray-50 rounded-xl space-y-1.5"
              >
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 ${
                          i < review.rating
                            ? 'fill-gray-900 text-gray-900'
                            : 'fill-gray-200 text-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
                  {review.comment}
                </p>
              </div>
            ))}

            {!hasReviews && (
              <div className="p-4 bg-gray-50 rounded-xl text-center">
                <span className="text-sm text-gray-500">
                  Nenhuma avaliação ainda
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Botão de ação principal */}
        <Button
          className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-xl h-12"
          onClick={handleBookingClick}
        >
          <Calendar className="h-4 w-4 mr-2" />
          Ver agenda e agendar
        </Button>
      </div>
    </div>
  );
}
