import type {
  AgreementSection,
  PlanCategory,
  PlanDetailItem,
  PlanScoreMetric,
  PlanTimelineRow,
} from '@/features/measurement/types'

export const PLAN_CATEGORY_TAG: Record<
  PlanCategory,
  { label: string; colorClass: string }
> = {
  procedure: { label: '시술', colorClass: 'bg-primary' },
  lifestyle: { label: '생활 습관', colorClass: 'bg-tag-lifestyle' },
  homecare: { label: '홈케어', colorClass: 'bg-tag-homecare' },
  supplement: { label: '영양제', colorClass: 'bg-tag-supplement' },
}

export const ANALYZING_METRICS = [
  { label: '색소침착', tone: 'primary' },
  { label: '모공', tone: 'dark' },
  { label: '홍조', tone: 'dark' },
] as const

/**
 * 측정 결과 카드에 표시되는 데이터.
 * 실제 측정 결과 API가 붙기 전까지 사용하는 임시 데이터
 */
export const MEASUREMENT_RESULT = {
  measuredAt: '2026년 7월 28일 측정',
  centerName: '더나 클리닉 강남',
  metrics: [
    { label: '색소침착', percentage: 62, status: '개선 필요', tone: 'primary' },
    { label: '모공', percentage: 55, status: '보통', tone: 'dark' },
    { label: '홍조', percentage: 41, status: '보통', tone: 'dark' },
  ],
  insight:
    '색소침착 지표가 세 항목 중 가장 낮은 상태예요. 12주 플랜을 구성할 때에는 이 지표를 1순위로 구성할 예정이에요!',
} as const

/**
 * 12주 플랜 결과 화면 데이터.
 * 실제 플랜 생성 API가 붙기 전까지 사용하는 임시 데이터
 */
export const PLAN_RESULT_TITLE = [
  '색소 개선을 1순위로,',
  '수면 부족을 함께 개선해요',
]

export const PLAN_SCORE_METRICS: PlanScoreMetric[] = [
  { label: '색소침착', score: 62, status: '매우 낮음', emphasized: true },
  { label: '모공', score: 55, status: '보통', emphasized: false },
  { label: '홍조', score: 41, status: '보통', emphasized: false },
]

export const PLAN_COST_SUMMARY = {
  total: { label: '총 금액 (12주)', amount: '60.8만원' },
  monthly: { label: '1달 예상 금액', amount: '20.3만원' },
} as const

export const PLAN_TIMELINE_WEEK_MARKERS = ['1주', '4주', '8주', '12주']

export const PLAN_TIMELINE_ROWS: PlanTimelineRow[] = [
  {
    category: 'procedure',
    label: '시술',
    activeWeeks: [
      true,
      false,
      false,
      true,
      false,
      false,
      false,
      true,
      false,
      false,
      false,
      false,
    ],
  },
  {
    category: 'lifestyle',
    label: '생활 습관',
    activeWeeks: Array<boolean>(12).fill(true),
  },
  {
    category: 'homecare',
    label: '홈케어',
    activeWeeks: [
      false,
      false,
      false,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
    ],
  },
  {
    category: 'supplement',
    label: '영양제',
    activeWeeks: [
      false,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
    ],
  },
]

export const PLAN_TIMELINE_INSIGHT =
  '색소침착 개선을 1순위로 생각했어요. 12주 뒤 무엇이 효과였는지 구분할 수 있도록 시작 시점을 서로 다르게 배치했어요.'

export const PLAN_DETAIL_ITEMS: PlanDetailItem[] = [
  {
    weekLabel: '1주차 시작',
    category: 'procedure',
    name: '레이저 토닝',
    frequency: '4주 간격 3회',
    price: '18만원',
    description: '색소 지표가 가장 낮아 우선적으로 배치됐어요',
  },
  {
    weekLabel: '1주차 시작',
    category: 'lifestyle',
    name: '수면 6.5시간',
    frequency: '매일',
    price: '비용 없음',
    description: '현재 평균 5.5시간의 수면을 하고 있고, 홍조에 영향이 예상돼요',
  },
  {
    weekLabel: '4주차 시작',
    category: 'homecare',
    name: 'Pith 브라이트닝 세럼',
    frequency: '4주차부터 매일',
    price: '6.8만원',
    description: '시술과 구분될 수 있도록 4주차부터 시작해요',
  },
  {
    weekLabel: '2주차 시작',
    category: 'supplement',
    name: '영양제',
    frequency: '2주차부터 매일',
    price: '3.5만원',
    description: '시술 직후 회복 구간을 피하기 위해 2주차부터 시작해요',
  },
]

