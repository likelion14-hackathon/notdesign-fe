import { useNavigate } from 'react-router-dom'
import CycleProgressCard from '@/features/home/components/CycleProgressCard'
import ImportPromptCard from '@/features/home/components/ImportPromptCard'
import ReportLinkCard from '@/features/home/components/ReportLinkCard'
import TodayActionCard from '@/features/home/components/TodayActionCard'
import { HOME_SUMMARY } from '@/features/home/constants'
import { useCurrentPlanSummary } from '@/features/home/hooks/useCurrentPlanSummary'
import { useAuthStore } from '@/features/auth/store'
import { ApiError } from '@/shared/api/apiError'
import BottomBar from '@/shared/components/BottomBar'
import type { NavTabId } from '@/shared/components/BottomNav'
import BottomNav from '@/shared/components/BottomNav'
import Logo from '@/shared/components/Logo'

export default function HomePage() {
  const navigate = useNavigate()
  const userName = useAuthStore((state) => state.name)
  const { data: planSummary, error: planSummaryError } = useCurrentPlanSummary()

  const handleSelectTab = (id: NavTabId) => {
    if (id === 'plan') navigate('/plan')
    if (id === 'info') navigate('/my')
    if (id === 'record') navigate('/diary')
  }

  return (
    <div className="bg-off-white pb-bottom-bar min-h-screen-safe mx-auto w-full max-w-103.5">
      <Logo />

      <div className="px-5">
        <p className="text-text-secondary text-[15px] leading-4.5 font-semibold tracking-[-0.3px]">
          안녕하세요, {userName ?? HOME_SUMMARY.userName}님!
        </p>
        <h1 className="text-text-primary mt-2.5 text-[26px] leading-10 font-semibold tracking-[-0.52px] break-keep">
          {HOME_SUMMARY.headline}
        </h1>

        <div className="mt-7.5 flex flex-col gap-4.25">
          <TodayActionCard />
          <ReportLinkCard />

          {planSummary && <CycleProgressCard summary={planSummary} />}

          {planSummary === null && (
            <p className="text-text-secondary px-1 text-[14px] font-medium break-keep">
              진행 중인 플랜이 없어요. 플랜을 시작해보세요!
            </p>
          )}

          {planSummaryError && (
            <p className="text-highlight px-1 text-[13px] font-semibold break-keep">
              {planSummaryError instanceof ApiError
                ? planSummaryError.message
                : '플랜 진행 정보를 불러오지 못했어요.'}
            </p>
          )}

          <ImportPromptCard />
        </div>
      </div>

      <BottomBar>
        <BottomNav current="home" onSelect={handleSelectTab} />
      </BottomBar>
    </div>
  )
}
