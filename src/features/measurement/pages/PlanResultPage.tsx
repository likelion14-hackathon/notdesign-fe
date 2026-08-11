import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FlowHeader from '@/features/measurement/components/FlowHeader'
import PlanCostCards from '@/features/measurement/components/PlanCostCards'
import PlanDetailSection from '@/features/measurement/components/PlanDetailSection'
import PlanScoreCards from '@/features/measurement/components/PlanScoreCards'
import PlanTimelineSection from '@/features/measurement/components/PlanTimelineSection'
import { PLAN_RESULT_TITLE } from '@/features/measurement/constants'
import BottomButton from '@/shared/components/BottomButton'
import LeaveWarningModal from '@/shared/components/LeaveWarningModal'
import Logo from '@/shared/components/Logo'

export default function PlanResultPage() {
  const navigate = useNavigate()
  const [showLeaveWarning, setShowLeaveWarning] = useState(false)

  return (
    <div className="bg-off-white mx-auto flex h-svh w-full max-w-103.5 flex-col">
      <Logo />

      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto pb-8.75">
        <FlowHeader
          eyebrow="12주 플랜 만들기"
          onBack={() => setShowLeaveWarning(true)}
          title={
            <>
              {PLAN_RESULT_TITLE[0]}
              <br />
              {PLAN_RESULT_TITLE[1]}
            </>
          }
        />

        <div className="mt-7.75 flex flex-col gap-8.75">
          <div className="px-5">
            <PlanScoreCards />
          </div>
          <div className="px-5">
            <PlanCostCards />
          </div>
          <PlanTimelineSection />
          <PlanDetailSection />
        </div>
      </div>

      <div className="shrink-0 px-5 pb-[calc(35px+env(safe-area-inset-bottom))]">
        <BottomButton onClick={() => navigate('/')}>시작하기</BottomButton>
      </div>

      {showLeaveWarning && (
        <LeaveWarningModal
          onApprove={() => navigate('/measurement/plan-request')}
          onReject={() => setShowLeaveWarning(false)}
        />
      )}
    </div>
  )
}
