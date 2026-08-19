import { api } from '@/shared/api/axios'
import {
  ApiError,
  toApiError,
  unwrap,
  assertSuccess,
  type ApiEnvelope,
} from '@/shared/api/apiError'
import type {
  CreatePlanParams,
  CreatePlanResult,
  CurrentPlanDetail,
  CurrentPlanStats,
  CurrentPlanSummary,
  PlanTodo,
  StartPlanResult,
} from '@/features/plan/types'

/**
 * AI 12주 플랜을 생성한다. mode로 시나리오를 구분한다(NEW/NEXT/ADJUST/TRIAL).
 * 지금은 NEW만 실제로 쓰이며, monthlyBudget은 NEW 전용, skinTone/pores/redness는 TRIAL 전용이다.
 */
export async function createPlan(
  params: CreatePlanParams,
): Promise<CreatePlanResult> {
  try {
    const { data } = await api.post<ApiEnvelope<CreatePlanResult>>(
      '/api/plans',
      params,
    )
    return unwrap(data)
  } catch (error) {
    throw toApiError(error)
  }
}

/**
 * 생성된 플랜을 현재 사용자의 "진행 중인 플랜"으로 시작한다(PlanProcess 생성).
 * 진행 중인 플랜은 1개만 허용되며, 이미 있으면 409(C4092)로 거부된다.
 */
export async function startPlan(planId: number): Promise<StartPlanResult> {
  try {
    const { data } = await api.post<ApiEnvelope<StartPlanResult>>(
      `/api/plans/${planId}/start`,
    )
    return unwrap(data)
  } catch (error) {
    const apiError = toApiError(error)
    if (apiError.code === 'C4092') {
      throw new ApiError(
        '이미 진행 중인 플랜이 있어요.',
        apiError.code,
        apiError.status,
      )
    }
    throw apiError
  }
}

/**
 * 현재 로그인 사용자의 진행 중인 플랜 요약을 조회한다.
 * 진행 중인 플랜이 없으면(404 C404) 에러로 던지지 않고 null을 반환한다 — 정상적인 빈 상태이기 때문이다.
 */
export async function getCurrentPlanSummary(): Promise<CurrentPlanSummary | null> {
  try {
    const { data } = await api.get<ApiEnvelope<CurrentPlanSummary>>(
      '/api/plans/current',
    )
    return unwrap(data)
  } catch (error) {
    const apiError = toApiError(error)
    if (apiError.code === 'C404') {
      return null
    }
    throw apiError
  }
}

/**
 * 현재 진행 중인 플랜의 상세(요약 문구, 총 비용, 최근 측정 지표, 항목 목록)를 조회한다.
 * 진행 중인 플랜이 없으면(404 C404) 에러로 던지지 않고 null을 반환한다 — 정상적인 빈 상태이기 때문이다.
 */
export async function getCurrentPlanDetail(): Promise<CurrentPlanDetail | null> {
  try {
    const { data } = await api.get<ApiEnvelope<CurrentPlanDetail>>(
      '/api/plans/current/detail',
    )
    return unwrap(data)
  } catch (error) {
    const apiError = toApiError(error)
    if (apiError.code === 'C404') {
      return null
    }
    throw apiError
  }
}

/**
 * 현재 진행 중인 플랜에 남긴 기록 통계(진행 주차/진행률/경과일/기록일)를 조회한다.
 * 진행 중인 플랜이 없으면(404 C404) 에러로 던지지 않고 null을 반환한다 — 정상적인 빈 상태이기 때문이다.
 */
export async function getCurrentPlanStats(): Promise<CurrentPlanStats | null> {
  try {
    const { data } = await api.get<ApiEnvelope<CurrentPlanStats>>(
      '/api/plans/current/stats',
    )
    return unwrap(data)
  } catch (error) {
    const apiError = toApiError(error)
    if (apiError.code === 'C404') {
      return null
    }
    throw apiError
  }
}

/**
 * 진행 중인 플랜에서 오늘 실천할 체크리스트 목록을 조회한다 (하루 기록 작성 화면용).
 * 진행 중인 플랜이 없으면(404 C404) 에러로 던지지 않고 null을 반환한다 — 정상적인 빈 상태이기 때문이다.
 */
export async function getCurrentPlanTodos(): Promise<PlanTodo[] | null> {
  try {
    const { data } = await api.get<ApiEnvelope<PlanTodo[]>>(
      '/api/plans/current/todos',
    )
    return unwrap(data)
  } catch (error) {
    const apiError = toApiError(error)
    if (apiError.code === 'C404') {
      return null
    }
    throw apiError
  }
}

/**
 * 아직 시작하지 않은(진행 중이 아닌) 12주 플랜을 삭제한다. "플랜 생성 후 뒤로가기" 시나리오.
 * 이미 시작된 플랜은 409(C4093)로 거부된다.
 */
export async function deletePlan(planId: number): Promise<void> {
  try {
    const { data } = await api.delete<ApiEnvelope<null>>(`/api/plans/${planId}`)
    assertSuccess(data)
  } catch (error) {
    const apiError = toApiError(error)
    if (apiError.code === 'C4093') {
      throw new ApiError(
        '이미 시작된 플랜은 삭제할 수 없어요.',
        apiError.code,
        apiError.status,
      )
    }
    throw apiError
  }
}
