import {
  Alert,
  AlertDescription,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
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
import { getColorClass } from '../../../utils/colors';
import { AVAILABLE_COLORS } from '../category.schema';
import { useCategoryForm } from './category-form.hook';

export function CategoryForm() {
  const { isEditing, category, form } = useCategoryForm();

  return (
    <TabsContent
      value={isEditing ? 'edit' : 'add'}
      className="p-6 space-y-4 mt-0"
    >
      {isEditing && (
        <Alert className="mb-4 bg-blue-50 border-blue-200">
          <AlertCircle className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-sm text-blue-900">
            Editando categoria: <strong>{category.name}</strong>
          </AlertDescription>
        </Alert>
      )}

      <div className="space-y-4">
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome da Categoria</FormLabel>
              <FormControl>
                <Input
                  placeholder="Ex: Tratamentos Faciais"
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  className="h-12"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="description"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Descreva o tipo de serviços desta categoria..."
                  rows={3}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="color"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cor da Categoria</FormLabel>
              <FormControl>
                <Select
                  value={field.value}
                  onValueChange={(value) => field.onChange(value)}
                >
                  <SelectTrigger>
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
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {!isEditing ? (
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
