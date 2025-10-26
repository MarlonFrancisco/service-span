'use client';
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Progress,
} from '@repo/ui';
import {
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  Calendar,
  Crown,
  DollarSign,
  Filter,
  Gift,
  Heart,
  Mail,
  MessageSquare,
  Repeat,
  Send,
  Sparkles,
  Star,
  Target,
  TrendingDown,
  TrendingUp,
  UserPlus,
  Users,
} from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

type ViewMode = 'overview' | 'segments' | 'churn';

const retentionData = [
  { month: 'Jan', new: 45, returning: 120, churn: 12, total: 165 },
  { month: 'Fev', new: 52, returning: 135, churn: 8, total: 187 },
  { month: 'Mar', new: 48, returning: 142, churn: 15, total: 190 },
  { month: 'Abr', new: 61, returning: 158, churn: 10, total: 219 },
  { month: 'Mai', new: 55, returning: 165, churn: 9, total: 220 },
  { month: 'Jun', new: 67, returning: 178, churn: 7, total: 245 },
];

const lifetimeValueData = [
  { segment: 'VIPs', ltv: 2400, customers: 42, avgVisits: 24, retention: 98 },
  {
    segment: 'Frequentes',
    ltv: 1200,
    customers: 156,
    avgVisits: 12,
    retention: 92,
  },
  {
    segment: 'Regulares',
    ltv: 650,
    customers: 287,
    avgVisits: 6,
    retention: 78,
  },
  {
    segment: 'Ocasionais',
    ltv: 280,
    customers: 198,
    avgVisits: 2,
    retention: 45,
  },
  { segment: 'Novos', ltv: 145, customers: 67, avgVisits: 1, retention: 35 },
];

const topCustomers = [
  {
    name: 'Mariana Santos',
    visits: 24,
    spent: 3600,
    lastVisit: 'Há 2 dias',
    status: 'active',
    riskLevel: 'low',
  },
  {
    name: 'Roberto Costa',
    visits: 22,
    spent: 3200,
    lastVisit: 'Há 1 dia',
    status: 'active',
    riskLevel: 'low',
  },
  {
    name: 'Julia Ferreira',
    visits: 20,
    spent: 2900,
    lastVisit: 'Hoje',
    status: 'active',
    riskLevel: 'low',
  },
  {
    name: 'Pedro Alves',
    visits: 19,
    spent: 2700,
    lastVisit: 'Há 3 dias',
    status: 'active',
    riskLevel: 'low',
  },
  {
    name: 'Carla Souza',
    visits: 18,
    spent: 2500,
    lastVisit: 'Há 1 semana',
    status: 'active',
    riskLevel: 'medium',
  },
];

const churnRiskCustomers = [
  {
    name: 'Lucas Martins',
    lastVisit: 'Há 45 dias',
    avgFrequency: 15,
    spent: 1800,
    riskScore: 85,
    reason: 'Inatividade prolongada',
  },
  {
    name: 'Amanda Silva',
    lastVisit: 'Há 38 dias',
    avgFrequency: 12,
    spent: 1500,
    riskScore: 78,
    reason: 'Padrão irregular',
  },
  {
    name: 'Rafael Souza',
    lastVisit: 'Há 32 dias',
    avgFrequency: 18,
    spent: 2100,
    riskScore: 72,
    reason: 'Redução de gastos',
  },
  {
    name: 'Beatriz Lima',
    lastVisit: 'Há 28 dias',
    avgFrequency: 10,
    spent: 1200,
    riskScore: 68,
    reason: 'Mudança de região',
  },
];

const journeyMetrics = [
  {
    metric: 'Frequência Média',
    value: '2.8 visitas/mês',
    icon: Repeat,
    change: '+0.4',
    trendUp: true,
  },
  {
    metric: 'Tempo até Retorno',
    value: '12 dias',
    icon: Calendar,
    change: '-2 dias',
    trendUp: true,
  },
  {
    metric: 'Taxa de Indicação',
    value: '23%',
    icon: UserPlus,
    change: '+5%',
    trendUp: true,
  },
];

const retentionFunnel = [
  { stage: 'Primeira Visita', value: 250, percentage: 100 },
  { stage: 'Segunda Visita', value: 180, percentage: 72 },
  { stage: 'Cliente Regular', value: 120, percentage: 48 },
  { stage: 'Cliente Frequente', value: 85, percentage: 34 },
  { stage: 'Cliente VIP', value: 42, percentage: 17 },
];

