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
  Crown,
  DollarSign,
  Filter,
  Gift,
  Heart,
  Mail,
  MessageSquare,
  Send,
  Sparkles,
  Star,
  Target,
  TrendingDown,
  TrendingUp,
  Users,
} from 'lucide-react';
import { motion } from 'motion/react';
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
import { useCustomerMetrics } from './customer-metrics.hook';
import { CustomerMetricsSkeleton } from './customer-metrics.skeleton';

type ViewMode = 'overview' | 'segments' | 'churn';

export function CustomerMetricsModule() {
  const {
    viewMode,
    setViewMode,
    period,
    setPeriod,
    periodLabels,
    stats,
    retentionData,
    lifetimeValueData,
    topCustomers,
    rfmSegments,
    birthdayOpportunities,
    churnRiskCustomers,
    servicePreferences,
    getRiskColor,
    isLoading,
    customers,
    alerts,
  } = useCustomerMetrics();

  if (isLoading || !customers) {
    return <CustomerMetricsSkeleton />;
  }

  return (
    <div className="space-y-6">
      {/* Header with View Toggle */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <p className="text-xs text-gray-500 mb-1">Base de Clientes</p>
          <div className="flex items-baseline gap-2">
            <h2 className="text-gray-900">
              {customers?.customerBase?.value || 0} Clientes
            </h2>
            <Badge
              className={
                (customers?.customerBase?.percentageChange || 0) >= 0
                  ? 'bg-green-50 text-green-700 border-green-200'
                  : 'bg-red-50 text-red-700 border-red-200'
              }
            >
              {(customers?.customerBase?.percentageChange || 0) >= 0 ? (
                <TrendingUp className="w-3 h-3 mr-1" />
              ) : (
                <TrendingDown className="w-3 h-3 mr-1" />
              )}
              {(customers?.customerBase?.percentageChange || 0) >= 0 ? '+' : ''}
              {customers?.customerBase?.percentageChange || 0}%
            </Badge>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          {/* Period Filter */}
          <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
            {(['week', 'month', 'quarter'] as const).map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-2 sm:px-3 py-1.5 sm:py-2 text-xs rounded-md transition-all touch-manipulation min-h-[36px] ${
                  period === p
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 active:bg-gray-200'
                }`}
              >
                {periodLabels[p]}
              </button>
            ))}
          </div>

          {/* View Mode Toggle */}
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
        <div className="flex gap-4">
          {alerts!.birthdayCustomers.quantity > 0 && (
            <Card className="shadow-sm border-l-4 border-l-purple-500 border-y-0 border-r-0 flex-1">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-purple-50 flex items-center justify-center shrink-0">
                    <Gift className="h-4 w-4 text-purple-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900 mb-1">
                      {alerts?.birthdayCustomers?.quantity || 0} aniversariantes
                      esta semana
                    </p>
                    <p className="text-xs text-gray-500">
                      Potencial de R${' '}
                      {alerts?.birthdayCustomers?.potentialRevenue || 0} em
                      vendas com campanha de aniversário.
                    </p>
                  </div>
                  <Button size="sm" variant="ghost" className="shrink-0">
                    <Send className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {alerts!.churnRisk.quantity > 0 && (
            <Card className="shadow-sm border-l-4 border-l-red-500 border-y-0 border-r-0 flex-1">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-red-50 flex items-center justify-center shrink-0">
                    <AlertTriangle className="h-4 w-4 text-red-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900 mb-1">
                      {alerts?.churnRisk?.quantity || 0} clientes em alto risco
                      de churn
                    </p>
                    <p className="text-xs text-gray-500">
                      Representam R$ {alerts?.churnRisk?.ltvAtRisk || 0} em LTV.
                      Ação de reativação recomendada.
                    </p>
                  </div>
                  <Button size="sm" variant="ghost" className="shrink-0">
                    <Send className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
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
                    {stat.icon === 'Users' && (
                      <Users className="h-5 w-5 text-gray-600 group-hover:text-white transition-colors" />
                    )}
                    {stat.icon === 'Heart' && (
                      <Heart className="h-5 w-5 text-gray-600 group-hover:text-white transition-colors" />
                    )}
                    {stat.icon === 'DollarSign' && (
                      <DollarSign className="h-5 w-5 text-gray-600 group-hover:text-white transition-colors" />
                    )}
                    {stat.icon === 'Star' && (
                      <Star className="h-5 w-5 text-gray-600 group-hover:text-white transition-colors" />
                    )}
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
                        formatter={(value: number, name: string) => {
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
                        formatter={(value: number, name: string) => {
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
