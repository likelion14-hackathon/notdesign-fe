import { useNavigate } from 'react-router-dom'
import Logo from '@/shared/components/Logo'
import BottomBar from '@/shared/components/BottomBar'
import BottomButton from '@/shared/components/BottomButton'
import TouchableItemTextOnly from '@/shared/components/TouchableItemTextOnly'
import { useDiaryStore } from '@/features/diary/data/store'

const CHECKLIST_ITEMS = ['세럼바르기', '영양제', '6.5시간 이상 수면']

export default function DiaryRecordChecklist() {
  const navigate = useNavigate()
  const checklist = useDiaryStore((state) => state.checklist)
  const toggleChecklistItem = useDiaryStore(
    (state) => state.toggleChecklistItem,
  )

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
        {CHECKLIST_ITEMS.map((item) => (
          <TouchableItemTextOnly
            key={item}
            label={item}
            selected={checklist.includes(item)}
            onClick={() => toggleChecklistItem(item)}
          />
        ))}
      </div>

      <BottomBar>
        <BottomButton onClick={() => navigate('/diary/record/diary')}>
          다음으로
        </BottomButton>
      </BottomBar>
    </div>
  )
}
