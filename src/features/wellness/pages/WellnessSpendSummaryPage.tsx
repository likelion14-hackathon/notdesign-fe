import NumberFlow from '@number-flow/react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import lightbulb from '@/shared/assets/images/lightbulb.png'
import piggyBank from '@/shared/assets/images/piggy-bank.png'
import wallet from '@/shared/assets/images/wallet.png'
import { WELLNESS_SPEND_SUMMARY } from '@/features/wellness/constants'
import WellnessSpendCard from '@/features/wellness/components/WellnessSpendCard'
import { useWellnessResult } from '@/features/wellness/useWellnessResult'
import { useAuthStore } from '@/features/auth/store'
import BottomBar from '@/shared/components/BottomBar'
import BottomButton from '@/shared/components/BottomButton'
import Logo from '@/shared/components/Logo'

export default function WellnessSpendSummaryPage() {
  const navigate = useNavigate()
  const { grade, wasteCost, yearlySpend, monthlyAvgSpend } = useWellnessResult()
  const userName = useAuthStore((state) => state.name)

  const [displayWasteCost, setDisplayWasteCost] = useState(0)
  const [displayYearlySpend, setDisplayYearlySpend] = useState(0)
  const [displayMonthlyAvgSpend, setDisplayMonthlyAvgSpend] = useState(0)

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setDisplayWasteCost(Math.round(wasteCost))
      setDisplayYearlySpend(Math.round(yearlySpend))
      setDisplayMonthlyAvgSpend(Math.round(monthlyAvgSpend))
    })
    return () => cancelAnimationFrame(id)
  }, [wasteCost, yearlySpend, monthlyAvgSpend])

  return (
    <div className="bg-off-white pb-bottom-bar min-h-screen-safe mx-auto w-full max-w-103.5">
      <Logo />

      <div className="px-13.5">
        <div className="flex flex-col items-center gap-15.5">
          <h1 className="text-text-primary text-center text-[26px] leading-10 font-semibold tracking-[-0.52px] break-keep">
            {userName ?? WELLNESS_SPEND_SUMMARY.userName}
            {WELLNESS_SPEND_SUMMARY.title[0]}
            <br />
            {WELLNESS_SPEND_SUMMARY.title[1]}
          </h1>

          <div className="flex w-full flex-col items-center gap-8.75">
            <div className="flex flex-col items-center gap-3.75 text-center">
              <p className="text-text-secondary text-[14px] font-medium tracking-[-0.28px]">
                {WELLNESS_SPEND_SUMMARY.wasteCostLabel}
              </p>
              <p className="text-primary text-[28px] font-semibold tracking-[-0.56px]">
                <NumberFlow value={displayWasteCost} suffix="원" />
              </p>
            </div>

            <div className="flex w-full flex-col items-start gap-3.5">
              <WellnessSpendCard
                icon={piggyBank}
                iconClassName="h-16.5 w-17"
                label={WELLNESS_SPEND_SUMMARY.yearlySpendLabel}
                value={<NumberFlow value={displayYearlySpend} suffix="원" />}
              />
              <WellnessSpendCard
                icon={wallet}
                iconClassName="h-16.5 w-15.75"
                label={WELLNESS_SPEND_SUMMARY.monthlyAvgLabel}
                value={
                  <NumberFlow value={displayMonthlyAvgSpend} suffix="원" />
                }
              />
              <WellnessSpendCard
                icon={lightbulb}
                iconClassName="h-16.75 w-16.25"
                label={WELLNESS_SPEND_SUMMARY.gradeLabel}
                value={grade}
              />
            </div>
          </div>
        </div>
      </div>

      <BottomBar>
        <BottomButton onClick={() => navigate('/wellness/saving-intro')}>
          다음으로
        </BottomButton>
      </BottomBar>
    </div>
  )
}
