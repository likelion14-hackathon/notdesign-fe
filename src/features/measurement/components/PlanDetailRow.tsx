import { PLAN_CATEGORY_TAG } from '@/features/measurement/constants'
import type { PlanDetailItem } from '@/features/measurement/types'

interface PlanDetailRowProps {
  item: PlanDetailItem
}

export default function PlanDetailRow({ item }: PlanDetailRowProps) {
  const tag = PLAN_CATEGORY_TAG[item.category]

  return (
    <div className="border-line flex flex-col gap-2.25 border-b px-5 pt-5.75 pb-6">
      <p className="text-primary text-[12px] leading-4.5 font-semibold tracking-[-0.24px]">
        {item.weekLabel}
      </p>

      <div className="flex items-start justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2.5">
          <span
            className={`${tag.colorClass} text-off-white shrink-0 rounded-[5px] pt-0.75 pr-2 pb-0.5 pl-1.75 text-[11px] leading-normal font-medium tracking-[-0.22px]`}
          >
            {tag.label}
          </span>
          <span className="text-text-primary min-w-0 flex-1 truncate text-[14px] leading-normal font-semibold tracking-[-0.28px]">
            {item.name}
          </span>
          <span className="text-text-secondary shrink-0 text-[11px] leading-normal font-semibold tracking-[-0.22px]">
            {item.frequency}
          </span>
        </div>
        <span className="text-primary shrink-0 text-[14px] leading-normal font-semibold tracking-[-0.28px]">
          {item.price}
        </span>
      </div>

      <p className="text-text-secondary text-[12px] leading-normal font-medium tracking-[-0.24px]">
        {item.description}
      </p>
    </div>
  )
}
