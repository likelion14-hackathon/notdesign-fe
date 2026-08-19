import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Logo from '@/shared/components/Logo'
import BottomBar from '@/shared/components/BottomBar'
import BottomButton from '@/shared/components/BottomButton'
import SkeletonBar from '@/shared/components/SkeletonBar'
import TouchableItemTextOnly from '@/shared/components/TouchableItemTextOnly'
import { useDiaryStore } from '@/features/diary/data/store'
import { createDiary } from '@/features/diary/api'
import { toDiaryScorePayload } from '@/features/diary/mapping'
import { useCurrentPlanTodos } from '@/features/plan/hooks/useCurrentPlanTodos'
import type { PlanTodo } from '@/features/plan/types'
import { ApiError } from '@/shared/api/apiError'

const DIARY_ERROR_MESSAGE: Partial<Record<string, string>> = {
  C001: '오늘은 이미 기록을 작성하셨어요.',
}

export default function DiaryRecordDiary() {
  const navigate = useNavigate()
  const skinTone = useDiaryStore((state) => state.skinTone)
  const dryness = useDiaryStore((state) => state.dryness)
  const redness = useDiaryStore((state) => state.redness)
  const diaryText = useDiaryStore((state) => state.diaryText)
  const setDiaryText = useDiaryStore((state) => state.setDiaryText)
  const submitRecord = useDiaryStore((state) => state.submitRecord)
  const [isSaving, setIsSaving] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [checkedIds, setCheckedIds] = useState<Set<number>>(new Set())

  const {
    data: todos,
    isLoading: isTodosLoading,
    isError: isTodosError,
    error: todosError,
  } = useCurrentPlanTodos()

  const groupedTodos = useMemo(() => {
    const groups = new Map<string, PlanTodo[]>()
    for (const todo of todos ?? []) {
      const list = groups.get(todo.categoryName) ?? []
      list.push(todo)
      groups.set(todo.categoryName, list)
    }
    return [...groups.entries()]
  }, [todos])

  const toggleChecklist = (checklistId: number) => {
    setCheckedIds((prev) => {
      const next = new Set(prev)
      if (next.has(checklistId)) {
        next.delete(checklistId)
      } else {
        next.add(checklistId)
      }
      return next
    })
  }

  const handleComplete = async () => {
    if (isSaving) return
    setIsSaving(true)
    setErrorMessage(null)

    try {
      const payload = {
        ...toDiaryScorePayload({ skinTone, dryness, redness }),
        comment: diaryText ? diaryText.slice(0, 100) : undefined,
        doneChecklistIds: [...checkedIds],
      }
      console.log('[diary-create] POST /api/diaries payload:', payload)
      await createDiary(payload)
      submitRecord()
      navigate('/diary')
    } catch (error) {
      const code = error instanceof ApiError ? error.code : null
      const fallback =
        error instanceof Error
          ? error.message
          : '기록 저장에 실패했어요. 다시 시도해주세요.'
      setErrorMessage((code && DIARY_ERROR_MESSAGE[code]) ?? fallback)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="bg-off-white pb-bottom-bar min-h-screen-safe mx-auto w-full max-w-103.5">
      <Logo />

      <div className="mt-7.5 px-5">
        <span className="text-text-secondary text-base font-semibold whitespace-nowrap">
          오늘의 기록
        </span>
        <p className="text-text-primary mt-2.5 text-2xl leading-[1.67] font-semibold">
          오늘 하루를 가볍게 정리하세요
        </p>
        <p className="text-text-secondary mt-1.5 text-right text-sm leading-4.5 font-medium whitespace-nowrap">
          필수 항목 아님
        </p>
      </div>

      <div className="mt-6 px-5">
        <p className="text-text-primary text-base font-semibold">
          오늘 실천한 항목
        </p>

        {isTodosLoading ? (
          <div className="mt-3 flex flex-col gap-2">
            <SkeletonBar className="w-3/4" />
            <SkeletonBar className="w-1/2" />
          </div>
        ) : todos === null ? (
          <p className="text-text-secondary mt-3 text-sm">
            진행 중인 플랜이 없어요
          </p>
        ) : isTodosError ? (
          <p className="mt-3 text-sm text-red-500">
            {todosError instanceof ApiError
              ? todosError.message
              : '체크리스트를 불러오지 못했어요.'}
          </p>
        ) : groupedTodos.length === 0 ? (
          <p className="text-text-secondary mt-3 text-sm">
            오늘 실천할 항목이 없어요
          </p>
        ) : (
          <div className="mt-3 flex flex-col gap-4">
            {groupedTodos.map(([categoryName, items]) => (
              <div key={categoryName}>
                <p className="text-text-secondary mb-1.5 text-xs font-semibold">
                  {categoryName}
                </p>
                <div className="border-line overflow-hidden rounded-xl border">
                  {items.map((todo) => (
                    <TouchableItemTextOnly
                      key={todo.checklistId}
                      label={todo.content}
                      selected={checkedIds.has(todo.checklistId)}
                      onClick={() => toggleChecklist(todo.checklistId)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-6 px-5">
        <textarea
          value={diaryText}
          onChange={(event) => setDiaryText(event.target.value)}
          placeholder="두 줄 이상 텍스트 입력이 필요할 때 사용돼요"
          maxLength={100}
          className="border-line text-text-primary placeholder:text-text-secondary h-63.5 w-full resize-none rounded-xl border bg-white p-6.5 text-sm placeholder:text-base placeholder:leading-6 placeholder:font-semibold"
        />
        {errorMessage && (
          <p className="mt-2.5 text-sm font-medium text-red-500">
            {errorMessage}
          </p>
        )}
      </div>

      <BottomBar>
        <BottomButton onClick={handleComplete} disabled={isSaving}>
          {isSaving ? '저장 중...' : '완료하기'}
        </BottomButton>
      </BottomBar>
    </div>
  )
}
