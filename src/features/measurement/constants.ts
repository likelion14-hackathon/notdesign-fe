import type {
  AgreementSection,
  MeasurementCenter,
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

export const MEASUREMENT_CENTERS: MeasurementCenter[] = [
  {
    id: 'deona-gangnam',
    name: '더나 클리닉 강남',
    address: '서울특별시 서초구 서초대로77길 17, 지하 2층',
  },
  {
    id: 'mred-cheongjin',
    name: '엠레드 안티에이징 센터',
    address: '서울특별시 강남구 삼성로731로 청진빌딩 GF, 2층, 4층',
  },
  {
    id: 'mred-eunha',
    name: '엠레드 안티에이징 센터',
    address: '서울특별시 강남구 삼성로 725, 은하빌딩 1층, 2층',
  },
  {
    id: 'wim-gangnam',
    name: '윔 센터 강남',
    address: '서울특별시 서초구 서초대로77길 17, 지하 1층',
  },
]

export const ANALYZING_METRICS = [
  { label: '색소침착', tone: 'primary' },
  { label: '수분력', tone: 'dark' },
  { label: '홍조', tone: 'dark' },
] as const

/**
 * 측정 결과 카드에 표시되는 데이터.
 * 실제 측정 결과 API가 붙기 전까지 사용하는 임시 데이터
 */
export const MEASUREMENT_RESULT = {
  name: '신석훈',
  /** "OO님을 위한 ..." 처럼 호칭에 쓰는 이름 */
  givenName: '석훈',
  measuredAt: '2026년 7월 28일 측정',
  centerName: '더나 클리닉 강남',
  metrics: [
    { label: '색소침착', percentage: 62, status: '개선 필요', tone: 'primary' },
    { label: '수분력', percentage: 55, status: '보통', tone: 'dark' },
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
  { label: '수분력', score: 55, status: '보통', emphasized: false },
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
