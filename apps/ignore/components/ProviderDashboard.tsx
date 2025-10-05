import { useState } from 'react';
import {
  ArrowLeft,
  CalendarDays,
  Clock,
  TrendingUp,
  Users,
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { WeeklyCalendar } from './WeeklyCalendar';

interface ProviderDashboardProps {
  onBack: () => void;
}

export function ProviderDashboard({ onBack }: ProviderDashboardProps) {
  // Mock data for metrics
  const dashboardMetrics = {
    upcomingAppointments: 12,
    monthlyTotal: 84,
    weeklyRevenue: 2450,
    averageRating: 4.8,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="text-[#1a2b4c] hover:bg-[#1a2b4c]/10"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Button>
            <div>
              <h1 className="text-[#1a2b4c]">Gerenciar Agenda</h1>
              <p className="text-sm text-gray-600">
                Salão Elegância - Maria Silva
              </p>
            </div>
          </div>

          <Button className="bg-[#20b2aa] hover:bg-[#20b2aa]/90 text-white">
            Configurações
          </Button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        {/* Dashboard Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm">Próximos Agendamentos</CardTitle>
              <Clock className="h-4 w-4 text-[#20b2aa]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl text-[#1a2b4c]">
                {dashboardMetrics.upcomingAppointments}
              </div>
              <p className="text-xs text-gray-600">Nas próximas 24h</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm">Agendamentos do Mês</CardTitle>
              <CalendarDays className="h-4 w-4 text-[#1a2b4c]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl text-[#1a2b4c]">
                {dashboardMetrics.monthlyTotal}
              </div>
              <p className="text-xs text-green-600 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +12% vs mês anterior
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm">Receita Semanal</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl text-[#1a2b4c]">
                R$ {dashboardMetrics.weeklyRevenue.toLocaleString()}
              </div>
              <p className="text-xs text-gray-600">Últimos 7 dias</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm">Avaliação Média</CardTitle>
              <Users className="h-4 w-4 text-[#20b2aa]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl text-[#1a2b4c]">
                {dashboardMetrics.averageRating}
              </div>
              <p className="text-xs text-gray-600">47 avaliações este mês</p>
            </CardContent>
          </Card>
        </div>

        {/* Weekly Calendar */}
        <Card>
          <CardHeader>
            <CardTitle className="text-[#1a2b4c]">Agenda Semanal</CardTitle>
            <p className="text-sm text-gray-600">
              Clique e arraste para bloquear horários.
              <span className="ml-2">
                <span className="inline-block w-3 h-3 bg-[#20b2aa] rounded mr-1"></span>
                Livre
                <span className="inline-block w-3 h-3 bg-[#1a2b4c] rounded mr-1 ml-3"></span>
                Agendado
                <span className="inline-block w-3 h-3 bg-gray-400 rounded mr-1 ml-3"></span>
                Bloqueado
              </span>
            </p>
          </CardHeader>
          <CardContent>
            <WeeklyCalendar />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
