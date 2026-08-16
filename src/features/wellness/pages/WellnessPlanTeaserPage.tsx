import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import rocket from '@/shared/assets/images/rocket.png'
import { WELLNESS_PLAN_TEASER } from '@/features/wellness/constants'
import Logo from '@/shared/components/Logo'

const AUTO_ADVANCE_MS = 2400

export default function WellnessPlanTeaserPage() {
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/wellness/plan-teaser-spend', { replace: true })
    }, AUTO_ADVANCE_MS)

    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <div className="bg-off-white min-h-screen-safe mx-auto flex w-full max-w-103.5 flex-col">
      <Logo />

      <div className="flex flex-col gap-7.5 px-5 pt-9">
        <h1 className="text-text-primary text-center text-[26px] leading-10 font-semibold tracking-[-0.52px] break-keep">
          {WELLNESS_PLAN_TEASER.title[0]}
          <br />
          {WELLNESS_PLAN_TEASER.title[1]}
        </h1>

        <div className="border-primary flex items-start gap-5.75 rounded-[20px] border px-6.25 py-6.25">
          <img src={rocket} alt="" className="h-16.25 w-15.25 shrink-0" />
          <div className="flex flex-col items-start gap-2">
            <p className="text-primary text-[14px] font-semibold tracking-[-0.28px]">
              {WELLNESS_PLAN_TEASER.cardTitle}
            </p>
            <p className="text-text-secondary text-[12px] leading-5.5 font-medium tracking-[-0.24px] break-keep">
              {WELLNESS_PLAN_TEASER.cardDescription}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
