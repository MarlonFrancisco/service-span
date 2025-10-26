import {
  Alert,
  AlertDescription,
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  FormField,
  Input,
  ScrollArea,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  useIsMobile,
} from '@repo/ui';
import {
  Briefcase,
  CheckCircle2,
  Edit,
  Mail,
  Shield,
  UserPlus,
} from 'lucide-react';
import { useAddProfessionalModal } from './add-professional-modal.hook';

export const AddProfessionalModal = () => {
  const { form, isAddProfessional, isEditing, handleSubmit, handleClose } =
    useAddProfessionalModal();

  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Drawer
        open={isAddProfessional}
        onOpenChange={(open) => !open && handleClose()}
      >
        <DrawerContent className="max-h-[95vh]">
          <DrawerHeader className="border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center">
                {isEditing ? (
                  <Edit className="h-5 w-5 text-white" />
                ) : (
                  <UserPlus className="h-5 w-5 text-white" />
                )}
              </div>
              <div>
                <DrawerTitle className="text-gray-900">
                  {isEditing ? 'Editar Colaborador' : 'Novo Colaborador'}
                </DrawerTitle>
                <DrawerDescription className="text-gray-600">
                  {isEditing
                    ? 'Atualize o e-mail ou função do colaborador'
                    : 'Os dados serão recuperados automaticamente'}
                </DrawerDescription>
              </div>
            </div>
          </DrawerHeader>

          <ScrollArea className="flex-1 overflow-y-auto">
            <div className="px-4 py-6 space-y-5">
              {/* Info Alert */}
              <Alert className="bg-blue-50 border-blue-200">
                <Mail className="h-4 w-4 text-blue-600" />
                <AlertDescription className="text-xs text-blue-900">
                  Digite o e-mail do usuário. Nome, telefone e outros dados
                  serão sincronizados automaticamente a partir do cadastro
                  existente na plataforma.
                </AlertDescription>
              </Alert>

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                <FormField
                  control={form.control}
                  name="user.email"
                  disabled={isEditing}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="email"
                      placeholder="usuario@exemplo.com"
                      className="pl-10 h-12"
                    />
                  )}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1.5">
                O usuário deve estar previamente cadastrado na plataforma
              </p>

              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <>
                    <div className="relative">
                      <Select {...field} onValueChange={field.onChange}>
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="manager">
                            <div className="flex items-center gap-2">
                              <Shield className="h-4 w-4 text-blue-600" />
                              <div>
                                <p className="text-sm text-left">Gerente</p>
                                <p className="text-xs text-gray-500">
                                  Gerencia operações e equipe
                                </p>
                              </div>
                            </div>
                          </SelectItem>
                          <SelectItem value="professional">
                            <div className="flex items-center gap-2">
                              <Briefcase className="h-4 w-4 text-green-600" />
                              <div>
                                <p className="text-sm text-left">
                                  Profissional
                                </p>
                                <p className="text-xs text-gray-500">
                                  Presta serviços aos clientes
                                </p>
                              </div>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <p className="text-xs text-gray-500 mt-1.5">
                      O usuário deve estar previamente cadastrado na plataforma
                    </p>
                  </>
                )}
              />
            </div>
          </ScrollArea>

          <DrawerFooter className="border-t border-gray-200 bg-gray-50 pt-4">
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                onClick={handleClose}
                className="min-h-[48px] border-gray-300"
              >
                Cancelar
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={!form.formState.isDirty}
                className="bg-gray-900 hover:bg-gray-800 text-white min-h-[48px]"
              >
                <CheckCircle2 className="h-4 w-4 mr-2" />
                {isEditing ? 'Salvar' : 'Adicionar'}
              </Button>
            </div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog
      open={isAddProfessional}
      onOpenChange={(open) => !open && handleClose()}
    >
      <DialogContent className="max-w-md max-h-[90vh] overflow-hidden flex flex-col p-0 gap-0">
        <DialogHeader className="px-4 sm:px-6 py-4 sm:py-5 border-b border-gray-200 shrink-0 bg-gradient-to-r from-gray-50 to-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center">
              {isEditing ? (
                <Edit className="h-5 w-5 text-white" />
              ) : (
                <UserPlus className="h-5 w-5 text-white" />
              )}
            </div>
            <div>
              <DialogTitle className="text-gray-900">
                {isEditing ? 'Editar Colaborador' : 'Novo Colaborador'}
              </DialogTitle>
              <p className="text-xs text-gray-600 mt-0.5">
                {isEditing
                  ? 'Atualize o e-mail ou função do colaborador'
                  : 'Os dados serão recuperados automaticamente do banco'}
              </p>
            </div>
          </div>
        </DialogHeader>

        <ScrollArea className="flex-1">
          <div className="px-4 sm:px-6 py-6 space-y-5">
            {/* Info Alert */}
            <Alert className="bg-blue-50 border-blue-200">
              <Mail className="h-4 w-4 text-blue-600" />
              <AlertDescription className="text-xs text-blue-900">
                Digite o e-mail do usuário. Nome, telefone e outros dados serão
                sincronizados automaticamente a partir do cadastro existente na
                plataforma.
              </AlertDescription>
            </Alert>

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              <FormField
                control={form.control}
                name="user.email"
                disabled={isEditing}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="email"
                    placeholder="usuario@exemplo.com"
                    className="pl-10 h-12"
                    autoFocus
                  />
                )}
              />
            </div>
            <p className="text-xs text-gray-500 mt-1.5">
              O usuário deve estar previamente cadastrado na plataforma
            </p>

            <FormField
              name="role"
              control={form.control}
              render={({ field }) => (
                <Select {...field} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="manager">
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-blue-600" />
                        <div>
                          <p className="text-sm text-left">Gerente</p>
                          <p className="text-xs text-gray-500">
                            Gerencia operações e equipe
                          </p>
                        </div>
                      </div>
                    </SelectItem>
                    <SelectItem value="professional">
                      <div className="flex items-center gap-2">
                        <Briefcase className="h-4 w-4 text-green-600" />
                        <div>
                          <p className="text-sm text-left">Profissional</p>
                          <p className="text-xs text-gray-500">
                            Presta serviços aos clientes
                          </p>
                        </div>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
        </ScrollArea>

        <div className="px-4 sm:px-6 py-4 border-t border-gray-200 bg-gray-50 shrink-0">
          <div className="flex flex-col-reverse sm:flex-row gap-2 sm:gap-3 sm:justify-end">
            <Button
              variant="outline"
              onClick={handleClose}
              className="w-full sm:w-auto min-h-[44px] border-gray-300"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!form.formState.isDirty}
              className="bg-gray-900 hover:bg-gray-800 text-white w-full sm:w-auto min-h-[44px]"
            >
              <CheckCircle2 className="h-4 w-4 mr-2" />
              {isEditing ? 'Salvar Alterações' : 'Adicionar Colaborador'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
