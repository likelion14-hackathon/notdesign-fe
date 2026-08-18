import { FINAL_SCORE_METRICS } from '@/features/measurement/constants'

export default function FinalScoreCards() {
  return (
    <div className="flex gap-2.5 px-5">
      {FINAL_SCORE_METRICS.map((metric) => (
        <div
          key={metric.label}
          className={`flex min-w-0 flex-1 flex-col items-start gap-2.75 rounded-[10px] px-3.5 py-5 ${
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
          <div className="flex flex-col gap-px">
            <p
              className={`text-[24px] leading-normal font-semibold tracking-[-0.48px] ${
                metric.emphasized ? 'text-off-white' : 'text-text-primary'
              }`}
            >
              {metric.scoreLabel}
            </p>
            <p
              className={`text-[11px] leading-4 tracking-[-0.22px] ${
                metric.emphasized ? 'text-score' : 'text-text-secondary'
              }`}
            >
              {metric.beforeAfter}
            </p>
          </div>
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
