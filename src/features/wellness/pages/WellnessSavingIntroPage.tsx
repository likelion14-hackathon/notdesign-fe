import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { WELLNESS_SAVING_INTRO } from '@/features/wellness/constants'
import Logo from '@/shared/components/Logo'

const AUTO_ADVANCE_MS = 2400

export default function WellnessSavingIntroPage() {
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/wellness/plan-teaser', { replace: true })
    }, AUTO_ADVANCE_MS)

    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <div className="bg-off-white min-h-screen-safe mx-auto flex w-full max-w-103.5 flex-col">
      <Logo />

      <div className="px-5">
        <h1 className="text-text-primary text-center text-[26px] leading-10 font-semibold tracking-[-0.52px] break-keep">
          {WELLNESS_SAVING_INTRO.title[0]}
          <br />
          {WELLNESS_SAVING_INTRO.title[1]}
        </h1>
      </div>
    </div>
  )
}
