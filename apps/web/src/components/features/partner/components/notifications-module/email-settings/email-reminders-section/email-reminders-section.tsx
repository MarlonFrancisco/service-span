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
import { useEmailRemindersSection } from './email-reminders-section.hook';

export function EmailRemindersSection() {
  const { form, timingOptions, previewModal, openPreview, closePreview } =
    useEmailRemindersSection();

  const isEnabled = form.watch('emailReminderEnabled');
  const customMessage = form.watch('emailReminderCustomMessage') || '';
  const messageLength = customMessage.length;
  const isSubmitting = form.formState.isSubmitting;

  return (
    <>
      <Card className="border-gray-200">
        <CardHeader
          className={cn('border-b border-gray-100', !isEnabled && 'border-b-0')}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <Icons.Mail className="h-5 w-5 text-gray-900" />
              </div>
              <div>
                <h3 className="text-lg text-gray-900">Lembretes por E-mail</h3>
                <p className="text-sm text-gray-600">
                  Envio automático de lembretes para clientes
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
                Preview E-mail
              </Button>
              <Controller
                control={form.control}
                name="emailReminderEnabled"
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
              <Alert>
                <Icons.Sparkles className="h-4 w-4" />
                <AlertDescription className="text-sm flex">
                  E-mails têm <strong>82% de taxa de abertura</strong>
                </AlertDescription>
              </Alert>

              <FormField
                control={form.control}
                name="emailReminderAdvanceHours"
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
                name="emailReminderCustomMessage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm text-gray-900">
                      Mensagem personalizada (opcional):
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Ex: Estamos ansiosos para atendê-lo! Caso precise remarcar, use o link abaixo."
                        className="min-h-[100px] resize-none"
                        maxLength={200}
                      />
                    </FormControl>
                    <div className="flex items-center justify-between">
                      <p
                        className={cn(
                          'text-xs',
                          messageLength > 180
                            ? 'text-orange-600 font-medium'
                            : 'text-gray-500',
                        )}
                      >
                        {messageLength}/200 caracteres
                      </p>
                      <Badge variant="outline" className="text-xs">
                        Template Padrão + Personalização
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
        type="email"
        customMessage={customMessage}
      />
    </>
  );
}
