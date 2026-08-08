import { MY_CURRENT_PLAN } from '@/features/my/constants'

export default function CurrentPlanCard() {
  const { weekLabel, percentage, startWeekLabel, midWeekLabel, endWeekLabel } =
    MY_CURRENT_PLAN

  return (
    <div className="border-outline bg-box-background w-full rounded-[10px] border px-5 pt-5 pb-5">
      <p className="text-text-primary text-[15px] leading-4.5 font-semibold tracking-[-0.3px]">
        현재 진행 중인 플랜
      </p>

      <p className="text-primary mt-5 text-center text-[11px] leading-3.25 font-medium tracking-[-0.22px]">
        {weekLabel}
      </p>

      <div className="bg-line mt-1.25 h-5.5 w-full overflow-hidden rounded-[100px]">
        <div
          className="bg-primary flex h-full items-center justify-end rounded-[100px] pr-2.25"
          style={{ width: `${percentage}%` }}
        >
          <span className="text-off-white text-[11px] leading-3.25 font-medium tracking-[-0.22px]">
            {percentage}%
          </span>
        </div>
      </div>

      <div className="text-text-secondary mt-1.5 flex justify-between text-[11px] leading-3.25 font-medium tracking-[-0.22px]">
        <span>{startWeekLabel}</span>
        <span>{midWeekLabel}</span>
        <span>{endWeekLabel}</span>
      </div>
    </div>
  )
}
