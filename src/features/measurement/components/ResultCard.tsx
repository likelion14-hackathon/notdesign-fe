import { MEASUREMENT_RESULT } from '@/features/measurement/constants'
import ProgressRing from '@/shared/components/ProgressRing'

export default function ResultCard() {
  const { name, measuredAt, centerName, metrics, insight } = MEASUREMENT_RESULT

  return (
    <div className="border-outline bg-box-background mx-auto w-full max-w-81.75 rounded-[10px] border px-5 pt-6.25 pb-7.25">
      <div className="flex gap-2.5">
        <div className="bg-primary size-7.5 shrink-0 rounded-full" />
        <div className="mt-1.5 min-w-0 flex-1 space-y-2">
          <p className="text-text-primary text-[15px] leading-4.5 font-semibold tracking-[-0.3px]">
            {name}
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
