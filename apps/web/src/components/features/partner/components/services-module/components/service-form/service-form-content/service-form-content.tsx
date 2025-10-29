import {
  Button,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Label,
  ScrollArea,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Spinner,
  Switch,
  Textarea,
} from '@repo/ui';
import { CheckCircle2, Filter } from 'lucide-react';
import { getColorClass } from '../../../utils/colors';
import { useServiceFormContent } from './service-form-content.hook';

export function ServiceFormContent() {
  const {
    form,
    isEditing,
    categories,
    isCreatingService,
    isUpdatingService,
    handleClose,
    handleSubmit,
  } = useServiceFormContent();

  const isActive = form.watch('isActive');

  const isLoading = isCreatingService || isUpdatingService;

  return (
    <>
      <ScrollArea className="flex-1 overflow-y-auto">
        <div className="px-4 sm:px-6 py-6 space-y-4">
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome do Serviço</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ex: Corte Feminino"
                    className="h-11"
                    {...field}
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
                <FormLabel>Descrição do Serviço</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Descreva os detalhes do serviço..."
                    rows={3}
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="category.id"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Categoria do Serviço</FormLabel>
                <FormControl>
                  <Select
                    value={field.value}
                    onValueChange={(value) => field.onChange(value)}
                  >
                    <SelectTrigger className="h-11">
                      <Filter className="h-4 w-4 mr-2 text-gray-500" />
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          <div className="flex items-center gap-2">
                            <div
                              className={`w-2 h-2 rounded-full ${getColorClass(category.color || 'blue')}`}
                            />
                            {category.name}
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              name="duration"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Duração do Serviço</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="60"
                      min="5"
                      step="5"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      value={field.value}
                      className="h-11"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="price"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preço do Serviço</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="65.00"
                      min="0"
                      step="0.01"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      value={field.value}
                      className="h-11"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {!isEditing && (
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
                checked={isActive}
                onCheckedChange={(checked) =>
                  form.setValue('isActive', checked)
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
            onClick={handleClose}
            className="min-h-[48px] sm:min-h-[44px] sm:w-auto border-gray-300"
          >
            Cancelar
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-gray-900 hover:bg-gray-800 text-white min-h-[48px] sm:min-h-[44px] sm:w-auto"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Spinner /> <span>Salvando...</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="h-4 w-4 mr-2" />
                {isEditing ? 'Salvar' : 'Criar'}
              </>
            )}
          </Button>
        </div>
      </div>
    </>
  );
}
