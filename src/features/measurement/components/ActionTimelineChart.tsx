import { PLAN_TIMELINE_WEEK_MARKERS } from '@/features/measurement/constants'
import type {
  ActionTimelineRow,
  ActionTimelineWeek,
} from '@/features/measurement/types'

const LABEL_COLUMN = 'w-24.5 shrink-0'

const WEEK_COLOR: Record<ActionTimelineWeek, string> = {
  done: 'bg-primary',
  planned: 'bg-primary/35',
  none: 'bg-outline',
}

interface ActionTimelineChartProps {
  rows: ActionTimelineRow[]
}

export default function ActionTimelineChart({
  rows,
}: ActionTimelineChartProps) {
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
        {rows.map((row) => (
          <div key={row.label} className="flex items-center">
            <span
              className={`${LABEL_COLUMN} text-text-primary text-[11px] leading-3.25 font-semibold tracking-[-0.22px]`}
            >
              {row.label}
            </span>
            <div className="flex flex-1 gap-0.5">
              {row.weeks.map((state, weekIndex) => (
                <div
                  key={weekIndex}
                  className={`h-4.5 flex-1 rounded-[3px] ${WEEK_COLOR[state]}`}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="text-text-secondary mt-2.75 flex items-center gap-3 text-[10px] leading-3 font-semibold tracking-[-0.2px]">
        <span className="flex items-center gap-1">
          <span className="bg-primary size-2 rounded-[2px]" />
          실천
        </span>
        <span className="flex items-center gap-1">
          <span className="bg-primary/35 size-2 rounded-[2px]" />
          계획
        </span>
      </div>
    </div>
  )
}
