import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { WELLNESS_CONTRIBUTION_AWARENESS } from '@/features/wellness/constants'
import { useWellnessStore } from '@/features/wellness/store'
import { createDiagnosis } from '@/features/diagnosis/api'
import type { Attribution, FeltEffect } from '@/features/diagnosis/types'
import { ApiError } from '@/shared/api/apiError'
import BottomBar from '@/shared/components/BottomBar'
import BottomButton from '@/shared/components/BottomButton'
import Logo from '@/shared/components/Logo'
import TouchableItemTextOnly from '@/shared/components/TouchableItemTextOnly'

const FELT_EFFECT_BY_ID: Record<string, FeltEffect> = {
  much: 'HIGH',
  moderate: 'MEDIUM',
  little: 'LOW',
}

const ATTRIBUTION_BY_ID: Record<string, Attribution> = {
  well: 'KNOWN',
  guess: 'GUESSED',
  unknown: 'UNKNOWN',
}

export default function WellnessContributionAwarenessPage() {
  const navigate = useNavigate()
  const procedureCost = useWellnessStore((state) => state.procedureCost)
  const skincareCost = useWellnessStore((state) => state.skincareCost)
  const effectPerceptionId = useWellnessStore(
    (state) => state.effectPerceptionId,
  )
  const selectedId = useWellnessStore((state) => state.contributionAwarenessId)
  const setSelectedId = useWellnessStore(
    (state) => state.setContributionAwarenessId,
  )
  const setDiagnosisResult = useWellnessStore(
    (state) => state.setDiagnosisResult,
  )
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleNext = async () => {
    if (
      isSubmitting ||
      selectedId === null ||
      effectPerceptionId === null ||
      !(effectPerceptionId in FELT_EFFECT_BY_ID) ||
      !(selectedId in ATTRIBUTION_BY_ID)
    ) {
      return
    }

    setIsSubmitting(true)
    try {
      const result = await createDiagnosis({
        procedureCost,
        productCost: skincareCost,
        feltEffect: FELT_EFFECT_BY_ID[effectPerceptionId],
        attribution: ATTRIBUTION_BY_ID[selectedId],
      })
      setDiagnosisResult(result)
      navigate('/wellness/waste-reveal')
    } catch (error) {
      setErrorMessage(
        error instanceof ApiError
          ? error.message
          : '진단 결과를 계산하지 못했어요. 다시 시도해주세요.',
      )
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-off-white pb-bottom-bar min-h-screen-safe mx-auto w-full max-w-103.5">
      <Logo />

      <div className="px-5">
        <p className="text-text-secondary text-[15px] leading-4.5 font-semibold tracking-[-0.3px]">
          {WELLNESS_CONTRIBUTION_AWARENESS.eyebrow}
        </p>
        <h1 className="text-text-primary mt-2.75 text-[26px] leading-10 font-semibold tracking-[-0.52px] break-keep">
          {WELLNESS_CONTRIBUTION_AWARENESS.title.join(' ')}
        </h1>
      </div>

      <div className="mt-7.5">
        {WELLNESS_CONTRIBUTION_AWARENESS.options.map((option) => (
          <TouchableItemTextOnly
            key={option.id}
            label={option.label}
            selected={selectedId === option.id}
            onClick={() => setSelectedId(option.id)}
          />
        ))}
      </div>

      <BottomBar>
        {errorMessage && (
          <p className="text-highlight mb-2.75 text-center text-[13px] font-semibold">
            {errorMessage}
          </p>
        )}
        <BottomButton
          disabled={selectedId === null || isSubmitting}
          onClick={handleNext}
        >
          {isSubmitting ? '계산하는 중...' : '다음으로'}
        </BottomButton>
      </BottomBar>
    </div>
  )
}