const acquisitionChannels = [
  { name: 'Indicação', customers: 428, percentage: 34.3, cac: 12 },
  { name: 'Redes Sociais', customers: 387, percentage: 31.0, cac: 45 },
  { name: 'Google/Busca', customers: 274, percentage: 22.0, cac: 68 },
  { name: 'Marketing Local', customers: 98, percentage: 7.9, cac: 92 },
  { name: 'Outros', customers: 60, percentage: 4.8, cac: 35 },
];

const servicePreferences = [
  { segment: 'VIPs', corte: 85, barba: 72, coloracao: 45, outros: 28 },
  { segment: 'Frequentes', corte: 95, barba: 68, coloracao: 38, outros: 22 },
  { segment: 'Regulares', corte: 78, barba: 45, coloracao: 25, outros: 15 },
];

const birthdayOpportunities = [
  { name: 'Ana Costa', date: '22 Jun', segment: 'VIP', avgSpent: 180 },
  { name: 'Carlos Ramos', date: '24 Jun', segment: 'Frequente', avgSpent: 120 },
  { name: 'Marina Dias', date: '26 Jun', segment: 'VIP', avgSpent: 210 },
  { name: 'Felipe Cruz', date: '28 Jun', segment: 'Regular', avgSpent: 95 },
];

const rfmSegments = [
  {
    segment: 'Champions',
    score: '555',
    customers: 42,
    revenue: 100800,
    color: '#10b981',
  },
  {
    segment: 'Loyal',
    score: '445',
    customers: 98,
    revenue: 88200,
    color: '#34d399',
  },
  {
    segment: 'At Risk',
    score: '244',
    customers: 67,
    revenue: 40200,
    color: '#f59e0b',
  },
  {
    segment: 'Lost',
    score: '111',
    customers: 28,
    revenue: 7840,
    color: '#ef4444',
  },
];

