import { api } from '@/shared/api/axios'
import { toApiError, unwrap, type ApiEnvelope } from '@/shared/api/apiError'
import {
  ANALYZE_POLL_INTERVAL_MS,
  ANALYZE_POLL_MAX_ATTEMPTS,
} from '@/features/analyze/constants'
import type {
  AnalyzeRequest,
  AnalyzeRequestResult,
  AnalyzeResult,
  AnalyzeStatus,
} from '@/features/analyze/types'

export async function requestSkinAnalysis(
  imageUrl: string,
): Promise<AnalyzeRequestResult> {
  try {
    const { data } = await api.post<ApiEnvelope<AnalyzeRequestResult>>(
      '/api/v1/analyses',
      { imageUrl } satisfies AnalyzeRequest,
    )
    return unwrap(data)
  } catch (error) {
    throw toApiError(error)
  }
}

/**
 * GET /analyses/{requestId} 명세가 아직 없어 임시로 항상 "미완료"를 반환.
 * 명세가 확정되면 이 함수만 실제 호출/완료 판정 로직으로 교체 예정.
 */
async function getAnalyzeResult(
  requestId: string,
): Promise<AnalyzeResult | null> {
  void requestId
  // GET /analyses/{requestId} 연동 후 완료 시 결과를, 진행 중이면 null을 반환하도록 교체
  return null
}

export interface PollSkinAnalysisOptions {
  intervalMs?: number
  maxAttempts?: number
}

export interface PollSkinAnalysisResult {
  status: AnalyzeStatus
  result: AnalyzeResult | null
}

export async function pollSkinAnalysisResult(
  requestId: string,
  { intervalMs = ANALYZE_POLL_INTERVAL_MS, maxAttempts = ANALYZE_POLL_MAX_ATTEMPTS }: PollSkinAnalysisOptions = {},
): Promise<PollSkinAnalysisResult> {
  for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
    const result = await getAnalyzeResult(requestId)
    if (result !== null) {
      return { status: 'done', result }
    }

    const isLastAttempt = attempt === maxAttempts - 1
    if (!isLastAttempt) {
      await new Promise((resolve) => setTimeout(resolve, intervalMs))
    }
  }

  return { status: 'timeout', result: null }
}
