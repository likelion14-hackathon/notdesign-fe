interface ScoreSliderProps {
  value: number
  onChange: (value: number) => void
  max?: number
  step?: number
  label?: string
}

function formatScore(value: number) {
  return `${value}점`
}

export default function ScoreSlider({
  value,
  onChange,
  max = 10,
  step = 1,
  label,
}: ScoreSliderProps) {
  const percent = (value / max) * 100

  return (
    <div className="w-full">
      <div className="text-text-secondary flex justify-between text-[13px] leading-normal font-medium tracking-[-0.26px]">
        <span>0점</span>
        <span>{max}점</span>
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
            {formatScore(value)}
          </p>
        </div>
      </div>
    </div>
  )
}
