import { MEASUREMENT_RESULT } from '@/features/measurement/constants'
import { useMeasurementStore } from '@/features/measurement/store'
import { useUserName } from '@/features/auth/useUserName'
import { scoreStatus } from '@/features/measurement/scoreStatus'
import ProgressRing from '@/shared/components/ProgressRing'

type MetricTone = 'primary' | 'dark'

function formatMeasuredAt(isoString: string): string {
  const date = new Date(isoString)
  if (Number.isNaN(date.getTime())) return isoString
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일 측정`
}

interface ResultCardProps {
  /** 없으면 offlineResult(오프라인 측정 불러오기)로 대체하고, 그마저 없으면 기존 목업을 보여줌 */
  metrics?: { pigmentation: number; pores: number; erythema: number }
}

export default function ResultCard({ metrics: metricsProp }: ResultCardProps = {}) {
  const offlineResult = useMeasurementStore((state) => state.offlineResult)
  const userName = useUserName()

  const realMetrics = metricsProp ?? offlineResult

  const baseMetrics: { label: string; percentage: number; status: string }[] =
    realMetrics
      ? [
          {
            label: '색소침착',
            percentage: realMetrics.pigmentation,
            status: scoreStatus(realMetrics.pigmentation),
          },
          {
            label: '모공',
            percentage: realMetrics.pores,
            status: scoreStatus(realMetrics.pores),
          },
          {
            label: '홍조',
            percentage: realMetrics.erythema,
            status: scoreStatus(realMetrics.erythema),
          },
        ]
      : [...MEASUREMENT_RESULT.metrics]

  const lowest = [...baseMetrics].sort((a, b) => a.percentage - b.percentage)[0]

  const metrics: { label: string; percentage: number; tone: MetricTone; status: string }[] =
    baseMetrics.map((metric) => ({
      ...metric,
      tone: metric.label === lowest.label ? 'primary' : 'dark',
    }))
  const insight = realMetrics
    ? `${lowest.label} 지표가 세 항목 중 가장 낮은 상태예요. 12주 플랜을 구성할 때에는 이 지표를 1순위로 구성할 예정이에요!`
    : MEASUREMENT_RESULT.insight

  const measuredAt = offlineResult
    ? formatMeasuredAt(offlineResult.measuredAt)
    : MEASUREMENT_RESULT.measuredAt
  const centerName = offlineResult?.clinicName ?? MEASUREMENT_RESULT.centerName

  return (
    <div className="border-outline bg-box-background mx-auto w-full max-w-81.75 rounded-[10px] border px-5 pt-6.25 pb-7.25">
      <div className="flex gap-2.5">
        <div className="bg-primary size-7.5 shrink-0 rounded-full" />
        <div className="mt-1.5 min-w-0 flex-1 space-y-2">
          <p className="text-text-primary text-[15px] leading-4.5 font-semibold tracking-[-0.3px]">
            {userName}
          </p>
          <p className="text-text-secondary text-[12px] leading-3.75 font-semibold tracking-[-0.24px]">
            {measuredAt}
          </p>
          <p className="text-text-secondary text-[12px] leading-3.75 font-semibold tracking-[-0.24px]">
            {centerName}
          </p>
        </div>
      </div>

      <div className="mt-9.5 flex gap-5">
        {metrics.map((metric) => (
          <div key={metric.label} className="flex-1">
            <div className="relative aspect-square">
              <ProgressRing
                percentage={metric.percentage}
                tone={metric.tone}
                className="absolute inset-0 size-full"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span
                  className={`text-[14px] leading-6 font-bold ${
                    metric.tone === 'primary'
                      ? 'text-primary'
                      : 'text-text-primary'
                  }`}
                >
                  {metric.percentage}%
                </span>
              </div>
            </div>
            <p
              className={`mt-2.5 text-center text-[16px] leading-4.75 font-semibold tracking-[-0.32px] break-keep ${
                metric.tone === 'primary' ? 'text-primary' : 'text-text-primary'
              }`}
            >
              {metric.label}
            </p>
            <p
              className={`mt-2.5 text-center text-[12px] leading-3.75 font-semibold tracking-[-0.24px] break-keep ${
                metric.tone === 'primary'
                  ? 'text-primary'
                  : 'text-text-secondary'
              }`}
            >
              {metric.status}
            </p>
          </div>
        ))}
      </div>

      <div className="border-outline bg-off-white mt-9.25 rounded-[10px] border px-3.25 py-3.75">
        <p className="text-primary text-[13px] leading-6.25 font-semibold tracking-[-0.26px]">
          {insight}
        </p>
      </div>
    </div>
  )
}
