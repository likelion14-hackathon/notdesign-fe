import { PLAN_COST_SUMMARY } from '@/features/measurement/constants'

export default function PlanCostCards() {
  const { total, monthly } = PLAN_COST_SUMMARY

  return (
    <div className="flex gap-2">
      <div className="border-outline bg-box-background min-w-0 flex-1 rounded-[10px] border px-5 pt-4.75 pb-4.75">
        <p className="text-text-primary text-[16px] leading-4.75 font-semibold tracking-[-0.32px]">
          {total.amount}
        </p>
        <p className="text-text-secondary mt-1 text-[12px] leading-4.5 font-semibold tracking-[-0.24px]">
          {total.label}
        </p>
      </div>
      <div className="border-outline bg-primary min-w-0 flex-1 rounded-[10px] border px-5 pt-4.75 pb-4.75">
        <p className="text-off-white text-[16px] leading-4.75 font-semibold tracking-[-0.32px]">
          {monthly.amount}
        </p>
        <p className="text-off-white-sub mt-1 text-[12px] leading-4.5 font-semibold tracking-[-0.24px]">
          {monthly.label}
        </p>
      </div>
    </div>
  )
}
