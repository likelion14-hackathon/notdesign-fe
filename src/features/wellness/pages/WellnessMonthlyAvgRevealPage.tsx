import NumberFlow from '@number-flow/react'
import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import piggyBank from '@/shared/assets/images/piggy-bank.png'
import wallet from '@/shared/assets/images/wallet.png'
import { WELLNESS_MONTHLY_AVG_REVEAL } from '@/features/wellness/constants'
import WellnessSpendCard from '@/features/wellness/components/WellnessSpendCard'
import { useWellnessStore } from '@/features/wellness/store'
import { calculateWellnessResult } from '@/features/wellness/utils'
import Logo from '@/shared/components/Logo'

const AUTO_ADVANCE_MS = 2400

export default function WellnessMonthlyAvgRevealPage() {
  const navigate = useNavigate()
  const procedureCost = useWellnessStore((state) => state.procedureCost)
  const skincareCost = useWellnessStore((state) => state.skincareCost)
  const effectPerceptionId = useWellnessStore(
    (state) => state.effectPerceptionId,
  )
  const contributionAwarenessId = useWellnessStore(
    (state) => state.contributionAwarenessId,
  )

  const { wasteCost, yearlySpend, monthlyAvgSpend } = useMemo(
    () =>
      calculateWellnessResult({
        procedureCost,
        skincareCost,
        effectPerceptionId,
        contributionAwarenessId,
      }),
    [procedureCost, skincareCost, effectPerceptionId, contributionAwarenessId],
  )

  const [displayWasteCost, setDisplayWasteCost] = useState(0)
  const [displayYearlySpend, setDisplayYearlySpend] = useState(0)
  const [displayMonthlyAvgSpend, setDisplayMonthlyAvgSpend] = useState(0)

  useEffect(() => {
    setDisplayWasteCost(Math.round(wasteCost))
    setDisplayYearlySpend(Math.round(yearlySpend))
    setDisplayMonthlyAvgSpend(Math.round(monthlyAvgSpend))
  }, [wasteCost, yearlySpend, monthlyAvgSpend])

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/wellness/spend-summary', { replace: true })
    }, AUTO_ADVANCE_MS)

    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <div className="bg-off-white min-h-screen-safe mx-auto flex w-full max-w-103.5 flex-col">
      <Logo />

      <div className="flex flex-col items-center gap-15.5 px-13.5 pt-7.5">
        <h1 className="text-text-primary text-center text-[26px] leading-10 font-semibold tracking-[-0.52px] break-keep">
          {WELLNESS_MONTHLY_AVG_REVEAL.userName}
          {WELLNESS_MONTHLY_AVG_REVEAL.title[0]}
          <br />
          {WELLNESS_MONTHLY_AVG_REVEAL.title[1]}
        </h1>

        <div className="flex w-full flex-col items-center gap-8.75">
          <div className="flex flex-col items-center gap-3.75 text-center">
            <p className="text-text-secondary text-[14px] font-medium tracking-[-0.28px]">
              {WELLNESS_MONTHLY_AVG_REVEAL.wasteCostLabel}
            </p>
            <p className="text-primary text-[28px] font-semibold tracking-[-0.56px]">
              <NumberFlow value={displayWasteCost} suffix="원" />
            </p>
          </div>

          <div className="flex w-full flex-col items-start gap-3.5">
            <WellnessSpendCard
              icon={piggyBank}
              iconClassName="h-16.5 w-17"
              label={WELLNESS_MONTHLY_AVG_REVEAL.yearlySpendLabel}
              value={<NumberFlow value={displayYearlySpend} suffix="원" />}
            />
            <WellnessSpendCard
              icon={wallet}
              iconClassName="h-16.5 w-15.75"
              label={WELLNESS_MONTHLY_AVG_REVEAL.monthlyAvgLabel}
              value={<NumberFlow value={displayMonthlyAvgSpend} suffix="원" />}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
