import type { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import chevronRight from '@/shared/assets/icons/chevron-right.svg'

interface FlowHeaderProps {
  eyebrow: string
  title: ReactNode
  backTo?: string
  /**
   * 뒤로가기 클릭 시 바로 이동하는 대신 실행할 핸들러.
   * 지정하면 backTo로의 자동 이동 대신 이 함수만 호출됩니다.
   * (예: 이동 전 확인 모달을 띄우는 경우)
   */
  onBack?: () => void
  showBack?: boolean
}

const chevronIcon = (
  <span className="absolute inset-[-7.14%_-14.29%] -scale-x-100">
    <img src={chevronRight} alt="" className="block size-full max-w-none" />
  </span>
)

const CHEVRON_BOX = 'relative mt-3.25 h-3.5 w-1.75 shrink-0'

export default function FlowHeader({
  eyebrow,
  title,
  backTo,
  onBack,
  showBack = true,
}: FlowHeaderProps) {
  const navigate = useNavigate()
  const hasAction = Boolean(backTo || onBack)

  return (
    <div className="shrink-0 px-5 pt-7.5">
      <p className="text-text-secondary text-[15px] leading-4.5 font-semibold tracking-[-0.3px]">
        {eyebrow}
      </p>

      <div className="mt-2.5 flex items-start gap-3.75">
        {showBack &&
          (hasAction ? (
            <button
              type="button"
              onClick={onBack ?? (() => navigate(backTo!))}
              aria-label="뒤로 가기"
              className={`${CHEVRON_BOX} after:absolute after:-inset-3 after:content-['']`}
            >
              {chevronIcon}
            </button>
          ) : (
            <span className={CHEVRON_BOX} aria-hidden="true">
              {chevronIcon}
            </span>
          ))}
        <h1 className="text-text-primary min-w-0 text-[26px] leading-10 font-semibold tracking-[-0.52px] break-keep">
          {title}
        </h1>
      </div>
    </div>
  )
}
