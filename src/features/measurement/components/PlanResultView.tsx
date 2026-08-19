import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FlowHeader from '@/features/measurement/components/FlowHeader'
import PlanCostCards from '@/features/measurement/components/PlanCostCards'
import PlanDetailSection from '@/features/measurement/components/PlanDetailSection'
import PlanScoreCards from '@/features/measurement/components/PlanScoreCards'
import PlanTimelineSection from '@/features/measurement/components/PlanTimelineSection'
import { PLAN_RESULT_TITLE } from '@/features/measurement/constants'
import BottomBar from '@/shared/components/BottomBar'
import BottomButton from '@/shared/components/BottomButton'
import LeaveWarningModal from '@/shared/components/LeaveWarningModal'
import Logo from '@/shared/components/Logo'
import { deletePlan, startPlan } from '@/features/plan/api'
import { usePlanStore } from '@/features/plan/store'
import { buildDetailItems, buildTimelineRows, formatManwon } from '@/features/plan/utils'
import { useMeasurementStore } from '@/features/measurement/store'
import { rankByLowest } from '@/features/measurement/priorityLabels'

interface PlanResultViewProps {
  eyebrow: string
  /** true면 뒤로가기(이탈 경고 모달 포함)를 보여줌 */
  showBack: boolean
}

export default function PlanResultView({
  eyebrow,
  showBack,
}: PlanResultViewProps) {
  const navigate = useNavigate()
  const createdPlan = usePlanStore((state) => state.createdPlan)
  const monthlyBudget = usePlanStore((state) => state.monthlyBudget)
  const offlineResult = useMeasurementStore((state) => state.offlineResult)
  const [showLeaveWarning, setShowLeaveWarning] = useState(false)
  const [isStarting, setIsStarting] = useState(false)
  const [isLeaving, setIsLeaving] = useState(false)

  const handleLeaveApprove = async () => {
    if (isLeaving) return
    setIsLeaving(true)
    try {
      if (createdPlan) {
        await deletePlan(createdPlan.planId)
      }
    } catch {
    } finally {
      navigate('/measurement/plan-request')
    }
  }

  const handleStart = async () => {
    if (isStarting) return
    setIsStarting(true)
    try {
      if (createdPlan) {
        await startPlan(createdPlan.planId)
      }
    } catch {
    } finally {
      navigate('/')
    }
  }

  const scores = offlineResult
    ? {
        pigmentation: offlineResult.pigmentation,
        pores: offlineResult.pores,
        erythema: offlineResult.erythema,
      }
    : undefined

  const costSummary = createdPlan
    ? {
        total: { label: '총 금액 (12주)', amount: formatManwon(createdPlan.totalPrice) },
        monthly: {
          label: '1달 예상 금액',
          amount: formatManwon(monthlyBudget ?? 0),
        },
      }
    : undefined

  const timelineRows = createdPlan
    ? buildTimelineRows(createdPlan.items, createdPlan.durationWeeks)
    : undefined

  const detailItems = createdPlan
    ? buildDetailItems(createdPlan.items)
    : undefined

  const title = createdPlan ? (
    createdPlan.planSummary
  ) : (
    <>
      {PLAN_RESULT_TITLE[0]}
      <br />
      {PLAN_RESULT_TITLE[1]}
    </>
  )

  const ranked = offlineResult ? rankByLowest(offlineResult) : null
  const timelineInsight = ranked
    ? `${ranked[0].label} 지표가 가장 낮아 1순위로 구성했어요. 12주 뒤 무엇이 효과였는지 구분할 수 있도록 시작 시점을 서로 다르게 배치했어요.`
    : undefined

  return (
    <div className="bg-off-white pb-bottom-bar min-h-screen-safe mx-auto w-full max-w-103.5">
      <Logo />

      <div className="flex flex-col pb-8.75">
        <FlowHeader
          eyebrow={eyebrow}
          showBack={showBack}
          onBack={showBack ? () => setShowLeaveWarning(true) : undefined}
          title={title}
        />

        <div className="mt-7.75 flex flex-col gap-8.75">
          <div className="px-5">
            <PlanScoreCards scores={scores} />
          </div>
          <div className="px-5">
            <PlanCostCards summary={costSummary} />
          </div>
          <PlanTimelineSection rows={timelineRows} insight={timelineInsight} />
          <PlanDetailSection items={detailItems} />
        </div>
      </div>

      <BottomBar>
        <BottomButton onClick={handleStart} disabled={isStarting}>
          {isStarting ? '시작하는 중...' : '시작하기'}
        </BottomButton>
      </BottomBar>

      {showBack && showLeaveWarning && (
        <LeaveWarningModal
          onApprove={handleLeaveApprove}
          onReject={() => setShowLeaveWarning(false)}
        />
      )}
    </div>
  )
}
