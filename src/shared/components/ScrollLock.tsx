import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * 페이지 콘텐츠가 화면 높이보다 짧아 스크롤할 필요가 없을 때는
 * 문서 스크롤 자체를 막아 상하로 흔들리거나 밀리지 않게 고정한다.
 * 콘텐츠가 화면보다 길면 평소처럼 스크롤 가능한 상태를 유지한다.
 */
export default function ScrollLock() {
  const { pathname } = useLocation()

  useEffect(() => {
    const update = () => {
      const fits = document.documentElement.scrollHeight <= window.innerHeight
      document.documentElement.style.overflowY = fits ? 'hidden' : ''
    }

    update()
    window.addEventListener('resize', update)

    const resizeObserver = new ResizeObserver(update)
    resizeObserver.observe(document.body)

    return () => {
      window.removeEventListener('resize', update)
      resizeObserver.disconnect()
      document.documentElement.style.overflowY = ''
    }
  }, [pathname])

  return null
}
