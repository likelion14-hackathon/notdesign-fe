import { HOME_SUMMARY } from '@/features/home/constants'
import type { CurrentPlanSummary } from '@/features/plan/types'

interface CycleProgressCardProps {
  summary: CurrentPlanSummary
}

export default function CycleProgressCard({ summary }: CycleProgressCardProps) {
  const { reservation } = HOME_SUMMARY.cycle
  const { currentWeek, totalWeeks, progressRate, daysToMidReport, daysToFinalReport } =
    summary

  const isMidReportNext = daysToMidReport > 0
  const midWeek = Math.round(totalWeeks / 2)
  const caption = isMidReportNext
    ? `${midWeek}주차 중간 측정까지`
    : `${totalWeeks}주차 최종 측정까지`
  const daysLeft = isMidReportNext ? daysToMidReport : daysToFinalReport
  const remaining = daysLeft > 0 ? `${daysLeft}일 남음` : '오늘이에요'
  const weekLabel = `${currentWeek}주차 / ${totalWeeks}주차`
  const percentage = progressRate

  return (
    <div className="w-full">
      <div className="border-nav-border bg-box-background rounded-t-[10px] border px-5 pt-5.5 pb-5.75">
        <p className="text-text-secondary text-[13px] leading-4 font-medium tracking-[-0.26px]">
          {caption}
        </p>
        <p className="text-text-primary mt-2.5 text-[18px] leading-5.5 font-semibold tracking-[-0.36px]">
          {remaining}
        </p>

        <p className="text-text-secondary mt-2.25 text-right text-[11px] leading-3.25 font-medium tracking-[-0.22px]">
          {weekLabel}
        </p>

        <div className="bg-line mt-1.25 h-5.5 w-full overflow-hidden rounded-[100px]">
          <div
            className="bg-primary flex h-full items-center justify-end rounded-[100px] pr-2.25"
            style={{ width: `${percentage}%` }}
          >
            <span className="text-off-white text-[11px] leading-normal font-medium tracking-[-0.22px]">
              {percentage}%
            </span>
          </div>
        </div>
      </div>

      <div className="border-nav-border bg-off-white flex h-9.75 items-center rounded-b-[10px] border-r border-b border-l px-4.5">
        <span className="text-primary text-[13px] leading-normal font-semibold tracking-[-0.26px]">
          {reservation.status}
        </span>
        <span className="text-text-primary ml-3.5 text-[13px] leading-normal font-medium tracking-[-0.26px]">
          {reservation.dateTime}
        </span>
        <span className="text-text-secondary ml-auto text-[13px] leading-normal font-medium tracking-[-0.26px]">
          {reservation.centerName}
        </span>
      </div>
    </div>
  )
}
