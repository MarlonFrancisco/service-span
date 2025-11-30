'use client';

import { Badge, Button, Card, Separator } from '@repo/ui';
import { Calendar, Clock, MapPin, MessageCircle, Star } from 'lucide-react';
import { ImageCarousel } from '../image-carousel';
import { useServicePreview } from './service-preview.hook';

export function ServicePreview() {
  const {
    selectedStore,
    formattedPrice,
    formattedHours,
    whatsAppLink,
    showCarouselControls,
    hasReviews,
    displayReviews,
    handleBookingClick,
  } = useServicePreview();

  if (!selectedStore) return null;

  return (
    <Card className="h-fit border-gray-200 shadow-lg pt-0">
      <div className="space-y-6">
        {/* Header com carousel de imagens */}
        <div className="space-y-4">
          <ImageCarousel
            images={selectedStore.gallery}
            alt={selectedStore.name}
            className="w-full rounded-b-none!"
            showCounter={showCarouselControls}
            showFullscreenButton={showCarouselControls}
            aspectRatio={3 / 2}
          />

          <div className="space-y-3 px-6">
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-lg font-semibold text-gray-900 leading-tight">
                {selectedStore.name}
              </h3>
              <Badge className="bg-black text-white shrink-0 text-xs font-medium">
                {formattedPrice}
              </Badge>
            </div>

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
        </div>

        <Separator />

        {/* Descrição */}
        <div className="space-y-2 px-6">
          <h4 className="text-sm font-semibold text-gray-900">Sobre</h4>
          <p className="text-sm text-gray-600 leading-relaxed">
            {selectedStore.description}
          </p>
        </div>

        <Separator />

        {/* Informações de contato */}
        <div className="space-y-3 px-6">
          <h4 className="text-sm font-semibold text-gray-900">Informações</h4>

          <div className="space-y-3">
            <a
              href={whatsAppLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-sm px-4 py-2.5 bg-green-50 hover:bg-green-100 rounded-lg transition-colors group border border-green-200"
            >
              <MessageCircle className="h-4 w-4 text-green-600 shrink-0 group-hover:scale-110 transition-transform" />
              <div className="flex flex-col">
                <span className="text-green-700 font-medium">WhatsApp</span>
                <span className="text-green-600 text-xs">
                  {selectedStore.telephone}
                </span>
              </div>
            </a>

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
              <span>{formattedHours}</span>
            </div>
          </div>
        </div>

        <Separator />

        {/* Avaliações em destaque */}
        <div className="space-y-3 px-6">
          <h4 className="text-sm font-semibold text-gray-900">
            Avaliações Recentes
          </h4>

          <div className="space-y-2.5">
            {displayReviews.map((review) => (
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
            ))}

            {!hasReviews && (
              <div className="p-3 bg-gray-50 rounded-lg text-center">
                <span className="text-sm text-gray-500">
                  Nenhuma avaliação disponível
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="px-6">
          {/* Botão de ação principal */}
          <Button
            className="w-full bg-black hover:bg-gray-800 text-white font-medium"
            size="lg"
            onClick={handleBookingClick}
          >
            <Calendar className="h-5 w-5 mr-2" />
            Ver Agenda e Agendar
          </Button>
        </div>
      </div>
    </Card>
  );
}
