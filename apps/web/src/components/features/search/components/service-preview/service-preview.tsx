'use client'

import { Star, Phone, MapPin, Clock, Calendar } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ImageCarousel } from "../image-carousel";
import type { Service } from '../../types/search.types';

interface ServicePreviewProps {
  service: Service | null;
  onStartBooking?: (service: Service) => void;
}

export function ServicePreview({ service, onStartBooking }: ServicePreviewProps) {
  if (!service) {
    return (
      <Card className="p-8 h-fit flex items-center justify-center border-gray-200">
        <div className="text-center text-gray-500">
          <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
          <p>Selecione um serviço para ver os detalhes</p>
        </div>
      </Card>
    );
  }

  // Use images array if available, otherwise fallback to single imageUrl
  const allImages = service.images && service.images.length > 0 ? service.images : [service.imageUrl];

  return (
    <Card className="p-6 h-fit border-gray-200 shadow-lg">
      <div className="space-y-6">
        {/* Header com carousel de imagens */}
        <div className="space-y-4">
          <ImageCarousel
            images={allImages}
            alt={service.name}
            className="w-full h-56"
            showCounter={allImages.length > 1}
            showFullscreenButton={allImages.length > 1}
            aspectRatio="auto"
          />

          <div className="space-y-2">
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-xl font-semibold text-gray-900">{service.name}</h3>
              <Badge className="bg-black text-white">
                {service.price}
              </Badge>
            </div>

            <p className="text-gray-600">{service.category}</p>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span>{service.rating}</span>
              </div>
              <span className="text-sm text-gray-500">({service.reviewCount} avaliações)</span>
            </div>
          </div>
        </div>

        <Separator />

        {/* Descrição */}
        <div className="space-y-2">
          <h4 className="font-semibold text-gray-900">Sobre o Serviço</h4>
          <p className="text-gray-600 leading-relaxed">{service.description}</p>
        </div>

        <Separator />

        {/* Informações de contato */}
        <div className="space-y-3">
          <h4 className="font-semibold text-gray-900">Informações</h4>

          <div className="space-y-2">
            <div className="flex items-center gap-3 text-sm">
              <Phone className="h-4 w-4 text-gray-500" />
              <span>{service.phone}</span>
            </div>

            <div className="flex items-start gap-3 text-sm">
              <MapPin className="h-4 w-4 text-gray-500 mt-0.5" />
              <span>{service.address}</span>
            </div>

            <div className="flex items-center gap-3 text-sm">
              <Clock className="h-4 w-4 text-gray-500" />
              <span>Seg-Sex: 9h às 18h | Sáb: 9h às 15h</span>
            </div>
          </div>
        </div>

        <Separator />

        {/* Avaliações em destaque */}
        <div className="space-y-3">
          <h4 className="font-semibold text-gray-900">Avaliações Recentes</h4>

          <div className="space-y-3">
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-xs text-gray-500">Ana Paula</span>
              </div>
              <p className="text-xs text-gray-600">"Excelente atendimento! Profissionais muito qualificados."</p>
            </div>

            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <div className="flex">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  ))}
                  <Star className="h-3 w-3 text-gray-300" />
                </div>
                <span className="text-xs text-gray-500">Carlos Silva</span>
              </div>
              <p className="text-xs text-gray-600">"Ótimo custo-benefício. Recomendo!"</p>
            </div>
          </div>
        </div>

        {/* Botão de ação principal */}
        <Button
          className="w-full bg-black hover:bg-gray-800 text-white py-4 rounded-xl"
          size="lg"
          onClick={() => onStartBooking?.(service)}
        >
          <Calendar className="h-5 w-5 mr-2" />
          Ver Agenda e Agendar
        </Button>
      </div>
    </Card>
  );
}
