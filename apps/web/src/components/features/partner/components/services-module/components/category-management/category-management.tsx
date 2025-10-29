import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  ScrollArea,
  Spinner,
  Tabs,
  TabsList,
  TabsTrigger,
  useIsMobile,
} from '@repo/ui';
import { CheckCircle2, Plus, Tags } from 'lucide-react';
import { FormProvider } from 'react-hook-form';
import { CategoryForm } from './category-form/category-form';
import { CategoryList } from './category-list/category-list';
import { useCategoryManagement } from './category-management.hook';

export function CategoryManagementModal() {
  const isMobile = useIsMobile();
  const {
    isCategoryModalOpen,
    category,
    form,
    isCreatingCategory,
    isUpdatingCategory,
    handleClose,
    handleSubmit,
  } = useCategoryManagement();

  const isEditing = !!category.id;

  const content = (
    <FormProvider {...form}>
      <Tabs
        defaultValue="list"
        className="flex-1 flex flex-col overflow-hidden"
        value={isEditing ? 'edit' : undefined}
      >
        <div className="px-6 pt-4 pb-0 border-b border-gray-200 shrink-0 overflow-x-auto scrollbar-hide bg-white">
          <TabsList className="inline-flex bg-gray-100 p-1.5 rounded-lg h-12">
            <TabsTrigger
              value="list"
              disabled={isEditing}
              className="px-6 h-9 data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              Categorias Atuais
            </TabsTrigger>
            <TabsTrigger
              value="add"
              disabled={isEditing}
              className="px-6 h-9 data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              {isEditing ? 'Editar Categoria' : 'Adicionar Nova'}
            </TabsTrigger>
          </TabsList>
        </div>

        <ScrollArea className="flex-1 overflow-y-auto">
          <CategoryList />

          <CategoryForm />
        </ScrollArea>

        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 shrink-0">
          {isEditing ? (
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1 min-h-[44px] border-gray-300"
                onClick={handleClose}
              >
                Cancelar
              </Button>
              <Button
                className="flex-1 bg-gray-900 hover:bg-gray-800 text-white min-h-[44px]"
                disabled={isCreatingCategory || isUpdatingCategory}
                onClick={handleSubmit}
              >
                {isCreatingCategory || isUpdatingCategory ? (
                  <>
                    <Spinner />
                    Salvando Alterações...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Salvar Alterações
                  </>
                )}
              </Button>
            </div>
          ) : (
            <Button
              className="w-full bg-gray-900 hover:bg-gray-800 text-white min-h-[44px]"
              disabled={isCreatingCategory}
              onClick={handleSubmit}
            >
              {isCreatingCategory ? (
                <>
                  <Spinner />
                  Criando Categoria...
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Categoria
                </>
              )}
            </Button>
          )}
        </div>
      </Tabs>
    </FormProvider>
  );

  if (isMobile) {
    return (
      <Drawer
        open={isCategoryModalOpen}
        onOpenChange={(open) => !open && handleClose()}
      >
        <DrawerContent className="max-h-[95vh] flex flex-col">
          <DrawerHeader className="border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center">
                <Tags className="h-5 w-5 text-white" />
              </div>
              <DrawerTitle className="text-gray-900">
                Categorias de Serviços
              </DrawerTitle>
            </div>
          </DrawerHeader>
          {content}
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog
      open={isCategoryModalOpen}
      onOpenChange={(open) => !open && handleClose()}
    >
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden flex flex-col p-0 gap-0">
        <DialogHeader className="px-6 py-5 border-b border-gray-200 shrink-0 bg-gradient-to-r from-gray-50 to-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center">
              <Tags className="h-5 w-5 text-white" />
            </div>
            <DialogTitle className="text-gray-900">
              Categorias de Serviços
            </DialogTitle>
          </div>
        </DialogHeader>
        {content}
      </DialogContent>
    </Dialog>
  );
}
