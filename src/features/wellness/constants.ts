export const WELLNESS_INTRO = {
  eyebrow: '웰니스 지출 진단',
  title: ['낭비되고 있는', '피부 관리 지출 비용을 확인해보세요'],
  startButtonLabel: '진단 시작하기',
  skipLabel: '건너뛰기',
} as const

export const WELLNESS_SPENDING_MAX = 1_000_000
export const WELLNESS_SPENDING_MAX_LABEL = '100만원 이상'
export const WELLNESS_SPENDING_DEFAULT = 200_000

export const WELLNESS_PROCEDURE_COST = {
  eyebrow: '웰니스 지출 진단',
  title: ['최근 1년간 피부과 시술에 사용한', '대략적인 금액을 알려주세요'],
  sliderLabel: '최근 1년간 시술 비용',
} as const

export const WELLNESS_SKINCARE_COST = {
  eyebrow: '웰니스 지출 진단',
  title: ['최근 1년간 스킨케어 제품에 사용한', '대략적인 금액을 알려주세요'],
  sliderLabel: '최근 1년간 스킨케어 비용',
} as const

export const WELLNESS_EFFECT_PERCEPTION = {
  eyebrow: '웰니스 지출 진단',
  title: ['투자 비용만큼의', '피부 개선 효과를 체감하셨나요?'],
  options: [
    { id: 'much', label: '많이 체감할 수 있었다' },
    { id: 'moderate', label: '보통 수준이었다' },
    { id: 'little', label: '거의 체감하지 못했다' },
  ],
} as const

export const WELLNESS_CONTRIBUTION_AWARENESS = {
  eyebrow: '웰니스 지출 진단',
  title: ['각 관리가 피부 개선에 어느 정도', '기여했는지 알고 계신가요?'],
  options: [
    { id: 'well', label: '매우 잘 알고 있다' },
    { id: 'guess', label: '감과 추측으로 어느정도 알고 있다' },
    { id: 'unknown', label: '잘 모르겠다' },
  ],
} as const

export const WELLNESS_EFFECT_SCORE: Record<string, number> = {
  much: 3,
  moderate: 2,
  little: 1,
}

export const WELLNESS_CONTRIBUTION_SCORE: Record<string, number> = {
  well: 10,
  guess: 4,
  unknown: 0,
}

export type WellnessGrade = '매우 낮음' | '낮음' | '보통' | '높음'

/** [피부 개선 기여 이해도] 분류 조건: Q3 + Q4 총점 → 등급, 최종 예상 낭비율(%) */
export const WELLNESS_SCORE_TABLE: Record<
  number,
  { grade: WellnessGrade; wastePercent: number }
> = {
  13: { grade: '높음', wastePercent: 10 },
  12: { grade: '높음', wastePercent: 25 },
  11: { grade: '보통', wastePercent: 40 },
  7: { grade: '낮음', wastePercent: 30 },
  6: { grade: '낮음', wastePercent: 45 },
  5: { grade: '낮음', wastePercent: 60 },
  3: { grade: '매우 낮음', wastePercent: 50 },
  2: { grade: '매우 낮음', wastePercent: 65 },
  1: { grade: '매우 낮음', wastePercent: 80 },
}

export const WELLNESS_WASTE_REVEAL = {
  title: ['님은 그동안', '얼마나 낭비하고 있었을까요?'],
  wasteCostLabel: '예상 낭비 지출 비용',
} as const

export const WELLNESS_YEARLY_SPEND_REVEAL = {
  title: ['님은 그동안', '얼마나 낭비하고 있었을까요?'],
  wasteCostLabel: '예상 낭비 지출 비용',
  yearlySpendLabel: '최근 1년간 지출 비용',
} as const

export const WELLNESS_MONTHLY_AVG_REVEAL = {
  title: ['님은 그동안', '얼마나 낭비하고 있었을까요?'],
  wasteCostLabel: '예상 낭비 지출 비용',
  yearlySpendLabel: '최근 1년간 지출 비용',
  monthlyAvgLabel: '한 달 평균 지출 비용',
} as const

export const WELLNESS_SPEND_SUMMARY = {
  title: ['님은 그동안', '얼마나 낭비하고 있었을까요?'],
  wasteCostLabel: '예상 낭비 지출 비용',
  yearlySpendLabel: '최근 1년간 지출 비용',
  monthlyAvgLabel: '한 달 평균 지출 비용',
  gradeLabel: '피부 개선 기여 이해도',
} as const

export const WELLNESS_SAVING_INTRO = {
  title: ['이제 낭비하던 비용을', '절약해보세요!'],
} as const

export const WELLNESS_PLAN_TEASER = {
  title: ['이제 낭비하던 비용을', '절약해보세요!'],
  cardTitle: '12주 맞춤 플랜을 생성해보세요',
  cardDescription:
    '내가 실천했던 행동들의 기여도를 측정해 나에게 진짜 효과 있는 관리에만 집중할 수 있도록 도와줘요',
} as const

export const WELLNESS_PLAN_TEASER_SPEND = {
  title: ['이제 낭비하던 비용을', '절약해보세요!'],
  cardTitle: '12주 맞춤 플랜을 생성해보세요',
  cardDescription:
    '내가 실천했던 행동들의 기여도를 측정해 나에게 진짜 효과 있는 관리에만 집중할 수 있도록 도와줘요',
  yearlySpendLabel: '최근 1년간 지출 비용',
} as const

export const WELLNESS_PLAN_TEASER_EXPAND = {
  title: ['이제 낭비하던 비용을', '절약해보세요!'],
  cardTitle: '12주 맞춤 플랜을 생성해보세요',
  cardDescription:
    '내가 실천했던 행동들의 기여도를 측정해 나에게 진짜 효과 있는 관리에만 집중할 수 있도록 도와줘요',
  yearlySpendLabel: '최근 1년간 지출 비용',
} as const

export const WELLNESS_PLAN_INTRO = {
  eyebrow: '웰니스 지출 진단',
  title: ['Proof로', '낭비 지출 비용을 절약하세요'],
  planTitle: 'Proof 12주 맞춤 플랜',
  planDescription:
    "각 관리별 기여도를 측정해 나에게 '진짜' 효과 있는 관리에만 집중합니다",
  savingLabel: '예상 절약 가능 비용',
  startButtonLabel: '시작하기',
} as const

export const WELLNESS_PLAN_CTA = {
  title: ['이제 낭비하던 비용을', '절약해보세요!'],
  cardTitle: '12주 맞춤 플랜을 생성해보세요',
  cardDescription:
    '내가 실천했던 행동들의 기여도를 측정해 나에게 진짜 효과 있는 관리에만 집중할 수 있도록 도와줘요',
  yearlySpendLabel: '최근 1년간 지출 비용',
  savingLabel: '예상 절약 가능 비용',
  startButtonLabel: '시작하기',
} as const
