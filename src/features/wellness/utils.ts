import {
  WELLNESS_CONTRIBUTION_SCORE,
  WELLNESS_EFFECT_SCORE,
  WELLNESS_SCORE_TABLE,
  type WellnessGrade,
} from '@/features/wellness/constants'

interface WellnessAnswers {
  procedureCost: number
  skincareCost: number
  effectPerceptionId: string | null
  contributionAwarenessId: string | null
}

interface WellnessResult {
  grade: WellnessGrade
  wastePercent: number
  yearlySpend: number
  monthlyAvgSpend: number
  wasteCost: number
}

export function calculateWellnessResult({
  procedureCost,
  skincareCost,
  effectPerceptionId,
  contributionAwarenessId,
}: WellnessAnswers): WellnessResult {
  const effectScore = effectPerceptionId
    ? WELLNESS_EFFECT_SCORE[effectPerceptionId]
    : 0
  const contributionScore = contributionAwarenessId
    ? WELLNESS_CONTRIBUTION_SCORE[contributionAwarenessId]
    : 0
  const totalScore = effectScore + contributionScore
  const { grade, wastePercent } = WELLNESS_SCORE_TABLE[totalScore] ?? {
    grade: '매우 낮음' as const,
    wastePercent: 80,
  }
  const yearlySpend = procedureCost + skincareCost

  return {
    grade,
    wastePercent,
    yearlySpend,
    monthlyAvgSpend: yearlySpend / 12,
    wasteCost: (yearlySpend * wastePercent) / 100,
  }
}

export function formatWon(amount: number) {
  return `${Math.round(amount).toLocaleString()}원`
}
