import { lazy } from 'react'
import { Navigate } from 'react-router-dom'
import type { RouteObject } from 'react-router-dom'
import { withSuspense } from '@/shared/utils/withSuspense'
import { useAuthStore } from '@/features/auth/store'

const HomePage = lazy(() => import('@/features/home/pages/HomePage'))

function HomeGate() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  if (!isAuthenticated) return <Navigate to="/onboard" replace />
  return <HomePage />
}

export const HomeRoutes: RouteObject[] = [
  {
    index: true,
    element: withSuspense(<HomeGate />),
    handle: { title: '홈' },
  },
]
