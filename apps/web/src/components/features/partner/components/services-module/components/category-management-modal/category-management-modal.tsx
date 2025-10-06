import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  Label,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@repo/ui';
import { Tags, Trash2 } from 'lucide-react';
import type { TCategoryManagementModalConfig } from './category-management-modal.types';

export const CategoryManagementModal = ({
  isOpen,
  categories,
  services,
  onClose,
  onAddCategory,
  onDeleteCategory,
}: TCategoryManagementModalConfig) => {
  const handleAddCategory = (e: React.MouseEvent<HTMLButtonElement>) => {
    const input = (e.target as HTMLElement).parentElement?.querySelector(
      'input',
    ) as HTMLInputElement;
    if (input?.value) {
      onAddCategory(input.value);
      input.value = '';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const target = e.target as HTMLInputElement;
      if (target.value) {
        onAddCategory(target.value);
        target.value = '';
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Tags className="h-4 w-4 mr-2" />
          Gerenciar Categorias
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-[#1a2b4c] flex items-center gap-2">
            <Tags className="h-5 w-5" />
            Gerenciar Categorias
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="list" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="list">Categorias Atuais</TabsTrigger>
            <TabsTrigger value="add">Adicionar Nova</TabsTrigger>
          </TabsList>

          <TabsContent value="list" className="space-y-4">
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {categories.map((category) => {
                const serviceCount = services.filter(
                  (service) => service.category === category,
                ).length;
                const isUsed = serviceCount > 0;

                return (
                  <div
                    key={category}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div>
                      <div className="text-sm text-[#1a2b4c]">{category}</div>
                      <div className="text-xs text-gray-500">
                        {serviceCount} serviço{serviceCount !== 1 ? 's' : ''}
                      </div>
                    </div>

                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onDeleteCategory(category)}
                      disabled={isUsed}
                      className="h-8 w-8 p-0 text-red-600 hover:text-red-700 disabled:opacity-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="add" className="space-y-4">
            <div>
              <Label>Nome da Nova Categoria</Label>
              <Input
                placeholder="Ex: Tratamentos Faciais"
                onKeyDown={handleKeyDown}
              />
            </div>

            <Button
              size="sm"
              className="w-full bg-[#20b2aa] hover:bg-[#20b2aa]/90 text-white"
              onClick={handleAddCategory}
            >
              Adicionar Categoria
            </Button>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

