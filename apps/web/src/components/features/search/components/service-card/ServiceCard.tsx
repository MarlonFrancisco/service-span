import { Star, MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ImageCarousel } from "../image-carousel";

interface ServiceCardProps {
  id: string;
  name: string;
  category: string;
  rating: number;
  reviewCount: number;
  location: string;
  price: string;
  imageUrl: string;
  images?: string[];
  isSelected: boolean;
  onClick: () => void;
}

export function ServiceCard({
  name,
  category,
  rating,
  reviewCount,
  location,
  price,
  imageUrl,
  images,
  isSelected,
  onClick
}: ServiceCardProps) {
  // Use images array if available, otherwise fallback to single imageUrl
  const allImages = images && images.length > 0 ? images : [imageUrl];
  return (
    <Card
      className={`group overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-0 shadow-lg bg-white ${
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
              aspectRatio="auto"
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
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-gray-100 text-gray-800 border-0 text-xs">
                  {category}
                </Badge>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-black transition-colors">
                {name}
              </h3>
              <div className="flex items-center gap-1 mb-3">
                <Star className="h-4 w-4 fill-black text-black" />
                <span className="font-medium">{rating}</span>
                <span className="text-gray-500">·</span>
                <span className="text-gray-600">{reviewCount} avaliações</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 mb-4">
                <MapPin className="h-4 w-4" />
                <span>{location}</span>
              </div>
            </div>
            <div className="text-right ml-4">
              <div className="text-lg font-semibold text-gray-900">
                {price}
              </div>
              <div className="text-sm text-gray-500">
                por serviço
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-gray-100">
            <div className="text-sm text-gray-600">
              Disponível hoje
            </div>
            <button className="text-sm font-medium text-black hover:underline">
              Ver detalhes
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
}
