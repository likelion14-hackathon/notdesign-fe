import { useQuery } from '@tanstack/react-query'
import { getDiaryDetail } from '@/features/diary/api'
import { ApiError } from '@/shared/api/apiError'

export function useDiaryDetail(recordedDate: string) {
  return useQuery({
    queryKey: ['diaries', 'detail', recordedDate],
    queryFn: () => getDiaryDetail(recordedDate),
    staleTime: 60 * 1000,
    // 404(그 날 기록 없음)는 정상적인 빈 상태라 재시도할 필요가 없다.
    retry: (failureCount, error) =>
      error instanceof ApiError && error.status === 404 ? false : failureCount < 1,
  })
}
