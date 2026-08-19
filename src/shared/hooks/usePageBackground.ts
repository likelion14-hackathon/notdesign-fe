import { useEffect } from 'react'

export function usePageBackground(color: string | null) {
  useEffect(() => {
    if (!color) return

    const html = document.documentElement
    const { body } = document
    const previousHtml = html.style.backgroundColor
    const previousBody = body.style.backgroundColor

    html.style.backgroundColor = color
    body.style.backgroundColor = color

    return () => {
      html.style.backgroundColor = previousHtml
      body.style.backgroundColor = previousBody
    }
  }, [color])
}
