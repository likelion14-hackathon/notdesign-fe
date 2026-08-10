import { lazy } from 'react'
import type { RouteObject } from 'react-router-dom'
import { withSuspense } from '@/shared/utils/withSuspense'

const PlanPage = lazy(() => import('@/features/plan/pages/PlanPage'))

export const PlanRoutes: RouteObject[] = [
  {
    index: true,
    element: withSuspense(<PlanPage />),
    handle: { title: '플랜' },
  },
]
