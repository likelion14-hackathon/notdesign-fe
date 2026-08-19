import { useQuery } from '@tanstack/react-query'
import { getDiaryCalendar } from '@/features/diary/api'

export function useDiaryCalendar(year: number, month: number) {
  return useQuery({
    queryKey: ['diaries', 'calendar', year, month],
    queryFn: () => getDiaryCalendar(year, month),
    staleTime: 60 * 1000,
  })
}
