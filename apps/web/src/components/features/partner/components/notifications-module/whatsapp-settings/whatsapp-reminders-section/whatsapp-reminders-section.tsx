'use client';

import {
  Alert,
  AlertDescription,
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  cn,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Switch,
  Textarea,
} from '@repo/ui';
import { Controller } from 'react-hook-form';
import { NotificationPreviewModal } from '../../components/notification-preview-modal';
import { Icons } from '../../notifications-module.utils';
import { useWhatsappRemindersSection } from './whatsapp-reminders-section.hook';

export function WhatsappRemindersSection() {
  const { form, timingOptions, previewModal, openPreview, closePreview } =
    useWhatsappRemindersSection();

  const isEnabled = form.watch('whatsappReminderEnabled');
  const customMessage = form.watch('whatsappReminderCustomMessage') || '';
  const messageLength = customMessage.length;
  const isNearLimit = messageLength > 250;

  return (
    <>
      <Card className="border-gray-200">
        <CardHeader
          className={cn('border-b border-gray-100', !isEnabled && 'border-b-0')}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Icons.MessageCircle className="h-5 w-5 text-green-700" />
              </div>
              <div>
                <h3 className="text-lg text-gray-900">
                  Lembretes por WhatsApp
                </h3>
                <p className="text-sm text-gray-600">
                  Mensagens instantâneas com alta taxa de abertura
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={openPreview}
                className="border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                <Icons.Eye className="h-4 w-4 mr-2" />
                Preview WhatsApp
              </Button>
              <Controller
                control={form.control}
                name="whatsappReminderEnabled"
                render={({ field }) => (
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
            </div>
          </div>
        </CardHeader>

        {isEnabled && (
          <CardContent className="pt-0">
            <div className="space-y-6">
              <Alert className="bg-green-50 border-green-200">
                <Icons.MessageCircle className="h-4 w-4 stroke-green-700" />
                <AlertDescription className="text-sm flex text-green-800">
                  WhatsApp tem{' '}
                  <strong className="mx-1">98% de taxa de abertura</strong>.
                  Ideal para comunicação direta com clientes.
                </AlertDescription>
              </Alert>

              <FormField
                control={form.control}
                name="whatsappReminderAdvanceHours"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm text-gray-900">
                      Tempo de antecedência:
                    </FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Selecione o tempo" />
                        </SelectTrigger>
                        <SelectContent>
                          {timingOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="whatsappReminderCustomMessage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm text-gray-900">
                      Mensagem personalizada (opcional):
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Ex: Olá! Confirmando seu horário para amanhã. Nos vemos em breve! 😊"
                        className="min-h-[100px] resize-none"
                        maxLength={300}
                      />
                    </FormControl>
                    <div className="flex items-center justify-between">
                      <p
                        className={cn(
                          'text-xs font-medium',
                          isNearLimit
                            ? 'text-orange-600'
                            : 'text-gray-500 font-normal',
                        )}
                      >
                        {messageLength}/300 caracteres
                        {isNearLimit && ' - Atenção ao limite!'}
                      </p>
                      <Badge
                        variant="outline"
                        className="text-xs border-green-200 text-green-700 bg-green-50"
                      >
                        Emojis permitidos
                      </Badge>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        )}
      </Card>

      <NotificationPreviewModal
        isOpen={previewModal.isOpen}
        onClose={closePreview}
        type="whatsapp"
        customMessage={customMessage}
      />
    </>
  );
}
