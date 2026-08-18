import { PLAN_CATEGORY_TAG } from '@/features/measurement/constants'
import type { CostItem } from '@/features/measurement/types'

interface CostRowProps {
  item: CostItem
}

export default function CostRow({ item }: CostRowProps) {
  const tag = PLAN_CATEGORY_TAG[item.category]

  return (
    <div className="border-outline flex items-end justify-between gap-2 border-b px-5 py-5">
      <div className="flex items-end gap-2.5">
        <span
          className={`${tag.colorClass} text-off-white shrink-0 rounded-[5px] pt-0.75 pr-2 pb-0.5 pl-1.75 text-[11px] leading-normal font-medium tracking-[-0.22px]`}
        >
          {tag.label}
        </span>
        <span className="text-text-primary text-[14px] leading-normal font-semibold tracking-[-0.28px]">
          {item.name}
        </span>
      </div>
      <span className="text-primary shrink-0 text-[14px] leading-normal font-semibold tracking-[-0.28px]">
        {item.cost}
      </span>
    </div>
  )
}
