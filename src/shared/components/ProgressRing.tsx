const SIZE = 82
const STROKE_WIDTH = 8.2
const RADIUS = (SIZE - STROKE_WIDTH) / 2
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

interface ProgressRingProps {
  percentage: number
  tone: 'primary' | 'dark'
  className?: string
}

export default function ProgressRing({
  percentage,
  tone,
  className,
}: ProgressRingProps) {
  const offset = CIRCUMFERENCE * (1 - percentage / 100)

  return (
    <svg
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      className={className}
      role="img"
      aria-label={`${percentage}%`}
    >
      <circle
        cx={SIZE / 2}
        cy={SIZE / 2}
        r={RADIUS}
        fill="none"
        stroke="var(--color-line)"
        strokeWidth={STROKE_WIDTH}
      />
      <circle
        cx={SIZE / 2}
        cy={SIZE / 2}
        r={RADIUS}
        fill="none"
        stroke={
          tone === 'primary'
            ? 'var(--color-primary)'
            : 'var(--color-text-primary)'
        }
        strokeWidth={STROKE_WIDTH}
        strokeDasharray={CIRCUMFERENCE}
        strokeDashoffset={offset}
        transform={`rotate(-90 ${SIZE / 2} ${SIZE / 2})`}
      />
    </svg>
  )
}
