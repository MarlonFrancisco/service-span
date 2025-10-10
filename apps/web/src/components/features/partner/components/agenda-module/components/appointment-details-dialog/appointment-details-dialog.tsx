'use client';
import type { IAppointment } from '@/store/admin/agenda';
import {
  Badge,
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@repo/ui';
import {
  AlertCircle,
  Ban,
  Calendar,
  CheckCircle,
  Clock,
  DollarSign,
  Mail,
  Phone,
  User,
} from 'lucide-react';

interface AppointmentDetailsDialogProps {
  appointment: IAppointment;
  onClose: () => void;
  onStatusChange: (id: string, status: IAppointment['status']) => void;
  onDelete: (id: string) => void;
}

export function AppointmentDetailsDialog({
  appointment,
  onClose,
  onStatusChange,
  onDelete,
}: AppointmentDetailsDialogProps) {
  const getStatusBadge = (status: IAppointment['status']) => {
    const statusConfig = {
      scheduled: {
        label: 'Agendado',
        className: 'bg-blue-50 text-blue-700 border-blue-200',
      },
      completed: {
        label: 'Concluído',
        className: 'bg-green-50 text-green-700 border-green-200',
      },
      cancelled: {
        label: 'Cancelado',
        className: 'bg-red-50 text-red-700 border-red-200',
      },
      'no-show': {
        label: 'Não Compareceu',
        className: 'bg-orange-50 text-orange-700 border-orange-200',
      },
    };
    return statusConfig[status];
  };

  const calculateDuration = (startTime: string, endTime: string): string => {
    const [startHour, startMin] = startTime.split(':').map(Number);
    const [endHour, endMin] = endTime.split(':').map(Number);
    const startMinutes = startHour * 60 + startMin;
    const endMinutes = endHour * 60 + endMin;
    const duration = endMinutes - startMinutes;

    if (duration >= 60) {
      const hours = Math.floor(duration / 60);
      const minutes = duration % 60;
      return minutes > 0 ? `${hours}h ${minutes}min` : `${hours}h`;
    }
    return `${duration}min`;
  };

  const statusBadge = getStatusBadge(appointment.status);
  const duration = calculateDuration(
    appointment.startTime,
    appointment.endTime,
  );

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Detalhes do Agendamento</span>
            <Badge variant="outline" className={statusBadge.className}>
              {statusBadge.label}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Client Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <User className="h-5 w-5 text-gray-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Cliente</p>
                <p className="text-gray-900">{appointment.clientName}</p>
              </div>
            </div>

            {appointment.clientPhone && (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Phone className="h-5 w-5 text-gray-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Telefone</p>
                  <p className="text-gray-900">{appointment.clientPhone}</p>
                </div>
              </div>
            )}

            {appointment.clientEmail && (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Mail className="h-5 w-5 text-gray-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">E-mail</p>
                  <p className="text-gray-900">{appointment.clientEmail}</p>
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-gray-200 pt-4 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <Calendar className="h-5 w-5 text-gray-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Serviço</p>
                <p className="text-gray-900">{appointment.service}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <User className="h-5 w-5 text-gray-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Profissional</p>
                <p className="text-gray-900">{appointment.professional}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <Clock className="h-5 w-5 text-gray-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Horário e Duração</p>
                <p className="text-gray-900">
                  {new Date(appointment.date).toLocaleDateString('pt-BR')} às{' '}
                  {appointment.startTime}
                </p>
                <p className="text-sm text-gray-600">Duração: {duration}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-gray-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Valor</p>
                <p className="text-gray-900">
                  R$ {appointment.price.toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          {appointment.notes && (
            <div className="border-t border-gray-200 pt-4">
              <p className="text-sm text-gray-600 mb-2">Observações</p>
              <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded-lg">
                {appointment.notes}
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="border-t border-gray-200 pt-4 space-y-2">
            {appointment.status === 'scheduled' && (
              <>
                <Button
                  onClick={() => onStatusChange(appointment.id, 'completed')}
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Marcar como Concluído
                </Button>
                <Button
                  onClick={() => onStatusChange(appointment.id, 'no-show')}
                  variant="outline"
                  className="w-full border-orange-200 text-orange-700 hover:bg-orange-50"
                >
                  <AlertCircle className="h-4 w-4 mr-2" />
                  Cliente Não Compareceu
                </Button>
              </>
            )}

            {appointment.status !== 'cancelled' && (
              <Button
                onClick={() => onDelete(appointment.id)}
                variant="outline"
                className="w-full border-red-200 text-red-700 hover:bg-red-50"
              >
                <Ban className="h-4 w-4 mr-2" />
                Cancelar Agendamento
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
