'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui';
import { Calendar, Clock, DollarSign, Star, TrendingUp } from 'lucide-react';
import { useDashboardModule } from './dashboard-module.hook';
import {
  activityItemVariants,
  dashboardOverviewVariants,
  metricCardVariants,
  metricIconVariants,
  metricLabelVariants,
  metricsGridVariants,
  metricValueVariants,
  recentActivityVariants,
} from './dashboard-module.styles';

export const DashboardModule = () => {
  const { storeMetrics, recentActivity } = useDashboardModule();

  return (
    <div className={dashboardOverviewVariants()}>
      {/* Quick Stats */}
      <div className={metricsGridVariants()}>
        <Card className={metricCardVariants()}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className={metricLabelVariants()}>
              Agendamentos Hoje
            </CardTitle>
            <Calendar className={metricIconVariants({ color: 'primary' })} />
          </CardHeader>
          <CardContent>
            <div className={metricValueVariants()}>
              {storeMetrics.todayAppointments}
            </div>
            <div className="text-xs text-gray-600 flex items-center gap-1 mt-1">
              <span className="text-[#20b2aa]">
                {storeMetrics.completedToday} concluídos
              </span>
              <span>•</span>
              <span className="text-orange-500">
                {storeMetrics.pendingBookings} pendentes
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className={metricCardVariants()}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className={metricLabelVariants()}>
              Receita Semanal
            </CardTitle>
            <DollarSign className={metricIconVariants({ color: 'green' })} />
          </CardHeader>
          <CardContent>
            <div className={metricValueVariants()}>
              R$ {storeMetrics.weeklyRevenue.toLocaleString()}
            </div>
            <p className="text-xs text-green-600 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              +18% vs semana anterior
            </p>
          </CardContent>
        </Card>

        <Card className={metricCardVariants()}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className={metricLabelVariants()}>
              Avaliação Média
            </CardTitle>
            <Star className={metricIconVariants({ color: 'orange' })} />
          </CardHeader>
          <CardContent>
            <div className={metricValueVariants()}>
              {storeMetrics.averageRating}
            </div>
            <p className="text-xs text-gray-600">23 avaliações esta semana</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className={metricsGridVariants({ columns: 2 })}>
        <Card className={metricCardVariants()}>
          <CardHeader>
            <CardTitle className="text-[#1a2b4c]">Atividade Recente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={recentActivityVariants()}>
              {recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className={activityItemVariants({
                    variant:
                      activity.status === 'new'
                        ? 'new'
                        : activity.status === 'completed'
                          ? 'completed'
                          : 'cancelled',
                  })}
                >
                  <div
                    className={`w-2 h-2 rounded-full mt-2 ${
                      activity.status === 'new'
                        ? 'bg-[#20b2aa]'
                        : activity.status === 'completed'
                          ? 'bg-green-500'
                          : 'bg-red-500'
                    }`}
                  />
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{activity.message}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className={metricCardVariants()}>
          <CardHeader>
            <CardTitle className="text-[#1a2b4c]">
              Próximos Agendamentos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <Clock className="h-4 w-4 text-[#20b2aa]" />
                  <div>
                    <p className="text-sm">Ana Silva - Corte</p>
                    <p className="text-xs text-gray-500">14:30 - 15:00</p>
                  </div>
                </div>
                <span className="text-xs bg-[#20b2aa]/10 text-[#20b2aa] px-2 py-1 rounded">
                  Em 30min
                </span>
              </div>

              <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <Clock className="h-4 w-4 text-[#20b2aa]" />
                  <div>
                    <p className="text-sm">Carlos Moreira - Barba</p>
                    <p className="text-xs text-gray-500">15:00 - 15:30</p>
                  </div>
                </div>
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                  Em 1h
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Chart Placeholder */}
      <Card className={metricCardVariants()}>
        <CardHeader>
          <CardTitle className="text-[#1a2b4c]">
            Desempenho - Últimos 7 dias
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <div className="text-center text-gray-500">
              <TrendingUp className="h-8 w-8 mx-auto mb-2" />
              <p className="text-sm">Gráfico de desempenho</p>
              <p className="text-xs">
                Agendamentos e receita dos últimos 7 dias
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
