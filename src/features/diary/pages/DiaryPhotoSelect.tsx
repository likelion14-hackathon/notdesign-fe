import { useNavigate } from 'react-router-dom'
import Logo from '@/shared/components/Logo'
import BottomBar from '@/shared/components/BottomBar'
import BottomButton from '@/shared/components/BottomButton'

export default function DiaryPhotoSelect() {
  const navigate = useNavigate()

  return (
    <div className="bg-off-white pb-bottom-bar min-h-screen-safe mx-auto w-full max-w-103.5">
      <Logo />

      <div className="mt-7.5 pl-5">
        <span className="text-text-secondary text-base font-semibold whitespace-nowrap">
          오늘의 기록
        </span>
        <p className="text-text-primary mt-2.5 text-2xl leading-[1.67] font-semibold">
          오늘 하루를 사진 한 장으로
          <br />
          기록해 볼까요?
        </p>
      </div>

      <BottomBar>
        <button
          type="button"
          onClick={() => navigate('/diary/record/skin-tone')}
          className="text-primary mb-3 w-full text-center text-sm font-medium"
        >
          지금은 촬영할 수 없어요
        </button>
        <BottomButton onClick={() => navigate('/diary/photo-capture')}>
          사진 촬영하기
        </BottomButton>
      </BottomBar>
    </div>
  )
}
