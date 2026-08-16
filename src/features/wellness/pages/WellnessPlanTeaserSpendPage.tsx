import NumberFlow from '@number-flow/react'
import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import piggyBank from '@/shared/assets/images/piggy-bank.png'
import rocket from '@/shared/assets/images/rocket.png'
import { WELLNESS_PLAN_TEASER_SPEND } from '@/features/wellness/constants'
import WellnessSpendCard from '@/features/wellness/components/WellnessSpendCard'
import { useWellnessStore } from '@/features/wellness/store'
import { calculateWellnessResult } from '@/features/wellness/utils'
import Logo from '@/shared/components/Logo'

/** 다음 화면(진단 결과)으로 자동 전환되기까지의 시간(ms) */
const AUTO_ADVANCE_MS = 2400

export default function WellnessPlanTeaserSpendPage() {
  const navigate = useNavigate()
  const procedureCost = useWellnessStore((state) => state.procedureCost)
  const skincareCost = useWellnessStore((state) => state.skincareCost)
  const effectPerceptionId = useWellnessStore(
    (state) => state.effectPerceptionId,
  )
  const contributionAwarenessId = useWellnessStore(
    (state) => state.contributionAwarenessId,
  )

  const { yearlySpend } = useMemo(
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

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setDisplayYearlySpend(Math.round(yearlySpend))
    })
    return () => cancelAnimationFrame(id)
  }, [yearlySpend])

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/wellness/plan-teaser-expand', { replace: true })
    }, AUTO_ADVANCE_MS)

    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <div className="bg-off-white min-h-screen-safe mx-auto flex w-full max-w-103.5 flex-col">
      <Logo />

      <div className="flex flex-col gap-7.5 px-5 pt-9">
        <h1 className="text-text-primary text-center text-[26px] leading-10 font-semibold tracking-[-0.52px] break-keep">
          {WELLNESS_PLAN_TEASER_SPEND.title[0]}
          <br />
          {WELLNESS_PLAN_TEASER_SPEND.title[1]}
        </h1>

        <div className="border-primary flex items-start gap-5.75 rounded-[20px] border px-6.25 py-6.25">
          <img src={rocket} alt="" className="h-16.25 w-15.25 shrink-0" />
          <div className="flex flex-col items-start gap-2">
            <p className="text-primary text-[14px] font-semibold tracking-[-0.28px]">
              {WELLNESS_PLAN_TEASER_SPEND.cardTitle}
            </p>
            <p className="text-text-secondary text-[12px] leading-5.5 font-medium tracking-[-0.24px] break-keep">
              {WELLNESS_PLAN_TEASER_SPEND.cardDescription}
            </p>
          </div>
        </div>

        <div className="mx-8.5">
          <WellnessSpendCard
            icon={piggyBank}
            iconClassName="h-16.5 w-17"
            label={WELLNESS_PLAN_TEASER_SPEND.yearlySpendLabel}
            value={<NumberFlow value={displayYearlySpend} suffix="원" />}
          />
        </div>
      </div>
    </div>
  )
}
