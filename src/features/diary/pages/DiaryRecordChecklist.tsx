import { useNavigate } from 'react-router-dom'
import Logo from '@/shared/components/Logo'
import BottomBar from '@/shared/components/BottomBar'
import BottomButton from '@/shared/components/BottomButton'
import SkeletonBar from '@/shared/components/SkeletonBar'
import TouchableItemTextOnly from '@/shared/components/TouchableItemTextOnly'
import { useDiaryStore } from '@/features/diary/data/store'
import { useCurrentPlanTodos } from '@/features/plan/hooks/useCurrentPlanTodos'
import { ApiError } from '@/shared/api/apiError'

export default function DiaryRecordChecklist() {
  const navigate = useNavigate()
  const checkedTodoIds = useDiaryStore((state) => state.checkedTodoIds)
  const toggleTodoId = useDiaryStore((state) => state.toggleTodoId)

  const {
    data: todos,
    isLoading: isTodosLoading,
    isError: isTodosError,
    error: todosError,
  } = useCurrentPlanTodos()

  return (
    <div className="bg-off-white pb-bottom-bar min-h-screen-safe mx-auto w-full max-w-103.5">
      <Logo />

      <div className="mt-7.5 px-5">
        <span className="text-text-secondary text-base font-semibold whitespace-nowrap">
          오늘의 기록
        </span>
        <p className="text-text-primary mt-2.5 w-87.5 max-w-full text-2xl leading-[1.67] font-semibold break-keep">
          오늘 피부를 위해 어떤 것을 했나요?
        </p>
        <p className="text-text-secondary mt-1.5 text-right text-sm leading-4.5 font-medium whitespace-nowrap">
          중복 선택 가능
        </p>
      </div>

      <div className="mt-7.5">
        {isTodosLoading ? (
          <div className="flex flex-col gap-2 px-5">
            <SkeletonBar className="w-3/4" />
            <SkeletonBar className="w-1/2" />
          </div>
        ) : todos === null ? (
          <p className="text-text-secondary px-5 text-sm">
            진행 중인 플랜이 없어요
          </p>
        ) : isTodosError ? (
          <p className="px-5 text-sm text-red-500">
            {todosError instanceof ApiError
              ? todosError.message
              : '체크리스트를 불러오지 못했어요.'}
          </p>
        ) : (todos ?? []).length === 0 ? (
          <p className="text-text-secondary px-5 text-sm">
            오늘 실천할 항목이 없어요
          </p>
        ) : (
          (todos ?? []).map((todo) => (
            <TouchableItemTextOnly
              key={todo.checklistId}
              label={todo.content}
              selected={checkedTodoIds.includes(todo.checklistId)}
              onClick={() => toggleTodoId(todo.checklistId)}
            />
          ))
        )}
      </div>

      <BottomBar>
        <BottomButton onClick={() => navigate('/diary/record/diary')}>
          다음으로
        </BottomButton>
      </BottomBar>
    </div>
  )
}
