import { useNavigate } from "react-router-dom"
import Logo from "@/shared/components/Logo"
import BottomButton from "@/shared/components/BottomButton"
import TouchableItemTextOnly from "@/shared/components/TouchableItemTextOnly"
import { useDiaryStore } from "@/features/diary/data/store"

const CHECKLIST_ITEMS = ["세럼바르기", "영양제", "6.5시간 이상 수면"]

export default function DiaryRecordChecklist() {
  const navigate = useNavigate()
  const checklist = useDiaryStore((state) => state.checklist)
  const toggleChecklistItem = useDiaryStore(
    (state) => state.toggleChecklistItem,
  )

  return (
    <div className='bg-off-white relative mx-auto flex h-dvh w-full max-w-103.5 flex-col overflow-hidden'>
      <Logo />

      <div className='mt-[30px] px-5'>
        <span className='text-text-secondary text-base font-semibold whitespace-nowrap'>
          오늘의 기록
        </span>
        <p className='text-text-primary mt-[10px] w-[350px] max-w-full text-2xl leading-[1.67] font-semibold break-keep'>
          오늘 피부를 위해 어떤 것을 했나요?
        </p>
        <p className='text-text-secondary mt-1.5 text-right text-sm leading-[18px] font-medium whitespace-nowrap'>
          중복 선택 가능
        </p>
      </div>

      <div className='mt-7.5'>
        {CHECKLIST_ITEMS.map((item) => (
          <TouchableItemTextOnly
            key={item}
            label={item}
            selected={checklist.includes(item)}
            onClick={() => toggleChecklistItem(item)}
          />
        ))}
      </div>

      <div className='min-h-0 flex-1' />

      <div className='shrink-0 px-5 pb-[calc(35px+env(safe-area-inset-bottom))]'>
        <BottomButton onClick={() => navigate("/diary/record/diary")}>
          다음으로
        </BottomButton>
      </div>
    </div>
  )
}