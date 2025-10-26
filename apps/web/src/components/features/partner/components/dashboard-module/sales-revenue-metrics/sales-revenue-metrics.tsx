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
  AlertCircle,
  ArrowDownRight,
  ArrowUpRight,
  Clock,
  CreditCard,
  DollarSign,
  Download,
  Receipt,
  Sparkles,
  Target,
  TrendingUp,
} from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

type PeriodFilter = 'week' | 'month' | 'quarter';

const revenueData = [
  { month: 'Jan', revenue: 45000, bookings: 320, target: 48000 },
  { month: 'Fev', revenue: 52000, bookings: 380, target: 50000 },
  { month: 'Mar', revenue: 48000, bookings: 350, target: 50000 },
  { month: 'Abr', revenue: 61000, bookings: 420, target: 55000 },
  { month: 'Mai', revenue: 55000, bookings: 390, target: 58000 },
  { month: 'Jun', revenue: 67000, bookings: 460, target: 60000 },
];

const weeklyRevenuePattern = [
  { day: 'Seg', revenue: 7800, avgTicket: 85, bookings: 92 },
  { day: 'Ter', revenue: 9200, avgTicket: 89, bookings: 103 },
  { day: 'Qua', revenue: 8100, avgTicket: 82, bookings: 99 },
  { day: 'Qui', revenue: 10500, avgTicket: 95, bookings: 110 },
  { day: 'Sex', revenue: 14200, avgTicket: 102, bookings: 139 },
  { day: 'Sáb', revenue: 18900, avgTicket: 108, bookings: 175 },
  { day: 'Dom', revenue: 11300, avgTicket: 98, bookings: 115 },
];

const conversionData = [
  { day: 'Seg', visits: 120, bookings: 45, rate: 37.5 },
  { day: 'Ter', visits: 150, bookings: 58, rate: 38.7 },
  { day: 'Qua', visits: 130, bookings: 52, rate: 40.0 },
  { day: 'Qui', visits: 180, bookings: 72, rate: 40.0 },
  { day: 'Sex', visits: 210, bookings: 95, rate: 45.2 },
  { day: 'Sáb', visits: 280, bookings: 140, rate: 50.0 },
  { day: 'Dom', visits: 190, bookings: 85, rate: 44.7 },
];

const paymentMethods = [
  { name: 'PIX', value: 42, color: '#000000' },
  { name: 'Cartão', value: 38, color: '#4b5563' },
  { name: 'Dinheiro', value: 15, color: '#9ca3af' },
  { name: 'Outros', value: 5, color: '#d1d5db' },
];

const serviceCategories = [
  { category: 'Cabelo', revenue: 28400, growth: 12.5 },
  { category: 'Barba', revenue: 15200, growth: 8.3 },
  { category: 'Estética', revenue: 18900, growth: -3.2 },
  { category: 'Combo', revenue: 4500, growth: 22.1 },
];

const topServices = [
  {
    name: 'Corte Masculino Premium',
    revenue: 12400,
    bookings: 85,
    percentage: 18.4,
    trend: 12,
    growth: 15.2,
  },
  {
    name: 'Coloração Completa',
    revenue: 9800,
    bookings: 42,
    percentage: 14.5,
    trend: 8,
    growth: 8.7,
  },
  {
    name: 'Barba & Cabelo',
    revenue: 8600,
    bookings: 98,
    percentage: 12.8,
    trend: -2,
    growth: -2.3,
  },
  {
    name: 'Escova Progressiva',
    revenue: 7200,
    bookings: 24,
    percentage: 10.7,
    trend: 18,
    growth: 22.1,
  },
  {
    name: 'Hidratação Capilar',
    revenue: 6100,
    bookings: 67,
    percentage: 9.0,
    trend: 5,
    growth: 5.8,
  },
];

