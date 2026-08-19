export type PlanMode = 'NEW' | 'NEXT' | 'ADJUST' | 'TRIAL'

export type PlanItemCategory =
  | 'PROCEDURE'
  | 'LIFESTYLE'
  /** 문서상 HOMECARE지만 실제 서버는 언더스코어 포함으로 내려준다 */
  | 'HOME_CARE'
  | 'SUPPLEMENT'

export interface PlanItem {
  category: PlanItemCategory
  categoryName: string
  content: string
  frequency: string
  price: number
  /** 시술/실천이 배치된 주차 (예: [1, 4, 8]) */
  weeks: number[]
  reason: string
}

export interface PlanTodo {
  checklistId: number
  category: PlanItemCategory
  categoryName: string
  content: string
  /** 하루 기록 작성 전 조회용이라 서버는 항상 false로 준다. 실제 체크 여부는 프론트에서 로컬로 관리한다. */
  done: boolean
}

export interface CreatePlanResult {
  planId: number
  mode: PlanMode
  planSummary: string
  durationWeeks: number
  totalPrice: number
  items: PlanItem[]
}

export interface CreatePlanParams {
  mode: PlanMode
  /** NEW 전용. 월 예산(원) */
  monthlyBudget?: number
  /** TRIAL 전용. 0~10 */
  skinTone?: number
  /** TRIAL 전용. 0~10 */
  pores?: number
  /** TRIAL 전용. 0~10 */
  redness?: number
}

export interface StartPlanResult {
  processId: number
  /** yyyy-MM-dd */
  startedAt: string
}

/**
 * "조정 플랜 적용 및 시작" 응답. 새 사이클을 만드는 startPlan/startNextPlan과 달리
 * 기존 사이클에 그대로 반영하는 API라 필드 구조가 다르다(processId/startedAt 없음).
 */
export interface AdjustPlanResult {
  planId: number
  /** 적용 시점의 진행 주차 */
  currentWeek: number
}

export interface PlanProgress {
  /** 1부터 시작, 최대 totalWeeks */
  currentWeek: number
  totalWeeks: number
  /** % (0~100) */
  progressRate: number
}

export interface CurrentPlanSummary extends PlanProgress {
  /** 중간 리포트(시작+6주)까지 남은 일수. 이미 지났으면 0 */
  daysToMidReport: number
  /** 최종 리포트(시작+12주)까지 남은 일수. 이미 지났으면 0 */
  daysToFinalReport: number
}

export interface CurrentPlanStats extends PlanProgress {
  /** 플랜 시작일부터 오늘까지 경과 일수 */
  elapsedDays: number
  /** 경과일 중 기록을 남긴 날 수 */
  recordedDays: number
}

export interface CurrentPlanDetail {
  planSummary: string
  totalPrice: number
  /** 측정 이력이 없으면 null */
  metrics: {
    pigmentation: number
    pores: number
    erythema: number
  } | null
  /** 플랜 항목 ID 오름차순 */
  items: PlanItem[]
}
