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
const WellnessResultPage = lazy(
  () => import('@/features/wellness/pages/WellnessResultPage'),
)
const WellnessPlanIntroPage = lazy(
  () => import('@/features/wellness/pages/WellnessPlanIntroPage'),
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
    path: 'result',
    element: withSuspense(<WellnessResultPage />),
    handle: { title: '진단 결과' },
  },
  {
    path: 'plan-intro',
    element: withSuspense(<WellnessPlanIntroPage />),
    handle: { title: '플랜 안내' },
  },
]
