import { ScheduleService } from '@/service/partner/schedule/schedule.service';
import { ICreateAppointment } from '@/types/api/schedule.types';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useScheduleMutations = ({ storeId }: { storeId: string }) => {
  const { mutate: createSchedule, isPending: isCreatingSchedule } = useMutation(
    {
      mutationFn: (schedule: Partial<ICreateAppointment>) =>
        ScheduleService.create(storeId, schedule),
      onSuccess: () => {
        toast.success('Agendamento criado com sucesso');
      },
      onError: () => {
        toast.error('Erro ao criar agendamento');
      },
    },
  );

  return {
    createSchedule,
    isCreatingSchedule,
  };
};
