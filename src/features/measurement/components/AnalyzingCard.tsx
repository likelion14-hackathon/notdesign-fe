import {
  ANALYZING_METRICS,
  MEASUREMENT_RESULT,
} from '@/features/measurement/constants'
import donutDark from '@/shared/assets/icons/donut-dark.svg'
import donutPrimary from '@/shared/assets/icons/donut-primary.svg'
import SkeletonBar from '@/shared/components/SkeletonBar'
import SkeletonParagraphBox from '@/shared/components/SkeletonParagraphBox'
import SkeletonProfileRow from '@/shared/components/SkeletonProfileRow'

export default function AnalyzingCard() {
  return (
    <div className="border-outline bg-box-background mx-auto w-full max-w-81.75 rounded-[10px] border px-5 pt-6.25 pb-7.25">
      <SkeletonProfileRow name={MEASUREMENT_RESULT.name} />

      <div className="mt-9.5 flex gap-5">
        {ANALYZING_METRICS.map((metric) => (
          <div key={metric.label} className="flex-1">
            <div className="relative aspect-square">
              <img
                src={metric.tone === 'primary' ? donutPrimary : donutDark}
                alt=""
                className="absolute inset-0 size-full"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <SkeletonBar className="h-[26.5%] w-[51%]" />
              </div>
            </div>
            <p
              className={`mt-2.5 text-center text-[16px] leading-4.75 font-semibold tracking-[-0.32px] break-keep ${
                metric.tone === 'primary' ? 'text-primary' : 'text-text-primary'
              }`}
            >
              {metric.label}
            </p>
            <SkeletonBar className="mx-auto mt-2.25 w-[61%]" />
          </div>
        ))}
      </div>

      <div className="mt-9.25">
        <SkeletonParagraphBox />
      </div>
    </div>
  )
}
