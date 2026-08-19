import { useQuery } from '@tanstack/react-query'
import { getReport } from '@/features/report/api'

export function useReport(reportId: number | null) {
  return useQuery({
    queryKey: ['reports', reportId],
    queryFn: () => getReport(reportId as number),
    enabled: reportId !== null,
    staleTime: 60 * 1000,
  })
}
