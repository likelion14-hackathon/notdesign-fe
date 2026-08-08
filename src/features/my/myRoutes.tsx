import { lazy } from 'react'
import type { RouteObject } from 'react-router-dom'
import { withSuspense } from '@/shared/utils/withSuspense'

const MyPage = lazy(() => import('@/features/my/pages/MyPage'))

/** /my 라우트 */
export const MyRoutes: RouteObject[] = [
  {
    index: true,
    element: withSuspense(<MyPage />),
    handle: { title: '정보' },
  },
]
