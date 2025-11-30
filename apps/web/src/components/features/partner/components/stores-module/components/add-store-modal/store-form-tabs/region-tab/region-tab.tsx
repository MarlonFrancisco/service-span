import {
  COUNTRIES,
  CURRENCIES,
  getCountriesByRegion,
  type TCountryCode,
  type TCurrencyCode,
} from '@repo/shared/constants';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  getFlagEmoji,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  TabsContent,
} from '@repo/ui';
import { Banknote, Clock, Globe2 } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import type { TStoreFormSchema } from '../store-form.schema';

// Timezone options grouped by region
const TIMEZONE_OPTIONS = [
  // Americas
  {
    value: 'America/Sao_Paulo',
    label: 'São Paulo (GMT-3)',
    region: 'Americas',
  },
  {
    value: 'America/Argentina/Buenos_Aires',
    label: 'Buenos Aires (GMT-3)',
    region: 'Americas',
  },
  { value: 'America/Santiago', label: 'Santiago (GMT-4)', region: 'Americas' },
  { value: 'America/Bogota', label: 'Bogotá (GMT-5)', region: 'Americas' },
  { value: 'America/Lima', label: 'Lima (GMT-5)', region: 'Americas' },
  {
    value: 'America/Mexico_City',
    label: 'Cidade do México (GMT-6)',
    region: 'Americas',
  },
  { value: 'America/New_York', label: 'Nova York (GMT-5)', region: 'Americas' },
  {
    value: 'America/Los_Angeles',
    label: 'Los Angeles (GMT-8)',
    region: 'Americas',
  },
  // Europe
  { value: 'Europe/Lisbon', label: 'Lisboa (GMT+0)', region: 'Europe' },
  { value: 'Europe/Madrid', label: 'Madrid (GMT+1)', region: 'Europe' },
  { value: 'Europe/Paris', label: 'Paris (GMT+1)', region: 'Europe' },
  { value: 'Europe/Berlin', label: 'Berlim (GMT+1)', region: 'Europe' },
  { value: 'Europe/Rome', label: 'Roma (GMT+1)', region: 'Europe' },
  { value: 'Europe/Amsterdam', label: 'Amsterdã (GMT+1)', region: 'Europe' },
  { value: 'Europe/London', label: 'Londres (GMT+0)', region: 'Europe' },
  { value: 'Europe/Dublin', label: 'Dublin (GMT+0)', region: 'Europe' },
  { value: 'Europe/Brussels', label: 'Bruxelas (GMT+1)', region: 'Europe' },
  { value: 'Europe/Vienna', label: 'Viena (GMT+1)', region: 'Europe' },
];

