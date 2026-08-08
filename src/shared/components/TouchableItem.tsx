interface TouchableItemProps {
  title: string
  description: string
  selected?: boolean
  onClick?: () => void
}

export default function TouchableItem({
  title,
  description,
  selected = false,
  onClick,
}: TouchableItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`border-line flex h-23 w-full flex-col items-start gap-2.5 border-b px-5 pt-6 pb-5.75 text-left ${
        selected ? 'bg-primary' : 'bg-off-white'
      }`}
    >
      <span
        className={`w-full truncate text-[16px] leading-4.75 font-semibold tracking-[-0.32px] ${
          selected ? 'text-off-white' : 'text-text-primary'
        }`}
      >
        {title}
      </span>
      <span
        className={`w-full truncate text-[13px] leading-4 font-medium tracking-[-0.26px] ${
          selected ? 'text-off-white-sub' : 'text-text-secondary'
        }`}
      >
        {description}
      </span>
    </button>
  )
}
