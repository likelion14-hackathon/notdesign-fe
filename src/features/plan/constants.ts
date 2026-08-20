/** 월 예산 입력 UI가 아직 없어서 임시로 쓰는 기본값(원) */
export const DEFAULT_MONTHLY_BUDGET = 300_000

export const PLAN_STARTED_TOAST = '새로운 플랜이 시작되었어요'

/**
 * TRIAL(일주일 체험) 플랜 타임라인 표시용 칸 수.
 * 서버의 durationWeeks는 TRIAL이면 "1주"라는 뜻으로 1을 내려줘서 그대로 쓰면 막대가 1칸이 되므로,
 * 실제 화면에는 일(day) 단위 7칸으로 나눠 보여준다.
 */
export const TRIAL_TIMELINE_DAYS = 7
