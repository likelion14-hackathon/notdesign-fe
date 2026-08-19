import { useEffect, useMemo, useState } from 'react'
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
import { useLatestReport } from '@/features/report/hooks/useLatestReport'
import {
  buildContributionItems,
  buildCostItems,
  buildWeekScoreMetrics,
} from '@/features/report/utils'
import { ApiError } from '@/shared/api/apiError'
import BottomBar from '@/shared/components/BottomBar'
import BottomButton from '@/shared/components/BottomButton'
import KeepPlanWarningModal from '@/shared/components/KeepPlanWarningModal'
import Logo from '@/shared/components/Logo'
import ProgressRing from '@/shared/components/ProgressRing'

/** 실험 참여 안내 배지가 화면에 떠 있는 시간(ms) */
const EXPERIMENT_BADGE_VISIBLE_MS = 3000
/** 배지가 사라지는 페이드아웃 애니메이션 시간(ms). 트랜지션 클래스의 duration과 맞춰야 함 */
const EXPERIMENT_BADGE_FADE_MS = 300

export default function SixWeekReportPage() {
  const navigate = useNavigate()
  const [experimentBadgeState, setExperimentBadgeState] = useState<
    'visible' | 'fading' | 'hidden'
  >('visible')
  const [showKeepPlanWarning, setShowKeepPlanWarning] = useState(false)

  const { data: report, isLoading, error } = useLatestReport()

  const scoreMetrics = useMemo(
    () => (report ? buildWeekScoreMetrics(report.metrics) : []),
    [report],
  )
  const contributions = useMemo(
    () => (report ? buildContributionItems(report.contributions) : []),
    [report],
  )
  const costs = useMemo(
    () => (report ? buildCostItems(report.contributions) : []),
    [report],
  )
  const topContributor = useMemo(() => {
    if (!report || report.contributions.length === 0) return null
    const top = report.contributions.reduce((a, b) =>
      b.contributionRate > a.contributionRate ? b : a,
    )
    return { name: top.content, percentage: Math.round(top.contributionRate) }
  }, [report])

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setExperimentBadgeState('fading')
    }, EXPERIMENT_BADGE_VISIBLE_MS)

    return () => clearTimeout(fadeTimer)
  }, [])

  useEffect(() => {
    if (experimentBadgeState !== 'fading') return

    const removeTimer = setTimeout(() => {
      setExperimentBadgeState('hidden')
    }, EXPERIMENT_BADGE_FADE_MS)

    return () => clearTimeout(removeTimer)
  }, [experimentBadgeState])

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

      {isLoading && (
        <p className="text-text-secondary mt-7.5 px-5 text-[14px] font-medium">
          리포트를 불러오는 중이에요...
        </p>
      )}

      {!isLoading && report === null && !error && (
        <div className="mt-7.5 flex flex-col items-center gap-4 px-5 text-center">
          <p className="text-text-secondary text-[14px] font-medium break-keep">
            아직 받은 리포트가 없어요. 리포트를 생성해보세요!
          </p>
          <div className="w-full max-w-60">
            <BottomButton onClick={() => navigate('/measurement/report-request')}>
              리포트 생성하기
            </BottomButton>
          </div>
        </div>
      )}

      {error && (
        <p className="text-highlight mt-7.5 px-5 text-[13px] font-semibold break-keep">
          {error instanceof ApiError ? error.message : '리포트를 불러오지 못했어요.'}
        </p>
      )}

      {report && topContributor && (
        <div className="mt-6.25 flex flex-col gap-6.25">
          <div className="px-5">
            <div className="border-primary rounded-[10px] border px-4.75 py-3">
              <p className="text-primary text-[12px] leading-5 font-semibold tracking-[-0.24px] break-keep">
                {report.summary}
              </p>
            </div>
          </div>

          <WeekScoreCards metrics={scoreMetrics} />

          <div>
            <p className="text-text-primary px-5 text-[16px] leading-normal font-semibold tracking-[-0.32px]">
              {WEEK_REPORT_CONTRIBUTION_TITLE}
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
              {WEEK_REPORT_COST_TITLE}
            </p>

            <div className="mt-7.25">
              {costs.map((item, index) => (
                <CostRow key={`${item.name}-${index}`} item={item} />
              ))}
            </div>
          </div>

          <ExperimentNotice />
        </div>
      )}

      {report && (
        <BottomBar>
          <div className="flex flex-col items-center gap-3.75">
            {experimentBadgeState !== 'hidden' && (
              <p
                className={`text-nav-border rounded-full bg-[rgba(21,21,21,0.5)] px-4.75 py-2 text-[13px] leading-normal font-semibold tracking-[-0.26px] backdrop-blur-[2px] transition-opacity duration-300 ${
                  experimentBadgeState === 'visible'
                    ? 'opacity-100'
                    : 'pointer-events-none opacity-0'
                }`}
              >
                {WEEK_REPORT_ACTIONS.pillLabel}
              </p>
            )}
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
      )}

      {showKeepPlanWarning && (
        <KeepPlanWarningModal
          onConfirm={() => navigate('/')}
          onCancel={() => setShowKeepPlanWarning(false)}
        />
      )}
    </div>
  )
}
