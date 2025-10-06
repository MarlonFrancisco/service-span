import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Input,
  Label,
  Separator,
  Textarea,
} from '@repo/ui';
import { Images, Plus, Settings, Users } from 'lucide-react';
import { MultiImageUpload } from '../../../../MultiImageUpload';
import type { TEditStoreModalConfig } from './edit-store-modal.types';

export const EditStoreModal = ({
  store,
  images,
  onClose,
  onImagesChange,
}: TEditStoreModalConfig) => {
  return (
    <Dialog open={!!store} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-[#1a2b4c] flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Configurações - {store?.name}
          </DialogTitle>
        </DialogHeader>
        {store && (
          <div className="space-y-6">
            {/* Basic Info */}
            <div className="space-y-4">
              <h4 className="text-sm text-[#1a2b4c]">Informações Básicas</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Nome da Loja</Label>
                  <Input defaultValue={store.name} />
                </div>
                <div>
                  <Label>Horário de Funcionamento</Label>
                  <Input defaultValue={store.workingHours} />
                </div>
              </div>
              <div>
                <Label>Descrição</Label>
                <Textarea defaultValue={store.description} />
              </div>
              <div>
                <Label>Endereço</Label>
                <Textarea defaultValue={store.address} />
              </div>
            </div>

            <Separator />

            {/* Store Images */}
            <div>
              <Label className="flex items-center gap-2 mb-4">
                <Images className="h-4 w-4" />
                Fotos da Loja (até 5 imagens)
              </Label>
              <MultiImageUpload
                images={images}
                onChange={onImagesChange}
                maxImages={5}
              />
            </div>

            <Separator />

            {/* Staff Section */}
            <div className="space-y-4">
              <h4 className="text-sm text-[#1a2b4c] flex items-center gap-2">
                <Users className="h-4 w-4" />
                Profissionais Associados
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm">Maria Silva</p>
                    <p className="text-xs text-gray-500">Cabeleireira</p>
                  </div>
                  <Button size="sm" variant="outline">
                    Editar
                  </Button>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm">João Santos</p>
                    <p className="text-xs text-gray-500">Barbeiro</p>
                  </div>
                  <Button size="sm" variant="outline">
                    Editar
                  </Button>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm">Ana Costa</p>
                    <p className="text-xs text-gray-500">Esteticista</p>
                  </div>
                  <Button size="sm" variant="outline">
                    Editar
                  </Button>
                </div>
              </div>
              <Button size="sm" variant="outline" className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Profissional
              </Button>
            </div>

            <div className="flex gap-2 pt-4 border-t">
              <Button variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button className="bg-[#20b2aa] hover:bg-[#20b2aa]/90 text-white">
                Salvar Alterações
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
