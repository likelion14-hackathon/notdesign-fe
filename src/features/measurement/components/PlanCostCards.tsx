import { PLAN_COST_SUMMARY } from '@/features/measurement/constants'

interface CostItem {
  label: string
  amount: string
}

interface PlanCostCardsProps {
  summary?: { total: CostItem; monthly: CostItem }
}

export default function PlanCostCards({
  summary = PLAN_COST_SUMMARY,
}: PlanCostCardsProps) {
  const { total, monthly } = summary

  return (
    <div className="flex gap-2">
      <div className="border-outline bg-box-background min-w-0 flex-1 rounded-[10px] border px-5 pt-4.75 pb-4.75">
        <p className="text-text-secondary text-[12px] leading-3.75 font-semibold tracking-[-0.24px]">
          {total.label}
        </p>
        <p className="text-text-primary mt-2.5 text-[16px] leading-4.75 font-semibold tracking-[-0.32px]">
          {total.amount}
        </p>
      </div>
      <div className="border-outline bg-primary min-w-0 flex-1 rounded-[10px] border px-5 pt-4.75 pb-4.75">
        <p className="text-off-white-sub text-[12px] leading-3.75 font-semibold tracking-[-0.24px]">
          {monthly.label}
        </p>
        <p className="text-off-white mt-2.5 text-[16px] leading-4.75 font-semibold tracking-[-0.32px]">
          {monthly.amount}
        </p>
      </div>
    </div>
  )
}
