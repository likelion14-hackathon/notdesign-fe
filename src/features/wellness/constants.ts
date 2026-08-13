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

export const WELLNESS_RESULT_CONTENT: Record<
  WellnessGrade,
  { diagnosis: string; wasteTemplate: string }
> = {
  '매우 낮음': {
    diagnosis:
      '피부 개선은 어느 정도 체감하고 있지만, 어떤 관리 덕분인지 피부 개선 기여도를 파악하고 이해하는 정도는 매우 낮음입니다.',
    wasteTemplate:
      '피부 개선 기여 이해도가 매우 낮은 채 소비하는 현재, 총 지출의 {percent}%인 약 {amount}이 효과 없는 곳에 낭비되고 있을 확률이 높습니다.',
  },
  낮음: {
    diagnosis:
      '피부 관리를 꾸준히 진행 중이지만, 어떤 관리 덕분에 좋아졌는지 판단하는 기준이 감과 추측에 머물러 있어 기여 이해도는 낮음 수준입니다.',
    wasteTemplate:
      '주관적인 추측으로 관리를 계속할 경우, 나에게 실제 효과가 적은 관리에 총 지출의 {percent}%인 약 {amount}이 불필요하게 새어나가고 있을 확률이 높습니다.',
  },
  보통: {
    diagnosis:
      '나름의 기준을 갖고 관리하고 있지만, 여러 관리가 동시에 진행될 때 각각의 정확한 피부 개선 기여도를 수치로 분리해서 파악하기는 어려운 상태입니다.',
    wasteTemplate:
      '효과가 둔화된 관리를 습관적으로 유지하거나 과중복된 루틴을 방치할 경우, 총 지출의 {percent}%인 {amount}의 예산이 비효율적으로 활용될 수 있습니다.',
  },
  높음: {
    diagnosis:
      '본인에게 맞는 관리를 정확히 알고 있지만, 최적의 주기나 시술 간의 시너지 횟수까지 수치화하여 계산하고 있지는 않을 확률이 높습니다.',
    wasteTemplate:
      '이미 훌륭한 루틴이지만 피부 상태에 맞춘 유동적인 조절없이 고정적으로 소비하는 경우, 총 지출의 {percent}%인 약 {amount}이 오버스펙으로 지출되고 있을 수 있습니다.',
  },
}

export const WELLNESS_RESULT = {
  eyebrow: '웰니스 지출 진단',
  title: '진단 결과를 확인해보세요',
  yearlySpendLabel: '최근 1년간 지출 비용',
  monthlyAvgLabel: '한 달 평균 지출 비용',
  gradeLabel: '피부 개선 기여 이해도',
  wasteCostLabel: '예상 낭비 지출 비용',
  diagnosisSectionLabel: '문제 진단',
  wasteSectionLabel: '낭비 지출 비용',
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
