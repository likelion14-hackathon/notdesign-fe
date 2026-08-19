import { useEffect, useRef } from 'react'

export default function ViewportDebug() {
  const ref = useRef<HTMLPreElement>(null)
  const enabled =
    typeof window !== 'undefined' &&
    new URLSearchParams(window.location.search).has('vv')

  useEffect(() => {
    if (!enabled) return

    const probe = document.createElement('div')
    probe.style.cssText =
      'position:fixed;top:0;left:0;width:0;height:100dvh;visibility:hidden;pointer-events:none'
    document.body.appendChild(probe)

    let raf = 0
    const tick = () => {
      const el = ref.current
      const vv = window.visualViewport
      if (el && vv) {
        const rect = (name: string) => {
          const target = document.querySelector(`[data-vv="${name}"]`)
          if (!target) return `${name} -`
          const r = target.getBoundingClientRect()
          return `${name} ${Math.round(r.top)}~${Math.round(r.bottom)}`
        }

        el.textContent = [
          `innerH ${window.innerHeight} clientH ${document.documentElement.clientHeight}`,
          `dvh ${probe.offsetHeight} scrollY ${Math.round(window.scrollY)}`,
          `vv.h ${Math.round(vv.height)} vv.top ${Math.round(vv.offsetTop)} vv.pageTop ${Math.round(vv.pageTop)}`,
          `vv.scale ${vv.scale} active ${document.activeElement?.tagName ?? '-'}`,
          rect('overlay'),
          rect('panel'),
        ].join('\n')
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      probe.remove()
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <pre
      className="fixed top-0 left-0 z-[9999] m-0 bg-red-600/90 p-1 text-[10px] leading-tight whitespace-pre text-white"
      ref={ref}
    />
  )
}
