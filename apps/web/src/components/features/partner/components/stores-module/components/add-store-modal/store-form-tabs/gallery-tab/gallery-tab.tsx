import { TabsContent } from '@repo/ui';
import { Images } from 'lucide-react';
import { MultiImageUpload } from '../../../multiple-image-upload/multiple-image-upload';
import { useGalleryTab } from './gallery-tab.hook';

export const GalleryTab = () => {
  const { gallery, onGalleryChange, onChangeMainImage, onDeleteImage } =
    useGalleryTab();

  return (
    <TabsContent value="gallery" className="space-y-6 mt-0">
      <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-xl border border-gray-200">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
            <Images className="h-5 w-5 text-gray-700" />
          </div>
          <div>
            <h3 className="text-gray-900">Galeria de Fotos</h3>
            <p className="text-xs text-gray-600 mt-0.5">
              Adicione até 10 fotos da sua loja para atrair mais clientes
            </p>
          </div>
        </div>

        <MultiImageUpload
          images={gallery}
          maxImages={10}
          onChange={onGalleryChange}
          onChangeMain={onChangeMainImage}
          onDelete={onDeleteImage}
        />
      </div>
    </TabsContent>
  );
};
