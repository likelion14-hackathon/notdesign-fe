import { useEffect } from 'react'

const DEFAULT_THEME_COLOR = '#f9f7f4'

/**
 * iOS Safari는 상태바/주소창 색을 <meta name="theme-color">에 맞춰 표시한다.
 * 어두운 배경의 페이지에서 기본값(밝은 배경)을 그대로 두면 상단에 흰 띠가 보이므로,
 * 페이지 진입 시 배경색을 맞추고 이탈 시 기본값으로 되돌린다.
 */
export function useThemeColor(color: string) {
  useEffect(() => {
    const meta = document.querySelector('meta[name="theme-color"]')
    const previous = meta?.getAttribute('content') ?? DEFAULT_THEME_COLOR

    meta?.setAttribute('content', color)

    return () => {
      meta?.setAttribute('content', previous)
    }
  }, [color])
}
