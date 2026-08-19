import { useLocation } from 'react-router-dom'
import PlanResultView from '@/features/measurement/components/PlanResultView'
import type { DiaryAnalysisResult } from '@/features/analyze/types'

export default function Trial_PlanResult() {
  const location = useLocation()
  const analysisResult = location.state as DiaryAnalysisResult | null

  return (
    <PlanResultView
      eyebrow="일주일 플랜 만들기"
      showBack={false}
      metrics={
        analysisResult
          ? {
              pigmentation: analysisResult.skinTone,
              pores: analysisResult.pores,
              erythema: analysisResult.redness,
            }
          : undefined
      }
    />
  )
}
