import { DayPicker } from 'react-day-picker'
import 'react-day-picker/style.css'
import { format, isToday } from 'date-fns'
import { useDiaryCalendar } from '@/features/diary/hooks/useDiaryCalendar'
import { ApiError } from '@/shared/api/apiError'

interface MonthGridProps {
  month: Date
  onMonthChange: (month: Date) => void
  selectedDate: Date
  onSelectDate: (date: Date) => void
}

const WEEKDAY_LABELS = ['일', '월', '화', '수', '목', '금', '토']

export default function MonthGrid({
  month,
  onMonthChange,
  selectedDate,
  onSelectDate,
}: MonthGridProps) {
  const year = month.getFullYear()
  // Date.getMonth()는 0부터 시작하니 API가 기대하는 1~12로 맞춰준다.
  const monthNumber = month.getMonth() + 1
  const {
    data: calendarDays,
    isLoading,
    isError,
    error,
  } = useDiaryCalendar(year, monthNumber)

  const recordedDates = new Set(
    (calendarDays ?? []).filter((day) => day.recorded).map((day) => day.date),
  )

  const isRecorded = (date: Date) => recordedDates.has(format(date, 'yyyy-MM-dd'))

  const errorMessage =
    isError && error instanceof ApiError
      ? error.message
      : isError
        ? '기록 여부를 불러오지 못했어요.'
        : null

  return (
    <div className="h-auto w-full pt-3">
      {errorMessage && (
        <p className="text-text-secondary mb-2 text-center text-xs">
          {errorMessage}
        </p>
      )}
      <DayPicker
        mode="single"
        selected={selectedDate}
        onSelect={(date) => date && onSelectDate(date)}
        month={month}
        onMonthChange={onMonthChange}
        weekStartsOn={0}
        showOutsideDays
        style={{ width: '100%' }}
        formatters={{
          formatWeekdayName: (date) => WEEKDAY_LABELS[date.getDay()],
        }}
        classNames={{
          month_caption: 'hidden',
          months: 'w-full',
          month: 'w-full',
          month_grid: 'w-full',
          weekdays: 'grid grid-cols-7 gap-x-[20px] w-full',
          weekday:
            'nth-1:text-orange-500 nth-7:text-blue-500 text-center text-sm font-semibold text-text-secondary pb-3',
          week: 'grid grid-cols-7 gap-x-[20px] w-full mb-1',
          day: 'h-[62px] flex items-center justify-center',
          disabled: 'text-text-secondary',
        }}
        components={{
          Nav: () => null,
          DayButton: (props) => {
            const { day, modifiers, ...rest } = props
            const recorded = isRecorded(day.date)
            const today = isToday(day.date)
            const weekday = day.date.getDay()
            const isSunday = weekday === 0
            const isSaturday = weekday === 6

            return (
              <div className="relative flex h-full flex-col items-center justify-center gap-1">
                <span
                  className={`size-1.25 rounded-full ${
                    isLoading
                      ? 'bg-line animate-pulse'
                      : recorded
                        ? 'bg-primary'
                        : 'bg-transparent'
                  } ${modifiers.outside ? 'opacity-40' : ''}`}
                />
                <button
                  type="button"
                  {...rest}
                  onClick={(event) => {
                    rest.onClick?.(event)
                    // react-day-picker의 mode="single"은 이미 선택된 날짜를 다시 누르면
                    // 선택 해제(onSelect(undefined))로 처리해서 아무 반응이 없어 보인다.
                    // 항상 그 날짜로 선택되도록 명시적으로 한 번 더 호출한다.
                    onSelectDate(day.date)
                  }}
                  className={`mx-auto flex size-9 items-center justify-center rounded-full text-base font-semibold ${
                    modifiers.selected
                      ? 'bg-primary text-off-white opacity-100'
                      : isSunday
                        ? 'text-orange-500'
                        : isSaturday
                          ? 'text-blue-500'
                          : 'text-text-primary'
                  } ${modifiers.outside ? 'opacity-40' : ''}`}
                >
                  {day.date.getDate()}
                </button>
                {today && !modifiers.selected && (
                  <span className="text-primary absolute -bottom-1 text-[9px] font-semibold">
                    오늘
                  </span>
                )}
              </div>
            )
          },
        }}
      />
    </div>
  )
}
