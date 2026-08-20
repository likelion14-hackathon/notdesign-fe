import { useEffect } from 'react'
import navHome from '@/shared/assets/icons/nav-home.svg'
import navInfo from '@/shared/assets/icons/nav-info.svg'
import navPlan from '@/shared/assets/icons/nav-plan.svg'
import navRecord from '@/shared/assets/icons/nav-record.svg'
import MaskIcon from '@/shared/components/MaskIcon'

export type NavTabId = 'home' | 'plan' | 'record' | 'info'

interface NavTab {
  id: NavTabId
  label: string
  icon: string
  iconClass: string
}

const TABS: NavTab[] = [
  { id: 'home', label: '홈', icon: navHome, iconClass: 'size-4' },
  { id: 'plan', label: '플랜', icon: navPlan, iconClass: 'size-4' },
  { id: 'record', label: '기록', icon: navRecord, iconClass: 'size-4' },
  { id: 'info', label: '정보', icon: navInfo, iconClass: 'h-4 w-3.5' },
]

interface BottomNavProps {
  current: NavTabId
  onSelect?: (id: NavTabId) => void
}

export default function BottomNav({ current, onSelect }: BottomNavProps) {
  useEffect(() => {
    // '기록' 탭 청크는 react-day-picker/date-fns를 물고 있어 유독 무거워서,
    // 클릭 시점에 처음 로드하면 Suspense fallback(null) 구간 동안 화면 전체가
    // 잠깐 비었다 다시 그려지며 nav바가 순간 사라졌다 나타나는 것처럼 보인다.
    // 눌리기 전에 미리 로드해 그 공백을 없앤다.
    import('@/features/diary/pages/DiaryCalendar')
  }, [])

  return (
    <nav className="border-nav-border bg-nav-background flex h-15 gap-0 rounded-[100px] border p-0.75 shadow-[0px_0px_8.3px_-5px_rgba(0,0,0,0.25)] backdrop-blur-[2px]">
      {TABS.map((tab) => {
        const selected = tab.id === current
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onSelect?.(tab.id)}
            aria-current={selected ? 'page' : undefined}
            className={`gap-1.875 flex flex-1 flex-col items-center justify-center rounded-[100px] ${
              selected ? 'bg-primary' : ''
            }`}
          >
            <MaskIcon
              src={tab.icon}
              className={`${tab.iconClass} ${
                selected ? 'bg-off-white' : 'bg-text-secondary'
              }`}
            />
            <span
              className={`text-[10px] leading-normal font-medium tracking-[-0.2px] ${
                selected ? 'text-off-white' : 'text-text-secondary'
              }`}
            >
              {tab.label}
            </span>
          </button>
        )
      })}
    </nav>
  )
}
