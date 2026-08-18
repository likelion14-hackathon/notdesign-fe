import { PLAN_CATEGORY_TAG } from '@/features/measurement/constants'
import type { ContributionItem } from '@/features/measurement/types'

interface ContributionRowProps {
  item: ContributionItem
}

export default function ContributionRow({ item }: ContributionRowProps) {
  const tag = PLAN_CATEGORY_TAG[item.category]

  return (
    <div className="border-outline flex flex-col gap-2.25 border-b px-5 py-5.5">
      <div className="flex items-end justify-between gap-2">
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
          {item.scoreLabel}
        </span>
      </div>

      {item.confidence ? (
        <div className="flex items-center justify-between gap-2 text-[12px] leading-normal font-semibold tracking-[-0.24px]">
          <span
            className={
              item.confidence.tone === 'high'
                ? 'text-primary'
                : 'text-text-secondary'
            }
          >
            {item.confidence.label}
          </span>
          <span className="text-text-secondary font-medium">{item.note}</span>
        </div>
      ) : (
        <p className="text-text-secondary text-right text-[12px] leading-normal font-medium tracking-[-0.24px]">
          {item.note}
        </p>
      )}
    </div>
  )
}
