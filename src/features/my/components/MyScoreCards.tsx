import { MY_SCORE_METRICS } from '@/features/my/constants'

export default function MyScoreCards() {
  return (
    <div className="flex gap-2.5">
      {MY_SCORE_METRICS.map((metric) => (
        <div
          key={metric.label}
          className="border-outline bg-box-background min-w-0 flex-1 rounded-[10px] border px-5 pt-4.75 pb-4.75"
        >
          <p className="text-text-secondary text-[12px] leading-3.75 font-semibold tracking-[-0.24px]">
            {metric.label}
          </p>
          <div className="mt-2.75 flex items-end justify-between">
            <span className="text-text-primary text-[24px] leading-6 font-semibold tracking-[-0.48px]">
              {metric.score}
            </span>
            <span className="text-text-secondary text-[14px] leading-4.5 font-semibold tracking-[-0.28px]">
              /100
            </span>
          </div>
          <p className="text-primary mt-2.75 text-[12px] leading-3.75 font-semibold tracking-[-0.24px]">
            {metric.status}
          </p>
        </div>
      ))}
    </div>
  )
}
