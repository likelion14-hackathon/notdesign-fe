import { useQuery } from '@tanstack/react-query'
import { getCurrentPlanTodos } from '@/features/plan/api'

export function useCurrentPlanTodos() {
  return useQuery({
    queryKey: ['plans', 'current', 'todos'],
    queryFn: getCurrentPlanTodos,
    staleTime: 60 * 1000,
  })
}
