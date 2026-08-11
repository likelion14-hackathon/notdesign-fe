import { lazy } from 'react'
import type { RouteObject } from 'react-router-dom'
import { withSuspense } from '@/shared/utils/withSuspense'

const HomePage = lazy(() => import('@/features/home/pages/HomePage'))

export const HomeRoutes: RouteObject[] = [
  {
    index: true,
    element: withSuspense(<HomePage />),
    handle: { title: '홈' },
  },
]
