import type { ReactNode } from 'react'

/**
 * 화면 하단에 고정되는 바(네비게이션/CTA 버튼).
 * 이 바를 쓰는 페이지의 콘텐츠에는 `pb-bottom-bar`를 넣어 가려지는 만큼 여백을 확보해야 함.
 */
export default function BottomBar({ children }: { children: ReactNode }) {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-20 mx-auto w-full max-w-103.5">
      <div className="from-off-white pointer-events-auto bg-linear-to-t from-70% to-transparent px-5 pt-5 pb-[max(35px,env(safe-area-inset-bottom))]">
        {children}
      </div>
    </div>
  )
}
