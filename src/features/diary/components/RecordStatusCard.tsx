import { useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
import BottomButton from '@/shared/components/BottomButton'
import { useDiaryStore } from '@/features/diary/data/store'
import recordIcon from '@/shared/assets/icons/record.svg'

interface RecordStatusCardProps {
  selectedDate: Date
}

const SCORE_ROWS = [
  {
    field: 'skinTone' as const,
    label: '피부톤',
    description: '오늘 피부 색에 대한 점수를 매겨요',
  },
  {
    field: 'dryness' as const,
    label: '당김, 건조함 정도',
    description: '오늘 피부의 당김, 건조함 정도에 대한 점수를 매겨요',
  },
  {
    field: 'redness' as const,
    label: '붉은기 정도',
    description: '오늘 내 피부가 얼마나 붉은지에 대한 점수를 매겨요',
  },
]

const CHECKLIST_ITEMS = ['세럼바르기', '영양제', '6.5시간 이상 수면']

export default function RecordStatusCard({
  selectedDate,
}: RecordStatusCardProps) {
  const navigate = useNavigate()
  const dateKey = format(selectedDate, 'yyyy-MM-dd')
  const record = useDiaryStore((state) => state.records[dateKey])
  const startRecord = useDiaryStore((state) => state.startRecord)

  const recorded = Boolean(record)

  if (record) {
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
                    left: `calc((100% - 30px) * ${(record[row.field] / 10) * 100} / 100)`,
                  }}
                />
              </div>
              <p className="text-primary mt-1 text-center text-[13px] font-medium">
                {record[row.field]}점
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
            {CHECKLIST_ITEMS.map((item) => {
              const checked = record.checklist.includes(item)
              return (
                <div key={item} className="flex items-center gap-2">
                  <div
                    className={`flex size-5 items-center justify-center rounded-md border-2 ${
                      checked ? 'bg-primary border-primary' : 'border-line'
                    }`}
                  >
                    {checked && (
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
                    className={`text-sm ${checked ? 'text-primary font-semibold' : 'text-text-primary'}`}
                  >
                    {item}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        <div className="border-outline rounded-2xl border bg-white p-5">
          <p className="text-text-primary text-base font-semibold">피부 일기</p>
          <p className="text-text-secondary mt-1 text-sm">
            오늘 내 습관은 얼마나 좋았는지, 하루에 대해 가볍게 적어봐요
          </p>
          <div className="border-outline mt-4 min-h-40 rounded-xl border p-4">
            <p className="text-primary text-sm whitespace-pre-wrap">
              {record.diaryText || '작성한 내용이 없어요'}
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto w-83.75">
      <div className="border-outline bg-box-background flex h-57.5 w-full flex-col items-center justify-center rounded-2xl border text-center">
        {recorded ? (
          <p className="text-text-primary text-base font-semibold">
            오늘의 기록을 확인해보세요
          </p>
        ) : (
          <div className="flex h-33.75 w-40.25 flex-col items-center justify-center gap-5.75">
            <img src={recordIcon} alt="" className="size-13" />
            <p className="text-text-primary w-40.25 text-base font-semibold">
              아직 기록하지 않았어요
            </p>
            <p className="text-text-secondary text-sm leading-4 whitespace-nowrap">
              오늘의 하루를 기록해 볼까요?
            </p>
          </div>
        )}
      </div>
      {!recorded && (
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
      )}
    </div>
  )
}
