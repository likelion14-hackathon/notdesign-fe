import { api } from '@/shared/api/axios'
import {
  ApiError,
  toApiError,
  unwrap,
  type ApiEnvelope,
} from '@/shared/api/apiError'
import type { OfflineResult } from '@/features/measurement/types'

/**
 * 선택한 클리닉의 더미 측정값을 실제 측정 결과로 불러옴.
 */
export async function importOfflineResult(
  clinicId?: number,
): Promise<OfflineResult> {
  try {
    const { data } = await api.post<ApiEnvelope<OfflineResult>>(
      '/api/results',
      undefined,
      clinicId === undefined ? undefined : { params: { clinicId } },
    )
    return unwrap(data)
  } catch (error) {
    throw toApiError(error)
  }
}

/**
 * 측정 결과 상세를 조회. 본인 소유 결과만 조회 가능.
 */
export async function getResultDetail(resultId: number): Promise<OfflineResult> {
  try {
    const { data } = await api.get<ApiEnvelope<OfflineResult>>(
      `/api/results/${resultId}`,
    )
    return unwrap(data)
  } catch (error) {
    const apiError = toApiError(error)
    if (apiError.code === 'C404') {
      throw new ApiError('결과를 찾을 수 없습니다.', apiError.code, apiError.status)
    }
    throw apiError
  }
}
