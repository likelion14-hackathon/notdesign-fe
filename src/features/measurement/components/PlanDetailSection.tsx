import PlanDetailRow from '@/features/measurement/components/PlanDetailRow'
import { PLAN_DETAIL_ITEMS } from '@/features/measurement/constants'
import type { PlanDetailItem } from '@/features/measurement/types'

interface PlanDetailSectionProps {
  /** 없으면 기존 목업을 보여줌 */
  items?: PlanDetailItem[]
}

export default function PlanDetailSection({
  items = PLAN_DETAIL_ITEMS,
}: PlanDetailSectionProps) {
  return (
    <div className="w-full">
      <h2 className="text-text-primary px-5 text-[16px] leading-4.75 font-semibold tracking-[-0.32px]">
        상세보기
      </h2>

      <div className="mt-7.25">
        {items.map((item, index) => (
          <PlanDetailRow key={`${item.weekLabel}-${index}`} item={item} />
        ))}
      </div>
    </div>
  )
}
