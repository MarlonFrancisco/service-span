import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  Label,
  Separator,
  Textarea,
} from '@repo/ui';
import { Images, Plus } from 'lucide-react';
import { MultiImageUpload } from '../../../../MultiImageUpload';
import type { TAddStoreModalConfig } from './add-store-modal.types';

export const AddStoreModal = ({
  isOpen,
  images,
  onClose,
  onImagesChange,
}: TAddStoreModalConfig) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTrigger asChild>
        <Button className="bg-[#20b2aa] hover:bg-[#20b2aa]/90 text-white">
          <Plus className="h-4 w-4 mr-2" />
          Adicionar Nova Loja
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-[#1a2b4c] flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Nova Loja
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label>Nome da Loja</Label>
              <Input placeholder="Ex: Loja Centro" />
            </div>
            <div>
              <Label>Descrição</Label>
              <Textarea placeholder="Descreva sua loja, especialidades e diferenciais..." />
            </div>
            <div>
              <Label>Endereço Completo</Label>
              <Textarea placeholder="Rua, número, bairro, cidade..." />
            </div>
            <div>
              <Label>Horário de Funcionamento</Label>
              <Input placeholder="Ex: 08:00 - 18:00" />
            </div>
          </div>

          <Separator />

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

          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button className="bg-[#20b2aa] hover:bg-[#20b2aa]/90 text-white">
              Criar Loja
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
