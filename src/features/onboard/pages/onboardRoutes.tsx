import { lazy } from 'react'
import type { RouteObject } from 'react-router-dom'
import { withSuspense } from '@/shared/utils/withSuspense'

const OnboardingPage = lazy(() => import('@/features/onboard/pages/onboardPage'))

export const OnboardRoutes: RouteObject[] = [
  {
    index: true,
    element: withSuspense(<OnboardingPage />),
    handle: { title: '온보딩' },
  },
]