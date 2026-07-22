import { Outlet } from 'react-router-dom'

export default function App() {
  return (
    <div className="min-h-svh bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
      <main className="px-4">
        <Outlet />
      </main>
    </div>
  )
}
