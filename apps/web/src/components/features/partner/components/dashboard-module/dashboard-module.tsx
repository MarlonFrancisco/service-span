'use client';
import {
  getActivityColor,
  getActivityIconColor,
  useDashboard,
} from '@/store/admin/dashboard';
import { Badge, Card, CardContent, CardHeader, CardTitle } from '@repo/ui';
import {
  ArrowDownRight,
  ArrowUpRight,
  Calendar,
  Clock,
  DollarSign,
  Star,
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
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

export function DashboardModule() {
  const { metrics, performanceData, recentActivity, upcomingAppointments } =
    useDashboard();

  const stats = [
    {
      label: 'Agendamentos Hoje',
      value: metrics.todayAppointments,
      subValue: `${metrics.completedToday} concluídos • ${metrics.pendingBookings} pendentes`,
      icon: Calendar,
      trend: '+12%',
      trendUp: true,
    },
    {
      label: 'Receita Semanal',
      value: `R$ ${metrics.weeklyRevenue.toLocaleString()}`,
      subValue: 'vs semana anterior',
      icon: DollarSign,
      trend: `+${metrics.growthRate}%`,
      trendUp: true,
    },
    {
      label: 'Avaliação Média',
      value: metrics.averageRating.toFixed(1),
      subValue: '23 avaliações esta semana',
      icon: Star,
      trend: '+0.2',
      trendUp: true,
    },
    {
      label: 'Total de Clientes',
      value: metrics.totalCustomers,
      subValue: 'clientes ativos',
      icon: Users,
      trend: '+8%',
      trendUp: true,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <Card className="border-gray-200 hover:border-gray-300 transition-all group">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center group-hover:bg-gray-900 transition-colors">
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
                  <p className="text-2xl text-gray-900 mb-1">{stat.value}</p>
                  <p className="text-xs text-gray-400">{stat.subValue}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Performance Chart */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Card className="border-gray-200">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base text-gray-900">
                    Agendamentos
                  </CardTitle>
                  <p className="text-xs text-gray-500 mt-1">Últimos 7 dias</p>
                </div>
                <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center">
                  <TrendingUp className="h-4 w-4 text-gray-600" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={240}>
                <AreaChart data={performanceData}>
                  <defs>
                    <linearGradient
                      id="colorAppointments"
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
                    dataKey="day"
                    stroke="#9ca3af"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#9ca3af"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '10px',
                      padding: '8px 12px',
                      fontSize: '12px',
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="appointments"
                    stroke="#000000"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#colorAppointments)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Revenue Chart */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.25 }}
        >
          <Card className="border-gray-200">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base text-gray-900">
                    Receita
                  </CardTitle>
                  <p className="text-xs text-gray-500 mt-1">Últimos 7 dias</p>
                </div>
                <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center">
                  <DollarSign className="h-4 w-4 text-gray-600" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={performanceData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#f5f5f5"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="day"
                    stroke="#9ca3af"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#9ca3af"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '10px',
                      padding: '8px 12px',
                      fontSize: '12px',
                    }}
                    formatter={(value: number) => [`R$ ${value}`, 'Receita']}
                  />
                  <Bar dataKey="revenue" fill="#000000" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Activity and Appointments */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <Card className="border-gray-200">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base text-gray-900">
                  Atividade Recente
                </CardTitle>
                <span className="text-xs text-gray-500">Hoje</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {recentActivity.map((activity, index) => {
                  const Icon = activity.icon;
                  return (
                    <motion.div
                      key={activity.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.05 }}
                      className={`flex items-start gap-3 p-3 rounded-xl ${getActivityColor(activity.status)} border hover:shadow-sm transition-all cursor-pointer`}
                    >
                      <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shrink-0 shadow-sm">
                        <Icon
                          className={`h-4 w-4 ${getActivityIconColor(activity.status)}`}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-900 truncate">
                          {activity.message}
                        </p>
                        <p className="text-xs text-gray-600 mt-0.5 truncate">
                          {activity.service}
                        </p>
                      </div>
                      <span className="text-xs text-gray-400 shrink-0">
                        {activity.time}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Upcoming Appointments */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.35 }}
        >
          <Card className="border-gray-200">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base text-gray-900">
                  Próximos Agendamentos
                </CardTitle>
                <span className="text-xs text-gray-500">
                  {upcomingAppointments.length} hoje
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {upcomingAppointments.map((appointment, index) => (
                  <motion.div
                    key={appointment.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.05 }}
                    className="flex items-center justify-between p-3 border border-gray-200 rounded-xl hover:bg-gray-50 hover:shadow-sm transition-all cursor-pointer group"
                  >
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center shrink-0 group-hover:bg-gray-900 transition-colors">
                        <Clock className="h-4 w-4 text-gray-600 group-hover:text-white transition-colors" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-900 truncate">
                          {appointment.client}
                        </p>
                        <p className="text-xs text-gray-600 mt-0.5 truncate">
                          {appointment.service}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          {appointment.time}
                        </p>
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className={`${appointment.badgeColor} shrink-0 ml-2`}
                    >
                      {appointment.badge}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

