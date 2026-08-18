import { Outlet } from 'react-router-dom'
import ScrollToTop from '@/shared/components/ScrollToTop'
import ScrollLock from '@/shared/components/ScrollLock'

export default function BaseLayout() {
  return (
    <div className="bg-off-white text-text-primary min-h-screen-safe">
      <ScrollToTop />
      <ScrollLock />
      <main>
        <Outlet />
      </main>
    </div>
  )
}