export const MEASUREMENT_AGREEMENT_TITLE =
  '측정 데이터 조회 및 분석 이용 동의서 (필수)'

export const MEASUREMENT_AGREEMENT_SECTIONS: AgreementSection[] = [
  {
    heading: '제1조 (수집 및 이용 목적)',
    paragraphs: ['회사는 수집된 측정 데이터를 다음의 목적을 위해 활용합니다.'],
    items: [
      '사용자 맞춤형 데이터 분석 및 서비스 결과 제공',
      '서비스 품질 개선, 오류 진단 및 통계 분석',
    ],
  },
  {
    heading: '제2조 (수집하는 측정 데이터 항목)',
    items: [
      '서비스 이용 중 기기 또는 센서를 통해 측정·생성되는 데이터 (예: 측정 수치, 측정 일시, 기기 식별 정보)',
      '데이터 전송 및 조회에 따른 서비스 이용 로그',
    ],
  },
  {
    heading: '제3조 (보유 및 이용 기간)',
    items: [
      '서비스 이용 기간 동안 보유 및 이용하며, 회원 탈퇴 또는 동의 철회 시 지체 없이 파기합니다.',
      '단, 관계 법령의 규정에 따라 보존할 필요가 있는 경우 해당 법령에서 정한 기간 동안 보관합니다.',
    ],
  },
  {
    heading: '제4조 (동의 거부 권리 및 불이익 안내)',
    items: [
      '귀하는 본 측정 데이터 조회 및 분석 이용 동의를 거부할 권리가 있습니다.',
      '단, 본 동의는 서비스 제공을 위한 필수 항목으로, 동의를 거부하실 경우 해당 측정 및 분석 서비스 이용이 제한됩니다.',
    ],
  },
]

/**
 * 6주차 중간 리포트 화면 데이터.
 * 실제 리포트 생성 API가 붙기 전까지 사용하는 임시 데이터
 */
export const WEEK_REPORT_TITLE = [
  '6주차 중간 측정 결과',
  '어떤 노력이 빛났을까요?',
]

export const WEEK_REPORT_CONTRIBUTION_TITLE = '어떤 노력이 기여했을까요?'

export const WEEK_REPORT_COST_TITLE = '1점 개선에 든 비용'

export const WEEK_REPORT_EXPERIMENT_NOTICE = {
  title: '실험에 참여하기',
  description:
    '영양제 복용을 1-4주차는 중단하고 5주차부터 다시 시작하는건 어떨까요? 중간 측정 이전까지는 영양제 복용 중단 구간이 3주뿐이라 확정할 수 없었어요. 다음 6주 동안은 명확하게 다른 행동과 구분하는 것을 추천해요.',
}

export const WEEK_REPORT_ACTIONS = {
  pillLabel: '새 플랜을 생성하면 실험에 참여하게 돼요',
  keepPlanLabel: '기존 플랜 유지',
  newPlanLabel: '새 플랜 시작',
} as const

/**
 * 12주 최종 리포트 화면 데이터.
 * 실제 리포트 생성 API가 붙기 전까지 사용하는 임시 데이터
 */
export const FINAL_REPORT_EYEBROW = '12주 결과 리포트'
export const FINAL_REPORT_TITLE = '12주간의 변화를 확인해보세요'

export const FINAL_REPORT_TIMELINE_TITLE = '12주 동안 어떻게 실천했을까요?'

export const FINAL_REPORT_CONTRIBUTION_TITLE = '어떤 노력이 기여했을까요?'

export const FINAL_REPORT_COST_TITLE = '1점 개선에 든 비용'

export const FINAL_REPORT_NEXT_PLAN = {
  title: '다음 12주 플랜 제안',
  description:
    '이번 12주에서 효과가 컸던 건 레이저 토닝과 수면 개선이였어요. 반응이 약했던 항목은 Pith 세럼과 영양제였어요. 그렇기 때문에 다음 플랜에서는 이 둘을 줄이고 핵심 루틴에 예산을 더 집중합니다.',
} as const

export const FINAL_REPORT_ACTIONS = {
  pillLabel: '다음 12주 예상 비용 49.7만원 (11.1만원 ↓)',
  startButtonLabel: '다음 12주 플랜 시작하기',
} as const
