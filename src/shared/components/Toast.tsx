import { useEffect, useState } from 'react'

/** 토스트가 떠 있는 시간(ms) */
const VISIBLE_MS = 3000
/** 사라지는 페이드아웃 시간(ms). 트랜지션 클래스의 duration과 맞춰야 함 */
const FADE_MS = 300

interface ToastProps {
  message: string
}

/** 하단 바 위에 잠깐 떠 있다가 사라지는 알림 pill */
export default function Toast({ message }: ToastProps) {
  const [phase, setPhase] = useState<'visible' | 'fading' | 'hidden'>('visible')

  useEffect(() => {
    const timer = setTimeout(() => setPhase('fading'), VISIBLE_MS)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (phase !== 'fading') return

    const timer = setTimeout(() => setPhase('hidden'), FADE_MS)
    return () => clearTimeout(timer)
  }, [phase])

  if (phase === 'hidden') return null

  return (
    <p
      className={`text-nav-border rounded-full bg-[rgba(21,21,21,0.5)] px-4.75 py-2 text-center text-[13px] leading-normal font-semibold tracking-[-0.26px] backdrop-blur-[2px] transition-opacity duration-300 ${
        phase === 'visible' ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
      role="status"
    >
      {message}
    </p>
  )
}
