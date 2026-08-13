interface TouchableItemTextOnlyProps {
  label: string
  selected?: boolean
  onClick?: () => void
}

export default function TouchableItemTextOnly({
  label,
  selected = false,
  onClick,
}: TouchableItemTextOnlyProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`flex w-full items-center justify-center px-5 py-5.25 text-left ${
        selected ? 'bg-primary' : 'border-line bg-off-white border-b'
      }`}
    >
      <span
        className={`w-full text-[16px] leading-6.25 font-semibold tracking-[-0.32px] break-keep ${
          selected ? 'text-off-white' : 'text-text-primary'
        }`}
      >
        {label}
      </span>
    </button>
  )
}
