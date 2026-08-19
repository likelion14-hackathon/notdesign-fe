import {
  PLAN_TIMELINE_INSIGHT,
  PLAN_TIMELINE_ROWS,
  PLAN_TIMELINE_WEEK_MARKERS,
} from '@/features/measurement/constants'
import type { PlanTimelineRow } from '@/features/measurement/types'

const LABEL_COLUMN = 'w-24.5 shrink-0'

interface PlanTimelineSectionProps {
  insightPosition?: 'above' | 'below'
  /** 없으면 기존 목업 행을 보여줌 */
  rows?: PlanTimelineRow[]
  weekMarkers?: string[]
  insight?: string
}

export default function PlanTimelineSection({
  insightPosition = 'below',
  rows = PLAN_TIMELINE_ROWS,
  weekMarkers = PLAN_TIMELINE_WEEK_MARKERS,
  insight = PLAN_TIMELINE_INSIGHT,
}: PlanTimelineSectionProps) {
  const insightBox = insight ? (
    <div className="border-outline bg-off-white mt-4.75 flex items-center justify-center rounded-[10px] border px-5 pt-3 pb-2.75">
      <p className="text-primary text-[12px] leading-5 font-semibold tracking-[-0.24px]">
        {insight}
      </p>
    </div>
  ) : null

  const chart = (
    <div className={insightPosition === 'above' ? 'mt-7' : 'mt-5.5'}>
      <div className="flex">
        <span className={LABEL_COLUMN} aria-hidden="true" />
        <div className="text-text-secondary flex flex-1 justify-between text-[10px] leading-3 font-semibold tracking-[-0.2px]">
          {weekMarkers.map((week, index) => (
            <span
              key={week}
              className={index === weekMarkers.length - 1 ? 'text-right' : ''}
            >
              {week}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-2.75 flex flex-col gap-2.25">
        {rows.map((row) => (
          <div key={row.category} className="flex items-center">
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

  return (
    <div className="w-full px-5">
      <h2 className="text-text-primary text-[16px] leading-4.75 font-semibold tracking-[-0.32px]">
        타임라인
      </h2>

      {insightPosition === 'above' ? (
        <>
          {insightBox}
          {chart}
        </>
      ) : (
        <>
          {chart}
          {insightBox}
        </>
      )}
    </div>
  )
}
