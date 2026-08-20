import type { ReactNode } from 'react'

/**
 * 화면 하단에 고정되는 바(네비게이션/CTA 버튼).
 * 이 바를 쓰는 페이지의 콘텐츠에는 `pb-bottom-bar`를 넣어 가려지는 만큼 여백을 확보해야 함.
 *
 * bottom-0(레이아웃 뷰포트 기준) 대신 top-0 + 높이 100dvh(보이는 뷰포트 기준)로 잡는다.
 * iOS는 fixed 요소를 레이아웃 뷰포트에 붙이는데, 주소창 상태나 문서 스크롤 가능 여부에 따라
 * 레이아웃 뷰포트와 실제 보이는 영역이 어긋나면서 바가 화면 아래에 붙지 않는 문제가 있다.
 */
export default function BottomBar({ children }: { children: ReactNode }) {
  return (
    <div className="h-screen-safe pointer-events-none fixed inset-x-0 top-0 z-20 mx-auto flex w-full max-w-103.5 flex-col justify-end">
      <div className="from-off-white pointer-events-auto bg-linear-to-t from-70% to-transparent px-5 pt-5 pb-[max(35px,env(safe-area-inset-bottom))]">
        {children}
      </div>
    </div>
  )
}
