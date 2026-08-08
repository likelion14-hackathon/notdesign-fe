import { lazy } from 'react'
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'
import { HomeRoutes } from '@/features/home/homeRoutes'
import { MeasurementRoutes } from '@/features/measurement/measurementRoutes'
import { MyRoutes } from '@/features/my/myRoutes'
import BaseLayout from '@/shared/layouts/BaseLayout'
import { withSuspense } from '@/shared/utils/withSuspense'

const NotFoundPage = lazy(() => import('@/shared/pages/NotFoundPage'))

const router = createBrowserRouter([
  {
    path: '/',
    element: <BaseLayout />,
    children: HomeRoutes,
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
    path: '*',
    element: withSuspense(<NotFoundPage />),
    handle: { title: 'Not Found' },
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
