import { type Format } from '@number-flow/react'
import type { WeekScoreMetric } from '@/features/measurement/types'
import type { ReportImprovement } from '@/features/report/types'
import AnimatedNumber from '@/shared/components/AnimatedNumber'

const DELTA_FORMAT: Format = {
  signDisplay: 'exceptZero',
}

interface WeekScoreCardsProps {
  metrics: WeekScoreMetric[]
  selectedImprovement: ReportImprovement | null
  onSelect: (improvement: ReportImprovement) => void
}

export default function WeekScoreCards({
  metrics,
  selectedImprovement,
  onSelect,
}: WeekScoreCardsProps) {
  return (
    <div className="flex gap-2.5 px-5">
      {metrics.map((metric) => {
        const selected = metric.improvement === selectedImprovement

        return (
          <button
            key={metric.improvement}
            type="button"
            aria-pressed={selected}
            onClick={() => onSelect(metric.improvement)}
            className={`flex min-w-0 flex-1 flex-col items-start gap-2.75 rounded-[10px] px-5 py-4.75 text-left ${
              selected ? 'bg-primary' : 'border-text-secondary border'
            }`}
          >
            <p
              className={`text-[12px] leading-normal font-semibold tracking-[-0.24px] ${
                selected ? 'text-off-white-sub' : 'text-text-secondary'
              }`}
            >
              {metric.label}
            </p>
            <p
              className={`text-[24px] leading-normal font-semibold tracking-[-0.48px] ${
                selected ? 'text-off-white' : 'text-text-primary'
              }`}
            >
              <AnimatedNumber
                value={metric.delta}
                suffix="점"
                format={DELTA_FORMAT}
              />
            </p>
            <p
              className={`text-[12px] leading-normal font-semibold tracking-[-0.24px] ${
                selected ? 'text-off-white' : 'text-primary'
              }`}
            >
              {metric.status}
            </p>
          </button>
        )
      })}
    </div>
  )
}
