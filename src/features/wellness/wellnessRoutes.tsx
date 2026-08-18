import { lazy } from 'react'
import type { RouteObject } from 'react-router-dom'
import { withSuspense } from '@/shared/utils/withSuspense'

const WellnessIntroPage = lazy(
  () => import('@/features/wellness/pages/WellnessIntroPage'),
)
const WellnessProcedureCostPage = lazy(
  () => import('@/features/wellness/pages/WellnessProcedureCostPage'),
)
const WellnessSkincareCostPage = lazy(
  () => import('@/features/wellness/pages/WellnessSkincareCostPage'),
)
const WellnessEffectPerceptionPage = lazy(
  () => import('@/features/wellness/pages/WellnessEffectPerceptionPage'),
)
const WellnessContributionAwarenessPage = lazy(
  () => import('@/features/wellness/pages/WellnessContributionAwarenessPage'),
)
const WellnessWasteRevealPage = lazy(
  () => import('@/features/wellness/pages/WellnessWasteRevealPage'),
)
const WellnessYearlySpendRevealPage = lazy(
  () => import('@/features/wellness/pages/WellnessYearlySpendRevealPage'),
)
const WellnessMonthlyAvgRevealPage = lazy(
  () => import('@/features/wellness/pages/WellnessMonthlyAvgRevealPage'),
)
const WellnessSpendSummaryPage = lazy(
  () => import('@/features/wellness/pages/WellnessSpendSummaryPage'),
)
const WellnessSavingIntroPage = lazy(
  () => import('@/features/wellness/pages/WellnessSavingIntroPage'),
)
const WellnessPlanTeaserPage = lazy(
  () => import('@/features/wellness/pages/WellnessPlanTeaserPage'),
)
const WellnessPlanTeaserSpendPage = lazy(
  () => import('@/features/wellness/pages/WellnessPlanTeaserSpendPage'),
)
const WellnessPlanTeaserExpandPage = lazy(
  () => import('@/features/wellness/pages/WellnessPlanTeaserExpandPage'),
)
const WellnessPlanCtaPage = lazy(
  () => import('@/features/wellness/pages/WellnessPlanCtaPage'),
)

export const WellnessRoutes: RouteObject[] = [
  {
    index: true,
    element: withSuspense(<WellnessIntroPage />),
    handle: { title: '웰니스 지출 진단' },
  },
  {
    path: 'procedure-cost',
    element: withSuspense(<WellnessProcedureCostPage />),
    handle: { title: '시술 비용 입력' },
  },
  {
    path: 'skincare-cost',
    element: withSuspense(<WellnessSkincareCostPage />),
    handle: { title: '스킨케어 비용 입력' },
  },
  {
    path: 'effect-perception',
    element: withSuspense(<WellnessEffectPerceptionPage />),
    handle: { title: '효과 체감도' },
  },
  {
    path: 'contribution-awareness',
    element: withSuspense(<WellnessContributionAwarenessPage />),
    handle: { title: '기여도 인지 여부' },
  },
  {
    path: 'waste-reveal',
    element: withSuspense(<WellnessWasteRevealPage />),
    handle: { title: '낭비 비용 공개' },
  },
  {
    path: 'yearly-spend-reveal',
    element: withSuspense(<WellnessYearlySpendRevealPage />),
    handle: { title: '연간 지출 비용 공개' },
  },
  {
    path: 'monthly-avg-reveal',
    element: withSuspense(<WellnessMonthlyAvgRevealPage />),
    handle: { title: '한 달 평균 지출 비용 공개' },
  },
  {
    path: 'spend-summary',
    element: withSuspense(<WellnessSpendSummaryPage />),
    handle: { title: '지출 요약' },
  },
  {
    path: 'saving-intro',
    element: withSuspense(<WellnessSavingIntroPage />),
    handle: { title: '절약 안내' },
  },
  {
    path: 'plan-teaser',
    element: withSuspense(<WellnessPlanTeaserPage />),
    handle: { title: '플랜 티저' },
  },
  {
    path: 'plan-teaser-spend',
    element: withSuspense(<WellnessPlanTeaserSpendPage />),
    handle: { title: '플랜 티저 + 연간 지출 비용' },
  },
  {
    path: 'plan-teaser-expand',
    element: withSuspense(<WellnessPlanTeaserExpandPage />),
    handle: { title: '플랜 티저 확장' },
  },
  {
    path: 'plan-cta',
    element: withSuspense(<WellnessPlanCtaPage />),
    handle: { title: '플랜 시작 CTA' },
  },
]
