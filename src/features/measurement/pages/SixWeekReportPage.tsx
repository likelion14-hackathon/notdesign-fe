import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ContributionRow from '@/features/measurement/components/ContributionRow'
import CostRow from '@/features/measurement/components/CostRow'
import ExperimentNotice from '@/features/measurement/components/ExperimentNotice'
import WeekScoreCards from '@/features/measurement/components/WeekScoreCards'
import {
  WEEK_REPORT_ACTIONS,
  WEEK_REPORT_CONTRIBUTION_TITLE,
  WEEK_REPORT_COST_TITLE,
  WEEK_REPORT_TITLE,
} from '@/features/measurement/constants'
import type {
  ReportImprovement,
  ReportResponseDto,
} from '@/features/report/types'
import {
  buildContributionItems,
  buildCostItems,
  buildWeekScoreMetrics,
  filterContributionsByImprovement,
  pickDefaultImprovement,
  pickTopContribution,
} from '@/features/report/utils'
import AnimatedNumber from '@/shared/components/AnimatedNumber'
import BottomBar from '@/shared/components/BottomBar'
import KeepPlanWarningModal from '@/shared/components/KeepPlanWarningModal'
import Logo from '@/shared/components/Logo'
import ProgressRing from '@/shared/components/ProgressRing'

interface SixWeekReportPageProps {
  report: ReportResponseDto
}

export default function SixWeekReportPage({ report }: SixWeekReportPageProps) {
  const navigate = useNavigate()
  const [showKeepPlanWarning, setShowKeepPlanWarning] = useState(false)
  const [selectedImprovement, setSelectedImprovement] =
    useState<ReportImprovement | null>(() =>
      pickDefaultImprovement(report.metrics),
    )

  const scoreMetrics = useMemo(
    () => buildWeekScoreMetrics(report.metrics),
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

  return (
    <div className="bg-off-white pb-bottom-bar min-h-screen-safe mx-auto w-full max-w-103.5">
      <Logo />

      <div className="px-5">
        <p className="text-text-secondary text-[15px] leading-normal font-semibold tracking-[-0.3px]">
          {WEEK_REPORT_TITLE[0]}
        </p>
        <h1 className="text-text-primary mt-2.75 text-[26px] leading-10 font-semibold tracking-[-0.52px] break-keep">
          {WEEK_REPORT_TITLE[1]}
        </h1>
      </div>

      <div className="mt-6.25 flex flex-col gap-6.25">
        <div className="px-5">
          <div className="border-primary rounded-[10px] border px-4.75 py-3">
            <p className="text-primary text-[12px] leading-5 font-semibold tracking-[-0.24px] break-keep">
              {report.summary}
            </p>
          </div>
        </div>

        <WeekScoreCards
          metrics={scoreMetrics}
          selectedImprovement={selectedImprovement}
          onSelect={setSelectedImprovement}
        />

        <div>
          <p className="text-text-primary px-5 text-[16px] leading-normal font-semibold tracking-[-0.32px]">
            {WEEK_REPORT_CONTRIBUTION_TITLE}
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
            {WEEK_REPORT_COST_TITLE}
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

        <ExperimentNotice />
      </div>

      <BottomBar>
        <div className="flex flex-col items-center gap-3.75">
          <p className="text-nav-border rounded-full bg-[rgba(21,21,21,0.5)] px-4.75 py-2 text-center text-[13px] leading-normal font-semibold tracking-[-0.26px] backdrop-blur-[2px]">
            {WEEK_REPORT_ACTIONS.pillLabel}
          </p>
          <div className="flex w-full gap-2.75">
            <button
              type="button"
              onClick={() => setShowKeepPlanWarning(true)}
              className="bg-line text-text-primary flex h-14.5 flex-1 items-center justify-center rounded-[10px] text-[15px] font-semibold tracking-[-0.3px]"
            >
              {WEEK_REPORT_ACTIONS.keepPlanLabel}
            </button>
            <button
              type="button"
              onClick={() =>
                navigate('/measurement/plan-generating', {
                  state: { mode: 'ADJUST' },
                })
              }
              className="bg-primary text-off-white flex h-14.5 flex-1 items-center justify-center rounded-[10px] text-[15px] font-semibold tracking-[-0.3px] shadow-[0px_0px_4.2px_0px_rgba(115,115,115,0.25)]"
            >
              {WEEK_REPORT_ACTIONS.newPlanLabel}
            </button>
          </div>
        </div>
      </BottomBar>

      {showKeepPlanWarning && (
        <KeepPlanWarningModal
          onConfirm={() => navigate('/')}
          onCancel={() => setShowKeepPlanWarning(false)}
        />
      )}
    </div>
  )
}