const peakHours = [
  { hour: '9h', revenue: 2400, utilization: 45 },
  { hour: '10h', revenue: 4200, utilization: 68 },
  { hour: '11h', revenue: 5800, utilization: 82 },
  { hour: '14h', revenue: 7200, utilization: 95 },
  { hour: '15h', revenue: 8100, utilization: 98 },
  { hour: '16h', revenue: 7800, utilization: 92 },
  { hour: '17h', revenue: 6500, utilization: 85 },
  { hour: '18h', revenue: 5200, utilization: 72 },
];

export function SalesRevenueMetricsModule() {
  const [periodFilter, setPeriodFilter] = useState<PeriodFilter>('month');

  const stats = [
    {
      label: 'Receita do Mês',
      value: 'R$ 67.450',
      icon: DollarSign,
      trend: '+22.4%',
      trendUp: true,
      comparison: 'vs mês anterior',
      detail: '+R$ 12.350',
    },
    {
      label: 'Ticket Médio',
      value: 'R$ 146',
      icon: Receipt,
      trend: '+8.2%',
      trendUp: true,
      comparison: 'vs mês anterior',
      detail: '+R$ 11',
    },
    {
      label: 'Taxa de Conversão',
      value: '45.8%',
      icon: CreditCard,
      trend: '+3.1%',
      trendUp: true,
      comparison: 'vs mês anterior',
      detail: '+1.4 p.p.',
    },
    {
      label: 'Receita/Hora',
      value: 'R$ 285',
      icon: Clock,
      trend: '+15.3%',
      trendUp: true,
      comparison: 'vs mês anterior',
      detail: 'Produtividade',
    },
  ];

  const periodLabels = {
    week: 'Esta Semana',
    month: 'Este Mês',
    quarter: 'Trimestre',
  };

  const getMedalEmoji = (index: number) => {
    if (index === 0) return '🥇';
    if (index === 1) return '🥈';
    if (index === 2) return '🥉';
    return `${index + 1}º`;
  };

  return (
    <div className="space-y-6">
      {/* Header with Period Filter */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <p className="text-xs text-gray-500 mb-1">Performance de Vendas</p>
          <div className="flex items-baseline gap-2">
            <h2 className="text-gray-900">R$ 67.450</h2>
            <Badge className="bg-green-50 text-green-700 border-green-200">
              <TrendingUp className="w-3 h-3 mr-1" />
              +22.4%
            </Badge>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          {/* Period Filter */}
          <div className="flex items-center gap-0.5 sm:gap-1 bg-gray-100 rounded-lg p-1 flex-1 sm:flex-initial">
            {(['week', 'month', 'quarter'] as PeriodFilter[]).map((period) => (
              <button
                key={period}
                onClick={() => setPeriodFilter(period)}
                className={`px-2 sm:px-3 py-1.5 sm:py-2 text-xs rounded-md transition-all touch-manipulation min-h-[36px] ${
                  periodFilter === period
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 active:bg-gray-200'
                }`}
              >
                {periodLabels[period]}
              </button>
            ))}
          </div>

          {/* Export Button */}
          <Button variant="outline" size="sm" className="shrink-0 min-h-[36px]">
            <Download className="h-4 w-4 sm:mr-2" />
            <span className="hidden sm:inline">Exportar</span>
          </Button>
        </div>
      </div>

      {/* Monthly Goal Progress */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="shadow-lg bg-gradient-to-br from-gray-900 to-gray-800 text-white border-0">
          <CardContent className="p-4 sm:p-5 md:p-6">
            <div className="flex items-start justify-between mb-3 sm:mb-4">
              <div className="flex-1 min-w-0">
                <p className="text-white/70 text-xs mb-1 sm:mb-1.5">
                  Meta de Receita - Junho
                </p>
                <div className="flex flex-wrap items-baseline gap-x-2">
                  <p className="text-2xl sm:text-3xl">R$ 67.000</p>
                  <span className="text-sm text-white/60">/ R$ 75.000</span>
                </div>
              </div>
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 ml-2 sm:ml-3">
                <Target className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              </div>
            </div>
            <Progress value={89.3} className="h-2 bg-white/20 mb-2.5 sm:mb-3" />
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-xs text-white/70">
                89.3% concluído - faltam R$ 8.000
              </p>
              <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30 text-xs">
                <Sparkles className="w-3 h-3 mr-1" />5 dias restantes
              </Badge>
            </div>
          </CardContent>
        </Card>
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

      {/* Insights & Alerts */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="shadow-sm border-l-4 border-l-green-500 border-y-0 border-r-0">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-green-50 flex items-center justify-center shrink-0">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900 mb-1">
                    Sábado é seu dia mais rentável
                  </p>
                  <p className="text-xs text-gray-500">
                    R$ 18.900 em média. Considere aumentar a equipe aos sábados.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-l-4 border-l-yellow-500 border-y-0 border-r-0">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-yellow-50 flex items-center justify-center shrink-0">
                  <AlertCircle className="h-4 w-4 text-yellow-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900 mb-1">
                    Oportunidade em Estética
                  </p>
                  <p className="text-xs text-gray-500">
                    Receita -3.2% vs mês anterior. Revisar estratégia de preços.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      {/* Revenue Chart */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.25 }}
      >
        <Card className="shadow-sm border-0">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-base text-gray-900">
                  Evolução de Receita
                </CardTitle>
                <p className="text-xs text-gray-500 mt-1">
                  Receita mensal vs meta nos últimos 6 meses
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-sm bg-gray-900" />
                  <span className="text-gray-600">Real</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-sm border-2 border-dashed border-gray-400" />
                  <span className="text-gray-600">Meta</span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="px-3 sm:px-6">
            <div className="w-full h-[250px] sm:h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={revenueData}
                  margin={{ top: 10, right: 5, left: -15, bottom: 0 }}
                >
                  <defs>
                    <linearGradient
                      id="colorRevenueSales"
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
                      <stop offset="95%" stopColor="#000000" stopOpacity={0} />
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
                    width={50}
                    tickFormatter={(value) => `R$ ${value / 1000}k`}
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
                      if (name === 'revenue')
                        return [`R$ ${value.toLocaleString()}`, 'Receita'];
                      if (name === 'target')
                        return [`R$ ${value.toLocaleString()}`, 'Meta'];
                      return [value, 'Agendamentos'];
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#000000"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#colorRevenueSales)"
                    name="revenue"
                  />
                  <Line
                    type="monotone"
                    dataKey="target"
                    stroke="#9ca3af"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={false}
                    name="target"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Weekly Pattern & Payment Methods */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <Card className="shadow-sm border-0">
            <CardHeader className="pb-3">
              <div>
                <CardTitle className="text-base text-gray-900">
                  Receita por Dia da Semana
                </CardTitle>
                <p className="text-xs text-gray-500 mt-1">
                  Padrão médio semanal de faturamento
                </p>
              </div>
            </CardHeader>
            <CardContent className="px-3 sm:px-6">
              <div className="w-full h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={weeklyRevenuePattern}
                    margin={{ top: 10, right: 5, left: -15, bottom: 0 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#f5f5f5"
                      vertical={false}
                    />
                    <XAxis
                      dataKey="day"
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
                      width={50}
                      tickFormatter={(value) => `R$ ${value / 1000}k`}
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
                      formatter={(value: any) => [
                        `R$ ${value.toLocaleString()}`,
                        'Receita',
                      ]}
                    />
                    <Bar
                      dataKey="revenue"
                      fill="#000000"
                      radius={[6, 6, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.35 }}
        >
          <Card className="shadow-sm border-0">
            <CardHeader className="pb-3">
              <div>
                <CardTitle className="text-base text-gray-900">
                  Métodos de Pagamento
                </CardTitle>
                <p className="text-xs text-gray-500 mt-1">
                  Distribuição de pagamentos recebidos
                </p>
              </div>
            </CardHeader>
            <CardContent className="px-3 sm:px-6">
              <div className="w-full h-[160px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={paymentMethods}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={60}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {paymentMethods.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #e5e7eb',
                        borderRadius: '10px',
                        padding: '8px 12px',
                        fontSize: '12px',
                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                      }}
                      formatter={(value: any) => [`${value}%`, 'Participação']}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Legend */}
              <div className="grid grid-cols-2 gap-2 mt-4">
                {paymentMethods.map((method, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: method.color }}
                      />
                      <span className="text-gray-700">{method.name}</span>
                    </div>
                    <span className="text-gray-900 font-medium">
                      {method.value}%
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Service Categories Performance */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        <Card className="shadow-sm border-0">
          <CardHeader className="pb-3">
            <div>
              <CardTitle className="text-base text-gray-900">
                Receita por Categoria
              </CardTitle>
              <p className="text-xs text-gray-500 mt-1">
                Performance e crescimento por tipo de serviço
              </p>
            </div>
          </CardHeader>
          <CardContent className="px-4 sm:px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {serviceCategories.map((category, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-900">{category.category}</p>
                    <Badge
                      variant="outline"
                      className={`text-xs ${category.growth >= 0 ? 'text-green-700 border-green-200 bg-green-50' : 'text-red-700 border-red-200 bg-red-50'}`}
                    >
                      {category.growth >= 0 ? '+' : ''}
                      {category.growth}%
                    </Badge>
                  </div>
                  <p className="text-lg text-gray-900">
                    R$ {category.revenue.toLocaleString()}
                  </p>
                  <Progress
                    value={(category.revenue / 28400) * 100}
                    className="h-1.5"
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Top Services & Peak Hours */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.45 }}
        >
          <Card className="shadow-sm border-0">
            <CardHeader className="pb-3">
              <div>
                <CardTitle className="text-base text-gray-900">
                  Top Serviços por Receita
                </CardTitle>
                <p className="text-xs text-gray-500 mt-1">
                  Ranking dos serviços mais rentáveis
                </p>
              </div>
            </CardHeader>
            <CardContent className="px-3 sm:px-6">
              <div className="space-y-4">
                {topServices.map((service, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-2 flex-1 min-w-0">
                        <span className="text-lg shrink-0 mt-0.5">
                          {getMedalEmoji(index)}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-900 truncate">
                            {service.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {service.bookings} agendamentos
                          </p>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-sm text-gray-900">
                          R$ {service.revenue.toLocaleString()}
                        </p>
                        <Badge
                          variant="outline"
                          className={`text-xs mt-0.5 ${service.growth >= 0 ? 'text-green-700 border-green-200 bg-green-50' : 'text-red-700 border-red-200 bg-red-50'}`}
                        >
                          {service.growth >= 0 ? '+' : ''}
                          {service.growth}%
                        </Badge>
                      </div>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-1.5">
                      <div
                        className="bg-gray-900 h-1.5 rounded-full transition-all"
                        style={{ width: `${service.percentage * 5}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        >
          <Card className="shadow-sm border-0">
            <CardHeader className="pb-3">
              <div>
                <CardTitle className="text-base text-gray-900">
                  Horários Mais Rentáveis
                </CardTitle>
                <p className="text-xs text-gray-500 mt-1">
                  Receita e ocupação por horário
                </p>
              </div>
            </CardHeader>
            <CardContent className="px-3 sm:px-6">
              <div className="space-y-3">
                {peakHours.slice(0, 6).map((hour, index) => (
                  <div key={index} className="space-y-1.5">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <Clock className="h-3.5 w-3.5 text-gray-400" />
                        <span className="text-gray-900">{hour.hour}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-gray-600 text-xs">
                          R$ {hour.revenue.toLocaleString()}
                        </span>
                        <Badge
                          variant="outline"
                          className={`text-xs ${
                            hour.utilization >= 90
                              ? 'text-green-700 border-green-200 bg-green-50'
                              : hour.utilization >= 70
                                ? 'text-yellow-700 border-yellow-200 bg-yellow-50'
                                : 'text-gray-700 border-gray-200 bg-gray-50'
                          }`}
                        >
                          {hour.utilization}%
                        </Badge>
                      </div>
                    </div>
                    <Progress value={hour.utilization} className="h-1" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
