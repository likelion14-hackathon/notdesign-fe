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
import { deletePlan, startNextPlan, startPlan } from '@/features/plan/api'
import { usePlanStore } from '@/features/plan/store'
import { TRIAL_TIMELINE_DAYS } from '@/features/plan/constants'
import {
  buildDetailItems,
  buildTimelineRows,
  buildTimelineUnitMarkers,
  buildTrialTimelineRows,
  formatManwon,
} from '@/features/plan/utils'
import { useMeasurementStore } from '@/features/measurement/store'
import { rankByLowest } from '@/features/measurement/priorityLabels'
import { ApiError } from '@/shared/api/apiError'

interface PlanResultViewProps {
  eyebrow: string
  /** true면 뒤로가기(이탈 경고 모달 포함)를 보여줌 */
  showBack: boolean
  /** 없으면 offlineResult(오프라인 측정 불러오기)로 대체하고, 그마저 없으면 점수 카드가 목업으로 표시됨 */
  metrics?: { pigmentation: number; pores: number; erythema: number }
}

export default function PlanResultView({
  eyebrow,
  showBack,
  metrics: metricsProp,
}: PlanResultViewProps) {
  const navigate = useNavigate()
  const createdPlan = usePlanStore((state) => state.createdPlan)
  const offlineResult = useMeasurementStore((state) => state.offlineResult)
  const realMetrics = metricsProp ?? offlineResult
  const [showLeaveWarning, setShowLeaveWarning] = useState(false)
  const [isStarting, setIsStarting] = useState(false)
  const [isLeaving, setIsLeaving] = useState(false)
  const [startErrorMessage, setStartErrorMessage] = useState<string | null>(null)

  const handleLeaveApprove = async () => {
    if (isLeaving) return
    setIsLeaving(true)
    try {
      if (createdPlan) {
        await deletePlan(createdPlan.planId)
      }
    } catch {
      // 삭제 실패해도 어차피 뒤로 나가는 흐름이라 무시한다.
    } finally {
      navigate('/measurement/plan-request')
    }
  }

  const handleStart = async () => {
    if (isStarting) return
    setIsStarting(true)
    setStartErrorMessage(null)

    if (createdPlan?.mode === 'NEXT') {
      try {
        await startNextPlan(createdPlan.planId)
        navigate('/')
      } catch (error) {
        setStartErrorMessage(
          error instanceof ApiError ? error.message : '플랜을 시작하지 못했어요.',
        )
      } finally {
        setIsStarting(false)
      }
      return
    }

    try {
      if (createdPlan) {
        await startPlan(createdPlan.planId)
      }
    } catch {
      // 시작 실패해도(이미 목업으로 진행되는 NEW 플로우라) 무시하고 홈으로 이동한다.
    } finally {
      navigate('/')
    }
  }

  const scores = realMetrics
    ? {
        pigmentation: realMetrics.pigmentation,
        pores: realMetrics.pores,
        erythema: realMetrics.erythema,
      }
    : undefined

  const isTrial = createdPlan?.mode === 'TRIAL'

  const costSummary = createdPlan
    ? isTrial
      ? {
          total: {
            label: '총 금액 (1주)',
            amount: formatManwon(createdPlan.totalPrice),
          },
          monthly: {
            label: '1주 예상 금액',
            amount: formatManwon(createdPlan.totalPrice),
          },
        }
      : {
          total: { label: '총 금액 (12주)', amount: formatManwon(createdPlan.totalPrice) },
          monthly: {
            label: '1달 예상 금액',
            amount: formatManwon(Math.round(createdPlan.totalPrice / 3)),
          },
        }
    : undefined

  // TRIAL의 durationWeeks는 서버상 "1주"라는 의미의 1이라 그대로 쓰면 막대가 1칸이 된다.
  // 일주일(7일) 단위로 나눠 보여줘야 하므로 타임라인 칸수만 7로 고정한다.
  const timelineUnits = isTrial ? TRIAL_TIMELINE_DAYS : createdPlan?.durationWeeks

  const timelineRows =
    createdPlan && timelineUnits
      ? isTrial
        ? buildTrialTimelineRows(createdPlan.items, timelineUnits)
        : buildTimelineRows(createdPlan.items, timelineUnits)
      : undefined

  const timelineWeekMarkers =
    createdPlan && timelineUnits
      ? buildTimelineUnitMarkers(timelineUnits, isTrial ? '일' : '주')
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

  const ranked = realMetrics ? rankByLowest(realMetrics) : null
  const timelineInsight = ranked
    ? `${ranked[0].label} 지표가 가장 낮아 1순위로 구성했어요. ${
        isTrial ? `${TRIAL_TIMELINE_DAYS}일` : '12주'
      } 뒤 무엇이 효과였는지 구분할 수 있도록 시작 시점을 서로 다르게 배치했어요.`
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
          <PlanTimelineSection
            rows={timelineRows}
            weekMarkers={timelineWeekMarkers}
            insight={timelineInsight}
          />
          <PlanDetailSection items={detailItems} />
        </div>
      </div>

      <BottomBar>
        <div className="flex flex-col gap-2.75">
          {startErrorMessage && (
            <p className="text-highlight text-center text-[13px] font-semibold break-keep">
              {startErrorMessage}
            </p>
          )}
          <BottomButton onClick={handleStart} disabled={isStarting}>
            {isStarting ? '시작하는 중...' : '시작하기'}
          </BottomButton>
        </div>
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
