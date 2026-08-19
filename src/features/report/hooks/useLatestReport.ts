import { useQuery } from '@tanstack/react-query'
import { getLatestReport } from '@/features/report/api'

export function useLatestReport() {
  return useQuery({
    queryKey: ['reports', 'latest'],
    queryFn: getLatestReport,
    staleTime: 60 * 1000,
  })
}
