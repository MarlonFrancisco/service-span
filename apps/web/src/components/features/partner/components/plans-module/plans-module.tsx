'use client';

import {
  Alert,
  AlertDescription,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@repo/ui';
import { Shield, Star } from 'lucide-react';
import { CheckoutModal } from './components/checkout-modal';
import { PlanCard } from './components/plan-card';
import { usePlansModule } from './plans-module.hook';

export const PlansModule = () => {
  const {
    currentPlan,
    plans,
    showCheckout,
    selectedPlanData,
    handleSelectPlan,
    handleCloseCheckout,
  } = usePlansModule();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-[#1a2b4c]">Planos e Assinatura</h2>
        <p className="text-gray-600 text-sm">
          Escolha o plano ideal para o seu negócio
        </p>
      </div>

      {/* Current Plan Status */}
      <Alert className="border-blue-200 bg-blue-50">
        <Shield className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-800">
          <strong>Plano Atual:</strong> {currentPlan.name} - Expira em{' '}
          {currentPlan.expiresAt?.toLocaleDateString('pt-BR')}. Renove ou faça
          upgrade para manter sua visibilidade nos resultados de busca.
        </AlertDescription>
      </Alert>

      {/* Current Status Card */}
      <Card className="border-[#1a2b4c]/20">
        <CardHeader>
          <CardTitle className="text-[#1a2b4c] flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Status Atual da Conta
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl text-[#1a2b4c]">{currentPlan.name}</div>
              <div className="text-sm text-gray-600">Plano Atual</div>
            </div>

            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl text-[#1a2b4c]">
                {currentPlan.storesCount}/{currentPlan.maxStores}
              </div>
              <div className="text-sm text-gray-600">Lojas Utilizadas</div>
            </div>

            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl text-green-600">Ativo</div>
              <div className="text-sm text-gray-600">Status</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Plans Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <PlanCard key={plan.id} plan={plan} onSelect={handleSelectPlan} />
        ))}
      </div>

      {/* Benefits Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-[#1a2b4c] flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-500" />
            Por que assinar um plano?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="text-[#1a2b4c]">Visibilidade Garantida</h4>
              <p className="text-sm text-gray-600">
                Suas lojas aparecem nos resultados de busca e podem receber
                novos agendamentos. Sem plano ativo, suas lojas ficam
                invisíveis.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="text-[#1a2b4c]">Melhor Ranqueamento</h4>
              <p className="text-sm text-gray-600">
                Planos pagos têm prioridade nos resultados de busca, aumentando
                suas chances de serem encontrados pelos clientes.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="text-[#1a2b4c]">Ferramentas Profissionais</h4>
              <p className="text-sm text-gray-600">
                Acesso a relatórios, analytics e ferramentas que ajudam a
                gerenciar melhor seu negócio e aumentar a receita.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="text-[#1a2b4c]">Suporte Dedicado</h4>
              <p className="text-sm text-gray-600">
                Conte com nosso suporte especializado para resolver dúvidas e
                otimizar o uso da plataforma.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={showCheckout}
        plan={selectedPlanData}
        onClose={handleCloseCheckout}
      />
    </div>
  );
};
