import { useMemo } from 'react'
import chevronDown from '@/shared/assets/icons/chevron-down.svg'
import { WELLNESS_PLAN_INTRO } from '@/features/wellness/constants'
import { useWellnessStore } from '@/features/wellness/store'
import { calculateWellnessResult, formatWon } from '@/features/wellness/utils'
import BottomBar from '@/shared/components/BottomBar'
import BottomButton from '@/shared/components/BottomButton'
import Logo from '@/shared/components/Logo'

export default function WellnessPlanIntroPage() {
  const procedureCost = useWellnessStore((state) => state.procedureCost)
  const skincareCost = useWellnessStore((state) => state.skincareCost)
  const effectPerceptionId = useWellnessStore(
    (state) => state.effectPerceptionId,
  )
  const contributionAwarenessId = useWellnessStore(
    (state) => state.contributionAwarenessId,
  )

  const { wasteCost } = useMemo(
    () =>
      calculateWellnessResult({
        procedureCost,
        skincareCost,
        effectPerceptionId,
        contributionAwarenessId,
      }),
    [procedureCost, skincareCost, effectPerceptionId, contributionAwarenessId],
  )

  return (
    <div className="bg-off-white pb-bottom-bar min-h-screen-safe mx-auto w-full max-w-103.5">
      <Logo />

      <div className="px-5 pt-7.5">
        <p className="text-text-secondary text-[15px] leading-4.5 font-semibold tracking-[-0.3px]">
          {WELLNESS_PLAN_INTRO.eyebrow}
        </p>
        <h1 className="text-text-primary mt-2.75 text-[26px] leading-10 font-semibold tracking-[-0.52px] break-keep">
          {WELLNESS_PLAN_INTRO.title[0]}
          <br />
          {WELLNESS_PLAN_INTRO.title[1]}
        </h1>
      </div>

      <div className="mt-7.5 flex flex-col items-center gap-2 px-5">
        <div className="bg-primary flex w-full flex-col items-center justify-center gap-3.75 rounded-[10px] p-5">
          <p className="text-line text-[16px] font-semibold tracking-[-0.32px]">
            {WELLNESS_PLAN_INTRO.planTitle}
          </p>
          <p className="text-off-white text-center text-[12px] font-medium tracking-[-0.24px]">
            {WELLNESS_PLAN_INTRO.planDescription}
          </p>
        </div>

        <img src={chevronDown} alt="" className="block h-2.25 w-4" />

        <div className="border-primary bg-box-background flex w-full flex-col items-center justify-center rounded-[10px] border px-5 pt-7.5 pb-6.25">
          <div className="flex w-full items-center justify-between">
            <p className="text-primary text-[16px] font-semibold tracking-[-0.32px]">
              {WELLNESS_PLAN_INTRO.savingLabel}
            </p>
            <p className="text-primary text-[16px] font-semibold tracking-[-0.32px]">
              {formatWon(wasteCost)}
            </p>
          </div>
        </div>
      </div>

      <BottomBar>
        <BottomButton>{WELLNESS_PLAN_INTRO.startButtonLabel}</BottomButton>
      </BottomBar>
    </div>
  )
}
