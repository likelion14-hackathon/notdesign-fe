import { useQuery } from '@tanstack/react-query'
import { getCurrentPlanSummary } from '@/features/plan/api'

export function useCurrentPlanSummary() {
  return useQuery({
    queryKey: ['plans', 'current'],
    queryFn: getCurrentPlanSummary,
    staleTime: 60 * 1000,
  })
}
