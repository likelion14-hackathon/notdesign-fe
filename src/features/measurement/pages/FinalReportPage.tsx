import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ActionTimelineChart from '@/features/measurement/components/ActionTimelineChart'
import ContributionRow from '@/features/measurement/components/ContributionRow'
import CostRow from '@/features/measurement/components/CostRow'
import FinalScoreCards from '@/features/measurement/components/FinalScoreCards'
import NextPlanProposal from '@/features/measurement/components/NextPlanProposal'
import {
  FINAL_REPORT_ACTIONS,
  FINAL_REPORT_CONTRIBUTION_TITLE,
  FINAL_REPORT_CONTRIBUTIONS,
  FINAL_REPORT_COST_TITLE,
  FINAL_REPORT_COSTS,
  FINAL_REPORT_EYEBROW,
  FINAL_REPORT_INSIGHT,
  FINAL_REPORT_TIMELINE_TITLE,
  FINAL_REPORT_TITLE,
  FINAL_REPORT_TOP_CONTRIBUTOR,
  FINAL_SCORE_METRICS,
} from '@/features/measurement/constants'
import { useReportStore } from '@/features/report/store'
import {
  buildContributionItems,
  buildCostItems,
  buildExecutionTimelineRows,
  buildFinalScoreMetrics,
} from '@/features/report/utils'
import BottomBar from '@/shared/components/BottomBar'
import BottomButton from '@/shared/components/BottomButton'
import Logo from '@/shared/components/Logo'
import ProgressRing from '@/shared/components/ProgressRing'

function formatManwonPill(price: number): string {
  const manwon = price / 10_000
  const label = Number.isInteger(manwon) ? `${manwon}만원` : `${manwon.toFixed(1)}만원`
  return `다음 12주 예상 비용 ${label}`
}

/** 예상 비용 배지가 화면에 떠 있는 시간(ms) */
const COST_BADGE_VISIBLE_MS = 3000
/** 배지가 사라지는 페이드아웃 애니메이션 시간(ms). 트랜지션 클래스의 duration과 맞춰야 함 */
const COST_BADGE_FADE_MS = 300

/** Figma: PF_REPORT_12-WEEK (924:2245) */
export default function FinalReportPage() {
  const navigate = useNavigate()
  const report = useReportStore((state) => state.latestReport)
  const [costBadgeState, setCostBadgeState] = useState<
    'visible' | 'fading' | 'hidden'
  >('visible')

  const scoreMetrics = report
    ? buildFinalScoreMetrics(report.metrics)
    : FINAL_SCORE_METRICS
  const contributions = report
    ? buildContributionItems(report.contributions)
    : FINAL_REPORT_CONTRIBUTIONS
  const costs = report ? buildCostItems(report.contributions) : FINAL_REPORT_COSTS
  const timelineRows = report
    ? buildExecutionTimelineRows(report.executions)
    : undefined
  const topContributor = useMemo(() => {
    if (!report || report.contributions.length === 0) return FINAL_REPORT_TOP_CONTRIBUTOR
    const top = report.contributions.reduce((a, b) =>
      b.contributionRate > a.contributionRate ? b : a,
    )
    return { name: top.content, percentage: Math.round(top.contributionRate) }
  }, [report])
  const pillLabel =
    report?.nextPlanPrice != null
      ? formatManwonPill(report.nextPlanPrice)
      : FINAL_REPORT_ACTIONS.pillLabel

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setCostBadgeState('fading')
    }, COST_BADGE_VISIBLE_MS)

    return () => clearTimeout(fadeTimer)
  }, [])

  useEffect(() => {
    if (costBadgeState !== 'fading') return

    const removeTimer = setTimeout(() => {
      setCostBadgeState('hidden')
    }, COST_BADGE_FADE_MS)

    return () => clearTimeout(removeTimer)
  }, [costBadgeState])

  return (
    <div className="bg-off-white pb-bottom-bar min-h-screen-safe mx-auto w-full max-w-103.5">
      <Logo />

      <div className="px-5">
        <p className="text-text-secondary text-[15px] leading-normal font-semibold tracking-[-0.3px]">
          {FINAL_REPORT_EYEBROW}
        </p>
        <h1 className="text-text-primary mt-2.75 text-[26px] leading-10 font-semibold tracking-[-0.52px] break-keep">
          {FINAL_REPORT_TITLE}
        </h1>
      </div>

      <div className="mt-6.25 flex flex-col gap-6.25">
        <div className="px-5">
          <div className="border-primary rounded-[10px] border px-4.75 py-3">
            {report ? (
              <p className="text-[13px] leading-5 font-bold tracking-[-0.24px] break-keep">
                {report.summary}
              </p>
            ) : (
              <>
                <p className="text-[13px] leading-5 font-bold tracking-[-0.24px] break-keep">
                  {FINAL_REPORT_INSIGHT.headline}
                </p>
                <p className="text-primary text-[12px] leading-5 tracking-[-0.24px] break-keep">
                  {FINAL_REPORT_INSIGHT.sub}
                </p>
              </>
            )}
          </div>
        </div>

        <FinalScoreCards metrics={scoreMetrics} />

        <div className="px-5">
          <p className="text-text-primary pb-2.5 text-[16px] leading-normal font-semibold tracking-[-0.32px]">
            {FINAL_REPORT_TIMELINE_TITLE}
          </p>
          <ActionTimelineChart rows={timelineRows} />
        </div>

        <div>
          <p className="text-text-primary px-5 text-[16px] leading-normal font-semibold tracking-[-0.32px]">
            {FINAL_REPORT_CONTRIBUTION_TITLE}
          </p>

          <div className="flex justify-center py-5">
            <div className="relative size-50">
              <ProgressRing
                percentage={topContributor.percentage}
                tone="primary"
                className="size-full"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                <p className="text-primary text-[20px] leading-normal font-semibold tracking-[-0.4px]">
                  {topContributor.name}
                </p>
                <p className="text-text-secondary text-[16px] leading-normal font-medium tracking-[-0.32px]">
                  {topContributor.percentage}% 기여
                </p>
              </div>
            </div>
          </div>

          <div>
            {contributions.map((item, index) => (
              <ContributionRow key={`${item.name}-${index}`} item={item} />
            ))}
          </div>
        </div>

        <div>
          <p className="text-text-primary px-5 text-[16px] leading-normal font-semibold tracking-[-0.32px]">
            {FINAL_REPORT_COST_TITLE}
          </p>

          <div className="mt-7.25">
            {costs.map((item, index) => (
              <CostRow key={`${item.name}-${index}`} item={item} />
            ))}
          </div>
        </div>

        <NextPlanProposal description={report?.nextPlanSuggestion} />
      </div>

      <BottomBar>
        <div className="flex flex-col items-center gap-3.75">
          {costBadgeState !== 'hidden' && (
            <p
              className={`text-nav-border rounded-full bg-[rgba(21,21,21,0.5)] px-4.75 py-2 text-[13px] leading-normal font-semibold tracking-[-0.26px] backdrop-blur-[2px] transition-opacity duration-300 ${
                costBadgeState === 'visible'
                  ? 'opacity-100'
                  : 'pointer-events-none opacity-0'
              }`}
            >
              {pillLabel}
            </p>
          )}
          <BottomButton
            onClick={() =>
              navigate('/measurement/plan-generating', {
                state: { mode: 'NEXT' },
              })
            }
          >
            {FINAL_REPORT_ACTIONS.startButtonLabel}
          </BottomButton>
        </div>
      </BottomBar>
    </div>
  )
}
