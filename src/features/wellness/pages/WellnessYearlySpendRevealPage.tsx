import NumberFlow from '@number-flow/react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import piggyBank from '@/shared/assets/images/piggy-bank.png'
import { WELLNESS_YEARLY_SPEND_REVEAL } from '@/features/wellness/constants'
import WellnessSpendCard from '@/features/wellness/components/WellnessSpendCard'
import { useRevealOnce } from '@/features/wellness/useRevealOnce'
import { useWellnessResult } from '@/features/wellness/useWellnessResult'
import { useUserName } from '@/features/auth/useUserName'
import Logo from '@/shared/components/Logo'

const AUTO_ADVANCE_MS = 2400

export default function WellnessYearlySpendRevealPage() {
  const navigate = useNavigate()
  const { wasteCost, yearlySpend } = useWellnessResult()
  const userName = useUserName()

  const displayWasteCost = useRevealOnce('wasteCost', wasteCost)
  const displayYearlySpend = useRevealOnce('yearlySpend', yearlySpend)

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/wellness/monthly-avg-reveal', { replace: true })
    }, AUTO_ADVANCE_MS)

    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <div className="bg-off-white min-h-screen-safe mx-auto flex w-full max-w-103.5 flex-col">
      <Logo />

      <div className="flex flex-col items-center gap-15.5 px-13.5">
        <h1 className="text-text-primary text-center text-[26px] leading-10 font-semibold tracking-[-0.52px] break-keep">
          {userName}
          {WELLNESS_YEARLY_SPEND_REVEAL.title[0]}
          <br />
          {WELLNESS_YEARLY_SPEND_REVEAL.title[1]}
        </h1>

        <div className="flex w-full flex-col items-center gap-8.75">
          <div className="flex flex-col items-center gap-3.75 text-center">
            <p className="text-text-secondary text-[14px] font-medium tracking-[-0.28px]">
              {WELLNESS_YEARLY_SPEND_REVEAL.wasteCostLabel}
            </p>
            <p className="text-primary text-[28px] font-semibold tracking-[-0.56px]">
              <NumberFlow value={displayWasteCost} suffix="원" />
            </p>
          </div>

          <WellnessSpendCard
            icon={piggyBank}
            iconClassName="h-16.5 w-17"
            label={WELLNESS_YEARLY_SPEND_REVEAL.yearlySpendLabel}
            value={<NumberFlow value={displayYearlySpend} suffix="원" />}
          />
        </div>
      </div>
    </div>
  )
}
