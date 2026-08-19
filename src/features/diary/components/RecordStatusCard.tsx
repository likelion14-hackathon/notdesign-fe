import { useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
import BottomButton from '@/shared/components/BottomButton'
import SkeletonBar from '@/shared/components/SkeletonBar'
import { useDiaryStore } from '@/features/diary/data/store'
import { useDiaryDetail } from '@/features/diary/hooks/useDiaryDetail'
import { ApiError } from '@/shared/api/apiError'
import recordIcon from '@/shared/assets/icons/record.svg'

interface RecordStatusCardProps {
  selectedDate: Date
}

const SCORE_ROWS = [
  {
    field: 'skinTone' as const,
    label: '피부 톤',
    description: '오늘 피부 색에 대한 점수예요',
  },
  {
    field: 'pores' as const,
    label: '모공',
    description: '오늘 모공이 얼마나 눈에 띄었는지에 대한 점수예요',
  },
  {
    field: 'flushing' as const,
    label: '붉은기',
    description: '오늘 피부가 얼마나 붉었는지에 대한 점수예요',
  },
]

export default function RecordStatusCard({
  selectedDate,
}: RecordStatusCardProps) {
  const navigate = useNavigate()
  const dateKey = format(selectedDate, 'yyyy-MM-dd')
  const startRecord = useDiaryStore((state) => state.startRecord)
  const {
    data: detail,
    isLoading,
    isError,
    error,
  } = useDiaryDetail(dateKey)

  const isNotFound = error instanceof ApiError && error.status === 404

  if (isLoading) {
    return (
      <div className="mx-auto flex w-93.5 flex-col gap-4">
        {SCORE_ROWS.map((row) => (
          <div
            key={row.field}
            className="border-outline flex h-38.75 w-93.5 flex-col justify-between rounded-2xl border bg-white p-4"
          >
            <div>
              <SkeletonBar className="w-20" />
              <SkeletonBar className="mt-2 w-[70%]" />
            </div>
            <SkeletonBar className="w-full" />
          </div>
        ))}
      </div>
    )
  }

  if (isError && !isNotFound) {
    const message =
      error instanceof ApiError ? error.message : '기록을 불러오지 못했어요.'
    return (
      <div className="mx-auto w-83.75">
        <div className="border-outline bg-box-background flex h-57.5 w-full flex-col items-center justify-center rounded-2xl border text-center">
          <p className="text-text-secondary text-sm">{message}</p>
        </div>
      </div>
    )
  }

  if (detail) {
    return (
      <div className="mx-auto flex w-93.5 flex-col gap-4">
        {SCORE_ROWS.map((row) => (
          <div
            key={row.field}
            className="border-outline flex h-38.75 w-93.5 flex-col justify-between rounded-2xl border bg-white p-4"
          >
            <div>
              <p className="text-text-primary text-base font-semibold">
                {row.label}
              </p>
              <p className="text-text-secondary mt-1 text-sm">
                {row.description}
              </p>
            </div>
            <div>
              <div className="text-text-secondary flex justify-between text-[13px] font-medium">
                <span>0점</span>
                <span>10점</span>
              </div>
              <div className="relative mt-2 h-7.5">
                <div className="bg-line absolute top-1/2 h-2 w-full -translate-y-1/2 rounded-full" />
                <div
                  className="bg-primary pointer-events-none absolute top-1/2 size-7.5 -translate-y-1/2 rounded-full"
                  style={{
                    left: `calc((100% - 30px) * ${(detail[row.field] / 10) * 100} / 100)`,
                  }}
                />
              </div>
              <p className="text-primary mt-1 text-center text-[13px] font-medium">
                {detail[row.field]}점
              </p>
            </div>
          </div>
        ))}

        <div className="border-outline rounded-2xl border bg-white p-5">
          <p className="text-text-primary text-base font-semibold">
            체크리스트
          </p>
          <p className="text-text-secondary mt-1 text-sm">
            오늘 피부를 위해 얼마나 노력했나요?
          </p>
          <div className="mt-4 flex flex-col gap-3">
            {detail.todos.length === 0 && (
              <p className="text-text-secondary text-sm">
                등록된 체크리스트가 없어요
              </p>
            )}
            {detail.todos.map((todo) => (
              <div key={todo.checklistId} className="flex items-center gap-2">
                <div
                  className={`flex size-5 items-center justify-center rounded-md border-2 ${
                    todo.done ? 'bg-primary border-primary' : 'border-line'
                  }`}
                >
                  {todo.done && (
                    <svg viewBox="0 0 12 12" fill="none" className="size-3">
                      <path
                        d="M2.5 6L5 8.5L9.5 3.5"
                        stroke="white"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
                <span
                  className={`text-sm ${todo.done ? 'text-primary font-semibold' : 'text-text-primary'}`}
                >
                  {todo.content}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="border-outline rounded-2xl border bg-white p-5">
          <p className="text-text-primary text-base font-semibold">피부 일기</p>
          <p className="text-text-secondary mt-1 text-sm">
            오늘 내 습관은 얼마나 좋았는지, 하루에 대해 가볍게 적어봐요
          </p>
          <div className="border-outline mt-4 min-h-40 rounded-xl border p-4">
            <p className="text-primary text-sm whitespace-pre-wrap">
              {detail.comment || '작성한 내용이 없어요'}
            </p>
          </div>
        </div>
      </div>
    )
  }

  // 404 (C404) — 그 날짜에 기록이 없는 정상적인 빈 상태
  return (
    <div className="mx-auto w-83.75">
      <div className="border-outline bg-box-background flex h-57.5 w-full flex-col items-center justify-center rounded-2xl border text-center">
        <div className="flex h-33.75 w-40.25 flex-col items-center justify-center gap-5.75">
          <img src={recordIcon} alt="" className="size-13" />
          <p className="text-text-primary w-40.25 text-base font-semibold">
            아직 기록하지 않았어요
          </p>
          <p className="text-text-secondary text-sm leading-4 whitespace-nowrap">
            오늘의 하루를 기록해 볼까요?
          </p>
        </div>
      </div>
      <div className="mt-4">
        <BottomButton
          onClick={() => {
            startRecord(dateKey)
            navigate('/diary/photo-select')
          }}
        >
          기록하기
        </BottomButton>
      </div>
    </div>
  )
}
