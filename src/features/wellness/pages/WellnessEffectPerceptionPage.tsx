import { useNavigate } from 'react-router-dom'
import { WELLNESS_EFFECT_PERCEPTION } from '@/features/wellness/constants'
import { useWellnessStore } from '@/features/wellness/store'
import BottomBar from '@/shared/components/BottomBar'
import BottomButton from '@/shared/components/BottomButton'
import Logo from '@/shared/components/Logo'
import TouchableItemTextOnly from '@/shared/components/TouchableItemTextOnly'

export default function WellnessEffectPerceptionPage() {
  const navigate = useNavigate()
  const selectedId = useWellnessStore((state) => state.effectPerceptionId)
  const setSelectedId = useWellnessStore((state) => state.setEffectPerceptionId)

  return (
    <div className="bg-off-white pb-bottom-bar min-h-screen-safe mx-auto w-full max-w-103.5">
      <Logo />

      <div className="px-5 pt-7.5">
        <p className="text-text-secondary text-[15px] leading-4.5 font-semibold tracking-[-0.3px]">
          {WELLNESS_EFFECT_PERCEPTION.eyebrow}
        </p>
        <h1 className="text-text-primary mt-2.75 text-[26px] leading-10 font-semibold tracking-[-0.52px] break-keep">
          {WELLNESS_EFFECT_PERCEPTION.title.join(' ')}
        </h1>
      </div>

      <div className="mt-7.5">
        {WELLNESS_EFFECT_PERCEPTION.options.map((option) => (
          <TouchableItemTextOnly
            key={option.id}
            label={option.label}
            selected={selectedId === option.id}
            onClick={() => setSelectedId(option.id)}
          />
        ))}
      </div>

      <BottomBar>
        <BottomButton
          disabled={selectedId === null}
          onClick={() => navigate('/wellness/contribution-awareness')}
        >
          다음으로
        </BottomButton>
      </BottomBar>
    </div>
  )
}
