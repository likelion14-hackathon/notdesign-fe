import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CurrentPlanCard from '@/features/my/components/CurrentPlanCard'
import MenuRow from '@/features/my/components/MenuRow'
import MyScoreCards from '@/features/my/components/MyScoreCards'
import MyStatCards from '@/features/my/components/MyStatCards'
import NotificationRow from '@/features/my/components/NotificationRow'
import {
  MY_ACCOUNT_MENU_ITEMS,
  MY_NOTIFICATION_SETTINGS,
  MY_PLAN_MENU_ITEMS,
  MY_PROFILE,
} from '@/features/my/constants'
import type { NavTabId } from '@/shared/components/BottomNav'
import BottomNav from '@/shared/components/BottomNav'
import Logo from '@/shared/components/Logo'

export default function MyPage() {
  const navigate = useNavigate()
  const [notificationState, setNotificationState] = useState(() =>
    Object.fromEntries(MY_NOTIFICATION_SETTINGS.map((item) => [item.id, true])),
  )

  const handleSelectTab = (id: NavTabId) => {
    if (id === 'home') navigate('/')
    if (id === 'plan') navigate('/plan')
    // record는 아직 구현된 화면이 없어 선택만 되고 이동하지 않음
  }

  return (
    <div className="bg-off-white mx-auto flex h-svh w-full max-w-103.5 flex-col">
      <Logo />

      <div className="min-h-0 flex-1 overflow-y-auto pb-8.75">
        <div className="px-5 pt-7.5">
          <h1 className="text-text-primary text-[26px] leading-10 font-semibold tracking-[-0.52px]">
            {MY_PROFILE.name}
          </h1>
          <p className="text-text-secondary mt-1 text-[14px] leading-4.5 font-semibold tracking-[-0.28px]">
            {MY_PROFILE.email}
          </p>

          <div className="mt-7.5">
            <CurrentPlanCard />
          </div>
          <div className="mt-2.5">
            <MyScoreCards />
          </div>
          <div className="mt-2.5">
            <MyStatCards />
          </div>
        </div>

        <h2 className="text-text-primary mt-7.5 px-5 text-[20px] leading-6 font-semibold tracking-[-0.4px]">
          플랜
        </h2>
        <div className="mt-2.5">
          {MY_PLAN_MENU_ITEMS.map((item) => (
            <MenuRow
              key={item.title}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>

        <h2 className="text-text-primary mt-7.5 px-5 text-[20px] leading-6 font-semibold tracking-[-0.4px]">
          알림
        </h2>
        <div className="mt-2.5">
          {MY_NOTIFICATION_SETTINGS.map((item) => (
            <NotificationRow
              key={item.id}
              title={item.title}
              description={item.description}
              checked={notificationState[item.id]}
              onChange={(checked) =>
                setNotificationState((prev) => ({
                  ...prev,
                  [item.id]: checked,
                }))
              }
            />
          ))}
        </div>

        <h2 className="text-text-primary mt-7.5 px-5 text-[20px] leading-6 font-semibold tracking-[-0.4px]">
          계정
        </h2>
        <div className="mt-2.5">
          {MY_ACCOUNT_MENU_ITEMS.map((item) => (
            <MenuRow
              key={item.title}
              title={item.title}
              highlighted={'highlighted' in item && item.highlighted}
            />
          ))}
        </div>
      </div>

      <div className="shrink-0 px-5 pb-[calc(35px+env(safe-area-inset-bottom))]">
        <BottomNav current="info" onSelect={handleSelectTab} />
      </div>
    </div>
  )
}
