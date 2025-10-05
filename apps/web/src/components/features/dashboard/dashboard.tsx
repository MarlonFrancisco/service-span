'use client';

import { useState } from 'react';
import {
  Calendar,
  Clock,
  Users,
  TrendingUp,
  Settings,
  Plus,
  ArrowLeft,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Header } from '@/components/layout';

export const Dashboard = () => {
  const [userType] = useState<'client' | 'provider'>('provider'); // Mock - em produção vem do contexto/auth

  const handleBackToHome = () => {
    window.history.back();
  };

  const mockAppointments = [
    {
      id: '1',
      clientName: 'Maria Silva',
      service: 'Corte de cabelo',
      time: '14:30',
      status: 'confirmed',
    },
    {
      id: '2',
      clientName: 'João Santos',
      service: 'Barba',
      time: '16:00',
      status: 'pending',
    },
  ];

  const mockStats = [
    {
      label: 'Agendamentos hoje',
      value: '8',
      icon: Calendar,
      color: 'text-blue-600',
    },
    {
      label: 'Clientes ativos',
      value: '24',
      icon: Users,
      color: 'text-green-600',
    },
    {
      label: 'Receita mensal',
      value: 'R$ 2.400',
      icon: TrendingUp,
      color: 'text-purple-600',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Dashboard Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                onClick={handleBackToHome}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Voltar
              </Button>
              <div>
                <h1 className="text-3xl font-semibold text-gray-900">
                  Dashboard{' '}
                  {userType === 'provider' ? 'Profissional' : 'Cliente'}
                </h1>
                <p className="text-gray-600">
                  Gerencie seus agendamentos e serviços
                </p>
              </div>
            </div>
            {userType === 'provider' && (
              <Button className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Novo Serviço
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {mockStats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      {stat.label}
                    </p>
                    <p className="text-2xl font-semibold text-gray-900">
                      {stat.value}
                    </p>
                  </div>
                  <div className={`p-3 bg-gray-50 rounded-lg`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Today's Appointments */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Agendamentos de Hoje
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockAppointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <Users className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {appointment.clientName}
                        </p>
                        <p className="text-sm text-gray-600">
                          {appointment.service}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">
                        {appointment.time}
                      </p>
                      <Badge
                        variant={
                          appointment.status === 'confirmed'
                            ? 'default'
                            : 'secondary'
                        }
                        className="text-xs"
                      >
                        {appointment.status === 'confirmed'
                          ? 'Confirmado'
                          : 'Pendente'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                Ver todos os agendamentos
              </Button>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Ações Rápidas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Clock className="w-4 h-4 mr-2" />
                  Gerenciar Horários
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="w-4 h-4 mr-2" />
                  Meus Clientes
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Relatórios
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Settings className="w-4 h-4 mr-2" />
                  Configurações
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
