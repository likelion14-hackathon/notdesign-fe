export function scoreStatus(score: number): string {
  if (score < 50) return '개선 필요'
  if (score < 75) return '보통'
  return '양호'
}
