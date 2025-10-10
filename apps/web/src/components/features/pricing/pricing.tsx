'use client';
import { Footer, Header } from '@/components/layout';
import { Badge, Button, Card, Slider } from '@repo/ui';
import {
  ArrowRight,
  BarChart3,
  Check,
  Clock,
  Shield,
  Sparkles,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import { IPricingProps } from './pricing.types';

const plans = [
  {
    name: 'Freelancer',
    description: 'O essencial para fornecer seu melhor trabalho para clientes.',
    priceMonthly: 19,
    priceYearly: 15,
    popular: false,
    features: [
      '5 serviços',
      'Até 1.000 agendamentos/mês',
      'Analytics básicos',
      'Suporte em 48h',
      'Notificações por email',
      'Página de agendamento personalizada',
    ],
  },
  {
    name: 'Startup',
    description: 'Um plano que escala com seu negócio em rápido crescimento.',
    priceMonthly: 29,
    priceYearly: 23,
    popular: true,
    features: [
      '25 serviços',
      'Até 10.000 agendamentos/mês',
      'Analytics avançados',
      'Suporte em 24h',
      'Automações de marketing',
      'SMS e notificações',
      'Múltiplas filiais',
      'Integração com calendários',
    ],
  },
  {
    name: 'Enterprise',
    description: 'Suporte dedicado e infraestrutura para sua empresa.',
    priceMonthly: 59,
    priceYearly: 47,
    popular: false,
    features: [
      'Serviços ilimitados',
      'Agendamentos ilimitados',
      'Analytics avançados',
      'Suporte dedicado em 1h',
      'Automações de marketing',
      'Relatórios personalizados',
      'API dedicada',
      'Gerente de sucesso',
    ],
  },
];

const benefits = [
  {
    icon: Zap,
    title: 'Aumente sua eficiência',
    description:
      'Automatize agendamentos e reduza no-shows em até 80% com lembretes inteligentes.',
  },
  {
    icon: TrendingUp,
    title: 'Cresça mais rápido',
    description:
      'Empresas que usam ServiceSnap crescem 3x mais rápido com agendamentos online 24/7.',
  },
  {
    icon: Users,
    title: 'Fidelize clientes',
    description:
      'Experiência premium de agendamento que seus clientes vão amar e recomendar.',
  },
  {
    icon: Shield,
    title: 'Segurança garantida',
    description:
      'Seus dados e dos seus clientes protegidos com criptografia de ponta a ponta.',
  },
  {
    icon: Clock,
    title: 'Economize tempo',
    description:
      'Reduza em até 15 horas semanais gastas com gestão de agendamentos manuais.',
  },
  {
    icon: BarChart3,
    title: 'Insights poderosos',
    description:
      'Tome decisões baseadas em dados com analytics detalhados e relatórios em tempo real.',
  },
];

export const Pricing = ({}: IPricingProps) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>(
    'monthly',
  );
  const [monthlyBookings, setMonthlyBookings] = useState(500);
  const [avgBookingValue, setAvgBookingValue] = useState(80);
  const [noShowRate, setNoShowRate] = useState(20);

  // ROI Calculator
  const currentMonthlyRevenue = monthlyBookings * avgBookingValue;
  const noShowLoss = currentMonthlyRevenue * (noShowRate / 100);
  const reducedNoShowRate = noShowRate * 0.2; // 80% reduction
  const newNoShowLoss = currentMonthlyRevenue * (reducedNoShowRate / 100);
  const monthlySavings = noShowLoss - newNoShowLoss;
  const planCost = 29; // Startup plan
  const netMonthlySavings = monthlySavings - planCost;
  const yearlyROI = netMonthlySavings * 12;

  return (
    <motion.div layout className="min-h-screen bg-black">
      <Header />
      <div className="rounded-tl-[40px] rounded-tr-[40px] bg-background">
        {/* Hero Section */}
        <div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 sm:pt-52 sm:pb-20">
            <div className="text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Badge variant="outline" className="mb-4 border-black/10">
                  Pricing
                </Badge>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl text-gray-900 mb-6">
                  Preços que crescem com você
                </h1>
                <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                  Escolha um plano acessível e repleto dos melhores recursos
                  para engajar sua audiência, criar fidelidade e impulsionar
                  vendas.
                </p>
              </motion.div>

              {/* Billing Toggle */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex items-center justify-center gap-4 mt-8"
              >
                <button
                  onClick={() => setBillingCycle('monthly')}
                  className={`px-6 py-2 rounded-full transition-all ${
                    billingCycle === 'monthly'
                      ? 'bg-black text-white shadow-lg'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Mensal
                </button>
                <button
                  onClick={() => setBillingCycle('yearly')}
                  className={`px-6 py-2 rounded-full transition-all ${
                    billingCycle === 'yearly'
                      ? 'bg-black text-white shadow-lg'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Anual
                </button>
                {billingCycle === 'yearly' && (
                  <Badge className="bg-green-50 text-green-700 border-green-200">
                    Economize 20%
                  </Badge>
                )}
              </motion.div>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className="relative"
              >
                <Card
                  className={`relative h-full p-8 ${
                    plan.popular
                      ? 'border-2 border-black shadow-xl'
                      : 'border border-gray-200'
                  }`}
                >
                  {plan.popular && (
                    <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-black text-white">
                      Mais popular
                    </Badge>
                  )}

                  <div className="mb-8">
                    <h3 className="text-xl text-gray-900 mb-2">{plan.name}</h3>
                    <p className="text-sm text-gray-600">{plan.description}</p>
                  </div>

                  <div className="mb-8">
                    <div className="flex items-baseline gap-2">
                      <span className="text-5xl text-gray-900">
                        $
                        {billingCycle === 'monthly'
                          ? plan.priceMonthly
                          : plan.priceYearly}
                      </span>
                      <span className="text-gray-600">/mês</span>
                    </div>
                    {billingCycle === 'yearly' && (
                      <p className="text-sm text-gray-500 mt-1">
                        Cobrado ${plan.priceYearly * 12}/ano
                      </p>
                    )}
                  </div>

                  <Button
                    className={`w-full mb-8 ${
                      plan.popular
                        ? 'bg-black hover:bg-gray-800 text-white'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                    }`}
                  >
                    Assinar plano
                  </Button>

                  <ul className="space-y-4">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-black flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ROI Calculator Section */}
        <div className="bg-gradient-to-b from-gray-50 via-white to-gray-50 py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <Badge variant="outline" className="mb-4 border-black/10">
                <Sparkles className="w-3 h-3 mr-1 inline" />
                Calculadora de ROI
              </Badge>
              <h2 className="text-3xl sm:text-4xl text-gray-900 mb-4">
                Calcule seu retorno sobre investimento
              </h2>
              <p className="text-lg text-gray-600">
                Veja quanto você pode economizar reduzindo no-shows com
                ServiceSnap
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="border-gray-200 p-8 shadow-lg">
                <div className="space-y-8">
                  {/* Inputs */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="text-sm text-gray-700 mb-3 block">
                        Agendamentos/mês
                      </label>
                      <Slider
                        value={[monthlyBookings]}
                        onValueChange={(value) => setMonthlyBookings(value[0])}
                        min={50}
                        max={2000}
                        step={50}
                        className="mb-2"
                      />
                      <div className="text-center text-2xl text-gray-900 mt-2">
                        {monthlyBookings}
                      </div>
                    </div>

                    <div>
                      <label className="text-sm text-gray-700 mb-3 block">
                        Valor médio ($)
                      </label>
                      <Slider
                        value={[avgBookingValue]}
                        onValueChange={(value) => setAvgBookingValue(value[0])}
                        min={20}
                        max={300}
                        step={10}
                        className="mb-2"
                      />
                      <div className="text-center text-2xl text-gray-900 mt-2">
                        ${avgBookingValue}
                      </div>
                    </div>

                    <div>
                      <label className="text-sm text-gray-700 mb-3 block">
                        Taxa de no-show (%)
                      </label>
                      <Slider
                        value={[noShowRate]}
                        onValueChange={(value) => setNoShowRate(value[0])}
                        min={5}
                        max={40}
                        step={5}
                        className="mb-2"
                      />
                      <div className="text-center text-2xl text-gray-900 mt-2">
                        {noShowRate}%
                      </div>
                    </div>
                  </div>

                  {/* Results */}
                  <div className="border-t border-gray-200 pt-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-red-50 rounded-lg p-6 border border-red-100">
                        <div className="text-sm text-gray-700 mb-2">
                          Perda atual com no-shows
                        </div>
                        <div className="text-3xl text-red-600">
                          $
                          {noShowLoss.toLocaleString('pt-BR', {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                          })}
                          /mês
                        </div>
                      </div>

                      <div className="bg-green-50 rounded-lg p-6 border border-green-100">
                        <div className="text-sm text-gray-700 mb-2">
                          Economia mensal líquida
                        </div>
                        <div className="text-3xl text-green-600">
                          $
                          {netMonthlySavings.toLocaleString('pt-BR', {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                          })}
                          /mês
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-6 border border-gray-200">
                      <div className="flex items-center justify-between flex-wrap gap-4">
                        <div>
                          <div className="text-sm text-gray-700 mb-1">
                            ROI em 12 meses
                          </div>
                          <div className="text-4xl text-gray-900">
                            $
                            {yearlyROI.toLocaleString('pt-BR', {
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 0,
                            })}
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge className="bg-green-50 text-green-700 border-green-200 text-lg px-4 py-2">
                            +{((yearlyROI / (planCost * 12)) * 100).toFixed(0)}%
                            retorno
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* Why Subscribe Section */}
        <div className="bg-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl text-gray-900 mb-4">
                Por que assinar o ServiceSnap?
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Junte-se a milhares de profissionais que transformaram seus
                negócios
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="border-gray-200 p-6 h-full hover:shadow-lg transition-shadow">
                    <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center mb-4">
                      <benefit.icon className="w-6 h-6 text-gray-900" />
                    </div>
                    <h3 className="text-xl text-gray-900 mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-b from-gray-50 to-white py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl sm:text-4xl text-gray-900 mb-4">
                Pronto para começar?
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Comece seu teste gratuito de 14 dias. Sem cartão de crédito
                necessário.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-black hover:bg-gray-800 text-white"
                >
                  Começar teste gratuito
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  Falar com vendas
                </Button>
              </div>
              <p className="text-sm text-gray-500 mt-6">
                Mais de 10.000 profissionais confiam no ServiceSnap
              </p>
            </motion.div>
          </div>
        </div>
        <Footer />
      </div>
    </motion.div>
  );
};
