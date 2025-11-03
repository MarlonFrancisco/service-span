'use client';
import {
  Badge,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Progress,
} from '@repo/ui';
import {
  ArrowDownRight,
  ArrowUpRight,
  Crown,
  DollarSign,
  Heart,
  Star,
  TrendingDown,
  TrendingUp,
  Users,
} from 'lucide-react';
import { motion } from 'motion/react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useCustomerMetrics } from './customer-metrics.hook';
import { CustomerMetricsSkeleton } from './customer-metrics.skeleton';

export function CustomerMetricsModule() {
  const {
    period,
    setPeriod,
    periodLabels,
    stats,
    retentionData,
    lifetimeValueData,
    topCustomers,
    isLoading,
    customers,
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
                (customers?.customerBase?.comparison.percentageChange || 0) === 0
                  ? 'bg-gray-50 text-gray-700 border-gray-200'
                  : (customers?.customerBase?.comparison.percentageChange || 0) > 0
                    ? 'bg-green-50 text-green-700 border-green-200'
                    : 'bg-red-50 text-red-700 border-red-200'
              }
            >
              {(customers?.customerBase?.comparison.percentageChange || 0) === 0 ? (
                <span className="mr-1">—</span>
              ) : (customers?.customerBase?.comparison.percentageChange || 0) > 0 ? (
                <TrendingUp className="w-3 h-3 mr-1" />
              ) : (
                <TrendingDown className="w-3 h-3 mr-1" />
              )}
              {(customers?.customerBase?.comparison.percentageChange || 0) > 0 ? '+' : ''}
              {customers?.customerBase?.comparison.percentageChange || 0}%
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
        </div>
      </div>

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
                    className={`text-xs ${
                      stat.trendNeutral
                        ? 'text-gray-700 border-gray-200 bg-gray-50'
                        : stat.trendUp
                          ? 'text-green-700 border-green-200 bg-green-50'
                          : 'text-red-700 border-red-200 bg-red-50'
                    }`}
                  >
                    {stat.trendNeutral ? (
                      <span className="inline mr-0.5">—</span>
                    ) : stat.trendUp ? (
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
                    <linearGradient id="colorNew" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="5%"
                        stopColor="#000000"
                        stopOpacity={0.12}
                      />
                      <stop offset="95%" stopColor="#000000" stopOpacity={0} />
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
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
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
                      if (name === 'returning') return [value, 'Recorrentes'];
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
                  Top Clientes
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
    </div>
  );
}
