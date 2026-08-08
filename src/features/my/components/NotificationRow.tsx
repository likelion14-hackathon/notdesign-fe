import Switch from '@/shared/components/Switch'

interface NotificationRowProps {
  title: string
  description: string
  checked: boolean
  onChange: (checked: boolean) => void
}

/** 알림 섹션의 목록 행 (제목+설명 + 토글 스위치) */
export default function NotificationRow({
  title,
  description,
  checked,
  onChange,
}: NotificationRowProps) {
  return (
    <div className="border-line flex h-24.75 w-full items-center justify-between gap-4 border-b px-5">
      <span className="min-w-0">
        <span className="text-text-primary block text-[16px] leading-4.75 font-semibold tracking-[-0.32px]">
          {title}
        </span>
        <span className="text-text-secondary mt-2 block text-[14px] leading-4.5 font-medium tracking-[-0.28px]">
          {description}
        </span>
      </span>
      <Switch checked={checked} onChange={onChange} label={title} />
    </div>
  )
}
