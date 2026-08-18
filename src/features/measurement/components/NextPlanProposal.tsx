import calendarIcon from '@/shared/assets/icons/calendar-dark.svg'
import { FINAL_REPORT_NEXT_PLAN } from '@/features/measurement/constants'

export default function NextPlanProposal() {
  return (
    <div className="bg-box-background border-outline border-y px-5 py-6.25">
      <div className="flex items-center gap-2">
        <p className="text-text-primary text-[16px] leading-normal font-semibold tracking-[-0.32px]">
          {FINAL_REPORT_NEXT_PLAN.title}
        </p>
        <img src={calendarIcon} alt="" className="size-6" />
      </div>
      <p className="text-text-secondary mt-5 text-[12px] leading-5 font-medium tracking-[-0.24px] break-keep">
        {FINAL_REPORT_NEXT_PLAN.description}
      </p>
    </div>
  )
}
