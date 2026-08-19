/** 오프라인 측정을 진행할 수 있는 클리닉(GET /api/clinics 응답) */
export interface Clinic {
  id: number
  name: string
  address: string
}

/** 오프라인 측정 결과 불러오기(POST /api/results) 응답 */
export interface OfflineResult {
  id: number
  clinicId: number | null
  clinicName: string | null
  planId: number | null
  /** 색소침착 정도 (0~100) */
  pigmentation: number
  /** 홍조 정도 (0~100) */
  erythema: number
  /** 모공 정도 (0~100) */
  pores: number
  measuredAt: string
  createdAt: string
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
  /** 서버 categoryName을 그대로 쓰고 싶을 때. 없으면 PLAN_CATEGORY_TAG의 라벨을 쓴다 */
  categoryLabel?: string
  name: string
  frequency: string
  price: string
  description: string
}

/** 6주차 중간 리포트 상단 점수 카드 */
export interface WeekScoreMetric {
  label: string
  /** "-14점", "+10점" 처럼 부호가 포함된 표시용 문자열 */
  scoreLabel: string
  status: string
  /** true면 우선순위 지표로 강조(초록 배경) 표시 */
  emphasized: boolean
}

/** "어떤 노력이 기여했을까요?" 목록의 항목 */
export interface ContributionItem {
  category: PlanCategory
  name: string
  /** "-9.93점" 또는 "기여하지 않음" */
  scoreLabel: string
  /** 신뢰도 라벨. 관측되지 않은 항목은 없음 */
  confidence?: { label: string; tone: 'high' | 'medium' }
  /** 오른쪽(또는 신뢰도 옆)에 붙는 설명 문구 */
  note: string
}

/** "1점 개선에 든 비용" 목록의 항목 */
export interface CostItem {
  category: PlanCategory
  name: string
  cost: string
}

/** 12주 최종 리포트 상단 점수 카드. 6주차 카드에 전/후 비교값이 추가된 버전 */
export interface FinalScoreMetric {
  label: string
  scoreLabel: string
  /** "62 → 34" 처럼 첫 측정과 최종 측정을 비교하는 문자열 */
  beforeAfter: string
  status: string
  /** true면 우선순위 지표로 강조(초록 배경) 표시 */
  emphasized: boolean
}

/** "12주 동안 어떻게 실천했을까요?" 차트의 한 줄 */
export interface ActionTimelineRow {
  label: string
  /** 1주차~12주차 활성 여부 (길이 12) */
  activeWeeks: boolean[]
}
