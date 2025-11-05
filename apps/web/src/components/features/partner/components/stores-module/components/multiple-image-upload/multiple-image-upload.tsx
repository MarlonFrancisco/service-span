import { ImageWithFallback } from '@/components/ui/image-with-fallback';
import { IStoreGallery } from '@/types/api/stores.types';
import { Badge, Button, Card } from '@repo/ui';
import { AlertCircle, Camera, ImageIcon, Star, Upload, X } from 'lucide-react';
import { useRef, useState } from 'react';

interface MultiImageUploadProps {
  images: IStoreGallery[];
  onChange: (images: IStoreGallery[]) => void;
  onChangeMain: (image: IStoreGallery) => void;
  onDelete: (imageId: string) => void;
  maxImages?: number;
  maxFileSize?: number; // em bytes
  className?: string;
}

const DEFAULT_MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export function MultiImageUpload({
  images,
  maxImages = 5,
  maxFileSize = DEFAULT_MAX_FILE_SIZE,
  className = '',
  onChange,
  onChangeMain,
  onDelete,
}: MultiImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;

    setError(null);
    const remainingSlots = maxImages - images.length;
    const filesToProcess = Math.min(files.length, remainingSlots);
    const filesLoaded = [];
    let hasError = false;

    for (let i = 0; i < filesToProcess; i++) {
      const file = files[i]!;

      if (!file.type.startsWith('image/')) {
        setError('Um ou mais arquivos não são imagens válidas');
        hasError = true;
        continue;
      }

      if (file.size > maxFileSize) {
        setError(`Arquivo muito grande. Máximo: ${Math.round(maxFileSize / 1024 / 1024)}MB`);
        hasError = true;
        continue;
      }

      if (!hasError) {
        const filePromise = new Promise<IStoreGallery>((resolve, reject) => {
          const fileReader = new FileReader();

          fileReader.readAsDataURL(file);

          fileReader.onload = (e) => {
            const image = e.target?.result as string;
            resolve({
              id: Math.random().toString(36).substring(2, 15),
              url: image,
              isMain: false,
            });
          };

          fileReader.onerror = (e) => {
            reject(e);
          };
        });

        filesLoaded.push(filePromise);
      }
    }

    if (filesLoaded.length > 0) {
      Promise.all(filesLoaded).then((images) => {
        onChange(images);
      });
    }
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
    onDelete(imageId);
  };

  const setMainImage = (image: IStoreGallery) => {
    onChangeMain(image);
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={`space-y-5 ${className}`}>
      {/* Error Message */}
      {error && (
        <div className="flex gap-3 p-3 bg-red-50 border border-red-200 rounded-lg">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {/* Upload Area */}
      {images.length < maxImages && (
        <div
          className={`
            border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all
            ${
              dragActive
                ? 'border-gray-900 bg-gray-50'
                : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
            }
          `}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={openFileDialog}
        >
          <div className="flex flex-col items-center gap-4">
            <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center">
              {dragActive ? (
                <Upload className="w-6 h-6 text-gray-900" />
              ) : (
                <Camera className="w-6 h-6 text-gray-600" />
              )}
            </div>

            <div>
              <p className="text-sm text-gray-900 mb-1">
                {dragActive ? 'Solte as imagens aqui' : 'Adicionar fotos'}
              </p>
              <p className="text-xs text-gray-600">
                Arraste e solte ou clique para selecionar • {images.length}/
                {maxImages} fotos
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Máximo de {Math.round(maxFileSize / 1024 / 1024)}MB por arquivo
              </p>
            </div>

            <Button
              variant="outline"
              size="sm"
              className="border-gray-300 hover:bg-gray-100 h-10"
              onClick={(e) => {
                e.stopPropagation();
                openFileDialog();
              }}
            >
              <ImageIcon className="w-4 h-4 mr-2" />
              Escolher Arquivos
            </Button>
          </div>
        </div>
      )}

      {/* Image Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <Card
              key={image.id}
              className="relative overflow-hidden group border-gray-200 hover:shadow-md transition-shadow py-0"
            >
              <div className="aspect-square relative bg-gray-100">
                <ImageWithFallback
                  src={`https://qwprndmtjhwgmtngiwjg.supabase.co/storage/v1/object/public/stores/${image.url}`}
                  alt={`Foto ${index + 1}`}
                  fill
                  sizes="(min-width: 728px) 320px, 150px"
                />

                {/* Overlay with actions */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-end justify-between p-3">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeImage(image.id);
                    }}
                    className="h-8 w-8 p-0 bg-white/90 hover:bg-white shadow-sm"
                  >
                    <X className="w-4 h-4" />
                  </Button>

                  <Button
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      setMainImage(image);
                    }}
                    className={`text-xs h-8 ${
                      image.isMain
                        ? 'bg-gray-900 hover:bg-gray-800 text-white'
                        : 'bg-white/90 hover:bg-white text-gray-900'
                    }`}
                  >
                    <Star
                      className={`w-3 h-3 mr-1 ${image.isMain ? 'fill-white' : ''}`}
                    />
                    {image.isMain ? 'Principal' : 'Marcar'}
                  </Button>
                </div>

                {/* Main image badge - Always visible */}
                {image.isMain && (
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-gray-900 hover:bg-gray-900 text-white text-xs shadow-lg">
                      <Star className="w-3 h-3 mr-1 fill-white" />
                      Principal
                    </Badge>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Helper Text */}
      {images.length > 0 && images.length < maxImages && (
        <p className="text-xs text-gray-600 text-center">
          Você pode adicionar mais {maxImages - images.length}{' '}
          {maxImages - images.length === 1 ? 'foto' : 'fotos'}
        </p>
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
