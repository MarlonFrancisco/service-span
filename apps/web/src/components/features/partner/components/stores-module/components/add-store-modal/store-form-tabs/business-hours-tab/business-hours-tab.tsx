import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  Switch,
  TabsContent,
} from '@repo/ui';
import { Clock } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import { TStoreFormSchema } from '../store-form.schema';
import {
  BUSINESS_DAYS_TRANSLATED,
  useBusinessHoursTab,
} from './business-hours-tab.hook';

export const BusinessHoursTab = () => {
  const form = useFormContext<TStoreFormSchema>();
  const { businessDays, handleDayToggle } = useBusinessHoursTab();

  return (
    <TabsContent value="hours" className="space-y-6 sm:space-y-8 mt-0">
      {/* Business Hours Section */}
      <div className="bg-white p-4 sm:p-6 rounded-xl border border-gray-200 space-y-4 sm:space-y-5">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
            <Clock className="h-4 w-4 text-gray-700" />
          </div>
          <h3 className="text-gray-900">Horário de Funcionamento</h3>
        </div>

        <p className="text-sm text-gray-600 mb-6">
          Configure o horário de funcionamento e selecione quais dias da semana
          a loja está aberta
        </p>

        {/* Global Business Hours */}
        <div className="border-b border-gray-200 pb-6 space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5">
            {/* Opening Time */}
            <FormField
              name="openTime"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Horário de Abertura *</FormLabel>
                  <FormControl>
                    <InputGroup>
                      <InputGroupInput type="time" {...field} />
                      <InputGroupAddon>
                        <Clock className="h-4 w-4" />
                      </InputGroupAddon>
                    </InputGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Closing Time */}
            <FormField
              name="closeTime"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Horário de Fechamento *</FormLabel>
                  <FormControl>
                    <InputGroup>
                      <InputGroupInput type="time" {...field} />
                      <InputGroupAddon>
                        <Clock className="h-4 w-4" />
                      </InputGroupAddon>
                    </InputGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Lunch Hours */}
          <div>
            <p className="text-sm text-gray-700 font-medium mb-3">
              Horário de Almoço (Opcional)
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
              <FormField
                name="lunchStartTime"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Início</FormLabel>
                    <FormControl>
                      <InputGroup>
                        <InputGroupInput
                          type="time"
                          placeholder="Opcional"
                          {...field}
                        />
                        <InputGroupAddon>
                          <Clock className="h-4 w-4" />
                        </InputGroupAddon>
                      </InputGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="lunchEndTime"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fim</FormLabel>
                    <FormControl>
                      <InputGroup>
                        <InputGroupInput
                          type="time"
                          placeholder="Opcional"
                          {...field}
                        />
                        <InputGroupAddon>
                          <Clock className="h-4 w-4" />
                        </InputGroupAddon>
                      </InputGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>

        {/* Business Days Toggle */}
        <div className="pt-6">
          <p className="text-sm text-gray-700 font-medium mb-4">
            Dias de Funcionamento
          </p>
          <div className="space-y-3">
            {Object.entries(businessDays).map(([day, isOpen]) => (
              <div
                key={day}
                className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <span className="text-sm font-medium text-gray-900">
                  {
                    BUSINESS_DAYS_TRANSLATED[
                      day as keyof typeof BUSINESS_DAYS_TRANSLATED
                    ]
                  }
                </span>
                <Switch
                  checked={isOpen}
                  onCheckedChange={() =>
                    handleDayToggle(
                      day as keyof TStoreFormSchema['businessDays'],
                    )
                  }
                  className="data-[state=checked]:bg-gray-900"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </TabsContent>
  );
};
