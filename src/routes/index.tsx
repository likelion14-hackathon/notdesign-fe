import { createBrowserRouter } from 'react-router-dom'
import App from '@/App'
import NotFoundPage from '@/shared/components/NotFoundPage'
import { PATHS } from '@/routes/paths'

export const router = createBrowserRouter([
  {
    path: PATHS.home,
    element: <App />,
    children: [
      {
        index: true,
        element: (
          <section className="mx-auto flex max-w-2xl flex-col items-center gap-4 py-24 text-center">
            <h1 className="text-3xl font-semibold tracking-tight">
              notdesign-fe
            </h1>
            <p className="text-neutral-500 dark:text-neutral-400">
              기능별 아키텍처 세팅 완료. <code>src/features/</code>부터
              시작하세요.
            </p>
          </section>
        ),
      },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
