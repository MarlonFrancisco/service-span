import {
  Button,
  FormField,
  Input,
  Label,
  ScrollArea,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Switch,
  Textarea,
} from '@repo/ui';
import { CheckCircle2 } from 'lucide-react';
import { Category, Service } from '../../services-module.hook';

interface ServiceFormData {
  name: string;
  description: string;
  duration: string;
  price: string;
  category: string;
  maxBookingsPerDay: string;
  isActive: boolean;
}

interface ServiceFormContentProps {
  formData: ServiceFormData;
  setFormData: (data: ServiceFormData) => void;
  categories: Category[];
  editingService: Service | null;
  onSave: () => void;
  onCancel: () => void;
  getColorClass: (color: string) => string;
}

export function ServiceFormContent({
  formData,
  setFormData,
  categories,
  editingService,
  onSave,
  onCancel,
  getColorClass,
}: ServiceFormContentProps) {
  return (
    <>
      <ScrollArea className="flex-1 overflow-y-auto">
        <div className="px-4 sm:px-6 py-6 space-y-4">
          <FormField label="Nome do Serviço" required>
            <Input
              placeholder="Ex: Corte Feminino"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="h-11"
            />
          </FormField>

          <FormField label="Descrição">
            <Textarea
              placeholder="Descreva os detalhes do serviço..."
              rows={3}
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="resize-none"
            />
          </FormField>

          <FormField label="Categoria" required>
            <Select
              value={formData.category}
              onValueChange={(value) =>
                setFormData({ ...formData, category: value })
              }
            >
              <SelectTrigger className="h-11">
                <SelectValue placeholder="Selecione uma categoria" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.name}>
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-3 h-3 rounded ${getColorClass(category.color || 'blue')}`}
                      />
                      {category.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Duração (minutos)" required>
              <Input
                type="number"
                placeholder="60"
                min="5"
                step="5"
                value={formData.duration}
                onChange={(e) =>
                  setFormData({ ...formData, duration: e.target.value })
                }
                className="h-11"
              />
            </FormField>

            <FormField label="Preço (R$)" required>
              <Input
                type="number"
                placeholder="65.00"
                min="0"
                step="0.01"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                className="h-11"
              />
            </FormField>
          </div>

          <FormField label="Máximo de agendamentos por dia" hint="Opcional">
            <Input
              type="number"
              placeholder="Sem limite"
              min="1"
              value={formData.maxBookingsPerDay}
              onChange={(e) =>
                setFormData({ ...formData, maxBookingsPerDay: e.target.value })
              }
              className="h-11"
            />
          </FormField>

          {!editingService && (
            <div className="flex items-center justify-between p-3.5 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex-1">
                <Label htmlFor="serviceActive" className="cursor-pointer">
                  Serviço ativo
                </Label>
                <p className="text-xs text-gray-600 mt-0.5">
                  Disponível para agendamento
                </p>
              </div>
              <Switch
                id="serviceActive"
                checked={formData.isActive}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, isActive: checked })
                }
              />
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Fixed Footer with Actions */}
      <div className="px-4 sm:px-6 py-4 border-t border-gray-200 bg-gray-50 shrink-0">
        <div className="grid grid-cols-2 gap-2 sm:gap-3 sm:flex sm:justify-end">
          <Button
            variant="outline"
            onClick={onCancel}
            className="min-h-[48px] sm:min-h-[44px] sm:w-auto border-gray-300"
          >
            Cancelar
          </Button>
          <Button
            onClick={onSave}
            className="bg-gray-900 hover:bg-gray-800 text-white min-h-[48px] sm:min-h-[44px] sm:w-auto"
          >
            <CheckCircle2 className="h-4 w-4 mr-2" />
            {editingService ? 'Salvar' : 'Criar'}
          </Button>
        </div>
      </div>
    </>
  );
}
