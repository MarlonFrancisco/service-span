'use client';
import { ROICalculator } from '@/components/features/roi-calculator';
import {
  Alert,
  AlertDescription,
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Input,
  Label,
  Progress,
  Separator,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@repo/ui';
import {
  AlertCircle,
  AlertTriangle,
  ArrowRight,
  BarChart3,
  Calendar,
  Check,
  ChevronRight,
  Clock,
  CreditCard,
  Crown,
  Download,
  FileText,
  Lock,
  Mail,
  Settings,
  Shield,
  Sparkles,
  TrendingUp,
  Users,
  X,
  Zap,
} from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import { toast } from 'sonner';

type BillingPeriod = 'monthly' | 'yearly';
type PlanId = 'starter' | 'professional' | 'business' | 'enterprise';

interface PlanFeature {
  name: string;
  included: boolean;
}

interface Plan {
  id: PlanId;
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  maxStores: number | 'unlimited';
  maxUsers: number | 'unlimited';
  maxBookings: number | 'unlimited';
  features: PlanFeature[];
  popular: boolean;
}

interface PaymentHistory {
  id: string;
  date: Date;
  amount: number;
  status: 'paid' | 'pending' | 'failed';
  invoice: string;
}

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

export function PlansModule() {
  const [activeTab, setActiveTab] = useState<'current' | 'upgrade'>('current');
  const [selectedPlan, setSelectedPlan] = useState<PlanId | null>(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>('monthly');
  const [showComparison, setShowComparison] = useState(false);

  // ROI Calculator state
  const [monthlyBookings, setMonthlyBookings] = useState(500);
  const [avgBookingValue, setAvgBookingValue] = useState(80);
  const [noShowRate, setNoShowRate] = useState(20);

  const currentPlan = {
    id: 'starter' as PlanId,
    name: 'Starter',
    monthlyPrice: 29,
    expiresAt: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
    storesCount: 1,
    maxStores: 2,
    usersCount: 1,
    maxUsers: 2,
    bookingsThisMonth: 247,
    maxBookings: 500,
    nextBillingDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
    status: 'active' as const,
    billingPeriod: 'monthly' as BillingPeriod,
    features: [
      'Até 2 lojas',
      'Até 500 agendamentos/mês',
      'Agenda básica',
      'Relatórios simples',
      'Suporte por email',
      'App mobile',
    ],
  };

  const paymentHistory: PaymentHistory[] = [
    {
      id: '1',
      date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      amount: 29,
      status: 'paid',
      invoice: 'INV-2024-001',
    },
    {
      id: '2',
      date: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
      amount: 29,
      status: 'paid',
      invoice: 'INV-2024-002',
    },
    {
      id: '3',
      date: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
      amount: 29,
      status: 'paid',
      invoice: 'INV-2024-003',
    },
  ];

  const plans: Plan[] = [
    {
      id: 'starter',
      name: 'Starter',
      description: 'Perfeito para começar seu negócio.',
      monthlyPrice: 29,
      yearlyPrice: 23,
      maxStores: 2,
      maxUsers: 2,
      maxBookings: 500,
      popular: false,
      features: [
        { name: 'Até 2 lojas', included: true },
        { name: 'Até 500 agendamentos/mês', included: true },
        { name: 'Agenda básica', included: true },
        { name: 'Relatórios simples', included: true },
        { name: 'Suporte por email', included: true },
        { name: 'App mobile', included: true },
        { name: 'Analytics avançado', included: false },
        { name: 'Integração WhatsApp', included: false },
        { name: 'Automação', included: false },
        { name: 'API acesso', included: false },
      ],
    },
    {
      id: 'professional',
      name: 'Professional',
      description: 'Um plano que escala com seu negócio.',
      monthlyPrice: 79,
      yearlyPrice: 63,
      maxStores: 10,
      maxUsers: 10,
      maxBookings: 5000,
      popular: true,
      features: [
        { name: 'Até 10 lojas', included: true },
        { name: 'Até 5.000 agendamentos/mês', included: true },
        { name: 'Agenda avançada', included: true },
        { name: 'Relatórios detalhados', included: true },
        { name: 'Suporte prioritário', included: true },
        { name: 'App mobile', included: true },
        { name: 'Analytics avançado', included: true },
        { name: 'Integração WhatsApp', included: true },
        { name: 'Automação básica', included: true },
        { name: 'API acesso', included: false },
      ],
    },
    {
      id: 'business',
      name: 'Business',
      description: 'Para empresas estabelecidas.',
      monthlyPrice: 159,
      yearlyPrice: 127,
      maxStores: 25,
      maxUsers: 25,
      maxBookings: 20000,
      popular: false,
      features: [
        { name: 'Até 25 lojas', included: true },
        { name: 'Até 20.000 agendamentos/mês', included: true },
        { name: 'Agenda completa', included: true },
        { name: 'Relatórios executivos', included: true },
        { name: 'Suporte 24/7', included: true },
        { name: 'App mobile', included: true },
        { name: 'Analytics completo', included: true },
        { name: 'Integração WhatsApp', included: true },
        { name: 'Automação avançada', included: true },
        { name: 'API acesso', included: true },
      ],
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      description: 'Suporte dedicado e infraestrutura para sua empresa.',
      monthlyPrice: 299,
      yearlyPrice: 239,
      maxStores: 'unlimited',
      maxUsers: 'unlimited',
      maxBookings: 'unlimited',
      popular: false,
      features: [
        { name: 'Lojas ilimitadas', included: true },
        { name: 'Agendamentos ilimitados', included: true },
        { name: 'Dashboard personalizado', included: true },
        { name: 'Relatórios personalizados', included: true },
        { name: 'Gerente dedicado', included: true },
        { name: 'App mobile', included: true },
        { name: 'Analytics personalizado', included: true },
        { name: 'Integrações ilimitadas', included: true },
        { name: 'Automação completa', included: true },
        { name: 'API ilimitada', included: true },
      ],
    },
  ];

  const handleSelectPlan = (planId: PlanId) => {
    setSelectedPlan(planId);
    setShowCheckout(true);
  };

  const handleConfirmCheckout = () => {
    toast.success('Plano atualizado com sucesso!');
    setShowCheckout(false);
    setSelectedPlan(null);
  };

  const getPrice = (plan: Plan) => {
    return billingPeriod === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice;
  };

  const selectedPlanData = plans.find((p) => p.id === selectedPlan);

  const allFeatures = Array.from(
    new Set(plans.flatMap((p) => p.features.map((f) => f.name))),
  );

  // ROI Calculator
  const currentMonthlyRevenue = monthlyBookings * avgBookingValue;
  const noShowLoss = currentMonthlyRevenue * (noShowRate / 100);
  const reducedNoShowRate = noShowRate * 0.2; // 80% reduction
  const newNoShowLoss = currentMonthlyRevenue * (reducedNoShowRate / 100);
  const monthlySavings = noShowLoss - newNoShowLoss;
  const planCost = 79; // Professional plan
  const netMonthlySavings = monthlySavings - planCost;
  const yearlyROI = netMonthlySavings * 12;

  const getStatusBadge = (status: PaymentHistory['status']) => {
    const config = {
      paid: {
        label: 'Pago',
        className: 'bg-green-50 text-green-700 border-green-200',
      },
      pending: {
        label: 'Pendente',
        className: 'bg-orange-50 text-orange-700 border-orange-200',
      },
      failed: {
        label: 'Falhou',
        className: 'bg-red-50 text-red-700 border-red-200',
      },
    };
    return config[status];
  };

  const usagePercentage =
    (currentPlan.bookingsThisMonth / (currentPlan.maxBookings as number)) * 100;
  const storesUsagePercentage =
    (currentPlan.storesCount / currentPlan.maxStores) * 100;
  const usersUsagePercentage =
    (currentPlan.usersCount / currentPlan.maxUsers) * 100;

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as 'current' | 'upgrade')}
      >
        <TabsList className="bg-gray-100">
          <TabsTrigger value="current">
            <Shield className="h-4 w-4 mr-2" />
            Meu Plano
          </TabsTrigger>
          <TabsTrigger value="upgrade">
            <Crown className="h-4 w-4 mr-2" />
            Fazer Upgrade
          </TabsTrigger>
        </TabsList>

        {/* Current Plan Tab */}
        <TabsContent value="current" className="mt-8 space-y-8">
          {/* Current Plan Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="border-gray-200">
              <CardHeader className="border-b border-gray-100">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-gray-100 rounded-lg">
                      <Shield className="h-6 w-6 text-gray-900" />
                    </div>
                    <div>
                      <CardTitle className="text-gray-900 mb-1">
                        Plano {currentPlan.name}
                      </CardTitle>
                      <p className="text-sm text-gray-600">
                        R$ {currentPlan.monthlyPrice}/
                        {currentPlan.billingPeriod === 'monthly'
                          ? 'mês'
                          : 'ano'}
                      </p>
                    </div>
                  </div>
                  <Badge className="bg-green-50 text-green-700 border-green-200">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse" />
                      Ativo
                    </div>
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">
                          Próxima cobrança
                        </span>
                        <Badge variant="outline" className="text-xs">
                          {currentPlan.nextBillingDate.toLocaleDateString(
                            'pt-BR',
                          )}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Valor</span>
                        <span className="text-gray-900">
                          R$ {currentPlan.monthlyPrice}
                        </span>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h4 className="text-sm text-gray-900 mb-3">
                        Informações de Contato
                      </h4>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Mail className="h-4 w-4" />
                          admin@empresa.com.br
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <CreditCard className="h-4 w-4" />
                          Cartão •••• 4242
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h4 className="text-sm text-gray-900 mb-3">
                        Uso do Plano
                      </h4>
                      <div className="space-y-4">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-gray-600">
                              Agendamentos este mês
                            </span>
                            <span className="text-sm text-gray-900">
                              {currentPlan.bookingsThisMonth}/
                              {currentPlan.maxBookings}
                            </span>
                          </div>
                          <Progress value={usagePercentage} className="h-2" />
                        </div>

                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-gray-600">
                              Lojas ativas
                            </span>
                            <span className="text-sm text-gray-900">
                              {currentPlan.storesCount}/{currentPlan.maxStores}
                            </span>
                          </div>
                          <Progress
                            value={storesUsagePercentage}
                            className="h-2"
                          />
                        </div>

                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-gray-600">
                              Usuários ativos
                            </span>
                            <span className="text-sm text-gray-900">
                              {currentPlan.usersCount}/{currentPlan.maxUsers}
                            </span>
                          </div>
                          <Progress
                            value={usersUsagePercentage}
                            className="h-2"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Features Included */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="border-gray-200">
              <CardHeader>
                <CardTitle className="text-gray-900 flex items-center gap-2">
                  <Sparkles className="h-5 w-5" />
                  Recursos Incluídos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentPlan.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200"
                    >
                      <Check className="h-5 w-5 text-gray-900 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <Button
                    onClick={() => setActiveTab('upgrade')}
                    className="w-full bg-black hover:bg-gray-800 text-white"
                  >
                    <Crown className="h-4 w-4 mr-2" />
                    Ver planos superiores
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Payment History */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="border-gray-200">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-gray-900 flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Histórico de Pagamentos
                </CardTitle>
                <Button variant="outline" size="sm" className="text-xs">
                  <Download className="h-3 w-3 mr-1" />
                  Exportar
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {paymentHistory.map((payment) => {
                    const statusConfig = getStatusBadge(payment.status);
                    return (
                      <div
                        key={payment.id}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200"
                      >
                        <div className="flex items-center gap-4">
                          <div className="p-2 bg-white rounded-lg border border-gray-200">
                            <Calendar className="h-4 w-4 text-gray-600" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-900">
                              {payment.invoice}
                            </p>
                            <p className="text-xs text-gray-600">
                              {payment.date.toLocaleDateString('pt-BR', {
                                day: '2-digit',
                                month: 'long',
                                year: 'numeric',
                              })}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-gray-900">
                            R$ {payment.amount}
                          </span>
                          <Badge
                            variant="outline"
                            className={statusConfig.className}
                          >
                            {statusConfig.label}
                          </Badge>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Manage Subscription */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="border-gray-200">
              <CardHeader>
                <CardTitle className="text-gray-900 flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Gerenciar Assinatura
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Button variant="outline" className="border-gray-300">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Alterar forma de pagamento
                  </Button>
                  <Button variant="outline" className="border-gray-300">
                    <FileText className="h-4 w-4 mr-2" />
                    Ver todas as faturas
                  </Button>
                </div>

                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription className="text-sm">
                    Precisa cancelar? Entre em contato com nosso suporte e
                    resolveremos isso para você.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Upgrade Tab */}
        <TabsContent value="upgrade" className="mt-8 space-y-12">
          {/* Comparison Alert */}
          <Alert className="bg-gradient-to-r from-gray-50 to-white border-gray-200">
            <Crown className="h-5 w-5" />
            <AlertDescription>
              <div className="space-y-1">
                <p className="text-gray-900">
                  Você está no plano <strong>{currentPlan.name}</strong>
                </p>
                <p className="text-sm text-gray-600">
                  Faça upgrade para desbloquear mais recursos e expandir seu
                  negócio
                </p>
              </div>
            </AlertDescription>
          </Alert>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={`px-6 py-2 rounded-full transition-all ${
                billingPeriod === 'monthly'
                  ? 'bg-black text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Mensal
            </button>
            <button
              onClick={() => setBillingPeriod('yearly')}
              className={`px-6 py-2 rounded-full transition-all ${
                billingPeriod === 'yearly'
                  ? 'bg-black text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Anual
            </button>
            {billingPeriod === 'yearly' && (
              <Badge className="bg-green-50 text-green-700 border-green-200">
                Economize 20%
              </Badge>
            )}
          </div>

          {/* Plans Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {plans.map((plan, index) => {
              const isCurrentPlan = plan.id === currentPlan.id;
              const isUpgrade =
                plans.findIndex((p) => p.id === plan.id) >
                plans.findIndex((p) => p.id === currentPlan.id);

              return (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative"
                >
                  <Card
                    className={`relative h-full p-8 ${
                      plan.popular
                        ? 'border-2 border-black shadow-xl'
                        : 'border border-gray-200'
                    } ${isCurrentPlan ? 'opacity-75' : ''}`}
                  >
                    {plan.popular && (
                      <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-black text-white">
                        Mais popular
                      </Badge>
                    )}

                    {isCurrentPlan && (
                      <Badge className="absolute -top-3 right-4 bg-gray-100 text-gray-700 border-gray-300">
                        Plano Atual
                      </Badge>
                    )}

                    <div className="mb-8">
                      <h3 className="text-xl text-gray-900 mb-2">
                        {plan.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {plan.description}
                      </p>
                    </div>

                    <div className="mb-8">
                      <div className="flex items-baseline gap-2">
                        <span className="text-5xl text-gray-900">
                          R${getPrice(plan)}
                        </span>
                        <span className="text-gray-600">/mês</span>
                      </div>
                      {billingPeriod === 'yearly' && (
                        <p className="text-sm text-gray-500 mt-1">
                          Cobrado R${getPrice(plan) * 12}/ano
                        </p>
                      )}
                    </div>

                    <Button
                      className={`w-full mb-8 ${
                        isCurrentPlan
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : plan.popular
                            ? 'bg-black hover:bg-gray-800 text-white'
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                      }`}
                      onClick={() =>
                        !isCurrentPlan && handleSelectPlan(plan.id)
                      }
                      disabled={isCurrentPlan}
                    >
                      {isCurrentPlan
                        ? 'Seu plano atual'
                        : isUpgrade
                          ? 'Fazer upgrade'
                          : 'Escolher plano'}
                    </Button>

                    <ul className="space-y-4">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          {feature.included ? (
                            <Check className="w-5 h-5 text-black flex-shrink-0 mt-0.5" />
                          ) : (
                            <X className="w-5 h-5 text-gray-300 flex-shrink-0 mt-0.5" />
                          )}
                          <span
                            className={`text-sm ${feature.included ? 'text-gray-700' : 'text-gray-400'}`}
                          >
                            {feature.name}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Feature Comparison Button */}
          <div className="text-center">
            <Button
              variant="outline"
              size="lg"
              onClick={() => setShowComparison(true)}
              className="border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              <BarChart3 className="h-5 w-5 mr-2" />
              Comparar todos os recursos
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>

          {/* ROI Calculator Section */}
          <div className="bg-gradient-to-b from-gray-50 via-white to-gray-50 rounded-2xl p-8 border-gray-200">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <Badge variant="outline" className="border-gray-200 mb-4">
                  <Sparkles className="w-3 h-3 mr-1 inline" />
                  Calculadora de ROI
                </Badge>
                <h2 className="text-3xl text-gray-900 mb-4">
                  Calcule seu retorno sobre investimento
                </h2>
                <p className="text-lg text-gray-600">
                  Veja quanto você pode economizar reduzindo no-shows com
                  ServiceSnap
                </p>
              </div>

              <ROICalculator />
            </div>
          </div>

          {/* Why Upgrade Section */}
          <div>
            <div className="text-center mb-16">
              <h2 className="text-3xl text-gray-900 mb-4">
                Por que fazer upgrade?
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Desbloqueie recursos poderosos e leve seu negócio ao próximo
                nível
              </p>
            </div>

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
        </TabsContent>
      </Tabs>

      {/* Feature Comparison Modal */}
      <Dialog open={showComparison} onOpenChange={setShowComparison}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-2xl">
              <BarChart3 className="h-6 w-6" />
              Comparação Completa de Recursos
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Plans Header */}
            <div className="grid grid-cols-5 gap-4">
              <div className="text-gray-900">Recursos</div>
              {plans.map((plan) => (
                <div key={plan.id} className="text-center space-y-2">
                  <div className="text-gray-900">{plan.name}</div>
                  <div className="text-sm text-gray-600">
                    R${getPrice(plan)}/
                    {billingPeriod === 'monthly' ? 'mês' : 'ano'}
                  </div>
                </div>
              ))}
            </div>

            {/* Features Comparison */}
            <div className="space-y-2">
              {allFeatures.map((featureName, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-5 gap-4 py-3 border-b border-gray-100 last:border-b-0"
                >
                  <div className="text-gray-900">{featureName}</div>
                  {plans.map((plan) => {
                    const feature = plan.features.find(
                      (f) => f.name === featureName,
                    );
                    return (
                      <div key={plan.id} className="text-center">
                        {feature && feature.included ? (
                          <Check className="h-5 w-5 text-black mx-auto" />
                        ) : (
                          <X className="h-5 w-5 text-gray-300 mx-auto" />
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>

            <div className="flex justify-center pt-4">
              <Button
                onClick={() => setShowComparison(false)}
                variant="outline"
              >
                Fechar Comparação
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Checkout Modal */}
      <Dialog open={showCheckout} onOpenChange={setShowCheckout}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              <CreditCard className="h-5 w-5" />
              Finalizar Upgrade
            </DialogTitle>
          </DialogHeader>

          {selectedPlanData && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Plan Summary */}
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <div className="mb-4">
                  <h4 className="text-gray-900">
                    Plano {selectedPlanData.name}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {selectedPlanData.description}
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      Plano {selectedPlanData.name} (
                      {billingPeriod === 'monthly' ? 'Mensal' : 'Anual'})
                    </span>
                    <span className="text-gray-900">
                      R$ {getPrice(selectedPlanData)}
                    </span>
                  </div>

                  {billingPeriod === 'yearly' && (
                    <div className="flex justify-between items-center text-green-600">
                      <span className="text-sm">Desconto anual</span>
                      <span className="text-sm">
                        -20% (R${' '}
                        {(
                          (selectedPlanData.monthlyPrice -
                            selectedPlanData.yearlyPrice) *
                          12
                        ).toFixed(0)}{' '}
                        economia)
                      </span>
                    </div>
                  )}

                  <div className="pt-2 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                      <span>Total</span>
                      <span className="text-lg text-gray-900">
                        R$ {getPrice(selectedPlanData)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Security Notice */}
              <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
                <Lock className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-sm text-green-800">
                    Pagamento 100% seguro
                  </p>
                  <p className="text-xs text-green-600">
                    Seus dados estão protegidos
                  </p>
                </div>
              </div>

              {/* Payment Method */}
              <div className="space-y-4">
                <h4 className="text-gray-900">Método de Pagamento</h4>
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="cardNumber">Número do Cartão</Label>
                    <Input id="cardNumber" placeholder="0000 0000 0000 0000" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="expiry">Validade</Label>
                      <Input id="expiry" placeholder="MM/AA" />
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV</Label>
                      <Input id="cvv" placeholder="123" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Demo Warning */}
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  Modo demonstração - Nenhuma cobrança real será efetuada
                </AlertDescription>
              </Alert>

              {/* Actions */}
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowCheckout(false)}
                >
                  Cancelar
                </Button>
                <Button
                  className="flex-1 bg-black hover:bg-gray-800 text-white"
                  onClick={handleConfirmCheckout}
                >
                  Confirmar Upgrade
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
