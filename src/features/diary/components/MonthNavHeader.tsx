import { addMonths, format, subMonths } from 'date-fns'

interface MonthNavHeaderProps {
  month: Date
  onMonthChange: (month: Date) => void
}

export default function MonthNavHeader({
  month,
  onMonthChange,
}: MonthNavHeaderProps) {
  const prevMonthLabel = format(subMonths(month, 1), 'M월')
  const nextMonthLabel = format(addMonths(month, 1), 'M월')

  return (
    <div className="w-full">
      <div className="flex h-auto w-full items-center justify-between px-1 py-6">
        <button
          type="button"
          onClick={() => onMonthChange(subMonths(month, 1))}
          className="text-text-secondary flex items-center gap-1 text-sm font-medium"
        >
          <span>‹</span>
          <span>{prevMonthLabel}</span>
        </button>
        <span className="text-primary text-xl font-bold">
          {format(month, 'M월')}
        </span>
        <button
          type="button"
          onClick={() => onMonthChange(addMonths(month, 1))}
          className="text-text-secondary flex items-center gap-1 text-sm font-medium"
        >
          <span>{nextMonthLabel}</span>
          <span>›</span>
        </button>
      </div>
      <div className="border-line -mx-5 border-b-2" />
    </div>
  )
}
