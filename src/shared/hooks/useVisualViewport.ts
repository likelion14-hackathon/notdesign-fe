import { useEffect, useState } from 'react'

export interface VisualViewportState {
  height: number
  offsetTop: number
  keyboardHeight: number
}

const KEYBOARD_ANIMATION_MS = 500

const isEditing = () => {
  const el = document.activeElement
  if (!el) return false
  return (
    el.tagName === 'INPUT' ||
    el.tagName === 'TEXTAREA' ||
    (el as HTMLElement).isContentEditable
  )
}

const readViewport = (): VisualViewportState => {
  const vv = window.visualViewport
  if (!vv)
    return { height: window.innerHeight, offsetTop: 0, keyboardHeight: 0 }

  if (!isEditing())
    return { height: vv.height, offsetTop: 0, keyboardHeight: 0 }

  return {
    height: vv.height,
    offsetTop: vv.offsetTop,
    keyboardHeight: Math.max(0, window.innerHeight - vv.height - vv.offsetTop),
  }
}

const isSame = (a: VisualViewportState, b: VisualViewportState) =>
  a.height === b.height &&
  a.offsetTop === b.offsetTop &&
  a.keyboardHeight === b.keyboardHeight

export const useVisualViewport = (enabled = true): VisualViewportState => {
  const [viewport, setViewport] = useState<VisualViewportState>(readViewport)
  const [wasEnabled, setWasEnabled] = useState(enabled)

  if (wasEnabled !== enabled) {
    setWasEnabled(enabled)
    setViewport(readViewport())
  }

  useEffect(() => {
    if (!enabled) return

    const timers: number[] = []

    const update = () =>
      setViewport((prev) => {
        const next = readViewport()
        return isSame(prev, next) ? prev : next
      })

    const updateWithRetries = () => {
      update()
      timers.push(
        window.setTimeout(update, 100),
        window.setTimeout(update, 300),
        window.setTimeout(update, KEYBOARD_ANIMATION_MS + 100),
      )
    }

    update()
    window.addEventListener('focusin', updateWithRetries)
    window.addEventListener('focusout', updateWithRetries)

    const vv = window.visualViewport
    vv?.addEventListener('resize', update)
    vv?.addEventListener('scroll', update)
    if (!vv) window.addEventListener('resize', update)

    return () => {
      timers.forEach(clearTimeout)
      window.removeEventListener('focusin', updateWithRetries)
      window.removeEventListener('focusout', updateWithRetries)
      vv?.removeEventListener('resize', update)
      vv?.removeEventListener('scroll', update)
      if (!vv) window.removeEventListener('resize', update)
    }
  }, [enabled])

  return viewport
}

export const useStableViewportHeight = (): number => {
  const [height, setHeight] = useState(() => window.innerHeight)

  useEffect(() => {
    const update = () => {
      if (!isEditing()) setHeight(window.innerHeight)
    }

    let timer = 0
    const updateAfterKeyboard = () => {
      clearTimeout(timer)
      timer = window.setTimeout(update, KEYBOARD_ANIMATION_MS + 100)
    }

    window.addEventListener('resize', update)
    window.addEventListener('orientationchange', update)
    window.addEventListener('focusout', updateAfterKeyboard)

    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', update)
      window.removeEventListener('orientationchange', update)
      window.removeEventListener('focusout', updateAfterKeyboard)
    }
  }, [])

  return height
}
