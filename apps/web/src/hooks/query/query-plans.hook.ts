import { PlansService } from '@/service/plans';
import { useQuery } from '@tanstack/react-query';

export const useQueryPlans = () => {
  const { data: plans } = useQuery({
    queryKey: ['plans'],
    queryFn: () => PlansService.getPlans(),
  });

  return { plans };
};
