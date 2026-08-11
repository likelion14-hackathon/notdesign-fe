import { PLAN_SCORE_METRICS } from '@/features/measurement/constants'

export default function PlanScoreCards() {
  return (
    <div className="flex gap-2.25">
      {PLAN_SCORE_METRICS.map((metric) => (
        <div
          key={metric.label}
          className={`border-outline min-w-0 flex-1 rounded-[10px] border px-5 pt-4.75 pb-4.5 ${
            metric.emphasized ? 'bg-primary' : 'bg-box-background'
          }`}
        >
          <p
            className={`text-[12px] leading-4.5 font-semibold tracking-[-0.24px] ${
              metric.emphasized ? 'text-off-white-sub' : 'text-text-secondary'
            }`}
          >
            {metric.label}
          </p>
          <div className="mt-2.75 flex items-end justify-between">
            <span
              className={`text-[24px] leading-6 font-semibold tracking-[-0.48px] ${
                metric.emphasized ? 'text-off-white' : 'text-text-primary'
              }`}
            >
              {metric.score}
            </span>
            <span
              className={`text-[14px] leading-4.5 font-semibold tracking-[-0.28px] ${
                metric.emphasized ? 'text-off-white-sub' : 'text-text-secondary'
              }`}
            >
              /100
            </span>
          </div>
          <p
            className={`mt-2.75 text-[12px] leading-4.5 font-semibold tracking-[-0.24px] ${
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
