import type { MyNotificationSetting, MyScoreMetric } from '@/features/my/types'

/**
 * 정보(마이) 화면 데이터.
 * 실제 API가 붙기 전까지 사용하는 임시 데이터
 */
export const MY_PROFILE = {
  name: '신석훈',
  email: 'seokhoon2@gmail.com',
} as const

export const MY_CURRENT_PLAN = {
  weekLabel: '4주차',
  percentage: 42,
  startWeekLabel: '0주',
  midWeekLabel: '6주',
  endWeekLabel: '12주',
} as const

export const MY_SCORE_METRICS: MyScoreMetric[] = [
  { label: '색소침착', score: 62, status: '매우 낮음' },
  { label: '모공', score: 55, status: '보통' },
  { label: '홍조', score: 41, status: '보통' },
]

export const MY_STATS = {
  recordDays: { label: '기록', value: '41일' },
  averageRate: { label: '평균 실행률', value: '68%' },
} as const

export const MY_PLAN_MENU_ITEMS = [
  { title: '내 플랜 항목 관리', description: '내 플랜에 속한 항목을 관리해요' },
  { title: '완료한 플랜', description: '완료한 사이클 0개' },
] as const

export const MY_NOTIFICATION_SETTINGS: MyNotificationSetting[] = [
  {
    id: 'daily-record',
    title: '오늘의 기록 알림',
    description: '오후 10시 알림, 미기록 시 1회 재알림',
  },
  {
    id: 'measurement-day',
    title: '측정일 알림',
    description: '측정 3일 전 알림',
  },
  {
    id: 'report',
    title: '리포트 알림',
    description: '분석 리포트 도착 시 알림',
  },
]

export const MY_ACCOUNT_MENU_ITEMS = [
  { title: '계정 정보 및 로그인 수단' },
  { title: '이용약관, 개인정보 처리방침' },
  { title: '로그아웃', highlighted: true },
] as const
