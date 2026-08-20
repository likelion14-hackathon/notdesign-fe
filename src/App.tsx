import { lazy } from 'react'
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'
import { withSuspense } from '@/shared/utils/withSuspense'
import { HomeRoutes } from '@/features/home/homeRoutes'
import { DiaryRoutes } from '@/features/diary/pages/diaryRoutes'
import { MeasurementRoutes } from '@/features/measurement/measurementRoutes'
import { MyRoutes } from '@/features/my/myRoutes'
import { PlanRoutes } from '@/features/plan/planRoutes'
import { OnboardRoutes } from '@/features/onboard/pages/onboardRoutes'
import { TrialRoutes } from '@/features/trial/pages/trialRoutes'
import { WellnessRoutes } from '@/features/wellness/wellnessRoutes'
import BaseLayout from '@/shared/layouts/BaseLayout'

const NotFoundPage = lazy(() => import('@/shared/pages/NotFoundPage'))
const DevLinksPage = lazy(() => import('@/shared/pages/DevLinksPage'))

const isLocalhost =
  window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'

function DevLinksGate() {
  if (!isLocalhost) return <Navigate to="/" replace />
  return <DevLinksPage />
}

const router = createBrowserRouter([
  {
    path: '/__dev',
    element: withSuspense(<DevLinksGate />),
    handle: { title: '개발용 링크' },
  },
  {
    path: '/',
    element: <BaseLayout />,
    children: HomeRoutes,
  },
  {
    path: '/plan',
    element: <BaseLayout />,
    children: PlanRoutes,
  },
  {
    path: '/my',
    element: <BaseLayout />,
    children: MyRoutes,
  },
  {
    path: '/measurement',
    element: <BaseLayout />,
    children: [
      { index: true, element: <Navigate to="center-select" replace /> },
      ...MeasurementRoutes,
    ],
  },
  {
    path: '/onboard',
    element: <BaseLayout />,
    children: OnboardRoutes,
  },
  {
    path: '/trial',
    element: <BaseLayout />,
    children: TrialRoutes,
  },
  {

    path: '/diary',
    element: <BaseLayout />,
    children: DiaryRoutes,
  },
  {
    path: '/wellness',
    element: <BaseLayout />,
    children: WellnessRoutes,
  },

  {
    path: '*',
    element: withSuspense(<NotFoundPage />),
    handle: { title: 'Not Found' },
  },
])

export default function App() {
  return <RouterProvider router={router} />
}