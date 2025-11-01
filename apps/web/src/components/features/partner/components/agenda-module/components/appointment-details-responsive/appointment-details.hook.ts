import { ScheduleService } from '@/service/partner/schedule';
import { usePartnerStore } from '@/store';
import { useAgendaStore } from '@/store/admin/agenda';
import { IAppointment, TAppointmentStatus } from '@/types/api/schedule.types';
import { CACHE_QUERY_KEYS, getQueryClient } from '@/utils/helpers/query.helper';
import { useMutation } from '@tanstack/react-query';
import { useCallback, useMemo } from 'react';
import { toast } from 'sonner';

// Helper functions
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

  if (!startHour || !startMin || !endHour || !endMin) {
    return 'erro ao calcular duração';
  }

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

// Mutations hook
export const useAppointmentDetailsMutations = () => {
  const storeId = usePartnerStore.getState().activeStore.id;
  const setDetailsAppointment = useAgendaStore(
    (state) => state.setDetailsAppointment,
  );
  const queryClient = getQueryClient();

  const { mutate: updateAppointmentStatus, isPending: isUpdatingStatus } =
    useMutation({
      mutationFn: ({
        scheduleId,
        status,
      }: {
        scheduleId: string;
        status: TAppointmentStatus;
      }) => {
        return ScheduleService.update(storeId, scheduleId, { status });
      },
      onSuccess: (data: IAppointment) => {
        // Update cache with optimistic update
        queryClient.setQueryData(
          CACHE_QUERY_KEYS.schedules(storeId),
          (old: IAppointment[] | undefined) => {
            if (!old) return [data];
            const newAppointments = old.map((appointment) =>
              appointment.id === data.id
                ? { ...appointment, ...data }
                : appointment,
            );

            return newAppointments;
          },
        );

        // Show success message based on status
        const statusMessages = {
          completed: 'Agendamento marcado como concluído',
          cancelled: 'Agendamento cancelado',
          'no-show': 'Cliente marcado como não compareceu',
          scheduled: 'Agendamento atualizado',
        };
        toast.success(statusMessages[data.status] || 'Status atualizado');

        // Close the details modal
        setDetailsAppointment();
      },
      onError: () => {
        toast.error('Erro ao atualizar status do agendamento');
      },
    });

  return {
    updateAppointmentStatus,
    isUpdatingStatus,
  };
};

// Main hook
export const useAppointmentDetails = () => {
  const detailsAppointment = useAgendaStore(
    (state) => state.detailsAppointment,
  );
  const setDetailsAppointment = useAgendaStore(
    (state) => state.setDetailsAppointment,
  );

  const { updateAppointmentStatus, isUpdatingStatus } =
    useAppointmentDetailsMutations();

  const isOpen = useMemo(
    () => !!detailsAppointment?.id,
    [detailsAppointment?.id],
  );

  const statusBadge = useMemo(
    () => getStatusBadge(detailsAppointment?.status),
    [detailsAppointment?.status],
  );

  const duration = useMemo(
    () =>
      detailsAppointment?.startTime && detailsAppointment?.endTime
        ? calculateDuration(
            detailsAppointment.startTime,
            detailsAppointment.endTime,
          )
        : '',
    [detailsAppointment?.startTime, detailsAppointment?.endTime],
  );

  const handleClose = useCallback(() => {
    setDetailsAppointment();
  }, [setDetailsAppointment]);

  const handleStatusChange = useCallback(
    (id: string, status: TAppointmentStatus) => {
      updateAppointmentStatus({ scheduleId: id, status });
    },
    [updateAppointmentStatus],
  );

  return {
    detailsAppointment,
    isOpen,
    statusBadge,
    duration,
    isUpdatingStatus,
    handleClose,
    handleStatusChange,
  };
};
