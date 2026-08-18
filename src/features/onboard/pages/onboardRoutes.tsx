
import { lazy } from 'react'
import type { RouteObject } from 'react-router-dom'
import { withSuspense } from '@/shared/utils/withSuspense'

const OnboardingPage = lazy(
  () => import('@/features/onboard/pages/onboardPage'),
)
const OnboardKakaoCallback = lazy(
  () => import('@/features/onboard/pages/onboardKakaoCallback'),
)

export const OnboardRoutes: RouteObject[] = [
  {
    index: true,
    element: withSuspense(<OnboardingPage />),
    handle: { title: '온보딩' },
  },
  {
    path: 'kakao/callback',
    element: withSuspense(<OnboardKakaoCallback />),
    handle: { title: '카카오 로그인 처리 중' },
  },
]
