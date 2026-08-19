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
import BottomBar from '@/shared/components/BottomBar'
import type { NavTabId } from '@/shared/components/BottomNav'
import BottomNav from '@/shared/components/BottomNav'
import Logo from '@/shared/components/Logo'
import { useAuthStore } from '@/features/auth/store'
import { signOut } from '@/features/auth/api'
import { useCurrentPlanStats } from '@/features/plan/hooks/useCurrentPlanStats'
import { useCurrentPlanSummary } from '@/features/home/hooks/useCurrentPlanSummary'
import { useMeasurementStore } from '@/features/measurement/store'
import { ApiError } from '@/shared/api/apiError'

export default function MyPage() {
  const navigate = useNavigate()
  const email = useAuthStore((state) => state.email)
  const name = useAuthStore((state) => state.name)
  const logout = useAuthStore((state) => state.logout)
  // 진행률 바는 홈 화면과 동일한 API(GET /api/plans/current)를 그대로 재사용한다.
  const { data: planSummary, error: planSummaryError } = useCurrentPlanSummary()
  const { data: planStats, error: planStatsError } = useCurrentPlanStats()
  const offlineResult = useMeasurementStore((state) => state.offlineResult)
  const [notificationState, setNotificationState] = useState(() =>
    Object.fromEntries(MY_NOTIFICATION_SETTINGS.map((item) => [item.id, true])),
  )

  const handleSelectTab = (id: NavTabId) => {
    if (id === 'home') navigate('/')
    if (id === 'plan') navigate('/plan')
    if (id === 'record') navigate('/diary')
  }

  const handleLogout = async () => {
    try {
      await signOut()
    } catch {
      // 서버 요청이 실패해도(토큰 만료 등) 로컬 로그아웃은 항상 진행한다.
    } finally {
      logout()
      navigate('/onboard')
    }
  }

  return (
    <div className="bg-off-white pb-bottom-bar min-h-screen-safe mx-auto w-full max-w-103.5">
      <Logo />

      <div>
        <div className="px-5">
          <h1 className="text-text-primary text-[26px] leading-10 font-semibold tracking-[-0.52px]">
            {name ?? MY_PROFILE.name}
          </h1>
          <p className="text-text-secondary mt-1 text-[14px] leading-4.5 font-semibold tracking-[-0.28px]">
            {email ?? MY_PROFILE.email}
          </p>

          {planSummary && (
            <div className="mt-7.5">
              <CurrentPlanCard progress={planSummary} />
            </div>
          )}

          {planSummary === null && (
            <p className="text-text-secondary mt-7.5 text-[14px] font-medium break-keep">
              진행 중인 플랜이 없어요.
            </p>
          )}

          {planSummaryError && (
            <p className="text-highlight mt-7.5 text-[13px] font-semibold break-keep">
              {planSummaryError instanceof ApiError
                ? planSummaryError.message
                : '플랜 진행 정보를 불러오지 못했어요.'}
            </p>
          )}

          <div className="mt-2.5">
            <MyScoreCards
              scores={
                offlineResult
                  ? {
                      pigmentation: offlineResult.pigmentation,
                      pores: offlineResult.pores,
                      erythema: offlineResult.erythema,
                    }
                  : undefined
              }
            />
          </div>

          {planStats && (
            <div className="mt-2.5">
              <MyStatCards stats={planStats} />
            </div>
          )}

          {planStatsError && (
            <p className="text-highlight mt-2.5 text-[13px] font-semibold break-keep">
              {planStatsError instanceof ApiError
                ? planStatsError.message
                : '플랜 기록 통계를 불러오지 못했어요.'}
            </p>
          )}
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
              onClick={item.title === '로그아웃' ? handleLogout : undefined}
            />
          ))}
        </div>
      </div>

      <BottomBar>
        <BottomNav current="info" onSelect={handleSelectTab} />
      </BottomBar>
    </div>
  )
}
