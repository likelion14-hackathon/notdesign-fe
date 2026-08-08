import { Outlet } from 'react-router-dom'

export default function BaseLayout() {
  return (
    <div className="min-h-svh bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
      <main>
        <Outlet />
      </main>
    </div>
  )
}
