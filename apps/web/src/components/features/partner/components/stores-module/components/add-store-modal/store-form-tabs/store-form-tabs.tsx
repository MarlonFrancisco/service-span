import { Button, Spinner, Tabs, TabsList, TabsTrigger } from '@repo/ui';
import { CheckCircle2, Images, Users } from 'lucide-react';
import { FormProvider } from 'react-hook-form';
import { AddProfessionalModal } from '../../add-professional-modal';
import { BasicInfoTab } from './basic-info-tab';
import { ContactTab } from './contact-tab';
import { GalleryTab } from './gallery-tab';
import { ProfessionalTab } from './professionals-tab/professional-tab';
import { useStoreFormTabs } from './store-form-tabs.hook';

export const StoreFormTabs = () => {
  const { form, isEditingStore, isLoading, handleSubmit, handleClose } =
    useStoreFormTabs();

  return (
    <FormProvider {...form}>
      <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
        <Tabs
          defaultValue="basic"
          className="flex-1 flex flex-col overflow-hidden"
        >
          {/* Tabs Header */}
          <div className="px-4 sm:px-6 lg:px-8 pt-4 pb-0 border-b border-gray-200 shrink-0 overflow-x-auto scrollbar-hide bg-white">
            <TabsList className="inline-flex bg-gray-100 p-1.5 rounded-lg h-12">
              <TabsTrigger
                value="basic"
                className="px-4 sm:px-6 h-9 data-[state=active]:bg-white data-[state=active]:shadow-sm text-xs sm:text-sm"
              >
                Informações Básicas
              </TabsTrigger>
              <TabsTrigger
                value="contact"
                className="px-4 sm:px-6 h-9 data-[state=active]:bg-white data-[state=active]:shadow-sm text-xs sm:text-sm"
              >
                Contato & Redes
              </TabsTrigger>
              <TabsTrigger
                value="gallery"
                disabled={!isEditingStore}
                className="px-4 sm:px-6 h-9 data-[state=active]:bg-white data-[state=active]:shadow-sm text-xs sm:text-sm"
              >
                <Images className="h-4 w-4 mr-2" />
                Galeria
              </TabsTrigger>
              <TabsTrigger
                value="staff"
                disabled={!isEditingStore}
                className="px-4 sm:px-6 h-9 data-[state=active]:bg-white data-[state=active]:shadow-sm text-xs sm:text-sm"
              >
                <Users className="h-4 w-4 mr-2" />
                Funcionários
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Scrollable Content Area */}
          <div className="flex-1 overflow-y-auto bg-gray-50">
            <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
              <BasicInfoTab />

              <ContactTab />

              <GalleryTab />

              <ProfessionalTab />
            </div>
          </div>

          {/* Fixed Footer with Actions */}
          <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-5 border-t border-gray-200 bg-white shrink-0">
            <div className="flex flex-col-reverse sm:flex-row gap-3 sm:justify-end">
              <Button
                variant="outline"
                onClick={handleClose}
                className="w-full sm:w-auto min-h-[48px] sm:min-h-[44px] px-8 border-gray-300"
              >
                Cancelar
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={isLoading || !form.formState.isDirty}
                className="bg-gray-900 hover:bg-gray-800 text-white w-full sm:w-auto min-h-[48px] sm:min-h-[44px] px-8"
              >
                {isLoading ? (
                  <>
                    <Spinner />
                    Salvando...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    {isEditingStore ? 'Salvar Alterações' : 'Criar Loja'}
                  </>
                )}
              </Button>
            </div>
          </div>
        </Tabs>
      </div>

      <AddProfessionalModal />
    </FormProvider>
  );
};
