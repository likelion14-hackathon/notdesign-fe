import {
  FINAL_REPORT_TIMELINE_ROWS,
  PLAN_TIMELINE_WEEK_MARKERS,
} from '@/features/measurement/constants'
import type { ActionTimelineRow } from '@/features/measurement/types'

const LABEL_COLUMN = 'w-24.5 shrink-0'

interface ActionTimelineChartProps {
  /** 없으면 기존 목업을 보여줌 */
  rows?: ActionTimelineRow[]
}

export default function ActionTimelineChart({ rows }: ActionTimelineChartProps) {
  const timelineRows = rows ?? FINAL_REPORT_TIMELINE_ROWS
  return (
    <div className="w-full">
      <div className="flex">
        <span className={LABEL_COLUMN} aria-hidden="true" />
        <div className="text-text-secondary flex flex-1 justify-between text-[10px] leading-3 font-semibold tracking-[-0.2px]">
          {PLAN_TIMELINE_WEEK_MARKERS.map((week, index) => (
            <span
              key={week}
              className={
                index === PLAN_TIMELINE_WEEK_MARKERS.length - 1
                  ? 'text-right'
                  : ''
              }
            >
              {week}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-2.75 flex flex-col gap-2.25">
        {timelineRows.map((row) => (
          <div key={row.label} className="flex items-center">
            <span
              className={`${LABEL_COLUMN} text-text-primary text-[11px] leading-3.25 font-semibold tracking-[-0.22px]`}
            >
              {row.label}
            </span>
            <div className="flex flex-1 gap-0.5">
              {row.activeWeeks.map((active, weekIndex) => (
                <div
                  key={weekIndex}
                  className={`h-4.5 flex-1 rounded-[3px] ${
                    active ? 'bg-primary' : 'bg-outline'
                  }`}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
