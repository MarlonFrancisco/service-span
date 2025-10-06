import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
} from '@repo/ui';
import { Plus } from 'lucide-react';
import type { TAddServiceModalConfig } from './add-service-modal.types';

export const AddServiceModal = ({
  isOpen,
  categories,
  onClose,
}: TAddServiceModalConfig) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTrigger asChild>
        <Button className="bg-[#20b2aa] hover:bg-[#20b2aa]/90 text-white">
          <Plus className="h-4 w-4 mr-2" />
          Adicionar Serviço
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-[#1a2b4c]">Novo Serviço</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label>Nome do Serviço</Label>
            <Input placeholder="Ex: Corte Feminino" />
          </div>
          <div>
            <Label>Descrição</Label>
            <Textarea placeholder="Descrição detalhada do serviço..." />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Duração (min)</Label>
              <Input type="number" placeholder="60" />
            </div>
            <div>
              <Label>Preço (R$)</Label>
              <Input type="number" placeholder="65.00" />
            </div>
          </div>
          <div>
            <Label>Categoria</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma categoria" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button className="bg-[#20b2aa] hover:bg-[#20b2aa]/90 text-white">
              Criar Serviço
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
