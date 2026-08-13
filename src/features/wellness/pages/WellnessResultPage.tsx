import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  WELLNESS_RESULT,
  WELLNESS_RESULT_CONTENT,
} from '@/features/wellness/constants'
import { useWellnessStore } from '@/features/wellness/store'
import { calculateWellnessResult, formatWon } from '@/features/wellness/utils'
import BottomButton from '@/shared/components/BottomButton'
import Logo from '@/shared/components/Logo'

export default function WellnessResultPage() {
  const navigate = useNavigate()
  const procedureCost = useWellnessStore((state) => state.procedureCost)
  const skincareCost = useWellnessStore((state) => state.skincareCost)
  const effectPerceptionId = useWellnessStore(
    (state) => state.effectPerceptionId,
  )
  const contributionAwarenessId = useWellnessStore(
    (state) => state.contributionAwarenessId,
  )

  const { grade, wastePercent, yearlySpend, monthlyAvgSpend, wasteCost } =
    useMemo(
      () =>
        calculateWellnessResult({
          procedureCost,
          skincareCost,
          effectPerceptionId,
          contributionAwarenessId,
        }),
      [
        procedureCost,
        skincareCost,
        effectPerceptionId,
        contributionAwarenessId,
      ],
    )

  const content = WELLNESS_RESULT_CONTENT[grade]
  const wasteDescription = content.wasteTemplate
    .replace('{percent}', String(wastePercent))
    .replace('{amount}', formatWon(wasteCost))

  return (
    <div className="bg-off-white mx-auto flex h-svh w-full max-w-103.5 flex-col">
      <Logo />

      <div className="min-h-0 flex-1 overflow-y-auto">
        <div className="px-5 pt-7.5">
          <p className="text-text-secondary text-[15px] leading-4.5 font-semibold tracking-[-0.3px]">
            {WELLNESS_RESULT.eyebrow}
          </p>
          <h1 className="text-text-primary mt-2.75 text-[26px] leading-10 font-semibold tracking-[-0.52px] break-keep">
            {WELLNESS_RESULT.title}
          </h1>
        </div>

        <div className="mt-7.5 px-5">
          <div className="bg-primary flex flex-col items-center justify-center rounded-[10px] px-5 pt-7.5 pb-6.25">
            <div className="flex w-full flex-col items-center gap-3.75">
              <div className="text-line flex w-full items-center justify-between text-[14px] tracking-[-0.28px]">
                <p className="font-medium">
                  {WELLNESS_RESULT.yearlySpendLabel}
                </p>
                <p className="font-semibold">{formatWon(yearlySpend)}</p>
              </div>
              <div className="text-line flex w-full items-center justify-between text-[14px] tracking-[-0.28px]">
                <p className="font-medium">{WELLNESS_RESULT.monthlyAvgLabel}</p>
                <p className="font-semibold">{formatWon(monthlyAvgSpend)}</p>
              </div>
              <div className="text-line flex w-full items-center justify-between text-[14px] tracking-[-0.28px]">
                <p className="font-medium">{WELLNESS_RESULT.gradeLabel}</p>
                <p className="font-semibold">{grade}</p>
              </div>

              <div className="bg-line h-px w-full" />

              <div className="text-line flex w-full items-center justify-between text-[16px] font-semibold tracking-[-0.32px]">
                <p>{WELLNESS_RESULT.wasteCostLabel}</p>
                <p>{formatWon(wasteCost)}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-7.5 flex flex-col">
          <div className="border-line bg-off-white flex flex-col items-start border-b px-5 pt-5.75 pb-5">
            <p className="text-primary text-[14px] font-semibold tracking-[-0.28px]">
              {WELLNESS_RESULT.diagnosisSectionLabel}
            </p>
            <p className="text-text-secondary mt-2.25 text-[12px] leading-5 font-medium tracking-[-0.24px] break-keep">
              {content.diagnosis}
            </p>
          </div>
          <div className="border-line bg-off-white flex flex-col items-start border-b px-5 pt-5.75 pb-5">
            <p className="text-primary text-[14px] font-semibold tracking-[-0.28px]">
              {WELLNESS_RESULT.wasteSectionLabel}
            </p>
            <p className="text-text-secondary mt-2.25 text-[12px] leading-5 font-medium tracking-[-0.24px] break-keep">
              {wasteDescription}
            </p>
          </div>
        </div>
      </div>

      <div className="shrink-0 px-5 pb-[calc(35px+env(safe-area-inset-bottom))]">
        <BottomButton onClick={() => navigate('/wellness/plan-intro')}>
          다음으로
        </BottomButton>
      </div>
    </div>
  )
}
