import {
  ButtonGroup,
  ButtonGroupText,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  Label,
  TabsContent,
} from '@repo/ui';
import { Facebook, Globe, Instagram, Mail, Phone } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import { TStoreFormSchema } from '../store-form.schema';

export const ContactTab = () => {
  const form = useFormContext<TStoreFormSchema>();

  return (
    <TabsContent value="contact" className="space-y-6 sm:space-y-8 mt-0">
      {/* Contact Details Section */}
      <div className="bg-white p-4 sm:p-6 rounded-xl border border-gray-200 space-y-4 sm:space-y-5">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
            <Phone className="h-4 w-4 text-gray-700" />
          </div>
          <h3 className="text-gray-900">Informações de Contato</h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
          <FormField
            name="telephone"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telefone *</FormLabel>
                <FormControl>
                  <InputGroup>
                    <InputGroupInput placeholder="(00) 00000-0000" {...field} />
                    <InputGroupAddon>
                      <Phone />
                    </InputGroupAddon>
                  </InputGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <InputGroup>
                    <InputGroupInput
                      placeholder="contato@exemplo.com"
                      {...field}
                    />
                    <InputGroupAddon>
                      <Mail />
                    </InputGroupAddon>
                  </InputGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      {/* Social Media Section */}
      <div className="bg-white p-4 sm:p-6 rounded-xl border border-gray-200 space-y-4 sm:space-y-5">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
            <Globe className="h-4 w-4 text-gray-700" />
          </div>
          <h3 className="text-gray-900">Presença Online</h3>
        </div>

        <FormField
          name="website"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Website</FormLabel>
              <FormControl>
                <ButtonGroup className="w-full">
                  <ButtonGroupText asChild>
                    <Label htmlFor="url">https://</Label>
                  </ButtonGroupText>
                  <InputGroup>
                    <InputGroupInput placeholder="exemplo.com" {...field} />
                    <InputGroupAddon>
                      <Globe />
                    </InputGroupAddon>
                  </InputGroup>
                </ButtonGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
          <FormField
            name="instagram"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Instagram</FormLabel>
                <FormControl>
                  <InputGroup>
                    <InputGroupInput placeholder="@suaconta" {...field} />
                    <InputGroupAddon>
                      <Instagram />
                    </InputGroupAddon>
                  </InputGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="facebook"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Facebook</FormLabel>
                <FormControl>
                  <InputGroup>
                    <InputGroupInput placeholder="/suapagina" {...field} />
                    <InputGroupAddon>
                      <Facebook />
                    </InputGroupAddon>
                  </InputGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </TabsContent>
  );
};
