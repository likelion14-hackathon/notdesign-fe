import { useNavigate } from "react-router-dom"
import Logo from "@/shared/components/Logo"
import BottomButton from "@/shared/components/BottomButton"
import { useDiaryStore } from "@/features/diary/data/store"

export default function DiaryRecordDiary() {
  const navigate = useNavigate()
  const diaryText = useDiaryStore((state) => state.diaryText)
  const setDiaryText = useDiaryStore((state) => state.setDiaryText)
  const submitRecord = useDiaryStore((state) => state.submitRecord)

  const handleComplete = () => {
    submitRecord()
    navigate("/diary")
  }

  return (
    <div className='bg-off-white relative mx-auto flex h-dvh w-full max-w-103.5 flex-col overflow-hidden'>
      <Logo />

      <div className='mt-[30px] px-5'>
        <span className='text-text-secondary text-base font-semibold whitespace-nowrap'>
          오늘의 기록
        </span>
        <p className='text-text-primary mt-[10px] text-2xl leading-[1.67] font-semibold'>
          오늘 하루를 가볍게 정리하세요
        </p>
        <p className='text-text-secondary mt-1.5 text-right text-sm leading-[18px] font-medium whitespace-nowrap'>
          필수 항목 아님
        </p>
      </div>

      <div className='mt-6 px-5'>
        <textarea
          value={diaryText}
          onChange={(event) => setDiaryText(event.target.value)}
          placeholder='두 줄 이상 텍스트 입력이 필요할 때 사용돼요'
          className='border-line text-text-primary placeholder:text-text-secondary bg-white h-[254px] w-full resize-none rounded-[12px] border p-[26px] text-sm placeholder:text-base placeholder:leading-6 placeholder:font-semibold'
        />
      </div>

      <div className='min-h-0 flex-1' />

      <div className='shrink-0 px-5 pb-[calc(35px+env(safe-area-inset-bottom))]'>
        <BottomButton onClick={handleComplete}>완료하기</BottomButton>
      </div>
    </div>
  )
}