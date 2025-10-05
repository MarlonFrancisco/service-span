import {
  Calendar,
  Clock,
  TrendingUp,
  Users,
  Star,
  DollarSign,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface Store {
  id: string;
  name: string;
  address: string;
}

interface DashboardOverviewProps {
  activeStore: Store;
}

export function DashboardOverview({ activeStore }: DashboardOverviewProps) {
  // Mock data for the selected store
  const storeMetrics = {
    todayAppointments: 8,
    weeklyRevenue: 3250,
    monthlyTotal: 147,
    averageRating: 4.7,
    pendingBookings: 3,
    completedToday: 5,
  };

  const recentActivity = [
    {
      id: 1,
      type: 'booking',
      message: 'Novo agendamento - Maria Silva',
      time: '2 min atrás',
      status: 'new',
    },
    {
      id: 2,
      type: 'completion',
      message: 'Serviço concluído - João Santos',
      time: '15 min atrás',
      status: 'completed',
    },
    {
      id: 3,
      type: 'cancellation',
      message: 'Cancelamento - Ana Costa',
      time: '1h atrás',
      status: 'cancelled',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Agendamentos Hoje</CardTitle>
            <Calendar className="h-4 w-4 text-[#20b2aa]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-[#1a2b4c]">
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

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Receita Semanal</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-[#1a2b4c]">
              R$ {storeMetrics.weeklyRevenue.toLocaleString()}
            </div>
            <p className="text-xs text-green-600 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              +18% vs semana anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Avaliação Média</CardTitle>
            <Star className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-[#1a2b4c]">
              {storeMetrics.averageRating}
            </div>
            <p className="text-xs text-gray-600">23 avaliações esta semana</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-[#1a2b4c]">Atividade Recente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-3 p-3 rounded-lg bg-gray-50"
                >
                  <div
                    className={`w-2 h-2 rounded-full mt-2 ${
                      activity.status === 'new'
                        ? 'bg-[#20b2aa]'
                        : activity.status === 'completed'
                          ? 'bg-green-500'
                          : 'bg-red-500'
                    }`}
                  ></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{activity.message}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
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
      <Card>
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
}
