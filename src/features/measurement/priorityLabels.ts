interface ScoreEntry {
  label: string
  percentage: number
}

/** 점수가 낮은 순서대로 정렬 */
export function rankByLowest(scores: {
  pigmentation: number
  pores: number
  erythema: number
}): ScoreEntry[] {
  const entries: ScoreEntry[] = [
    { label: '색소침착', percentage: scores.pigmentation },
    { label: '모공', percentage: scores.pores },
    { label: '홍조', percentage: scores.erythema },
  ]
  return [...entries].sort((a, b) => a.percentage - b.percentage)
}
