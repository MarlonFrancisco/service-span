import { Star, Share, Heart, Images } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ImageCarousel } from "../../../search/components/image-carousel";
import { BUSINESS_SHOWCASE_MOCK } from "./business-showcase.mock";
import Image from "next/image";

interface BusinessShowcaseProps {
  businessName: string;
  businessAddress: string;
  businessPhone: string;
  rating?: number;
  reviewCount?: number;
  category?: string;
  description?: string;
  images?: string[];
  imageUrl?: string;
}

export function BusinessShowcase({
  businessName,
  businessAddress,
  businessPhone,
  rating = 4.8,
  reviewCount = 124,
  category = "Salão de Beleza",
  description = "Especialistas em cortes modernos, coloração e tratamentos capilares. Atendimento personalizado em ambiente aconchegante.",
  images,
  imageUrl
}: BusinessShowcaseProps) {
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  // Use images array if available, otherwise fallback to single imageUrl or default images
  const allImages = BUSINESS_SHOWCASE_MOCK;

  const displayImages = allImages.slice(0, 5);

  return (
    <div>
      <div className="max-w-7xl mx-auto px-6 py-2 pt-6">
        {/* Business Name and Actions */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl text-[#1a2b4c] mb-2">{businessName}</h1>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2 rounded-lg border-gray-300 hover:bg-gray-50"
            >
              <Share className="h-4 w-4" />
              Compartilhar
            </Button>
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

        {/* Images Gallery - Airbnb Style */}
        <div className="mb-4 relative">
          <div className="grid grid-cols-4 gap-2 h-96 rounded-xl overflow-hidden">
            {/* Main Image - Left Side */}
            <div className="col-span-2 relative group cursor-pointer">
              <Image
                src={displayImages[0] || ''}
                alt={businessName}
                className="w-auto h-auto object-cover group-hover:brightness-90 transition-all"
                layout="fill"
                objectPosition="top"
                onClick={() => setShowAllPhotos(true)}
              />
            </div>

            {/* Right Side Grid */}
            <div className="col-span-2 grid grid-cols-2 gap-2">
              {displayImages.slice(1, 5).map((image, index) => (
                <div
                  key={index}
                  className="relative group cursor-pointer"
                  onClick={() => setShowAllPhotos(true)}
                >
                  <Image
                    src={image}
                    alt={`${businessName} - ${index + 2}`}
                    className="w-auto h-auto object-cover group-hover:brightness-90 transition-all"
                    layout="fill"
                    objectPosition="top"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Show All Photos Button - Bottom Right */}
          {!showAllPhotos && allImages.length > 0 && (
            <Button
              variant="outline"
              className="absolute bottom-4 right-4 bg-white text-black hover:bg-gray-100 rounded-lg shadow-lg"
              onClick={() => setShowAllPhotos(true)}
            >
              <Images className="h-4 w-4 mr-2" />
              Mostrar todas as fotos
            </Button>
          )}
        </div>

        {/* Business Info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Info */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h2 className="text-xl text-[#1a2b4c] mb-2">
                {category} em {businessAddress?.split(',')[0]}
              </h2>
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                <span>3 quartos</span>
                <span>·</span>
                <span>1 banheiro</span>
                <span>·</span>
                <span>1 cama</span>
                <span>·</span>
                <span>1 casa de banho</span>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-black text-black" />
                  <span className="font-medium">{rating}</span>
                  <span>·</span>
                  <span className="underline">{reviewCount} avaliações</span>
                </div>
                <span>·</span>
                <span className="underline">{businessAddress}</span>
              </div>
            </div>
          </div>

          {/* Right Column - Price Info */}
          <div className="lg:col-span-1">
            <div className="text-right">
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <p className="text-sm text-gray-600 mb-2">Os preços incluem todas as taxas</p>
              </div>
            </div>
          </div>
        </div>

        {/* Photo Gallery Modal */}
        <Dialog open={showAllPhotos} onOpenChange={setShowAllPhotos}>
          <DialogContent className="max-w-6xl max-h-[90vh] p-0">
            <div className="relative">
              <ImageCarousel
                images={allImages}
                alt={businessName}
                className="w-full h-[80vh]"
                showCounter={true}
                showFullscreenButton={false}
                aspectRatio="auto"
              />
              <Button
                variant="outline"
                size="sm"
                className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm"
                onClick={() => setShowAllPhotos(false)}
              >
                Fechar
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
