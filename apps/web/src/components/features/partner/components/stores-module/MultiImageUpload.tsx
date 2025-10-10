import { Badge, Button, Card } from '@repo/ui';
import { Camera, ImageIcon, Upload, X } from 'lucide-react';
import Image from 'next/image';
import { useRef, useState } from 'react';

interface UploadedImage {
  id: string;
  url: string;
  file?: File;
  isMain?: boolean;
}

interface MultiImageUploadProps {
  images: UploadedImage[];
  onChange: (images: UploadedImage[]) => void;
  maxImages?: number;
  className?: string;
}

export function MultiImageUpload({
  images,
  onChange,
  maxImages = 5,
  className = '',
}: MultiImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;

    const newImages: UploadedImage[] = [];
    const remainingSlots = maxImages - images.length;
    const filesToProcess = Math.min(files.length, remainingSlots);

    for (let i = 0; i < filesToProcess; i++) {
      const file = files[i];
      if (file.type.startsWith('image/')) {
        const url = URL.createObjectURL(file);
        newImages.push({
          id: `${Date.now()}-${i}`,
          url,
          file,
          isMain: images.length === 0 && i === 0, // First image is main if no images exist
        });
      }
    }

    onChange([...images, ...newImages]);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
  };

  const removeImage = (imageId: string) => {
    const updatedImages = images.filter((img) => img.id !== imageId);

    // If removed image was main, make first remaining image main
    if (updatedImages.length > 0 && !updatedImages.some((img) => img.isMain)) {
      updatedImages[0].isMain = true;
    }

    onChange(updatedImages);
  };

  const setMainImage = (imageId: string) => {
    const updatedImages = images.map((img) => ({
      ...img,
      isMain: img.id === imageId,
    }));
    onChange(updatedImages);
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Upload Area */}
      {images.length < maxImages && (
        <div
          className={`
            border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
            ${
              dragActive
                ? 'border-[#20b2aa] bg-[#20b2aa]/5'
                : 'border-gray-300 hover:border-[#20b2aa] hover:bg-gray-50'
            }
          `}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={openFileDialog}
        >
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 bg-[#20b2aa]/10 rounded-full flex items-center justify-center">
              {dragActive ? (
                <Upload className="w-6 h-6 text-[#20b2aa]" />
              ) : (
                <Camera className="w-6 h-6 text-[#20b2aa]" />
              )}
            </div>

            <div>
              <p className="text-sm text-[#1a2b4c] mb-1">
                {dragActive
                  ? 'Solte as imagens aqui'
                  : 'Adicionar fotos da loja'}
              </p>
              <p className="text-xs text-gray-500">
                Arraste e solte ou clique para selecionar ({images.length}/
                {maxImages})
              </p>
            </div>

            <Button
              variant="outline"
              size="sm"
              className="border-[#20b2aa] text-[#20b2aa] hover:bg-[#20b2aa]/10"
              onClick={(e) => {
                e.stopPropagation();
                openFileDialog();
              }}
            >
              <ImageIcon className="w-4 h-4 mr-2" />
              Selecionar Imagens
            </Button>
          </div>
        </div>
      )}

      {/* Image Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((image, index) => (
            <Card key={image.id} className="relative overflow-hidden group">
              <div className="aspect-square relative">
                <Image
                  src={image.url}
                  alt={`Foto da loja ${index + 1}`}
                  className="w-full h-full object-cover"
                  width={100}
                  height={100}
                />

                {/* Overlay with actions */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => setMainImage(image.id)}
                    className="text-xs"
                  >
                    {image.isMain ? 'Principal' : 'Definir Principal'}
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => removeImage(image.id)}
                    className="p-1 h-8 w-8"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                {/* Main image badge */}
                {image.isMain && (
                  <div className="absolute top-2 left-2">
                    <Badge className="bg-[#20b2aa] hover:bg-[#20b2aa]/90 text-white text-xs">
                      Principal
                    </Badge>
                  </div>
                )}

                {/* Image number */}
                <div className="absolute top-2 right-2">
                  <Badge variant="secondary" className="text-xs">
                    {index + 1}
                  </Badge>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Instructions */}
      {images.length > 0 && (
        <div className="text-xs text-gray-500 space-y-1">
          <p>• A primeira imagem será usada como principal</p>
          <p>• Clique em "Definir Principal" para alterar a imagem principal</p>
          <p>• Máximo de {maxImages} fotos por loja</p>
        </div>
      )}

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*"
        onChange={(e) => handleFileSelect(e.target.files)}
        className="hidden"
      />
    </div>
  );
}
