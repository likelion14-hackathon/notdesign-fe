import { Outlet } from 'react-router-dom'

export default function BaseLayout() {
  return (
    <div className="bg-off-white text-text-primary min-h-screen-safe">
      <main>
        <Outlet />
      </main>
    </div>
  )
}
