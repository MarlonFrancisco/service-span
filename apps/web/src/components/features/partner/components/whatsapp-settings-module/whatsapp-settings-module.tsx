'use client';

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Switch,
} from '@repo/ui';
import { Copy, Loader2 } from 'lucide-react';
import { FormProvider } from 'react-hook-form';
import { toast } from 'sonner';
import { WhatsappSettingsModuleSkeleton } from './whatsapp-settings-module-skeleton';
import { useWhatsappSettingsModule } from './whatsapp-settings-module.hook';

export const WhatsappSettingsModule = () => {
  const { isSaveConfigPending, isWhatsappPending, form, handleSubmit } =
    useWhatsappSettingsModule();

  if (isWhatsappPending) return <WhatsappSettingsModuleSkeleton />;

  return (
    <div className="space-y-6 pb-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-gray-900 mb-1">Configuração do WhatsApp</h2>
          <p className="text-gray-600 text-sm">
            Gerencie a integração com o WhatsApp Business API
          </p>
        </div>
      </div>

      {/* Content */}
      <Card>
        <CardHeader>
          <CardTitle>Credenciais da API</CardTitle>
          <CardDescription>
            Insira as credenciais do seu aplicativo Meta para habilitar o envio
            de mensagens.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FormProvider {...form}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-6">
                <FormField
                  control={form.control}
                  name="isActive"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          Ativar WhatsApp
                        </FormLabel>
                        <FormDescription>
                          Ative ou desative a integração com o WhatsApp Business
                          API.
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phoneNumberId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number ID</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: 105956..." {...field} />
                      </FormControl>
                      <FormDescription>
                        O ID do número de telefone encontrado no painel do
                        WhatsApp API.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="businessAccountId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Business Account ID</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: 105956..." {...field} />
                      </FormControl>
                      <FormDescription>
                        O ID da conta empresarial do WhatsApp.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="accessToken"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Access Token</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Access Token" />
                      </FormControl>
                      <FormDescription>
                        Token de acesso permanente gerado para o usuário do
                        sistema.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormItem>
                  <FormLabel>Webhook Verify Token</FormLabel>
                  <div className="flex items-center gap-2">
                    <div className="bg-muted text-muted-foreground flex-1 rounded-md border px-3 py-2 text-sm">
                      {form.watch('webhookVerifyToken')}
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => {
                        const token = form.getValues('webhookVerifyToken');
                        navigator.clipboard.writeText(token);
                        toast.success(
                          'Token copiado para a área de transferência!',
                        );
                      }}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <FormDescription>
                    Token personalizado para validar o webhook no painel da
                    Meta.
                  </FormDescription>
                </FormItem>
              </div>

              <div className="flex justify-end">
                <Button type="submit" disabled={isSaveConfigPending}>
                  {isSaveConfigPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Salvando...
                    </>
                  ) : (
                    'Salvar Alterações'
                  )}
                </Button>
              </div>
            </form>
          </FormProvider>
        </CardContent>
      </Card>
    </div>
  );
};
