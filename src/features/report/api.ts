import { api } from '@/shared/api/axios'
import { toApiError, unwrap, type ApiEnvelope } from '@/shared/api/apiError'
import type { ReportResponseDto } from '@/features/report/types'

/**
 * 진행 중인 사이클과 최근 측정 데이터를 기반으로 리포트(MID/FINAL)를 생성.
 * 리포트 종류는 서버가 결정.
 */
export async function createReport(): Promise<ReportResponseDto> {
  try {
    const { data } = await api.post<ApiEnvelope<ReportResponseDto>>(
      '/api/reports',
    )
    return unwrap(data)
  } catch (error) {
    throw toApiError(error)
  }
}

/** 리포트 지표변화·기여도·실천현황 조회. 본인 소유 리포트만 조회 가능(403) */
export async function getReport(reportId: number): Promise<ReportResponseDto> {
  try {
    const { data } = await api.get<ApiEnvelope<ReportResponseDto>>(
      `/api/reports/${reportId}`,
    )
    return unwrap(data)
  } catch (error) {
    throw toApiError(error)
  }
}

/**
 * 로그인 사용자가 가장 최근에 받은 리포트 1건 조회.
 * 아직 받은 리포트가 없는 정상 상태(404 C404)는 null로 변환한다.
 */
export async function getLatestReport(): Promise<ReportResponseDto | null> {
  try {
    const { data } = await api.get<ApiEnvelope<ReportResponseDto>>(
      '/api/reports/latest',
    )
    return unwrap(data)
  } catch (error) {
    const apiError = toApiError(error)
    if (apiError.code === 'C404') return null
    throw apiError
  }
}
