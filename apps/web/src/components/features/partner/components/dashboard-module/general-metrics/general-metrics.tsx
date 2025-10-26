'use client';
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Progress,
  ToggleGroup,
  ToggleGroupItem,
} from '@repo/ui';
import {
  ArrowDownRight,
  ArrowUpRight,
  Award,
  DollarSign,
  Download,
  Percent,
  RefreshCw,
  Star,
  Target,
  TrendingUp,
  UserPlus,
  Users,
  XCircle,
  Zap,
} from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

type PeriodFilter = 'today' | 'week' | 'month' | 'custom';

export function GeneralMetricsModule() {
  const [periodFilter, setPeriodFilter] = useState<PeriodFilter>('week');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Mock data for the selected store
  const storeMetrics = {
    todayAppointments: 8,
    weeklyRevenue: 3250,
    monthlyTotal: 147,
    averageRating: 4.7,
    pendingBookings: 3,
    completedToday: 5,
    totalCustomers: 342,
    growthRate: 18,
    occupationRate: 68,
    cancellationRate: 4.2,
    avgTicket: 85,
    noShowRate: 2.1,
    newCustomers: 28,
    returningCustomers: 89,
    conversionRate: 72,
    peakHours: '14h - 18h',
    goalProgress: 73,
    goalTarget: 'R$ 4.500',
  };

  const performanceData = [
    { day: 'Seg', appointments: 12, revenue: 580, completed: 11, cancelled: 1 },
    { day: 'Ter', appointments: 15, revenue: 720, completed: 14, cancelled: 1 },
    { day: 'Qua', appointments: 10, revenue: 490, completed: 9, cancelled: 1 },
    { day: 'Qui', appointments: 18, revenue: 850, completed: 17, cancelled: 1 },
    {
      day: 'Sex',
      appointments: 22,
      revenue: 1050,
      completed: 21,
      cancelled: 1,
    },
    {
      day: 'Sáb',
      appointments: 28,
      revenue: 1340,
      completed: 26,
      cancelled: 2,
    },
    { day: 'Dom', appointments: 14, revenue: 670, completed: 13, cancelled: 1 },
  ];

  const topServices = [
    { name: 'Corte', bookings: 45, revenue: 2250, color: '#000000' },
    { name: 'Barba', bookings: 32, revenue: 1280, color: '#4b5563' },
    { name: 'Escova', bookings: 28, revenue: 1680, color: '#6b7280' },
    { name: 'Manicure', bookings: 22, revenue: 880, color: '#9ca3af' },
    { name: 'Outros', bookings: 20, revenue: 900, color: '#d1d5db' },
  ];

  const stats = [
    {
      label: 'Receita Semanal',
      value: `R$ ${storeMetrics.weeklyRevenue.toLocaleString()}`,
      subValue: 'vs semana anterior',
      icon: DollarSign,
      trend: `+${storeMetrics.growthRate}%`,
      trendUp: true,
      comparison: '+R$ 480',
    },
    {
      label: 'Taxa de Ocupação',
      value: `${storeMetrics.occupationRate}%`,
      subValue: 'dos horários preenchidos',
      icon: Percent,
      trend: '+5%',
      trendUp: true,
      comparison: 'vs semana passada',
    },
    {
      label: 'Ticket Médio',
      value: `R$ ${storeMetrics.avgTicket}`,
      subValue: 'por agendamento',
      icon: Target,
      trend: '+R$ 8',
      trendUp: true,
      comparison: 'vs semana passada',
    },
    {
      label: 'Avaliação Média',
      value: storeMetrics.averageRating.toFixed(1),
      subValue: '23 avaliações esta semana',
      icon: Star,
      trend: '+0.2',
      trendUp: true,
      comparison: 'mantendo excelência',
    },
  ];

  const quickActions = [
    {
      label: 'Exportar Relatório',
      icon: Download,
      variant: 'outline' as const,
      onClick: () => console.log('Exportar'),
    },
  ];

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const periodLabels = {
    today: 'Hoje',
    week: 'Esta Semana',
    month: 'Este Mês',
    custom: 'Personalizado',
  };

  return (
    <div className="space-y-6">
      {/* Header with Filters and Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div />

        <div className="flex items-center gap-2 w-full sm:w-auto">
          {/* Period Filter */}
          <div className="flex items-center gap-0.5 sm:gap-1 bg-gray-100 rounded-lg p-1 flex-1 sm:flex-initial">
            <ToggleGroup
              type="single"
              value={periodFilter}
              onValueChange={(value) => {
                if (value) setPeriodFilter(value as PeriodFilter);
              }}
            >
              {(['today', 'week', 'month'] as PeriodFilter[]).map((period) => (
                <ToggleGroupItem
                  key={period}
                  value={period}
                  className="px-2 sm:px-5 py-1.5 sm:py-2 text-xs rounded-md transition-all touch-manipulation min-h-[36px] data-[state=on]:bg-white data-[state=on]:text-gray-900 data-[state=on]:shadow-sm data-[state=off]:text-gray-600 data-[state=off]:hover:text-gray-900 data-[state=off]:active:bg-gray-200"
                >
                  {periodLabels[period]}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>

          {/* Refresh Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="shrink-0 min-h-[36px] min-w-[36px]"
            aria-label="Atualizar dados"
          >
            <RefreshCw
              className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`}
            />
          </Button>
        </div>
      </div>

      {/* Quick Actions - Mobile Friendly */}
      <div className="flex flex-wrap gap-2 sm:hidden">
        {quickActions.map((action) => {
          const Icon = action.icon;
          return (
            <Button
              key={action.label}
              variant={action.variant}
              size="sm"
              onClick={action.onClick}
              className="flex-1 min-w-[120px] min-h-[44px] touch-manipulation"
              aria-label={action.label}
            >
              <Icon className="h-4 w-4 mr-2" />
              {action.label}
            </Button>
          );
        })}
      </div>

      {/* Goal Progress Card */}
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
                  Meta Semanal
                </p>
                <div className="flex flex-wrap items-baseline gap-x-2">
                  <p className="text-2xl sm:text-3xl">
                    R$ {storeMetrics.weeklyRevenue.toLocaleString()}
                  </p>
                  <span className="text-sm text-white/60">
                    / {storeMetrics.goalTarget}
                  </span>
                </div>
              </div>
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 ml-2 sm:ml-3">
                <Target className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              </div>
            </div>
            <Progress
              value={storeMetrics.goalProgress}
              className="h-2 bg-white/20 mb-2.5 sm:mb-3"
            />
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-xs text-white/70">
                {storeMetrics.goalProgress}% concluído
              </p>
              <Badge className="bg-green-500/20 text-green-300 border-green-500/30 text-xs">
                <TrendingUp className="w-3 h-3 mr-1" />
                No caminho certo
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
                  <p className="text-xl sm:text-2xl text-gray-900 mb-1">
                    {stat.value}
                  </p>
                  <p className="text-xs text-gray-400">{stat.comparison}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Performance Chart - Takes 2 columns */}
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Card className="shadow-sm border-0">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base text-gray-900">
                    Agendamentos & Receita
                  </CardTitle>
                  <p className="text-xs text-gray-500 mt-1">Últimos 7 dias</p>
                </div>
                <div className="hidden sm:flex items-center gap-2">
                  {quickActions.map((action) => {
                    const Icon = action.icon;
                    return (
                      <Button
                        key={action.label}
                        variant={action.variant}
                        size="sm"
                        onClick={action.onClick}
                      >
                        <Icon className="h-4 w-4 sm:mr-2" />
                        <span className="hidden sm:inline">{action.label}</span>
                      </Button>
                    );
                  })}
                </div>
              </div>
            </CardHeader>
            <CardContent className="px-3 sm:px-6">
              <div className="w-full h-[250px] sm:h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={performanceData}
                    margin={{ top: 10, right: 5, left: -15, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient
                        id="colorRevenue"
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
                        id="colorAppointments"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#6b7280"
                          stopOpacity={0.12}
                        />
                        <stop
                          offset="95%"
                          stopColor="#6b7280"
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
                      dataKey="day"
                      stroke="#9ca3af"
                      fontSize={11}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      yAxisId="left"
                      stroke="#9ca3af"
                      fontSize={10}
                      tickLine={false}
                      axisLine={false}
                      width={35}
                    />
                    <YAxis
                      yAxisId="right"
                      orientation="right"
                      stroke="#9ca3af"
                      fontSize={10}
                      tickLine={false}
                      axisLine={false}
                      width={35}
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
                    <Area
                      yAxisId="right"
                      type="monotone"
                      dataKey="revenue"
                      stroke="#000000"
                      strokeWidth={2.5}
                      fillOpacity={1}
                      fill="url(#colorRevenue)"
                      name="Receita (R$)"
                    />
                    <Area
                      yAxisId="left"
                      type="monotone"
                      dataKey="appointments"
                      stroke="#6b7280"
                      strokeWidth={2.5}
                      fillOpacity={1}
                      fill="url(#colorAppointments)"
                      name="Agendamentos"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Top Services Pie Chart */}
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
                    Top Serviços
                  </CardTitle>
                  <p className="text-xs text-gray-500 mt-1">Por demanda</p>
                </div>
                <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center">
                  <Award className="h-4 w-4 text-gray-600" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="px-3 sm:px-6">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={topServices}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={75}
                    paddingAngle={2}
                    dataKey="bookings"
                  >
                    {topServices.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '10px',
                      padding: '10px 14px',
                      fontSize: '13px',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>

              {/* Legend */}
              <div className="mt-4 space-y-2">
                {topServices.slice(0, 3).map((service, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: service.color }}
                      />
                      <span className="text-gray-700">{service.name}</span>
                    </div>
                    <span className="text-gray-900 font-medium">
                      {service.bookings}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Additional Metrics Row */}
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="shadow-sm hover:shadow-md transition-all border-0 active:scale-[0.98]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
                  <UserPlus className="h-5 w-5 text-gray-700" />
                </div>
              </div>
              <p className="text-xl sm:text-2xl text-gray-900 mb-1">
                {storeMetrics.newCustomers}
              </p>
              <p className="text-xs text-gray-500">Novos Clientes</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          <Card className="shadow-sm hover:shadow-md transition-all border-0 active:scale-[0.98]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
                  <Users className="h-5 w-5 text-gray-700" />
                </div>
              </div>
              <p className="text-xl sm:text-2xl text-gray-900 mb-1">
                {storeMetrics.returningCustomers}
              </p>
              <p className="text-xs text-gray-500">Clientes Recorrentes</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="shadow-sm hover:shadow-md transition-all border-0 active:scale-[0.98]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
                  <XCircle className="h-5 w-5 text-gray-700" />
                </div>
              </div>
              <p className="text-xl sm:text-2xl text-gray-900 mb-1">
                {storeMetrics.cancellationRate}%
              </p>
              <p className="text-xs text-gray-500">Taxa de Cancelamento</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
        >
          <Card className="shadow-sm hover:shadow-md transition-all border-0 active:scale-[0.98]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
                  <Zap className="h-5 w-5 text-gray-700" />
                </div>
              </div>
              <p className="text-xl sm:text-2xl text-gray-900 mb-1">
                {storeMetrics.conversionRate}%
              </p>
              <p className="text-xs text-gray-500">Taxa de Conversão</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
