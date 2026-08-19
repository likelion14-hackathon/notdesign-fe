import { useQuery } from '@tanstack/react-query'
import { getCurrentPlanDetail } from '@/features/plan/api'

export function useCurrentPlanDetail() {
  return useQuery({
    queryKey: ['plans', 'current', 'detail'],
    queryFn: getCurrentPlanDetail,
    staleTime: 60 * 1000,
  })
}
