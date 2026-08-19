import { useQuery } from '@tanstack/react-query'
import { getTodayDiaryStatus } from '@/features/diary/api'

export function useTodayDiaryStatus() {
  return useQuery({
    queryKey: ['diaries', 'today'],
    queryFn: getTodayDiaryStatus,
    staleTime: 60 * 1000,
  })
}
