import NumberFlow from '@number-flow/react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import chevronDown from '@/shared/assets/icons/chevron-down.svg'
import piggyBank from '@/shared/assets/images/piggy-bank.png'
import rocket from '@/shared/assets/images/rocket.png'
import { WELLNESS_PLAN_TEASER_EXPAND } from '@/features/wellness/constants'
import WellnessSpendCard from '@/features/wellness/components/WellnessSpendCard'
import { useRevealOnce } from '@/features/wellness/useRevealOnce'
import { useWellnessResult } from '@/features/wellness/useWellnessResult'
import Logo from '@/shared/components/Logo'

/** 다음 화면(플랜 안내)으로 자동 전환되기까지의 시간(ms) */
const AUTO_ADVANCE_MS = 2400

export default function WellnessPlanTeaserExpandPage() {
  const navigate = useNavigate()
  const { yearlySpend } = useWellnessResult()

  const displayYearlySpend = useRevealOnce('plan-yearlySpend', yearlySpend)

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/wellness/plan-cta', { replace: true })
    }, AUTO_ADVANCE_MS)

    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <div className="bg-off-white min-h-screen-safe mx-auto flex w-full max-w-103.5 flex-col">
      <Logo />

      <div className="flex flex-col gap-7.5 px-5">
        <h1 className="text-text-primary text-center text-[26px] leading-10 font-semibold tracking-[-0.52px] break-keep">
          {WELLNESS_PLAN_TEASER_EXPAND.title[0]}
          <br />
          {WELLNESS_PLAN_TEASER_EXPAND.title[1]}
        </h1>

        <div className="border-primary flex min-h-[121px] items-start gap-4 rounded-[20px] border-2 pt-[25px] pr-[24px] pb-[21px] pl-[25px]">
          <img src={rocket} alt="" className="h-[75px] w-[70px] shrink-0" />
          <div className="flex flex-col items-start gap-2">
            <p className="text-primary text-[14px] font-semibold tracking-[-0.28px]">
              {WELLNESS_PLAN_TEASER_EXPAND.cardTitle}
            </p>
            <p className="text-text-secondary text-[12px] leading-5.5 font-medium tracking-[-0.24px] break-keep">
              {WELLNESS_PLAN_TEASER_EXPAND.cardDescription}
            </p>
          </div>
        </div>

        <div className="mx-8.5">
          <WellnessSpendCard
            icon={piggyBank}
            iconClassName="h-[79px] w-[82px]"
            label={WELLNESS_PLAN_TEASER_EXPAND.yearlySpendLabel}
            value={<NumberFlow value={displayYearlySpend} suffix="원" />}
          />
        </div>

        <img src={chevronDown} alt="" className="mx-auto block h-2.25 w-4" />
      </div>
    </div>
  )
}
