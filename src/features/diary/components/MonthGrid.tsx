import { DayPicker } from "react-day-picker"
import "react-day-picker/style.css"
import { format, isToday } from "date-fns"
import { RECORDED_DATES } from "@/features/diary/data/diaryData"

interface MonthGridProps {
  month: Date
  onMonthChange: (month: Date) => void
  selectedDate: Date
  onSelectDate: (date: Date) => void
}

const WEEKDAY_LABELS = ["일", "월", "화", "수", "목", "금", "토"]

export default function MonthGrid({
  month,
  onMonthChange,
  selectedDate,
  onSelectDate,
}: MonthGridProps) {
  const isRecorded = (date: Date) =>
    RECORDED_DATES.includes(format(date, "yyyy-MM-dd"))

  return (
    <div className='h-auto w-full pt-3'>
      <DayPicker
        mode='single'
        selected={selectedDate}
        onSelect={(date) => date && onSelectDate(date)}
        month={month}
        onMonthChange={onMonthChange}
        weekStartsOn={0}
        showOutsideDays
        style={{ width: "100%" }}
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
              <div className='relative flex h-full flex-col items-center justify-center gap-1'>
                <span
                  className={`size-1.25 rounded-full ${recorded ? "bg-primary" : "bg-transparent"} ${modifiers.outside ? "opacity-40" : ""}`}
                />
                <button
                  type='button'
                  {...rest}
                  className={`size-9 mx-auto flex items-center justify-center rounded-full text-base font-semibold ${
                    isSunday
                      ? "text-orange-500"
                      : isSaturday
                        ? "text-blue-500"
                        : "text-text-primary"
                  } ${modifiers.outside ? "opacity-40" : ""} ${
                    modifiers.selected
                      ? "bg-primary text-off-white font-semibold opacity-100"
                      : ""
                  }`}
                >
                  {day.date.getDate()}
                </button>
                {today && !modifiers.selected && (
                  <span className='text-primary absolute -bottom-1 text-[9px] font-semibold'>
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