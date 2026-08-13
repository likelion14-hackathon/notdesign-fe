import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Logo from "@/shared/components/Logo"
import type { NavTabId } from '@/shared/components/BottomNav'
import BottomNav from '@/shared/components/BottomNav'
import MonthNavHeader from "@/features/diary/components/MonthNavHeader"
import MonthGrid from "@/features/diary/components/MonthGrid"
import WeekCalendarView from "@/features/diary/components/WeekCalendarView"
import calendarIcon from "@/shared/assets/icons/calendar.svg"

type ViewMode = "month" | "week"

export default function DiaryCalendar() {
  const navigate = useNavigate()
  const [viewMode, setViewMode] = useState<ViewMode>("month")
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [month, setMonth] = useState<Date>(new Date())

  const handleTabSelect = (id: NavTabId) => {
    if (id === "record") return
    if (id === 'plan') navigate('/plan')
    if (id === 'info') navigate('/my')
    if (id === 'home') navigate('/')  
  }


  return (
    <div className='bg-off-white mx-auto flex h-svh w-full max-w-103.5 flex-col'>
      <Logo />

      <div className='flex items-center justify-between px-5 pt-6'>
        <h1 className='text-text-primary text-[26px] leading-10 font-semibold tracking-[-0.52px]'>
          기록
        </h1>
        <button
          type='button'
          onClick={() => setViewMode(viewMode === "month" ? "week" : "month")}
          className='text-primary flex items-center gap-1'
        >
          <img src={calendarIcon} alt='' className='size-3.5' />
          <span className='flex h-[18px] w-16 items-center text-sm font-semibold'>
            {viewMode === "month" ? "주차별보기" : "월별보기"}
          </span>
        </button>
      </div>

      <div className='min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pt-3'>
        {viewMode === "month" ? (
          <>
            <MonthNavHeader month={month} onMonthChange={setMonth} />
            <MonthGrid
              month={month}
              onMonthChange={setMonth}
              selectedDate={selectedDate}
              onSelectDate={(date) => {
                setSelectedDate(date)
                setViewMode("week")
              }}
            />
          </>
        ) : (
          <WeekCalendarView
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
          />
        )}
      </div>

      <div className='flex w-full shrink-0 justify-center px-5 pb-[calc(20px+env(safe-area-inset-bottom))] pt-3'>
        <div className='w-full max-w-[343px]'>
          <BottomNav current='record' onSelect={handleTabSelect} />
        </div>
      </div>
    </div>
  )
}