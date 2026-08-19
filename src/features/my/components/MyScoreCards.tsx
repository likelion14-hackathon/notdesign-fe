import { MY_SCORE_METRICS } from '@/features/my/constants'
import { scoreStatus } from '@/features/measurement/scoreStatus'

interface MyScoreCardsProps {
  /** 오프라인 측정 결과(0~100). 없으면 기존 목업을 보여줌 */
  scores?: { pigmentation: number; pores: number; erythema: number }
}

export default function MyScoreCards({ scores }: MyScoreCardsProps) {
  const metrics = scores
    ? [
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
    : MY_SCORE_METRICS

  return (
    <div className="flex gap-2.5">
      {metrics.map((metric) => (
        <div
          key={metric.label}
          className="border-outline bg-box-background min-w-0 flex-1 rounded-[10px] border px-5 pt-4.75 pb-4.75"
        >
          <p className="text-text-secondary text-[12px] leading-3.75 font-semibold tracking-[-0.24px]">
            {metric.label}
          </p>
          <div className="mt-2.75 flex items-end gap-0.5">
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
