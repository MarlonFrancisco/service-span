import {
  Alert,
  AlertDescription,
  FormField,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  TabsContent,
  Textarea,
} from '@repo/ui';
import { AlertCircle } from 'lucide-react';
import { Category } from '../../services-module.hook';

interface CategoryFormData {
  name: string;
  description: string;
  color: string;
}

interface CategoryFormProps {
  formData: CategoryFormData;
  setFormData: (data: CategoryFormData) => void;
  editingCategory: Category | null;
  getColorClass: (color: string) => string;
}

const AVAILABLE_COLORS = [
  'blue',
  'purple',
  'pink',
  'red',
  'orange',
  'yellow',
  'green',
  'gray',
];

export function CategoryForm({
  formData,
  setFormData,
  editingCategory,
  getColorClass,
}: CategoryFormProps) {
  return (
    <TabsContent
      value={editingCategory ? 'edit' : 'add'}
      className="p-6 space-y-4 mt-0"
    >
      {editingCategory && (
        <Alert className="mb-4 bg-blue-50 border-blue-200">
          <AlertCircle className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-sm text-blue-900">
            Editando categoria: <strong>{editingCategory.name}</strong>
          </AlertDescription>
        </Alert>
      )}

      <div className="space-y-4">
        <FormField label="Nome da Categoria" required>
          <Input
            placeholder="Ex: Tratamentos Faciais"
            value={formData.name}
            onChange={(e) =>
              setFormData({
                ...formData,
                name: e.target.value,
              })
            }
            className="h-12"
          />
        </FormField>

        <FormField label="Descrição">
          <Textarea
            placeholder="Descreva o tipo de serviços desta categoria..."
            rows={3}
            value={formData.description}
            onChange={(e) =>
              setFormData({
                ...formData,
                description: e.target.value,
              })
            }
            className="resize-none"
          />
        </FormField>

        <FormField label="Cor da Categoria">
          <Select
            value={formData.color}
            onValueChange={(value) =>
              setFormData({
                ...formData,
                color: value,
              })
            }
          >
            <SelectTrigger className="h-12">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {AVAILABLE_COLORS.map((color) => (
                <SelectItem key={color} value={color}>
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-4 h-4 rounded ${getColorClass(color)}`}
                    />
                    {color.charAt(0).toUpperCase() + color.slice(1)}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormField>

        {!editingCategory ? (
          <Alert className="bg-blue-50 border-blue-200">
            <AlertCircle className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-sm text-blue-900">
              As categorias ajudam a organizar seus serviços e facilitar a busca
              dos clientes
            </AlertDescription>
          </Alert>
        ) : (
          <Alert className="bg-blue-50 border-blue-200">
            <AlertCircle className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-sm text-blue-900">
              Alterar o nome da categoria irá atualizar automaticamente todos os
              serviços vinculados
            </AlertDescription>
          </Alert>
        )}
      </div>
    </TabsContent>
  );
}
