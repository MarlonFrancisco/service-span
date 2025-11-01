import { ScheduleService } from '@/service/partner/schedule/schedule.service';
import { IAppointment } from '@/types/api/schedule.types';
import { CACHE_QUERY_KEYS, getQueryClient } from '@/utils/helpers/query.helper';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useScheduleMutations = ({ storeId }: { storeId: string }) => {
  const queryClient = getQueryClient();
  const { mutate: createSchedule, isPending: isCreatingSchedule } = useMutation(
    {
      mutationFn: (schedule: Partial<IAppointment>) =>
        ScheduleService.create(storeId, schedule),
      onSuccess: (data: IAppointment) => {
        queryClient.setQueryData(
          CACHE_QUERY_KEYS.schedules(storeId),
          (old: IAppointment[]) => [...old, data],
        );
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
