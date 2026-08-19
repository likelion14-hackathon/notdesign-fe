import { PLAN_SCORE_METRICS } from '@/features/measurement/constants'
import { scoreStatus } from '@/features/measurement/scoreStatus'
import type { PlanScoreMetric } from '@/features/measurement/types'

interface PlanScoreCardsProps {
  /** 실제 측정값(0~100). 없으면 기존 목업을 보여줌 */
  scores?: { pigmentation: number; pores: number; erythema: number }
}

export default function PlanScoreCards({ scores }: PlanScoreCardsProps) {
  let metrics: PlanScoreMetric[]

  if (scores) {
    const baseMetrics = [
      {
        label: '색소침착',
        score: scores.pigmentation,
        status: scoreStatus(scores.pigmentation),
      },
      {
        label: '모공',
        score: scores.pores,
        status: scoreStatus(scores.pores),
      },
      {
        label: '홍조',
        score: scores.erythema,
        status: scoreStatus(scores.erythema),
      },
    ]
    const lowest = [...baseMetrics].sort((a, b) => a.score - b.score)[0]
    metrics = baseMetrics.map((metric) => ({
      ...metric,
      emphasized: metric.label === lowest.label,
    }))
  } else {
    metrics = PLAN_SCORE_METRICS
  }

  return (
    <div className="flex gap-2.25">
      {metrics.map((metric) => (
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
          <div className="mt-2.75 flex items-end gap-0.5">
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
