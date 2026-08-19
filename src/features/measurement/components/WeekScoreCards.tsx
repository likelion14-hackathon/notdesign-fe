import { WEEK_SCORE_METRICS } from '@/features/measurement/constants'
import type { WeekScoreMetric } from '@/features/measurement/types'

interface WeekScoreCardsProps {
  /** 없으면 기존 목업을 보여줌 */
  metrics?: WeekScoreMetric[]
}

export default function WeekScoreCards({ metrics }: WeekScoreCardsProps) {
  return (
    <div className="flex gap-2.5 px-5">
      {(metrics ?? WEEK_SCORE_METRICS).map((metric) => (
        <div
          key={metric.label}
          className={`flex min-w-0 flex-1 flex-col gap-2.75 rounded-[10px] px-5 py-4.75 ${
            metric.emphasized ? 'bg-primary' : 'border-text-secondary border'
          }`}
        >
          <p
            className={`text-[12px] leading-normal font-semibold tracking-[-0.24px] ${
              metric.emphasized ? 'text-off-white-sub' : 'text-text-secondary'
            }`}
          >
            {metric.label}
          </p>
          <p
            className={`text-[24px] leading-normal font-semibold tracking-[-0.48px] ${
              metric.emphasized ? 'text-off-white' : 'text-text-primary'
            }`}
          >
            {metric.scoreLabel}
          </p>
          <p
            className={`text-[12px] leading-normal font-semibold tracking-[-0.24px] ${
              metric.emphasized ? 'text-off-white' : 'text-primary'
            }`}
          >
            {metric.status}
          </p>
        </div>
      ))}
    </div>
  )
}
