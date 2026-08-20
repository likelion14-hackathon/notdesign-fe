import { Outlet } from 'react-router-dom'
import ScrollToTop from '@/shared/components/ScrollToTop'
import ScrollLock from '@/shared/components/ScrollLock'
import { useSyncUserInfo } from '@/features/user/useSyncUserInfo'

export default function BaseLayout() {
  useSyncUserInfo()

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
