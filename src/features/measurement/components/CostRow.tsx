import { type Format } from '@number-flow/react'
import { PLAN_CATEGORY_TAG } from '@/features/measurement/constants'
import type { CostItem } from '@/features/measurement/types'
import AnimatedNumber from '@/shared/components/AnimatedNumber'

const MANWON = 10_000

const MANWON_FORMAT: Format = {
  maximumFractionDigits: 1,
}

interface CostRowProps {
  item: CostItem
}

export default function CostRow({ item }: CostRowProps) {
  const useManwon = item.costPerPoint >= MANWON

  return (
    <div className="border-outline flex items-end justify-between gap-2 border-b px-5 py-5">
      <div className="flex items-end gap-2.5">
        <span
          className={`${PLAN_CATEGORY_TAG[item.category].colorClass} text-off-white shrink-0 rounded-[5px] pt-0.75 pr-2 pb-0.5 pl-1.75 text-[11px] leading-normal font-medium tracking-[-0.22px]`}
        >
          {PLAN_CATEGORY_TAG[item.category].label}
        </span>
        <span className="text-text-primary text-[14px] leading-normal font-semibold tracking-[-0.28px]">
          {item.name}
        </span>
      </div>
      <span className="text-primary shrink-0 text-[14px] leading-normal font-semibold tracking-[-0.28px]">
        {item.costPerPoint <= 0 ? (
          '비용 없음'
        ) : useManwon ? (
          <AnimatedNumber
            value={item.costPerPoint / MANWON}
            suffix="만원/점"
            format={MANWON_FORMAT}
          />
        ) : (
          <AnimatedNumber value={item.costPerPoint} suffix="원/점" />
        )}
      </span>
    </div>
  )
}