export function CustomerMetricsModule() {
  const [viewMode, setViewMode] = useState<ViewMode>('overview');

  const stats = [
    {
      label: 'Base de Clientes',
      value: '1.247',
      icon: Users,
      trend: '+12.4%',
      trendUp: true,
      comparison: 'vs mês anterior',
      detail: '+138 novos',
    },
    {
      label: 'Taxa de Retenção',
      value: '87.3%',
      icon: Heart,
      trend: '+3.2%',
      trendUp: true,
      comparison: 'vs mês anterior',
      detail: 'Excelente',
    },
    {
      label: 'LTV Médio',
      value: 'R$ 892',
      icon: DollarSign,
      trend: '+15.8%',
      trendUp: true,
      comparison: 'vs mês anterior',
      detail: 'CAC: R$ 54',
    },
    {
      label: 'NPS Score',
      value: '4.8',
      icon: Star,
      trend: '+0.2',
      trendUp: true,
      comparison: 'vs mês anterior',
      detail: '894 avaliações',
    },
  ];

  const getRiskColor = (score: number) => {
    if (score >= 80) return 'bg-red-50 text-red-700 border-red-200';
    if (score >= 65) return 'bg-orange-50 text-orange-700 border-orange-200';
    return 'bg-yellow-50 text-yellow-700 border-yellow-200';
  };

  return (
    <div className="space-y-6">
      {/* Header with View Toggle */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <p className="text-xs text-gray-500 mb-1">Base de Clientes</p>
          <div className="flex items-baseline gap-2">
            <h2 className="text-gray-900">1.247 Clientes</h2>
            <Badge className="bg-green-50 text-green-700 border-green-200">
              <TrendingUp className="w-3 h-3 mr-1" />
              +12.4%
            </Badge>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1 flex-1 sm:flex-initial">
            {(['overview', 'segments', 'churn'] as ViewMode[]).map((view) => (
              <button
                key={view}
                onClick={() => setViewMode(view)}
                className={`px-3 py-2 text-xs rounded-md transition-all touch-manipulation min-h-[36px] ${
                  viewMode === view
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 active:bg-gray-200'
                }`}
              >
                {view === 'overview' && 'Visão Geral'}
                {view === 'segments' && 'Segmentação'}
                {view === 'churn' && 'Churn Risk'}
              </button>
            ))}
          </div>

          <Button variant="outline" size="sm" className="shrink-0 min-h-[36px]">
            <Filter className="h-4 w-4 sm:mr-2" />
            <span className="hidden sm:inline">Filtros</span>
          </Button>
        </div>
      </div>

      {/* Opportunities & Alerts */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="shadow-sm border-l-4 border-l-purple-500 border-y-0 border-r-0">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-purple-50 flex items-center justify-center shrink-0">
                  <Gift className="h-4 w-4 text-purple-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900 mb-1">
                    4 aniversariantes esta semana
                  </p>
                  <p className="text-xs text-gray-500">
                    Potencial de R$ 605 em vendas com campanha de aniversário.
                  </p>
                </div>
                <Button size="sm" variant="ghost" className="shrink-0">
                  <Send className="h-3.5 w-3.5" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-l-4 border-l-red-500 border-y-0 border-r-0">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-red-50 flex items-center justify-center shrink-0">
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900 mb-1">
                    4 clientes em alto risco de churn
                  </p>
                  <p className="text-xs text-gray-500">
                    Representam R$ 6.600 em LTV. Ação de reativação recomendada.
                  </p>
                </div>
                <Button size="sm" variant="ghost" className="shrink-0">
                  <Send className="h-3.5 w-3.5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <Card className="shadow-sm hover:shadow-md transition-all group border-0 active:scale-[0.98]">
              <CardContent className="p-4 sm:p-5">
                <div className="flex items-start justify-between mb-3 sm:mb-4">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gray-100 flex items-center justify-center group-hover:bg-gray-900 transition-colors">
                    <stat.icon className="h-5 w-5 text-gray-600 group-hover:text-white transition-colors" />
                  </div>
                  <Badge
                    variant="outline"
                    className={`text-xs ${stat.trendUp ? 'text-green-700 border-green-200 bg-green-50' : 'text-red-700 border-red-200 bg-red-50'}`}
                  >
                    {stat.trendUp ? (
                      <ArrowUpRight className="w-3 h-3 inline mr-0.5" />
                    ) : (
                      <ArrowDownRight className="w-3 h-3 inline mr-0.5" />
                    )}
                    {stat.trend}
                  </Badge>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1.5">{stat.label}</p>
                  <p className="text-xl sm:text-2xl text-gray-900 mb-0.5">
                    {stat.value}
                  </p>
                  <p className="text-xs text-gray-400">{stat.detail}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Conditional Content */}
      {viewMode === 'overview' && (
        <>
          {/* Retention Chart */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Card className="shadow-sm border-0">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-base text-gray-900">
                      Evolução de Clientes
                    </CardTitle>
                    <p className="text-xs text-gray-500 mt-1">
                      Clientes novos, recorrentes e churn nos últimos 6 meses
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-3 rounded-sm bg-gray-900" />
                      <span className="text-gray-600">Novos</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-3 rounded-sm bg-green-500" />
                      <span className="text-gray-600">Recorrentes</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-3 rounded-sm bg-red-500" />
                      <span className="text-gray-600">Churn</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="px-3 sm:px-6">
                <div className="w-full h-[250px] sm:h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={retentionData}
                      margin={{ top: 10, right: 5, left: -15, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient
                          id="colorNew"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#000000"
                            stopOpacity={0.12}
                          />
                          <stop
                            offset="95%"
                            stopColor="#000000"
                            stopOpacity={0}
                          />
                        </linearGradient>
                        <linearGradient
                          id="colorReturning"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#10b981"
                            stopOpacity={0.12}
                          />
                          <stop
                            offset="95%"
                            stopColor="#10b981"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="#f5f5f5"
                        vertical={false}
                      />
                      <XAxis
                        dataKey="month"
                        stroke="#9ca3af"
                        fontSize={11}
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis
                        stroke="#9ca3af"
                        fontSize={10}
                        tickLine={false}
                        axisLine={false}
                        width={40}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'white',
                          border: '1px solid #e5e7eb',
                          borderRadius: '10px',
                          padding: '8px 12px',
                          fontSize: '12px',
                          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                        }}
                        formatter={(value: any, name: string) => {
                          if (name === 'new') return [value, 'Novos'];
                          if (name === 'returning')
                            return [value, 'Recorrentes'];
                          if (name === 'churn') return [value, 'Churn'];
                          return [value, name];
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="returning"
                        stroke="#10b981"
                        strokeWidth={2.5}
                        fillOpacity={1}
                        fill="url(#colorReturning)"
                        name="returning"
                      />
                      <Area
                        type="monotone"
                        dataKey="new"
                        stroke="#000000"
                        strokeWidth={2.5}
                        fillOpacity={1}
                        fill="url(#colorNew)"
                        name="new"
                      />
                      <Line
                        type="monotone"
                        dataKey="churn"
                        stroke="#ef4444"
                        strokeWidth={2.5}
                        dot={{ fill: '#ef4444', r: 4 }}
                        name="churn"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Acquisition & Retention Funnel */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.25 }}
            >
              <Card className="shadow-sm border-0">
                <CardHeader className="pb-3">
                  <div>
                    <CardTitle className="text-base text-gray-900">
                      Canais de Aquisição
                    </CardTitle>
                    <p className="text-xs text-gray-500 mt-1">
                      Performance e CAC por canal
                    </p>
                  </div>
                </CardHeader>
                <CardContent className="px-3 sm:px-6">
                  <div className="space-y-4">
                    {acquisitionChannels.map((channel, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-gray-900">
                              {channel.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {channel.customers} clientes
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-900">
                              {channel.percentage}%
                            </p>
                            <p className="text-xs text-gray-400">
                              CAC: R$ {channel.cac}
                            </p>
                          </div>
                        </div>
                        <Progress
                          value={channel.percentage}
                          className="h-1.5"
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <Card className="shadow-sm border-0">
                <CardHeader className="pb-3">
                  <div>
                    <CardTitle className="text-base text-gray-900">
                      Funil de Retenção
                    </CardTitle>
                    <p className="text-xs text-gray-500 mt-1">
                      Jornada até cliente VIP
                    </p>
                  </div>
                </CardHeader>
                <CardContent className="px-3 sm:px-6">
                  <div className="space-y-3">
                    {retentionFunnel.map((stage, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-gray-900">{stage.stage}</p>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-900">
                              {stage.value}
                            </span>
                            <Badge variant="outline" className="text-xs">
                              {stage.percentage}%
                            </Badge>
                          </div>
                        </div>
                        <Progress value={stage.percentage} className="h-2" />
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
                    <p className="text-xs text-blue-900">
                      <Sparkles className="w-3.5 h-3.5 inline mr-1" />
                      17% dos novos clientes se tornam VIPs em 6 meses
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* LTV & Top Customers */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.35 }}
            >
              <Card className="shadow-sm border-0">
                <CardHeader className="pb-3">
                  <div>
                    <CardTitle className="text-base text-gray-900">
                      Lifetime Value por Segmento
                    </CardTitle>
                    <p className="text-xs text-gray-500 mt-1">
                      Valor e retenção por categoria
                    </p>
                  </div>
                </CardHeader>
                <CardContent className="px-3 sm:px-6">
                  <div className="space-y-4">
                    {lifetimeValueData.map((segment, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <p className="text-sm text-gray-900">
                                {segment.segment}
                              </p>
                              {segment.segment === 'VIPs' && (
                                <Crown className="h-3.5 w-3.5 text-yellow-500" />
                              )}
                            </div>
                            <p className="text-xs text-gray-500">
                              {segment.customers} clientes • {segment.avgVisits}{' '}
                              visitas/mês
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-900">
                              R$ {segment.ltv.toLocaleString()}
                            </p>
                            <Badge
                              variant="outline"
                              className={`text-xs ${
                                segment.retention >= 90
                                  ? 'text-green-700 border-green-200 bg-green-50'
                                  : segment.retention >= 70
                                    ? 'text-yellow-700 border-yellow-200 bg-yellow-50'
                                    : 'text-red-700 border-red-200 bg-red-50'
                              }`}
                            >
                              {segment.retention}% retenção
                            </Badge>
                          </div>
                        </div>
                        <Progress
                          value={(segment.ltv / 2400) * 100}
                          className="h-1.5"
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              <Card className="shadow-sm border-0">
                <CardHeader className="pb-3">
                  <div>
                    <CardTitle className="text-base text-gray-900">
                      Top Clientes VIP
                    </CardTitle>
                    <p className="text-xs text-gray-500 mt-1">
                      Clientes com maior valor gerado
                    </p>
                  </div>
                </CardHeader>
                <CardContent className="px-3 sm:px-6">
                  <div className="space-y-3">
                    {topCustomers.map((customer, index) => {
                      const rankIcons = ['🥇', '🥈', '🥉'];
                      return (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100 hover:bg-gray-100 transition-colors group"
                        >
                          <div className="flex items-center gap-3 flex-1 min-w-0">
                            <div className="relative">
                              <div className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center text-white text-sm">
                                {customer.name
                                  .split(' ')
                                  .map((n) => n[0])
                                  .join('')}
                              </div>
                              {index < 3 && (
                                <div className="absolute -top-1 -right-1 text-sm">
                                  {rankIcons[index]}
                                </div>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm text-gray-900 truncate">
                                {customer.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                {customer.visits} visitas • {customer.lastVisit}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="text-right">
                              <p className="text-sm text-gray-900">
                                R$ {customer.spent.toLocaleString()}
                              </p>
                              <Badge className="bg-gray-900 text-white border-gray-900 text-xs mt-0.5">
                                VIP
                              </Badge>
                            </div>
                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-8 w-8 p-0"
                              >
                                <Mail className="h-3.5 w-3.5" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-8 w-8 p-0"
                              >
                                <MessageSquare className="h-3.5 w-3.5" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Customer Journey Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.45 }}
          >
            <Card className="shadow-sm border-0">
              <CardHeader className="pb-3">
                <div>
                  <CardTitle className="text-base text-gray-900">
                    Métricas de Jornada do Cliente
                  </CardTitle>
                  <p className="text-xs text-gray-500 mt-1">
                    Análise do comportamento e engajamento
                  </p>
                </div>
              </CardHeader>
              <CardContent className="px-3 sm:px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {journeyMetrics.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={index}
                        className="p-4 bg-gray-50 rounded-xl border border-gray-100"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <p className="text-sm text-gray-500">{item.metric}</p>
                          <div className="w-8 h-8 rounded-lg bg-gray-900 flex items-center justify-center">
                            <Icon className="h-4 w-4 text-white" />
                          </div>
                        </div>
                        <h4 className="text-2xl text-gray-900 mb-2">
                          {item.value}
                        </h4>
                        <Badge
                          variant="outline"
                          className={`text-xs ${item.trendUp ? 'text-green-700 border-green-200 bg-green-50' : 'text-red-700 border-red-200 bg-red-50'}`}
                        >
                          {item.trendUp ? (
                            <TrendingUp className="w-3 h-3 inline mr-0.5" />
                          ) : (
                            <TrendingDown className="w-3 h-3 inline mr-0.5" />
                          )}
                          {item.change}
                        </Badge>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </>
      )}

      {viewMode === 'segments' && (
        <>
          {/* RFM Segmentation */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="shadow-sm border-0">
              <CardHeader className="pb-3">
                <div>
                  <CardTitle className="text-base text-gray-900">
                    Segmentação RFM
                  </CardTitle>
                  <p className="text-xs text-gray-500 mt-1">
                    Recency, Frequency, Monetary - Análise de comportamento
                  </p>
                </div>
              </CardHeader>
              <CardContent className="px-3 sm:px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {rfmSegments.map((seg, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-xl border-2 transition-all hover:shadow-md"
                      style={{ borderColor: seg.color }}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <Badge
                          className="text-xs"
                          style={{
                            backgroundColor: `${seg.color}15`,
                            color: seg.color,
                            borderColor: seg.color,
                          }}
                        >
                          Score: {seg.score}
                        </Badge>
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: `${seg.color}20` }}
                        >
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: seg.color }}
                          />
                        </div>
                      </div>
                      <h4 className="text-sm text-gray-900 mb-1">
                        {seg.segment}
                      </h4>
                      <p className="text-xl text-gray-900 mb-2">
                        {seg.customers}
                      </p>
                      <p className="text-xs text-gray-500 mb-3">
                        R$ {seg.revenue.toLocaleString()}
                      </p>
                      <Progress
                        value={(seg.revenue / 100800) * 100}
                        className="h-1.5"
                        style={{
                          backgroundColor: '#f3f4f6',
                        }}
                      />
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
                  <div className="flex items-start gap-3">
                    <Target className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-900 mb-2">
                        Recomendações por Segmento
                      </p>
                      <ul className="space-y-1 text-xs text-gray-600">
                        <li>
                          • <span className="font-medium">Champions:</span>{' '}
                          Programa de embaixadores e benefícios exclusivos
                        </li>
                        <li>
                          • <span className="font-medium">Loyal:</span>{' '}
                          Recompensas por fidelidade e upgrades
                        </li>
                        <li>
                          • <span className="font-medium">At Risk:</span>{' '}
                          Campanha de reengajamento urgente
                        </li>
                        <li>
                          • <span className="font-medium">Lost:</span> Win-back
                          offers com desconto especial
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Service Preferences by Segment */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Card className="shadow-sm border-0">
              <CardHeader className="pb-3">
                <div>
                  <CardTitle className="text-base text-gray-900">
                    Preferências por Segmento
                  </CardTitle>
                  <p className="text-xs text-gray-500 mt-1">
                    Serviços mais demandados em cada categoria
                  </p>
                </div>
              </CardHeader>
              <CardContent className="px-3 sm:px-6">
                <div className="w-full h-[280px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={servicePreferences}>
                      <PolarGrid stroke="#e5e7eb" />
                      <PolarAngleAxis
                        dataKey="segment"
                        tick={{ fill: '#6b7280', fontSize: 11 }}
                      />
                      <PolarRadiusAxis
                        angle={90}
                        domain={[0, 100]}
                        tick={{ fill: '#9ca3af', fontSize: 10 }}
                      />
                      <Radar
                        name="Corte"
                        dataKey="corte"
                        stroke="#000000"
                        fill="#000000"
                        fillOpacity={0.2}
                        strokeWidth={2}
                      />
                      <Radar
                        name="Barba"
                        dataKey="barba"
                        stroke="#6b7280"
                        fill="#6b7280"
                        fillOpacity={0.2}
                        strokeWidth={2}
                      />
                      <Radar
                        name="Coloração"
                        dataKey="coloracao"
                        stroke="#10b981"
                        fill="#10b981"
                        fillOpacity={0.2}
                        strokeWidth={2}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'white',
                          border: '1px solid #e5e7eb',
                          borderRadius: '10px',
                          padding: '8px 12px',
                          fontSize: '12px',
                          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                        }}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>

                <div className="flex items-center justify-center gap-6 mt-4 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-sm bg-gray-900" />
                    <span className="text-gray-600">Corte</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-sm bg-gray-500" />
                    <span className="text-gray-600">Barba</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-sm bg-green-500" />
                    <span className="text-gray-600">Coloração</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Birthday Opportunities */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.25 }}
          >
            <Card className="shadow-sm border-0">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-base text-gray-900">
                      Aniversariantes do Mês
                    </CardTitle>
                    <p className="text-xs text-gray-500 mt-1">
                      Oportunidades de campanhas personalizadas
                    </p>
                  </div>
                  <Button size="sm" className="bg-gray-900 hover:bg-gray-800">
                    <Send className="h-3.5 w-3.5 mr-2" />
                    Enviar Cupons
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="px-3 sm:px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {birthdayOpportunities.map((customer, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-purple-50 rounded-xl border border-purple-100"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white text-sm">
                          {customer.name
                            .split(' ')
                            .map((n) => n[0])
                            .join('')}
                        </div>
                        <div>
                          <p className="text-sm text-gray-900">
                            {customer.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            <Gift className="w-3 h-3 inline mr-1" />
                            {customer.date}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className="bg-purple-100 text-purple-800 border-purple-200 text-xs">
                          {customer.segment}
                        </Badge>
                        <p className="text-xs text-gray-500 mt-1">
                          ~R$ {customer.avgSpent}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </>
      )}

      {viewMode === 'churn' && (
        <>
          {/* Churn Risk Analysis */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="shadow-sm border-0">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-base text-gray-900">
                      Clientes em Risco de Churn
                    </CardTitle>
                    <p className="text-xs text-gray-500 mt-1">
                      Identificação baseada em padrões de comportamento
                    </p>
                  </div>
                  <Badge className="bg-red-50 text-red-700 border-red-200">
                    Alto Risco: {churnRiskCustomers.length}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="px-3 sm:px-6">
                <div className="space-y-3">
                  {churnRiskCustomers.map((customer, index) => (
                    <div
                      key={index}
                      className="p-4 bg-gray-50 rounded-xl border border-gray-100 hover:bg-gray-100 transition-colors group"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-start gap-3 flex-1 min-w-0">
                          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-700 text-sm">
                            {customer.name
                              .split(' ')
                              .map((n) => n[0])
                              .join('')}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-gray-900">
                              {customer.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              Última visita: {customer.lastVisit} • LTV: R${' '}
                              {customer.spent.toLocaleString()}
                            </p>
                          </div>
                        </div>
                        <Badge
                          variant="outline"
                          className={getRiskColor(customer.riskScore)}
                        >
                          Risco: {customer.riskScore}%
                        </Badge>
                      </div>

                      <div className="mb-3">
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="text-gray-500">Score de Risco</span>
                          <span className="text-gray-900 font-medium">
                            {customer.riskScore}%
                          </span>
                        </div>
                        <Progress
                          value={customer.riskScore}
                          className="h-1.5"
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <p className="text-xs text-gray-500">
                          <AlertTriangle className="w-3 h-3 inline mr-1" />
                          {customer.reason}
                        </p>
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 text-xs"
                          >
                            <Mail className="h-3.5 w-3.5 mr-1.5" />
                            Email
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 text-xs"
                          >
                            <MessageSquare className="h-3.5 w-3.5 mr-1.5" />
                            SMS
                          </Button>
                          <Button
                            size="sm"
                            className="h-8 text-xs bg-gray-900 hover:bg-gray-800"
                          >
                            <Gift className="h-3.5 w-3.5 mr-1.5" />
                            Cupom
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-orange-50 rounded-xl border border-orange-100">
                  <div className="flex items-start gap-3">
                    <Sparkles className="h-5 w-5 text-orange-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-900 mb-2">
                        Estratégias de Retenção Recomendadas
                      </p>
                      <ul className="space-y-1 text-xs text-gray-600">
                        <li>
                          • Enviar cupom de desconto de 20% válido por 7 dias
                        </li>
                        <li>
                          • Ligar pessoalmente para entender motivos da ausência
                        </li>
                        <li>• Oferecer upgrade gratuito no próximo serviço</li>
                        <li>• Incluir em programa de recompensas especial</li>
                      </ul>
                      <div className="mt-3">
                        <Button
                          size="sm"
                          className="bg-orange-600 hover:bg-orange-700 text-white"
                        >
                          <Send className="h-3.5 w-3.5 mr-2" />
                          Iniciar Campanha de Reativação
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Churn Trend */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Card className="shadow-sm border-0">
              <CardHeader className="pb-3">
                <div>
                  <CardTitle className="text-base text-gray-900">
                    Evolução de Churn
                  </CardTitle>
                  <p className="text-xs text-gray-500 mt-1">
                    Taxa mensal e tendência
                  </p>
                </div>
              </CardHeader>
              <CardContent className="px-3 sm:px-6">
                <div className="w-full h-[240px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={retentionData}
                      margin={{ top: 10, right: 5, left: -15, bottom: 0 }}
                    >
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="#f5f5f5"
                        vertical={false}
                      />
                      <XAxis
                        dataKey="month"
                        stroke="#9ca3af"
                        fontSize={11}
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis
                        stroke="#9ca3af"
                        fontSize={10}
                        tickLine={false}
                        axisLine={false}
                        width={40}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'white',
                          border: '1px solid #e5e7eb',
                          borderRadius: '10px',
                          padding: '8px 12px',
                          fontSize: '12px',
                          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                        }}
                        formatter={(value: any, name: string) => {
                          if (name === 'churn') return [value, 'Churn'];
                          if (name === 'total') return [value, 'Total'];
                          return [value, name];
                        }}
                      />
                      <Bar
                        dataKey="churn"
                        fill="#ef4444"
                        radius={[4, 4, 0, 0]}
                      />
                      <Line
                        type="monotone"
                        dataKey="total"
                        stroke="#6b7280"
                        strokeWidth={2}
                        dot={{ fill: '#6b7280', r: 3 }}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="grid grid-cols-3 gap-3 mt-4">
                  <div className="p-3 bg-green-50 rounded-lg border border-green-100 text-center">
                    <p className="text-xs text-gray-500 mb-1">Taxa Atual</p>
                    <p className="text-lg text-gray-900">2.9%</p>
                    <Badge className="text-xs bg-green-100 text-green-800 border-green-200 mt-1">
                      <TrendingDown className="w-3 h-3 mr-0.5" />
                      -1.1%
                    </Badge>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-100 text-center">
                    <p className="text-xs text-gray-500 mb-1">Média 6M</p>
                    <p className="text-lg text-gray-900">10.2</p>
                    <p className="text-xs text-gray-400 mt-1">clientes/mês</p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-100 text-center">
                    <p className="text-xs text-gray-500 mb-1">Potencial LTV</p>
                    <p className="text-lg text-gray-900">R$ 6.6k</p>
                    <p className="text-xs text-gray-400 mt-1">em risco</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </>
      )}
    </div>
  );
}
