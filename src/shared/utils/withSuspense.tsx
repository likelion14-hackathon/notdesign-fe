import { Suspense, type ReactElement } from 'react'

export const withSuspense = (element: ReactElement) => (
  <Suspense fallback={null}>{element}</Suspense>
)
