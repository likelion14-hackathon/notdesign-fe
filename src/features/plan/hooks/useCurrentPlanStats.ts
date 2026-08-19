import { useQuery } from '@tanstack/react-query'
import { getCurrentPlanStats } from '@/features/plan/api'

export function useCurrentPlanStats() {
  return useQuery({
    queryKey: ['plans', 'current', 'stats'],
    queryFn: getCurrentPlanStats,
    staleTime: 60 * 1000,
  })
}
