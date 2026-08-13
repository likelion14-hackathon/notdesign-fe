import { useNavigate } from 'react-router-dom'
import { WELLNESS_EFFECT_PERCEPTION } from '@/features/wellness/constants'
import { useWellnessStore } from '@/features/wellness/store'
import BottomButton from '@/shared/components/BottomButton'
import Logo from '@/shared/components/Logo'
import TouchableItemTextOnly from '@/shared/components/TouchableItemTextOnly'

export default function WellnessEffectPerceptionPage() {
  const navigate = useNavigate()
  const selectedId = useWellnessStore((state) => state.effectPerceptionId)
  const setSelectedId = useWellnessStore((state) => state.setEffectPerceptionId)

  return (
    <div className="bg-off-white mx-auto flex h-svh w-full max-w-103.5 flex-col">
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

      <div className="min-h-0 flex-1" />

      <div className="shrink-0 px-5 pb-[calc(35px+env(safe-area-inset-bottom))]">
        <BottomButton
          disabled={selectedId === null}
          onClick={() => navigate('/wellness/contribution-awareness')}
        >
          다음으로
        </BottomButton>
      </div>
    </div>
  )
}
