import { useNavigate } from 'react-router-dom'
import { WELLNESS_INTRO } from '@/features/wellness/constants'
import BottomBar from '@/shared/components/BottomBar'
import BottomButton from '@/shared/components/BottomButton'
import Logo from '@/shared/components/Logo'
import { useWellnessStore } from '@/features/wellness/store'

export default function WellnessIntroPage() {
  const navigate = useNavigate()
  const entryFlow = useWellnessStore((state) => state.entryFlow)
  const skipTo =
    entryFlow === 'trial' ? '/trial' : '/measurement/center-select'

  return (
    <div className="bg-off-white pb-bottom-bar min-h-screen-safe mx-auto w-full max-w-103.5">
      <Logo />

      <div className="px-5">
        <p className="text-text-secondary text-[15px] leading-4.5 font-semibold tracking-[-0.3px]">
          {WELLNESS_INTRO.eyebrow}
        </p>
        <h1 className="text-text-primary mt-2.75 text-[26px] leading-10 font-semibold tracking-[-0.52px] break-keep">
          {WELLNESS_INTRO.title.join(' ')}
        </h1>
      </div>

      <BottomBar>
        <button
          type="button"
          onClick={() => navigate(skipTo)}
          className="text-primary mb-5 block w-full text-center text-[16px] leading-4.75 font-semibold tracking-[-0.32px]"
        >
          {WELLNESS_INTRO.skipLabel}
        </button>
        <BottomButton onClick={() => navigate('/wellness/procedure-cost')}>
          {WELLNESS_INTRO.startButtonLabel}
        </BottomButton>
      </BottomBar>
    </div>
  )
}
