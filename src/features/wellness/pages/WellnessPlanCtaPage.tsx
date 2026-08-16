import NumberFlow from '@number-flow/react'
import { useEffect, useMemo, useState } from 'react'
import chevronDown from '@/shared/assets/icons/chevron-down.svg'
import coins from '@/shared/assets/images/coins.png'
import piggyBank from '@/shared/assets/images/piggy-bank.png'
import rocket from '@/shared/assets/images/rocket.png'
import { WELLNESS_PLAN_CTA } from '@/features/wellness/constants'
import WellnessSpendCard from '@/features/wellness/components/WellnessSpendCard'
import { useWellnessStore } from '@/features/wellness/store'
import { calculateWellnessResult } from '@/features/wellness/utils'
import BottomBar from '@/shared/components/BottomBar'
import BottomButton from '@/shared/components/BottomButton'
import Logo from '@/shared/components/Logo'

export default function WellnessPlanCtaPage() {
  const procedureCost = useWellnessStore((state) => state.procedureCost)
  const skincareCost = useWellnessStore((state) => state.skincareCost)
  const effectPerceptionId = useWellnessStore(
    (state) => state.effectPerceptionId,
  )
  const contributionAwarenessId = useWellnessStore(
    (state) => state.contributionAwarenessId,
  )

  const { yearlySpend, wasteCost } = useMemo(
    () =>
      calculateWellnessResult({
        procedureCost,
        skincareCost,
        effectPerceptionId,
        contributionAwarenessId,
      }),
    [procedureCost, skincareCost, effectPerceptionId, contributionAwarenessId],
  )

  const [displayYearlySpend, setDisplayYearlySpend] = useState(0)
  const [displayWasteCost, setDisplayWasteCost] = useState(0)

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setDisplayYearlySpend(Math.round(yearlySpend))
      setDisplayWasteCost(Math.round(wasteCost))
    })
    return () => cancelAnimationFrame(id)
  }, [yearlySpend, wasteCost])

  return (
    <div className="bg-off-white pb-bottom-bar min-h-screen-safe mx-auto w-full max-w-103.5">
      <Logo />

      <div className="px-5 pt-9">
        <div className="flex flex-col gap-7.5">
          <h1 className="text-text-primary text-center text-[26px] leading-10 font-semibold tracking-[-0.52px] break-keep">
            {WELLNESS_PLAN_CTA.title[0]}
            <br />
            {WELLNESS_PLAN_CTA.title[1]}
          </h1>

          <div className="border-primary flex items-start gap-5.75 rounded-[20px] border px-6.25 py-6.25">
            <img src={rocket} alt="" className="h-16.25 w-15.25 shrink-0" />
            <div className="flex flex-col items-start gap-2">
              <p className="text-primary text-[14px] font-semibold tracking-[-0.28px]">
                {WELLNESS_PLAN_CTA.cardTitle}
              </p>
              <p className="text-text-secondary text-[12px] leading-5.5 font-medium tracking-[-0.24px] break-keep">
                {WELLNESS_PLAN_CTA.cardDescription}
              </p>
            </div>
          </div>

          <div className="mx-8.5">
            <WellnessSpendCard
              icon={piggyBank}
              iconClassName="h-16.5 w-17"
              label={WELLNESS_PLAN_CTA.yearlySpendLabel}
              value={<NumberFlow value={displayYearlySpend} suffix="원" />}
              bgClassName="bg-outline opacity-50"
            />
          </div>

          <img src={chevronDown} alt="" className="mx-auto block h-2.25 w-4" />

          <div className="mx-8.5">
            <WellnessSpendCard
              icon={coins}
              iconClassName="h-16.75 w-16.75 object-contain"
              label={WELLNESS_PLAN_CTA.savingLabel}
              value={<NumberFlow value={displayWasteCost} suffix="원" />}
            />
          </div>
        </div>
      </div>

      <BottomBar>
        <BottomButton>{WELLNESS_PLAN_CTA.startButtonLabel}</BottomButton>
      </BottomBar>
    </div>
  )
}
