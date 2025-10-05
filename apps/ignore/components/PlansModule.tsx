import { useState } from 'react';
import {
  Check,
  Crown,
  Shield,
  Star,
  CreditCard,
  Lock,
  AlertTriangle,
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Alert, AlertDescription } from './ui/alert';

export function PlansModule() {
  const [selectedPlan, setSelectedPlan] = useState<
    'standard' | 'premium' | 'business' | null
  >(null);
  const [showCheckout, setShowCheckout] = useState(false);

  const currentPlan = {
    name: 'Standard',
    expiresAt: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 dias
    storesCount: 1,
    maxStores: 3,
  };

  const plans = [
    {
      id: 'standard',
      name: 'Standard',
      price: 49,
      period: 'mês',
      maxStores: 3,
      features: [
        'Até 3 lojas',
        'Agenda básica',
        'Relatórios simples',
        'Suporte por email',
        'Aparece nas buscas',
        'Gestão de profissionais',
      ],
      highlight: false,
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 99,
      period: 'mês',
      maxStores: 10,
      features: [
        'Até 10 lojas',
        'Agenda avançada',
        'Relatórios detalhados',
        'Suporte prioritário',
        'Melhor ranqueamento',
        'Analytics avançado',
        'Integração WhatsApp',
        'Lembretes automáticos',
      ],
      highlight: true,
    },
    {
      id: 'business',
      name: 'Business',
      price: 199,
      period: 'mês',
      maxStores: 50,
      features: [
        'Lojas ilimitadas (até 50)',
        'Multi-usuários',
        'API personalizada',
        'Suporte 24/7',
        'Máximo ranqueamento',
        'Dashboard executivo',
        'Automação completa',
        'Gerente de conta dedicado',
        'Relatórios personalizados',
      ],
      highlight: false,
    },
  ];

  const handleSelectPlan = (planId: 'standard' | 'premium' | 'business') => {
    setSelectedPlan(planId);
    setShowCheckout(true);
  };

  const selectedPlanData = plans.find((p) => p.id === selectedPlan);

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
          <Card
            key={plan.id}
            className={`relative ${plan.highlight ? 'border-[#20b2aa] ring-2 ring-[#20b2aa]/20' : ''}`}
          >
            {plan.highlight && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-[#20b2aa] text-white">
                  <Crown className="h-3 w-3 mr-1" />
                  Mais Popular
                </Badge>
              </div>
            )}

            <CardHeader className="text-center pb-4">
              <CardTitle className="text-[#1a2b4c] text-xl">
                {plan.name}
              </CardTitle>
              <div className="mt-2">
                <span className="text-3xl text-[#1a2b4c]">R$ {plan.price}</span>
                <span className="text-gray-600">/{plan.period}</span>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Ideal para negócios com até {plan.maxStores} lojas
              </p>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="space-y-3">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-[#20b2aa] flex-shrink-0" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <Button
                  className={`w-full ${
                    plan.highlight
                      ? 'bg-[#20b2aa] hover:bg-[#20b2aa]/90 text-white'
                      : 'bg-[#1a2b4c] hover:bg-[#1a2b4c]/90 text-white'
                  }`}
                  onClick={() => handleSelectPlan(plan.id as any)}
                >
                  Escolher {plan.name}
                </Button>
              </div>
            </CardContent>
          </Card>
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
      <Dialog open={showCheckout} onOpenChange={setShowCheckout}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-[#1a2b4c] flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Finalizar Assinatura
            </DialogTitle>
          </DialogHeader>

          {selectedPlanData && (
            <div className="space-y-6">
              {/* Plan Summary */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="text-[#1a2b4c] mb-2">Resumo do Plano</h4>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Plano {selectedPlanData.name}</span>
                  <span className="text-[#1a2b4c]">
                    R$ {selectedPlanData.price}/mês
                  </span>
                </div>
                <p className="text-xs text-gray-600 mt-2">
                  Cobrança recorrente mensal. Cancele quando quiser.
                </p>
              </div>

              {/* Payment Form */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Lock className="h-4 w-4" />
                  <span>Pagamento 100% seguro</span>
                </div>

                <div>
                  <Label>Número do Cartão</Label>
                  <Input placeholder="**** **** **** ****" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Validade</Label>
                    <Input placeholder="MM/AA" />
                  </div>
                  <div>
                    <Label>CVV</Label>
                    <Input placeholder="123" />
                  </div>
                </div>

                <div>
                  <Label>Nome no Cartão</Label>
                  <Input placeholder="Nome completo" />
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setShowCheckout(false)}
                >
                  Cancelar
                </Button>
                <Button className="flex-1 bg-[#20b2aa] hover:bg-[#20b2aa]/90 text-white">
                  <Lock className="h-4 w-4 mr-2" />
                  Confirmar Pagamento
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
