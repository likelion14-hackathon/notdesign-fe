import { useNavigate } from 'react-router-dom'
import PlanCostCards from '@/features/measurement/components/PlanCostCards'
import PlanDetailSection from '@/features/measurement/components/PlanDetailSection'
import PlanScoreCards from '@/features/measurement/components/PlanScoreCards'
import PlanTimelineSection from '@/features/measurement/components/PlanTimelineSection'
import {
  PLAN_TAB_COST_SUMMARY,
  PLAN_TAB_TITLE,
} from '@/features/plan/constants'
import type { NavTabId } from '@/shared/components/BottomNav'
import BottomNav from '@/shared/components/BottomNav'
import Logo from '@/shared/components/Logo'

export default function PlanPage() {
  const navigate = useNavigate()

  const handleSelectTab = (id: NavTabId) => {
    if (id === 'home') navigate('/')
    if (id === 'info') navigate('/my')
    // record는 아직 구현된 화면이 없어 선택만 되고 이동하지 않음
  }

  return (
    <div className="bg-off-white mx-auto flex h-svh w-full max-w-103.5 flex-col">
      <Logo />

      <div className="min-h-0 flex-1 overflow-y-auto pb-8.75">
        <div className="px-5 pt-7.5">
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

      <div className="shrink-0 px-5 pb-[calc(35px+env(safe-area-inset-bottom))]">
        <BottomNav current="plan" onSelect={handleSelectTab} />
      </div>
    </div>
  )
}
