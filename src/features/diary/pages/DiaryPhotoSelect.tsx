import { useNavigate } from "react-router-dom"
import Logo from "@/shared/components/Logo"
import BottomButton from "@/shared/components/BottomButton"

export default function DiaryPhotoSelect() {
  const navigate = useNavigate()

  return (
    <div className='bg-off-white relative mx-auto flex h-dvh w-full max-w-103.5 flex-col overflow-hidden'>
      <Logo />

      <div className='mt-[30px] pl-5'>
        <span className='text-text-secondary text-base font-semibold whitespace-nowrap'>
          오늘의 기록
        </span>
        <p className='text-text-primary mt-[10px] text-2xl leading-[1.67] font-semibold'>
          오늘 하루를 사진 한 장으로
          <br />
          기록해 볼까요?
        </p>
      </div>

      <div className='min-h-0 flex-1' />

      <div className='shrink-0 px-5 pb-[calc(35px+env(safe-area-inset-bottom))]'>
        <button
          type='button'
          onClick={() => {
            // TODO: 촬영 불가 사유 안내 처리
          }}
          className='text-primary mb-3 w-full text-center text-sm font-medium'
        >
          지금은 촬영할 수 없어요
        </button>
        <BottomButton onClick={() => navigate("/diary/photo-capture")}>
          사진 촬영하기
        </BottomButton>
      </div>
    </div>
  )
}