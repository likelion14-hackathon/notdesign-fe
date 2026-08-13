interface MoneySliderProps {
  value: number
  onChange: (value: number) => void
  max: number
  step?: number
  maxLabel: string
  minLabel?: string
  label?: string
}

function formatWon(value: number, max: number, maxLabel: string) {
  if (value >= max) return maxLabel
  if (value === 0) return '0원'
  return `${(value / 10000).toLocaleString()}만원`
}

export default function MoneySlider({
  value,
  onChange,
  max,
  step = 100000,
  maxLabel,
  minLabel = '0원',
  label,
}: MoneySliderProps) {
  const percent = (value / max) * 100

  return (
    <div className="w-full">
      <div className="text-text-secondary flex justify-between text-[13px] leading-normal font-medium tracking-[-0.26px]">
        <span>{minLabel}</span>
        <span>{maxLabel}</span>
      </div>

      <div className="relative mt-2.75 h-7.5">
        <div className="bg-line absolute top-1/2 h-2 w-full -translate-y-1/2 rounded-full" />
        <input
          type="range"
          min={0}
          max={max}
          step={step}
          value={value}
          onChange={(event) => onChange(Number(event.target.value))}
          aria-label={label}
          className="absolute inset-0 h-7.5 w-full cursor-pointer opacity-0"
        />
        <div
          className="bg-primary pointer-events-none absolute top-1/2 size-7.5 -translate-y-1/2 rounded-full"
          style={{ left: `calc((100% - 30px) * ${percent} / 100)` }}
        />
        <div
          className="pointer-events-none absolute top-full mt-1.75 flex w-7.5 justify-center"
          style={{ left: `calc((100% - 30px) * ${percent} / 100)` }}
        >
          <p className="text-primary text-[13px] leading-normal font-medium tracking-[-0.26px] whitespace-nowrap">
            {formatWon(value, max, maxLabel)}
          </p>
        </div>
      </div>
    </div>
  )
}
