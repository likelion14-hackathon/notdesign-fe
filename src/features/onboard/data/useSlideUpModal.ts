import { useEffect, useState } from 'react'

interface UseSlideUpModalProps {
  isOpen: boolean
  durationMs?: number
}

export const useSlideUpModal = ({
  isOpen,
  durationMs = 300,
}: UseSlideUpModalProps) => {
  const [shouldRender, setShouldRender] = useState(isOpen)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true)
      setIsVisible(false) // 일단 확실히 숨겨진 상태로 리셋

      // rAF를 두 번 중첩: 브라우저가 "숨겨진 상태"를 한 번 실제로 그리고 난 뒤에
      // isVisible을 true로 바꿔야 transition이 인식됨
      let id2 = 0
      const id1 = requestAnimationFrame(() => {
        id2 = requestAnimationFrame(() => setIsVisible(true))
      })
      return () => {
        cancelAnimationFrame(id1)
        cancelAnimationFrame(id2)
      }
    } else {
      setIsVisible(false)
      const timer = setTimeout(() => setShouldRender(false), durationMs)
      return () => clearTimeout(timer)
    }
  }, [isOpen, durationMs])

  return {
    shouldRender,
    isVisible,
    translateClass: isVisible ? 'translate-y-0' : 'translate-y-full',
  }
}
