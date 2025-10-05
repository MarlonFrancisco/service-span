import { useState } from "react";
import { User, Mail, Phone, Check, Calendar, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { SelectedService, Professional } from "./BookingSidebar";

interface CheckoutStepProps {
  selectedServices: SelectedService[];
  selectedProfessional: Professional | null;
  isAnyProfessional: boolean;
  selectedDate: Date | undefined;
  selectedTime: string | null;
  businessName: string;
  businessPhone: string;
  onFinishBooking: () => void;
}

export function CheckoutStep({
  selectedServices,
  selectedProfessional,
  isAnyProfessional,
  selectedDate,
  selectedTime,
  businessName,
  businessPhone,
  onFinishBooking
}: CheckoutStepProps) {
  // Simulando estado de login - em produção, isso viria do contexto de autenticação
  const [isLoggedIn] = useState(false); // Altere para true para testar estado logado
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);
  const [wantsToLogin, setWantsToLogin] = useState(false);

  // Dados do formulário
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  // Dados do usuário logado (mock)
  const loggedUserData = {
    name: 'João Silva',
    email: 'joao.silva@email.com',
    phone: '(11) 99999-9999'
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    // Simular processamento
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    onFinishBooking();
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  const formatDuration = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes}min`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}min` : `${hours}h`;
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  const totalPrice = selectedServices.reduce((total, service) => total + (service.price * service.quantity), 0);
  const totalDuration = selectedServices.reduce((total, service) => total + (service.duration * service.quantity), 0);

  const isFormValid = isLoggedIn || (formData.name.trim() && formData.email.trim() && formData.phone.trim());

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl text-[#1a2b4c] mb-2">Confirme seu agendamento</h2>
        <p className="text-gray-600">Revise os detalhes e finalize sua reserva</p>
      </div>

      {/* Resumo do Agendamento */}
      <Card className="p-6 border-[black]/20 bg-[black]/5">
        <h3 className="text-lg text-[#1a2b4c] mb-4 flex items-center gap-2">
          <Check className="h-5 w-5 text-[black]" />
          Resumo do Agendamento
        </h3>

        <div className="space-y-4">
          {/* Local */}
          <div className="flex items-start gap-3">
            <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
            <div>
              <p className="text-[#1a2b4c]">{businessName}</p>
              <p className="text-sm text-gray-600">{businessPhone}</p>
            </div>
          </div>

          {/* Data e Hora */}
          <div className="flex items-start gap-3">
            <Calendar className="h-5 w-5 text-gray-500 mt-0.5" />
            <div>
              <p className="text-[#1a2b4c]">
                {selectedDate && formatDate(selectedDate)}
              </p>
              <p className="text-sm text-gray-600 flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {selectedTime} • {formatDuration(totalDuration)}
              </p>
            </div>
          </div>

          {/* Profissional */}
          <div className="flex items-start gap-3">
            <User className="h-5 w-5 text-gray-500 mt-0.5" />
            <div>
              <p className="text-[#1a2b4c]">
                {isAnyProfessional ? 'Qualquer profissional' : selectedProfessional?.name}
              </p>
              {selectedProfessional && (
                <p className="text-sm text-gray-600">
                  {selectedProfessional.specialties.join(' • ')}
                </p>
              )}
            </div>
          </div>

          {/* Serviços */}
          <div className="border-t border-gray-200 pt-4">
            <h4 className="text-[#1a2b4c] mb-2">Serviços selecionados:</h4>
            <div className="space-y-2">
              {selectedServices.map(service => (
                <div key={service.id} className="flex justify-between items-center">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-900">{service.name}</span>
                      {service.quantity > 1 && (
                        <span className="bg-[black] text-white px-2 py-0.5 rounded-full text-xs">
                          {service.quantity}x
                        </span>
                      )}
                    </div>
                    <span className="text-sm text-gray-500">
                      ({formatDuration(service.duration * service.quantity)})
                    </span>
                  </div>
                  <span className="text-[#1a2b4c]">{formatPrice(service.price * service.quantity)}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 mt-3 pt-3 flex justify-between items-center">
              <span className="text-lg text-[#1a2b4c]">Total:</span>
              <span className="text-xl text-[#1a2b4c]">{formatPrice(totalPrice)}</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Dados do Cliente */}
      {isLoggedIn ? (
        /* Estado Logado */
        <Card className="p-6">
          <h3 className="text-lg text-[#1a2b4c] mb-4">Dados confirmados</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <User className="h-5 w-5 text-gray-500" />
              <span>{loggedUserData.name}</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-gray-500" />
              <span>{loggedUserData.email}</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-gray-500" />
              <span>{loggedUserData.phone}</span>
            </div>
          </div>
        </Card>
      ) : (
        /* Estado Não Logado */
        <Card className="p-6">
          <h3 className="text-lg text-[#1a2b4c] mb-4">Seus dados de contato</h3>

          {/* Opção de Login */}
          {!wantsToLogin && (
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800 mb-3">
                Já tem uma conta? Faça login para agilizar o processo.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setWantsToLogin(true)}
                className="border-blue-300 text-blue-700 hover:bg-blue-100"
              >
                Fazer Login Agora
              </Button>
            </div>
          )}

          {/* Formulário */}
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-700 mb-2 block">Nome completo</label>
              <Input
                type="text"
                placeholder="Digite seu nome completo"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="border-gray-300 focus:border-[black] focus:ring-[black]/20"
              />
            </div>

            <div>
              <label className="text-sm text-gray-700 mb-2 block">E-mail</label>
              <Input
                type="email"
                placeholder="seu@email.com"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="border-gray-300 focus:border-[black] focus:ring-[black]/20"
              />
            </div>

            <div>
              <label className="text-sm text-gray-700 mb-2 block">Telefone</label>
              <Input
                type="tel"
                placeholder="(11) 99999-9999"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="border-gray-300 focus:border-[black] focus:ring-[black]/20"
              />
            </div>

            {/* Opção de criar conta */}
            <div className="flex items-start space-x-3 pt-2">
              <Checkbox
                id="create-account"
                checked={isCreatingAccount}
                onCheckedChange={(checked) => setIsCreatingAccount(checked as boolean)}
              />
              <div>
                <label
                  htmlFor="create-account"
                  className="text-sm text-gray-700 cursor-pointer"
                >
                  Criar uma conta para facilitar futuros agendamentos
                </label>
                <p className="text-xs text-gray-500 mt-1">
                  Você receberá um e-mail para confirmar sua conta após o agendamento
                </p>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Botão Final */}
      <div className="pt-4">
        <Button
          onClick={handleSubmit}
          disabled={!isFormValid || isSubmitting}
          className="w-full bg-[black] hover:bg-[black]/90 text-white py-4 text-lg"
        >
          {isSubmitting ? (
            <div className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              Processando...
            </div>
          ) : (
            <>
              {isCreatingAccount && !isLoggedIn ? 'Finalizar e Criar Conta' : 'Finalizar Agendamento'}
              <span className="ml-2 opacity-80">• {formatPrice(totalPrice)}</span>
            </>
          )}
        </Button>

        <p className="text-xs text-center text-gray-500 mt-3">
          Ao finalizar, você concorda com nossos termos de serviço e política de cancelamento
        </p>
      </div>
    </div>
  );
}
