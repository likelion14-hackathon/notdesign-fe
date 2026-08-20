import { useEffect, useRef, useState } from 'react'
import { useWellnessStore } from '@/features/wellness/store'

/**
 * 카운트업 카드 값을 같은 id로는 딱 한 번만 0 → targetValue로 애니메이션한다.
 * waste-reveal → yearly-spend-reveal → monthly-avg-reveal → spend-summary 처럼
 * 같은 카드가 여러 페이지에 걸쳐 반복 등장할 때, id가 같으면 먼저 등장한 페이지에서
 * 이미 카운트업이 끝난 값을 이어받아 즉시 최종값을 보여주고 다시 애니메이션하지 않는다.
 *
 * id는 "다시 보여줄 때 애니메이션이 한 번 더 필요한 화면 묶음" 단위로 네임스페이스를
 * 분리해서 쓴다 (예: 'wasteCost' vs 'plan-wasteCost'). plan-teaser~plan-cta 구간은
 * waste-reveal~spend-summary 구간과 별도 그룹이라, 값을 이미 한 번 보여줬어도
 * 그 구간에 처음 진입할 때는 다시 카운트업된다.
 */
export function useRevealOnce(id: string, targetValue: number): number {
  const alreadyRevealed = useWellnessStore(
    (state) => state.revealedMetrics[id] ?? false,
  )
  const markMetricRevealed = useWellnessStore(
    (state) => state.markMetricRevealed,
  )
  const [displayValue, setDisplayValue] = useState(() =>
    alreadyRevealed ? Math.round(targetValue) : 0,
  )
  const hasStartedRef = useRef(alreadyRevealed)

  useEffect(() => {
    if (hasStartedRef.current) return

    const frameId = requestAnimationFrame(() => {
      hasStartedRef.current = true
      setDisplayValue(Math.round(targetValue))
      markMetricRevealed(id)
    })
    return () => cancelAnimationFrame(frameId)
  }, [id, targetValue, markMetricRevealed])

  return displayValue
}
