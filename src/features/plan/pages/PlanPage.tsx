import { useNavigate } from 'react-router-dom'
import PlanCostCards from '@/features/measurement/components/PlanCostCards'
import PlanDetailSection from '@/features/measurement/components/PlanDetailSection'
import PlanScoreCards from '@/features/measurement/components/PlanScoreCards'
import PlanTimelineSection from '@/features/measurement/components/PlanTimelineSection'
import {
  PLAN_TAB_COST_SUMMARY,
  PLAN_TAB_TITLE,
} from '@/features/plan/constants'
import BottomBar from '@/shared/components/BottomBar'
import type { NavTabId } from '@/shared/components/BottomNav'
import BottomNav from '@/shared/components/BottomNav'
import Logo from '@/shared/components/Logo'

export default function PlanPage() {
  const navigate = useNavigate()

  const handleSelectTab = (id: NavTabId) => {
    if (id === 'home') navigate('/')
    if (id === 'info') navigate('/my')
    if (id === 'record') navigate('/diary')
  }

  return (
    <div className="bg-off-white pb-bottom-bar min-h-screen-safe mx-auto w-full max-w-103.5">
      <Logo />

      <div>
        <div className="px-5">
          <p className="text-text-secondary text-[15px] leading-4.5 font-semibold tracking-[-0.3px]">
            현재 진행 중인 플랜
          </p>
          <h1 className="text-text-primary mt-2.75 text-[26px] leading-10 font-semibold tracking-[-0.52px] break-keep">
            {PLAN_TAB_TITLE[0]}
            <br />
            {PLAN_TAB_TITLE[1]}
          </h1>
        </div>

        <div className="mt-7.5 flex flex-col gap-8.75">
          <div className="px-5">
            <PlanScoreCards />
          </div>
          <div className="px-5">
            <PlanCostCards summary={PLAN_TAB_COST_SUMMARY} />
          </div>
          <PlanTimelineSection insightPosition="above" />
          <PlanDetailSection />
        </div>
      </div>

      <BottomBar>
        <BottomNav current="plan" onSelect={handleSelectTab} />
      </BottomBar>
    </div>
  )
}
