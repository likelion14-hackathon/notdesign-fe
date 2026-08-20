import { type Format } from '@number-flow/react'
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
  FINAL_REPORT_COST_TITLE,
  FINAL_REPORT_EYEBROW,
  FINAL_REPORT_TIMELINE_TITLE,
  FINAL_REPORT_TITLE,
} from '@/features/measurement/constants'
import type {
  ReportImprovement,
  ReportResponseDto,
} from '@/features/report/types'
import {
  buildContributionItems,
  buildCostItems,
  buildExecutionTimelineRows,
  buildFinalScoreMetrics,
  filterContributionsByImprovement,
  pickDefaultImprovement,
  pickTopContribution,
} from '@/features/report/utils'
import AnimatedNumber from '@/shared/components/AnimatedNumber'
import BottomBar from '@/shared/components/BottomBar'
import BottomButton from '@/shared/components/BottomButton'
import Logo from '@/shared/components/Logo'
import ProgressRing from '@/shared/components/ProgressRing'

const MANWON_FORMAT: Format = {
  maximumFractionDigits: 1,
}

/** 예상 비용 배지가 화면에 떠 있는 시간(ms) */
const COST_BADGE_VISIBLE_MS = 3000
/** 배지가 사라지는 페이드아웃 애니메이션 시간(ms). 트랜지션 클래스의 duration과 맞춰야 함 */
const COST_BADGE_FADE_MS = 300

interface FinalReportPageProps {
  report: ReportResponseDto
}

/** Figma: PF_REPORT_12-WEEK (924:2245) */
export default function FinalReportPage({ report }: FinalReportPageProps) {
  const navigate = useNavigate()
  const [costBadgeState, setCostBadgeState] = useState<
    'visible' | 'fading' | 'hidden'
  >('visible')
  const [selectedImprovement, setSelectedImprovement] =
    useState<ReportImprovement | null>(() =>
      pickDefaultImprovement(report.metrics),
    )

  const scoreMetrics = useMemo(
    () => buildFinalScoreMetrics(report.metrics),
    [report.metrics],
  )
  const selectedContributions = useMemo(
    () =>
      filterContributionsByImprovement(
        report.contributions,
        selectedImprovement,
      ),
    [report.contributions, selectedImprovement],
  )
  const contributions = useMemo(
    () => buildContributionItems(selectedContributions),
    [selectedContributions],
  )
  const costs = useMemo(
    () => buildCostItems(selectedContributions),
    [selectedContributions],
  )
  const topContributor = useMemo(
    () => pickTopContribution(selectedContributions),
    [selectedContributions],
  )
  const timelineRows = useMemo(
    () => buildExecutionTimelineRows(report.executions),
    [report.executions],
  )
  const nextPlanManwon =
    report.nextPlanPrice != null ? report.nextPlanPrice / 10_000 : null

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
            <p className="text-primary text-[13px] leading-5 font-bold tracking-[-0.24px] break-keep">
              {report.summary}
            </p>
          </div>
        </div>

        <FinalScoreCards
          metrics={scoreMetrics}
          selectedImprovement={selectedImprovement}
          onSelect={setSelectedImprovement}
        />

        <div className="px-5">
          <p className="text-text-primary pb-2.5 text-[16px] leading-normal font-semibold tracking-[-0.32px]">
            {FINAL_REPORT_TIMELINE_TITLE}
          </p>
          {timelineRows.length > 0 ? (
            <ActionTimelineChart rows={timelineRows} />
          ) : (
            <p className="text-text-secondary text-[14px] font-medium break-keep">
              실천 기록이 아직 없어요.
            </p>
          )}
        </div>

        <div>
          <p className="text-text-primary px-5 text-[16px] leading-normal font-semibold tracking-[-0.32px]">
            {FINAL_REPORT_CONTRIBUTION_TITLE}
          </p>

          {topContributor ? (
            <>
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
                      <AnimatedNumber
                        value={topContributor.percentage}
                        suffix="% 기여"
                      />
                    </p>
                  </div>
                </div>
              </div>

              <div>
                {contributions.map((item, index) => (
                  <ContributionRow key={`${item.name}-${index}`} item={item} />
                ))}
              </div>
            </>
          ) : (
            <p className="text-text-secondary mt-3.75 px-5 text-[14px] font-medium break-keep">
              이 지표에 기여한 항목이 아직 없어요.
            </p>
          )}
        </div>

        <div>
          <p className="text-text-primary px-5 text-[16px] leading-normal font-semibold tracking-[-0.32px]">
            {FINAL_REPORT_COST_TITLE}
          </p>

          {costs.length > 0 ? (
            <div className="mt-7.25">
              {costs.map((item, index) => (
                <CostRow key={`${item.name}-${index}`} item={item} />
              ))}
            </div>
          ) : (
            <p className="text-text-secondary mt-3.75 px-5 text-[14px] font-medium break-keep">
              비용을 계산할 항목이 없어요.
            </p>
          )}
        </div>

        <NextPlanProposal description={report.nextPlanSuggestion} />
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
              {nextPlanManwon != null ? (
                <>
                  다음 12주 예상 비용{' '}
                  <AnimatedNumber
                    value={nextPlanManwon}
                    suffix="만원"
                    format={MANWON_FORMAT}
                  />
                </>
              ) : (
                FINAL_REPORT_ACTIONS.pillLabel
              )}
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
