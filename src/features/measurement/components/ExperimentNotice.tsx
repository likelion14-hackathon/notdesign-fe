import lightbulb from '@/shared/assets/icons/lightbulb.svg'
import { WEEK_REPORT_EXPERIMENT_NOTICE } from '@/features/measurement/constants'

export default function ExperimentNotice() {
  return (
    <div className="bg-box-background border-outline border-y px-5 py-6.25">
      <div className="flex items-center gap-2.75">
        <img src={lightbulb} alt="" className="h-4.5 w-3" />
        <p className="text-text-primary text-[16px] leading-normal font-semibold tracking-[-0.32px]">
          {WEEK_REPORT_EXPERIMENT_NOTICE.title}
        </p>
      </div>
      <p className="text-text-secondary mt-5 text-[12px] leading-5 font-medium tracking-[-0.24px] break-keep">
        {WEEK_REPORT_EXPERIMENT_NOTICE.description}
      </p>
    </div>
  )
}
