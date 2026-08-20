import { Outlet } from 'react-router-dom'
import ScrollToTop from '@/shared/components/ScrollToTop'

export default function BaseLayout() {
  return (
    <div className="bg-off-white text-text-primary min-h-screen-safe">
      <ScrollToTop />
      <main>
        <Outlet />
      </main>
    </div>
  )
}
