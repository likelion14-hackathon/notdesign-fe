import { useNavigate } from 'react-router-dom'
import {
  WELLNESS_PROCEDURE_COST,
  WELLNESS_SPENDING_MAX,
  WELLNESS_SPENDING_MAX_LABEL,
} from '@/features/wellness/constants'
import { useWellnessStore } from '@/features/wellness/store'
import BottomBar from '@/shared/components/BottomBar'
import BottomButton from '@/shared/components/BottomButton'
import Logo from '@/shared/components/Logo'
import MoneySlider from '@/shared/components/MoneySlider'

export default function WellnessProcedureCostPage() {
  const navigate = useNavigate()
  const amount = useWellnessStore((state) => state.procedureCost)
  const setAmount = useWellnessStore((state) => state.setProcedureCost)

  return (
    <div className="bg-off-white pb-bottom-bar min-h-screen-safe mx-auto w-full max-w-103.5">
      <Logo />

      <div className="px-5 pt-7.5">
        <p className="text-text-secondary text-[15px] leading-4.5 font-semibold tracking-[-0.3px]">
          {WELLNESS_PROCEDURE_COST.eyebrow}
        </p>
        <h1 className="text-text-primary mt-2.75 text-[26px] leading-10 font-semibold tracking-[-0.52px] break-keep">
          {WELLNESS_PROCEDURE_COST.title.join(' ')}
        </h1>

        <div className="mt-20">
          <MoneySlider
            value={amount}
            onChange={setAmount}
            max={WELLNESS_SPENDING_MAX}
            maxLabel={WELLNESS_SPENDING_MAX_LABEL}
            label={WELLNESS_PROCEDURE_COST.sliderLabel}
          />
        </div>
      </div>

      <BottomBar>
        <BottomButton onClick={() => navigate('/wellness/skincare-cost')}>
          다음으로
        </BottomButton>
      </BottomBar>
    </div>
  )
}
