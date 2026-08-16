import { lazy } from 'react'
import type { RouteObject } from 'react-router-dom'
import { withSuspense } from '@/shared/utils/withSuspense'

const TrialIntro = lazy(() => import('@/features/trial/pages/trial_Intro'))
const TrialCapture = lazy(() => import('@/features/trial/pages/trial_Capture'))
const TrialCaptureComplete = lazy(
  () => import('@/features/trial/pages/trial_CaptureComplete'),
)
const TrialAnalyzeInProgress = lazy(
  () => import('@/features/trial/pages/trial_AnalyzeInProgress'),
)
const TrialAnalyzeComplete = lazy(
  () => import('@/features/trial/pages/trial_AnalyzeComplete'),
)
const TrialRequest = lazy(() => import('@/features/trial/pages/trial_Request'))

export const TrialRoutes: RouteObject[] = [
  {
    index: true,
    element: withSuspense(<TrialIntro />),
    handle: { title: '체험' },
  },
  {
    path: 'capture',
    element: withSuspense(<TrialCapture />),
    handle: { title: '촬영' },
  },
  {
    path: 'capture/complete',
    element: withSuspense(<TrialCaptureComplete />),
    handle: { title: '촬영 완료' },
  },
  {
    path: 'analyze',
    element: withSuspense(<TrialAnalyzeInProgress />),
    handle: { title: '분석 중' },
  },
  {
    path: 'analyze/complete',
    element: withSuspense(<TrialAnalyzeComplete />),
    handle: { title: '분석 완료' },
  },
  {
    path: 'request',
    element: withSuspense(<TrialRequest />),
    handle: { title: '플랜 요청' },
  },
]
