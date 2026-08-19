import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import FlowHeader from '@/features/measurement/components/FlowHeader'
import PlanGeneratingCard from '@/features/measurement/components/PlanGeneratingCard'
import Logo from '@/shared/components/Logo'
import BottomButton from '@/shared/components/BottomButton'
import { createPlan } from '@/features/plan/api'
import { usePlanStore } from '@/features/plan/store'
import { ApiError } from '@/shared/api/apiError'
import type { DiaryAnalysisResult } from '@/features/analyze/types'

const MIN_LOADING_MS = 2400

const PLAN_ERROR_MESSAGE: Partial<Record<string, string>> = {
  C5002: '플랜 생성에 실패했어요. 다시 시도해주세요.',
}

export default function Trial_PlanGenerating() {
  const navigate = useNavigate()
  const location = useLocation()
  const analysisResult = location.state as DiaryAnalysisResult | null
  const setCreatedPlan = usePlanStore((state) => state.setCreatedPlan)
  const hasRequestedRef = useRef(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    if (hasRequestedRef.current) return
    hasRequestedRef.current = true

    if (!analysisResult) {
      const id = requestAnimationFrame(() => {
        setErrorMessage('분석 결과를 찾을 수 없어요. 다시 촬영해주세요.')
      })
      return () => cancelAnimationFrame(id)
    }

    const apiPromise = createPlan({
      mode: 'TRIAL',
      skinTone: analysisResult.skinTone,
      pores: analysisResult.pores,
      redness: analysisResult.redness,
    })
    const minDelayPromise = new Promise((resolve) =>
      setTimeout(resolve, MIN_LOADING_MS),
    )

    Promise.all([apiPromise, minDelayPromise])
      .then(([plan]) => {
        // TRIAL은 월 예산 개념이 없어서, NEW 전용 필드인 monthlyBudget은 0으로 둔다.
        setCreatedPlan(plan, 0)
        navigate('/trial/plan-result', { replace: true, state: analysisResult })
      })
      .catch((error) => {
        const code = error instanceof ApiError ? error.code : null
        const fallback =
          error instanceof Error
            ? error.message
            : '플랜 생성에 실패했어요. 다시 시도해주세요.'
        setErrorMessage((code && PLAN_ERROR_MESSAGE[code]) ?? fallback)
      })
  }, [])

  if (errorMessage) {
    const retryTo = analysisResult ? '/trial/request' : '/trial/capture'

    return (
      <div className="bg-off-white min-h-screen-safe mx-auto flex w-full max-w-103.5 flex-col">
        <Logo />

        <div className="flex flex-1 flex-col items-center justify-center gap-4 px-5 text-center">
          <p className="text-text-primary text-base font-semibold break-keep">
            {errorMessage}
          </p>
          <div className="w-full max-w-60">
            <BottomButton
              onClick={() =>
                navigate(retryTo, {
                  replace: true,
                  state: analysisResult,
                })
              }
            >
              다시 시도하기
            </BottomButton>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-off-white min-h-screen-safe mx-auto flex w-full max-w-103.5 flex-col">
      <Logo />

      <FlowHeader
        eyebrow="일주일 플랜 만들기"
        title="일주일 플랜을 생성하는 중"
        showBack={false}
      />

      <div className="mt-21.25 px-5">
        <PlanGeneratingCard />
      </div>
    </div>
  )
}
