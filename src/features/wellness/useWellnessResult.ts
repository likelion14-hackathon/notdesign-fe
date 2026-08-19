import { useMemo } from 'react'
import { useWellnessStore } from '@/features/wellness/store'
import { calculateWellnessResult } from '@/features/wellness/utils'

interface WellnessResultView {
  grade: string
  wasteCost: number
  yearlySpend: number
  monthlyAvgSpend: number
}

/**
 * POST /api/diagnoses 응답(diagnosisResult)이 있으면 그걸 우선 쓰고,
 * 없으면(예: /__dev로 중간 화면에 바로 진입) 기존 로컬 계산으로 대체한다.
 */
export function useWellnessResult(): WellnessResultView {
  const diagnosisResult = useWellnessStore((state) => state.diagnosisResult)
  const procedureCost = useWellnessStore((state) => state.procedureCost)
  const skincareCost = useWellnessStore((state) => state.skincareCost)
  const effectPerceptionId = useWellnessStore(
    (state) => state.effectPerceptionId,
  )
  const contributionAwarenessId = useWellnessStore(
    (state) => state.contributionAwarenessId,
  )

  return useMemo(() => {
    if (diagnosisResult) {
      return {
        grade: diagnosisResult.gradeName,
        wasteCost: diagnosisResult.wasteAmount,
        yearlySpend: diagnosisResult.totalCost,
        monthlyAvgSpend: diagnosisResult.monthlyAverage,
      }
    }

    return calculateWellnessResult({
      procedureCost,
      skincareCost,
      effectPerceptionId,
      contributionAwarenessId,
    })
  }, [
    diagnosisResult,
    procedureCost,
    skincareCost,
    effectPerceptionId,
    contributionAwarenessId,
  ])
}
