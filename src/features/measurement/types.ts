/** 오프라인 측정을 진행한 센터 */
export interface MeasurementCenter {
  id: string
  name: string
  address: string
}

/** 이용 동의서의 조항 */
export interface AgreementSection {
  heading: string
  paragraphs?: string[]
  items: string[]
}

/** 12주 플랜 요약 카드에 표시되는 점수 지표 */
export interface PlanScoreMetric {
  label: string
  score: number
  status: string
  /** true면 우선순위 지표로 강조(초록 배경) 표시 */
  emphasized: boolean
}

/** 플랜에 포함되는 항목 종류. 태그 색상·라벨을 결정 */
export type PlanCategory = 'procedure' | 'lifestyle' | 'homecare' | 'supplement'

/** 타임라인 차트의 한 줄(카테고리별 12주 활성 여부) */
export interface PlanTimelineRow {
  category: PlanCategory
  label: string
  /** 1주차~12주차 활성 여부 (길이 12) */
  activeWeeks: boolean[]
}

/** "상세보기" 목록의 항목 */
export interface PlanDetailItem {
  weekLabel: string
  category: PlanCategory
  name: string
  frequency: string
  price: string
  description: string
}
