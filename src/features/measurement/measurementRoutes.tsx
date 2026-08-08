import { lazy } from 'react'
import type { RouteObject } from 'react-router-dom'
import { withSuspense } from '@/shared/utils/withSuspense'

const CenterSelectPage = lazy(
  () => import('@/features/measurement/pages/CenterSelectPage'),
)
const DataAgreementPage = lazy(
  () => import('@/features/measurement/pages/DataAgreementPage'),
)
const ImportProcessingPage = lazy(
  () => import('@/features/measurement/pages/ImportProcessingPage'),
)
const MeasurementResultPage = lazy(
  () => import('@/features/measurement/pages/MeasurementResultPage'),
)
const PlanCreationRequestPage = lazy(
  () => import('@/features/measurement/pages/PlanCreationRequestPage'),
)
const PlanGeneratingPage = lazy(
  () => import('@/features/measurement/pages/PlanGeneratingPage'),
)
const PlanResultPage = lazy(
  () => import('@/features/measurement/pages/PlanResultPage'),
)

export const MeasurementRoutes: RouteObject[] = [
  {
    path: 'center-select',
    element: withSuspense(<CenterSelectPage />),
    handle: { title: '센터 선택' },
  },
  {
    path: 'agreement',
    element: withSuspense(<DataAgreementPage />),
    handle: { title: '측정 데이터 이용 동의' },
  },
  {
    path: 'processing',
    element: withSuspense(<ImportProcessingPage />),
    handle: { title: '측정 데이터 불러오는 중' },
  },
  {
    path: 'result',
    element: withSuspense(<MeasurementResultPage />),
    handle: { title: '측정 결과' },
  },
  {
    path: 'plan-request',
    element: withSuspense(<PlanCreationRequestPage />),
    handle: { title: '12주 플랜 만들기' },
  },
  {
    path: 'plan-generating',
    element: withSuspense(<PlanGeneratingPage />),
    handle: { title: '12주 플랜 생성 중' },
  },
  {
    path: 'plan-result',
    element: withSuspense(<PlanResultPage />),
    handle: { title: '12주 플랜 결과' },
  },
]
