export type ReportType = 'MID' | 'FINAL'

export type ReportImprovement = 'PIGMENTATION' | 'PORES' | 'ERYTHEMA'

export type ReportCategory = 'PROCEDURE' | 'LIFESTYLE' | 'HOME_CARE' | 'SUPPLEMENT'

export type ReportReliability = 'HIGH' | 'MID' | 'LOW'

export interface ReportMetric {
  improvement: ReportImprovement
  improvementName: string
  before: number
  after: number
  delta: number
}

/** "어떤 노력이 기여했을까요?" 원본 데이터. 항목명 필드는 content */
export interface ReportContribution {
  improvement: ReportImprovement
  improvementName: string
  category: ReportCategory
  categoryName: string
  content: string
  score: number
  contributionRate: number
  price: number
  costPerPoint: number
  reliability: ReportReliability
}

/** "실천 현황" 원본 데이터. 항목명 필드는 name (contributions와 다름) */
export interface ReportExecution {
  category: ReportCategory
  categoryName: string
  name: string
  plannedWeeks: number[]
  doneWeeks: number[]
}

export interface ReportResponseDto {
  reportId: number
  type: ReportType
  summary: string
  nextPlanSuggestion: string
  /** FINAL만 값이 있고, MID는 null */
  nextPlanPrice: number | null
  /** 항상 PIGMENTATION/PORES/ERYTHEMA 3개 */
  metrics: ReportMetric[]
  contributions: ReportContribution[]
  executions: ReportExecution[]
}