export const RegionTab = () => {
  const form = useFormContext<TStoreFormSchema>();
  const regions = getCountriesByRegion();

  const handleCountryChange = (countryCode: TCountryCode) => {
    const countryData = COUNTRIES[countryCode];
    form.setValue('country', countryCode, { shouldValidate: true });
    // Auto-update currency and timezone when country changes
    form.setValue('currency', countryData.currency, { shouldValidate: true });
    form.setValue('timezone', countryData.timezone, { shouldValidate: true });
  };

  return (
    <TabsContent value="region" className="space-y-6 sm:space-y-8 mt-0">
      {/* Region Section */}
      <div className="bg-white p-4 sm:p-6 rounded-xl border border-gray-200 space-y-4 sm:space-y-5">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
            <Globe2 className="h-4 w-4 text-gray-700" />
          </div>
          <div>
            <h3 className="text-gray-900">País e Região</h3>
            <p className="text-xs text-gray-500">
              Define o formato de endereço e telefone
            </p>
          </div>
        </div>

        <FormField
          name="country"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>País *</FormLabel>
              <Select
                value={field.value}
                onValueChange={(value) =>
                  handleCountryChange(value as TCountryCode)
                }
              >
                <FormControl>
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="Selecione o país">
                      {field.value && (
                        <span className="flex items-center gap-2">
                          <span>{getFlagEmoji(field.value)}</span>
                          <span>
                            {COUNTRIES[field.value as TCountryCode]?.nativeName}
                          </span>
                        </span>
                      )}
                    </SelectValue>
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {/* South America */}
                  <div className="px-2 py-1.5 text-xs font-medium text-gray-500">
                    América do Sul
                  </div>
                  {regions.southAmerica.map((code) => (
                    <SelectItem key={code} value={code}>
                      <span className="flex items-center gap-2">
                        <span>{getFlagEmoji(code)}</span>
                        <span>{COUNTRIES[code].nativeName}</span>
                      </span>
                    </SelectItem>
                  ))}

                  {/* North America */}
                  <div className="px-2 py-1.5 text-xs font-medium text-gray-500 mt-2">
                    América do Norte
                  </div>
                  {regions.northAmerica.map((code) => (
                    <SelectItem key={code} value={code}>
                      <span className="flex items-center gap-2">
                        <span>{getFlagEmoji(code)}</span>
                        <span>{COUNTRIES[code].nativeName}</span>
                      </span>
                    </SelectItem>
                  ))}

                  {/* Europe */}
                  <div className="px-2 py-1.5 text-xs font-medium text-gray-500 mt-2">
                    Europa
                  </div>
                  {regions.europe.map((code) => (
                    <SelectItem key={code} value={code}>
                      <span className="flex items-center gap-2">
                        <span>{getFlagEmoji(code)}</span>
                        <span>{COUNTRIES[code].nativeName}</span>
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                O país determina o formato de CEP, telefone e moeda padrão
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Currency Section */}
      <div className="bg-white p-4 sm:p-6 rounded-xl border border-gray-200 space-y-4 sm:space-y-5">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
            <Banknote className="h-4 w-4 text-gray-700" />
          </div>
          <div>
            <h3 className="text-gray-900">Moeda</h3>
            <p className="text-xs text-gray-500">
              Moeda usada para preços dos serviços
            </p>
          </div>
        </div>

        <FormField
          name="currency"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Moeda *</FormLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="Selecione a moeda">
                      {field.value && (
                        <span className="flex items-center gap-2">
                          <span className="font-semibold text-gray-700">
                            {CURRENCIES[field.value as TCurrencyCode]?.symbol}
                          </span>
                          <span>{field.value}</span>
                          <span className="text-gray-500">
                            - {CURRENCIES[field.value as TCurrencyCode]?.name}
                          </span>
                        </span>
                      )}
                    </SelectValue>
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.entries(CURRENCIES).map(([code, data]) => (
                    <SelectItem key={code} value={code}>
                      <span className="flex items-center gap-2">
                        <span className="font-semibold text-gray-700 w-6">
                          {data.symbol}
                        </span>
                        <span>{code}</span>
                        <span className="text-gray-500">- {data.name}</span>
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Todos os preços de serviços serão exibidos nesta moeda
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
          <p className="text-sm text-amber-800">
            <strong>Importante:</strong> Após criar serviços, alterar a moeda
            não converterá os preços automaticamente. Você precisará atualizar
            os valores manualmente.
          </p>
        </div>
      </div>

      {/* Timezone Section */}
      <div className="bg-white p-4 sm:p-6 rounded-xl border border-gray-200 space-y-4 sm:space-y-5">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
            <Clock className="h-4 w-4 text-gray-700" />
          </div>
          <div>
            <h3 className="text-gray-900">Fuso Horário</h3>
            <p className="text-xs text-gray-500">
              Define o horário de funcionamento e agendamentos
            </p>
          </div>
        </div>

        <FormField
          name="timezone"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fuso Horário *</FormLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="Selecione o fuso horário">
                      {field.value && (
                        <span>
                          {TIMEZONE_OPTIONS.find(
                            (tz) => tz.value === field.value,
                          )?.label || field.value}
                        </span>
                      )}
                    </SelectValue>
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {/* Americas */}
                  <div className="px-2 py-1.5 text-xs font-medium text-gray-500">
                    Américas
                  </div>
                  {TIMEZONE_OPTIONS.filter(
                    (tz) => tz.region === 'Americas',
                  ).map((tz) => (
                    <SelectItem key={tz.value} value={tz.value}>
                      {tz.label}
                    </SelectItem>
                  ))}

                  {/* Europe */}
                  <div className="px-2 py-1.5 text-xs font-medium text-gray-500 mt-2">
                    Europa
                  </div>
                  {TIMEZONE_OPTIONS.filter((tz) => tz.region === 'Europe').map(
                    (tz) => (
                      <SelectItem key={tz.value} value={tz.value}>
                        {tz.label}
                      </SelectItem>
                    ),
                  )}
                </SelectContent>
              </Select>
              <FormDescription>
                Os horários de funcionamento e agendamentos seguirão este fuso
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </TabsContent>
  );
};
