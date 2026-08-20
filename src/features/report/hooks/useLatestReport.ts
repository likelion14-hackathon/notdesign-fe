import { useQuery } from '@tanstack/react-query'
import { getLatestReport } from '@/features/report/api'

export function useLatestReport(enabled = true) {
  return useQuery({
    queryKey: ['reports', 'latest'],
    queryFn: getLatestReport,
    enabled,
    staleTime: 60 * 1000,
  })
}
