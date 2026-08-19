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
