import { useNavigate } from 'react-router-dom'
import CycleProgressCard from '@/features/home/components/CycleProgressCard'
import ImportPromptCard from '@/features/home/components/ImportPromptCard'
import ReportLinkCard from '@/features/home/components/ReportLinkCard'
import TodayActionCard from '@/features/home/components/TodayActionCard'
import { HOME_SUMMARY } from '@/features/home/constants'
import type { NavTabId } from '@/shared/components/BottomNav'
import BottomNav from '@/shared/components/BottomNav'
import Logo from '@/shared/components/Logo'

export default function HomePage() {
  const navigate = useNavigate()

  const handleSelectTab = (id: NavTabId) => {
    if (id === 'plan') navigate('/plan')
    if (id === 'info') navigate('/my')
    if (id === 'record') navigate('/diary')
  }

  return (
    <div className="bg-off-white mx-auto flex h-svh w-full max-w-103.5 flex-col">
      <Logo />

      <div className="min-h-0 flex-1 overflow-y-auto px-5 pt-7.5 pb-8.75">
        <p className="text-text-secondary text-[15px] leading-4.5 font-semibold tracking-[-0.3px]">
          안녕하세요, {HOME_SUMMARY.userName}님!
        </p>
        <h1 className="text-text-primary mt-2.5 text-[26px] leading-10 font-semibold tracking-[-0.52px] break-keep">
          {HOME_SUMMARY.headline}
        </h1>

        <div className="mt-7.5 flex flex-col gap-4.25">
          <TodayActionCard />
          <ReportLinkCard />
          <CycleProgressCard />
          <ImportPromptCard />
        </div>
      </div>

      <div className="shrink-0 px-5 pb-[calc(35px+env(safe-area-inset-bottom))]">
        <BottomNav current="home" onSelect={handleSelectTab} />
      </div>
    </div>
  )
}
