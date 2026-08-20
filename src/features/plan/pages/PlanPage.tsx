import { useNavigate } from 'react-router-dom'
import PlanCostCards from '@/features/measurement/components/PlanCostCards'
import PlanDetailSection from '@/features/measurement/components/PlanDetailSection'
import PlanScoreCards from '@/features/measurement/components/PlanScoreCards'
import PlanTimelineSection from '@/features/measurement/components/PlanTimelineSection'
import {
  PLAN_TAB_COST_SUMMARY,
  PLAN_TAB_TITLE,
} from '@/features/plan/constants'
import { useCurrentPlanDetail } from '@/features/plan/hooks/useCurrentPlanDetail'
import { buildDetailItems, buildTimelineRows, formatManwon } from '@/features/plan/utils'
import { rankByLowest } from '@/features/measurement/priorityLabels'
import { ApiError } from '@/shared/api/apiError'
import BottomBar from '@/shared/components/BottomBar'
import type { NavTabId } from '@/shared/components/BottomNav'
import BottomNav from '@/shared/components/BottomNav'
import Logo from '@/shared/components/Logo'

export default function PlanPage() {
  const navigate = useNavigate()
  const { data: plan, isLoading, error } = useCurrentPlanDetail()

  const handleSelectTab = (id: NavTabId) => {
    if (id === 'home') navigate('/')
    if (id === 'info') navigate('/my')
    if (id === 'record') navigate('/diary')
  }

  const scores = plan?.metrics
    ? {
        pigmentation: plan.metrics.pigmentation,
        pores: plan.metrics.pores,
        erythema: plan.metrics.erythema,
      }
    : undefined

  // 서버 응답에 월 예상 금액이 없어서, 총 금액을 12주=3개월 기준으로 환산해서 보여줌.
  const costSummary = plan
    ? {
        total: { label: '총 금액 (12주)', amount: formatManwon(plan.totalPrice) },
        monthly: {
          label: '1달 예상 금액',
          amount: formatManwon(Math.round(plan.totalPrice / 3)),
        },
      }
    : undefined

  const timelineRows = plan ? buildTimelineRows(plan.items, 12) : undefined
  const detailItems = plan ? buildDetailItems(plan.items) : undefined

  const ranked = scores ? rankByLowest(scores) : null
  const timelineInsight = ranked
    ? `${ranked[0].label} 지표가 가장 낮아 1순위로 구성했어요. 12주 뒤 무엇이 효과였는지 구분할 수 있도록 시작 시점을 서로 다르게 배치했어요.`
    : ''

  return (
    <div className="bg-off-white pb-bottom-bar min-h-screen-safe mx-auto w-full max-w-103.5">
      <Logo />

      <div>
        <div className="px-5">
          <p className="text-text-secondary text-[15px] leading-4.5 font-semibold tracking-[-0.3px]">
            현재 진행 중인 플랜
          </p>
          <h1 className="text-text-primary mt-2.75 text-[26px] leading-10 font-semibold tracking-[-0.52px] break-keep">
            {plan ? (
              plan.planSummary
            ) : (
              <>
                {PLAN_TAB_TITLE[0]}
                <br />
                {PLAN_TAB_TITLE[1]}
              </>
            )}
          </h1>
        </div>

        {isLoading && (
          <p className="text-text-secondary mt-7.5 px-5 text-[14px] font-medium">
            플랜 정보를 불러오는 중이에요...
          </p>
        )}

        {!isLoading && plan === null && !error && (
          <p className="text-text-secondary mt-7.5 px-5 text-[14px] font-medium break-keep">
            진행 중인 플랜이 없어요. 플랜을 시작해보세요!
          </p>
        )}

        {error && (
          <p className="text-highlight mt-7.5 px-5 text-[13px] font-semibold break-keep">
            {error instanceof ApiError
              ? error.message
              : '플랜 정보를 불러오지 못했어요.'}
          </p>
        )}

        {plan && (
          <div className="mt-7.5 flex flex-col gap-8.75">
            {scores && (
              <div className="px-5">
                <PlanScoreCards scores={scores} />
              </div>
            )}
            <div className="px-5">
              <PlanCostCards summary={costSummary ?? PLAN_TAB_COST_SUMMARY} />
            </div>
            <PlanTimelineSection
              insightPosition="above"
              rows={timelineRows}
              insight={timelineInsight}
            />
            <PlanDetailSection items={detailItems} />
          </div>
        )}
      </div>

      <BottomBar>
        <BottomNav current="plan" onSelect={handleSelectTab} />
      </BottomBar>
    </div>
  )
}
