/**
 * 플랜 탭 화면 데이터.
 * 실제 API가 붙기 전까지 사용하는 임시 데이터
 *
 * 점수·타임라인·상세 항목은 measurement 플로우의 플랜 결과 화면과 동일한 상수를 재사용하고, 이 화면에서만 다른 값(비용)만 여기에 둠
 */
export const PLAN_TAB_TITLE = [
  '색소 개선을 1순위로,',
  '수면 부족을 함께 개선해요',
]

export const PLAN_TAB_COST_SUMMARY = {
  total: { label: '총 금액 (12주)', amount: '64.3만원' },
  monthly: { label: '1달 예상 금액', amount: '21.4만원' },
} as const

/** 월 예산 입력 UI가 아직 없어서 임시로 쓰는 기본값(원) */
export const DEFAULT_MONTHLY_BUDGET = 300_000

/**
 * TRIAL(일주일 체험) 플랜 타임라인 표시용 칸 수.
 * 서버의 durationWeeks는 TRIAL이면 "1주"라는 뜻으로 1을 내려줘서 그대로 쓰면 막대가 1칸이 되므로,
 * 실제 화면에는 일(day) 단위 7칸으로 나눠 보여준다.
 */
export const TRIAL_TIMELINE_DAYS = 7
