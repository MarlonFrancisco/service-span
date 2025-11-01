import { ScheduleService } from '@/service/partner/schedule';
import { useAgendaStore } from '@/store/admin/agenda';
import { usePartnerStore } from '@/store/partner';
import { CACHE_QUERY_KEYS } from '@/utils/helpers/query.helper';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

export const useAgendaModule = () => {
  const isFocusMode = useAgendaStore((state) => state.isFocusMode);
  const activeStore = usePartnerStore((state) => state.activeStore);

  const { data: appointments } = useQuery({
    queryKey: CACHE_QUERY_KEYS.schedules(activeStore.id),
    queryFn: () => ScheduleService.getAll(activeStore.id),
    enabled: !!activeStore?.id,
  });

  useEffect(() => {
    if (appointments) {
      useAgendaStore.setState({
        appointments,
      });
    }
  }, [appointments]);

  return {
    isFocusMode,
  };
};
