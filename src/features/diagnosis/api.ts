import { api } from '@/shared/api/axios'
import { ApiError, toApiError, unwrap, type ApiEnvelope } from '@/shared/api/apiError'
import type { DiagnosisRequest, DiagnosisResult } from '@/features/diagnosis/types'

const COST_MIN = 0
const COST_MAX = 1_000_000

function assertValidCost(value: number, label: string) {
  if (value < COST_MIN || value > COST_MAX) {
    throw new ApiError(
      `${label}은 0원~100만원 사이여야 해요.`,
      'CLIENT_VALIDATION',
      null,
    )
  }
}

export async function createDiagnosis(
  request: DiagnosisRequest,
): Promise<DiagnosisResult> {
  assertValidCost(request.procedureCost, '시술 지출')
  assertValidCost(request.productCost, '제품 지출')

  try {
    const { data } = await api.post<ApiEnvelope<DiagnosisResult>>(
      '/api/diagnoses',
      request,
    )
    return unwrap(data)
  } catch (error) {
    throw toApiError(error)
  }
}
