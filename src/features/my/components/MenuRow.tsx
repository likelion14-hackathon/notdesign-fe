import chevronRight from '@/shared/assets/icons/chevron-right.svg'
import MaskIcon from '@/shared/components/MaskIcon'

interface MenuRowProps {
  title: string
  description?: string
  highlighted?: boolean
  onClick?: () => void
}

/** 플랜/계정 섹션의 목록 행. description 유무에 따라 높이가 달라짐 */
export default function MenuRow({
  title,
  description,
  highlighted = false,
  onClick,
}: MenuRowProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`border-line flex w-full items-center justify-between gap-4 border-b px-5 text-left ${
        description ? 'h-24.75' : 'h-19'
      }`}
    >
      <span className="min-w-0">
        <span
          className={`block text-[16px] leading-4.75 font-semibold tracking-[-0.32px] ${
            highlighted ? 'text-highlight' : 'text-text-primary'
          }`}
        >
          {title}
        </span>
        {description && (
          <span className="text-text-secondary mt-2 block text-[14px] leading-4.5 font-medium tracking-[-0.28px]">
            {description}
          </span>
        )}
      </span>
      <MaskIcon
        src={chevronRight}
        className="bg-off-white-sub h-4.5 w-2.75 shrink-0"
      />
    </button>
  )
}
