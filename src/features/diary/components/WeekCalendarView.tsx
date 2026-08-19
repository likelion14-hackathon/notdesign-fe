import { addDays, isSameDay, startOfWeek } from 'date-fns'
import RecordStatusCard from '@/features/diary/components/RecordStatusCard'

interface WeekCalendarViewProps {
  selectedDate: Date
  onSelectDate: (date: Date) => void
}

const WEEK_LABELS = ['월', '화', '수', '목', '금', '토', '일']

export default function WeekCalendarView({
  selectedDate,
  onSelectDate,
}: WeekCalendarViewProps) {
  const weekStart = startOfWeek(selectedDate, { weekStartsOn: 1 })
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i))

  return (
    <div>
      <div className="flex justify-between">
        {weekDays.map((date, i) => {
          const selected = isSameDay(date, selectedDate)
          return (
            <button
              key={date.toISOString()}
              type="button"
              onClick={() => onSelectDate(date)}
              className={`flex flex-col items-center gap-1 rounded-[10px] px-2 py-2 ${
                selected ? 'bg-outline' : ''
              }`}
            >
              <span className="text-text-primary text-center text-base font-semibold">
                {date.getDate()}
              </span>
              <span className="text-text-primary text-xs font-semibold">
                {WEEK_LABELS[i]}
              </span>
            </button>
          )
        })}
      </div>

      <div className="border-line -mx-5 mt-4 mb-6 border-b-2" />

      <RecordStatusCard selectedDate={selectedDate} />
    </div>
  )
}
