import { useRef } from 'react'

interface UseSwipeAndZoneProps {
  currentIndex: number
  totalSlides: number
  onSlideChange: (index: number) => void
  swipeThreshold?: number
  leftZoneRatio?: number
}

export const useSwipeAndZone = ({
  currentIndex,
  totalSlides,
  onSlideChange,
  swipeThreshold = 50,
  leftZoneRatio = 0.35,
}: UseSwipeAndZoneProps) => {
  const startX = useRef<number | null>(null)
  const startY = useRef<number | null>(null)
  const isDragging = useRef(false)

  const goTo = (index: number) => {
    if (index < 0 || index > totalSlides - 1) return
    onSlideChange(index)
  }

  const handlePointerDown = (e: React.PointerEvent) => {
    // 버튼(인디케이터 등) 위에서 시작한 터치/클릭은 무시
    if ((e.target as HTMLElement).closest('button')) return

    startX.current = e.clientX
    startY.current = e.clientY
    isDragging.current = true

    // 마우스 드래그 중 다른 요소로 포인터가 빠져나가도 이벤트를 계속 받기 위함
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
  }

  const handlePointerUp = (e: React.PointerEvent) => {
    if (
      !isDragging.current ||
      startX.current === null ||
      startY.current === null
    ) {
      return
    }
    isDragging.current = false

    const endX = e.clientX
    const endY = e.clientY
    const distanceX = startX.current - endX
    const distanceY = Math.abs(startY.current - endY)

    // 세로로 더 많이 움직였으면 스크롤 의도로 보고 무시
    if (
      Math.abs(distanceX) < swipeThreshold ||
      distanceY > Math.abs(distanceX)
    ) {
      // 스와이프로 인정 안 됨 -> zone 클릭으로 판정
      const container = e.currentTarget as HTMLElement
      const rect = container.getBoundingClientRect()
      const clickXRatio = (endX - rect.left) / rect.width

      if (clickXRatio < leftZoneRatio) {
        goTo(currentIndex - 1)
      } else {
        goTo(currentIndex + 1)
      }
      startX.current = null
      startY.current = null
      return
    }

    // 스와이프 판정
    if (distanceX > swipeThreshold) {
      goTo(currentIndex + 1) // 왼쪽으로 스와이프 -> 다음
    } else if (distanceX < -swipeThreshold) {
      goTo(currentIndex - 1) // 오른쪽으로 스와이프 -> 이전
    }

    startX.current = null
    startY.current = null
  }

  return {
    onPointerDown: handlePointerDown,
    onPointerUp: handlePointerUp,
  }
}
