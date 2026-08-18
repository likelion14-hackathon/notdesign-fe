import { useNavigate } from 'react-router-dom'
import Logo from '@/shared/components/Logo'
import BottomBar from '@/shared/components/BottomBar'
import BottomButton from '@/shared/components/BottomButton'
import { useDiaryStore } from '@/features/diary/data/store'

export default function DiaryRecordDiary() {
  const navigate = useNavigate()
  const diaryText = useDiaryStore((state) => state.diaryText)
  const setDiaryText = useDiaryStore((state) => state.setDiaryText)
  const submitRecord = useDiaryStore((state) => state.submitRecord)

  const handleComplete = () => {
    submitRecord()
    navigate('/diary')
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
        <textarea
          value={diaryText}
          onChange={(event) => setDiaryText(event.target.value)}
          placeholder="두 줄 이상 텍스트 입력이 필요할 때 사용돼요"
          className="border-line text-text-primary placeholder:text-text-secondary h-63.5 w-full resize-none rounded-xl border bg-white p-6.5 text-sm placeholder:text-base placeholder:leading-6 placeholder:font-semibold"
        />
      </div>

      <BottomBar>
        <BottomButton onClick={handleComplete}>완료하기</BottomButton>
      </BottomBar>
    </div>
  )
}
