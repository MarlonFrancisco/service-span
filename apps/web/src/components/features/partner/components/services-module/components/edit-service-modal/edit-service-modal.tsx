import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
} from '@repo/ui';
import type { TEditServiceModalConfig } from './edit-service-modal.types';

export const EditServiceModal = ({
  service,
  categories,
  onClose,
}: TEditServiceModalConfig) => {
  return (
    <Dialog open={!!service} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-[#1a2b4c]">
            Editar Serviço - {service?.name}
          </DialogTitle>
        </DialogHeader>
        {service && (
          <div className="space-y-4">
            <div>
              <Label>Nome do Serviço</Label>
              <Input defaultValue={service.name} />
            </div>
            <div>
              <Label>Descrição</Label>
              <Textarea defaultValue={service.description} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Duração (min)</Label>
                <Input type="number" defaultValue={service.duration} />
              </div>
              <div>
                <Label>Preço (R$)</Label>
                <Input type="number" defaultValue={service.price} />
              </div>
            </div>
            <div>
              <Label>Categoria</Label>
              <Select defaultValue={service.category}>
                <SelectTrigger>
                  <SelectValue />
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
                Salvar Alterações
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

