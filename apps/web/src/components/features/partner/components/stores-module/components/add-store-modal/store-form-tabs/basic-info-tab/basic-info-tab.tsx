import {
  Badge,
  Button,
  Checkbox,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  TabsContent,
  Textarea,
} from '@repo/ui';
import { Building2, MapPin, Plus, X } from 'lucide-react';
import { AMENITIES_LIST } from '../../../../utils/stores-module.constants';
import { isCustomAmenity as checkIsCustomAmenity } from '../../../../utils/stores-module.helpers';
import { useBasicInfoTab } from './basic-info-tab.hook';

export const BasicInfoTab = () => {
  const {
    form,
    amenities,
    customAmenity,
    setCustomAmenity,
    onAddCustomAmenity,
    onRemoveAmenity,
  } = useBasicInfoTab();

  return (
    <TabsContent value="basic" className="space-y-6 sm:space-y-8 mt-0">
      {/* Identity Section */}
      <div className="bg-white p-4 sm:p-6 rounded-xl border border-gray-200 space-y-4 sm:space-y-5">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
            <Building2 className="h-4 w-4 text-gray-700" />
          </div>
          <h3 className="text-gray-900">Identidade da Loja</h3>
        </div>

        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome da Loja *</FormLabel>
              <FormControl>
                <InputGroup>
                  <InputGroupInput placeholder="Ex: Loja Centro" {...field} />
                  <InputGroupAddon>
                    <Building2 />
                  </InputGroupAddon>
                </InputGroup>
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
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Ex: Salon moderno especializado em cortes e tratamentos capilares, com ambiente acolhedor e profissionais experientes..."
                  rows={3}
                  className="resize-none border-accent border-2"
                  maxLength={500}
                  {...field}
                />
              </FormControl>
              <p className="text-xs text-gray-500 mt-1 text-right">
                {field.value?.length || 0}/500 caracteres
              </p>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Location Section */}
      <div className="bg-white p-4 sm:p-6 rounded-xl border border-gray-200 space-y-4 sm:space-y-5">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
            <MapPin className="h-4 w-4 text-gray-700" />
          </div>
          <h3 className="text-gray-900">Localização</h3>
        </div>

        <FormField
          name="address"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Endereço *</FormLabel>
              <FormControl>
                <InputGroup>
                  <InputGroupInput
                    placeholder="Rua, número, complemento..."
                    {...field}
                  />
                  <InputGroupAddon>
                    <MapPin />
                  </InputGroupAddon>
                </InputGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5">
          <FormField
            name="city"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cidade *</FormLabel>
                <FormControl>
                  <InputGroup>
                    <InputGroupInput placeholder="Ex: São Paulo" {...field} />
                    <InputGroupAddon>
                      <MapPin />
                    </InputGroupAddon>
                  </InputGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="state"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estado *</FormLabel>
                <FormControl>
                  <InputGroup>
                    <InputGroupInput placeholder="Ex: SP" {...field} />
                    <InputGroupAddon>
                      <MapPin />
                    </InputGroupAddon>
                  </InputGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="zipCode"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>CEP *</FormLabel>
                <FormControl>
                  <InputGroup>
                    <InputGroupInput placeholder="Ex: 00000-000" {...field} />
                    <InputGroupAddon>
                      <MapPin />
                    </InputGroupAddon>
                  </InputGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex-1">
            <h3 className="text-gray-900">Comodidades</h3>
            <p className="text-xs text-gray-500 mt-0.5">
              Selecione as comodidades padrão ou adicione personalizadas
            </p>
          </div>
        </div>

        {/* Predefined Amenities */}
        <div>
          <p className="text-xs text-gray-600 mb-3">Comodidades Padrão</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {AMENITIES_LIST.map((amenity) => (
              <label
                key={amenity}
                className="flex items-center gap-3 p-3 sm:p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors has-[:checked]:border-gray-900 has-[:checked]:bg-gray-50"
              >
                <Checkbox
                  checked={amenities.includes(amenity)}
                  onCheckedChange={(checked) => {
                    const current = form.getValues('amenities');
                    if (checked) {
                      form.setValue('amenities', [...current, amenity], {
                        shouldValidate: true,
                      });
                    } else {
                      form.setValue(
                        'amenities',
                        current.filter((a) => a !== amenity),
                        { shouldValidate: true },
                      );
                    }
                  }}
                />
                <span className="text-sm text-gray-700">{amenity}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Custom Amenities Input */}
        <div>
          <p className="text-xs text-gray-600 mb-3">
            Adicionar Comodidade Personalizada
          </p>
          <div className="flex gap-2">
            <InputGroup>
              <InputGroupInput
                placeholder="Ex: Massagem Relaxante, Sauna..."
                value={customAmenity}
                onChange={(e) => setCustomAmenity(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    onAddCustomAmenity();
                  }
                }}
                maxLength={30}
              />
              <InputGroupAddon align="inline-end">
                <InputGroupButton type="button" onClick={onAddCustomAmenity}>
                  <Plus />
                  Adicionar
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
          </div>
          <p className="text-xs text-gray-500 mt-1.5">
            {customAmenity.length}/30 caracteres
          </p>
        </div>

        {/* Custom Amenities List */}
        {amenities.some(checkIsCustomAmenity) && (
          <div>
            <p className="text-xs text-gray-600 mb-3">
              Comodidades Personalizadas (
              {amenities.filter(checkIsCustomAmenity).length})
            </p>
            <div className="flex flex-wrap gap-2">
              {amenities.filter(checkIsCustomAmenity).map((amenity, idx) => (
                <Badge
                  key={idx}
                  variant="outline"
                  className="text-sm pl-3 pr-2 py-1.5 border-gray-900 bg-gray-50 text-gray-900 gap-2"
                >
                  {amenity}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onRemoveAmenity(amenity)}
                  >
                    <X className="h-3 w-3 text-gray-500" />
                  </Button>
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
    </TabsContent>
  );
};
