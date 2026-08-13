import { useNavigate } from "react-router-dom"
import Logo from "@/shared/components/Logo"
import BottomButton from "@/shared/components/BottomButton"
import personSilhouette from "@/shared/assets/icons/person.svg"

export default function DiaryPhotoCapture() {
  const navigate = useNavigate()

  return (
    <div className='bg-off-white relative mx-auto flex h-dvh w-full max-w-103.5 flex-col overflow-hidden'>
      <Logo />

      <div className='mt-[30px] pl-5'>
        <span className='text-text-secondary text-base font-semibold whitespace-nowrap'>
          오늘의 기록
        </span>
        <p className='text-text-primary mt-[10px] text-2xl leading-[1.67] font-semibold'>
          표시선에 얼굴을 맞춰주세요
        </p>
      </div>

      <div className='mt-[99px] flex justify-center'>
        <div className='bg-primary relative flex h-[374px] w-[374px] items-center justify-center rounded-full'>
          <div className='bg-off-white flex h-[350px] w-[350px] items-center justify-center rounded-full'>
            <div className='bg-outline relative h-[334px] w-[334px] overflow-hidden rounded-full'>
              <img
                src={personSilhouette}
                alt='얼굴 위치 가이드'
                className='absolute inset-0 h-full w-full object-contain p-9.5'
              />
            </div>
          </div>
        </div>
      </div>

      <div className='mt-[26px] flex justify-center'>
        <p className='text-text-secondary w-[204px] text-center text-xs whitespace-nowrap'>
          표시선에 얼굴이 인식되면 자동으로 촬영돼요
        </p>
      </div>

      <div className='mt-auto px-5 pb-10'>
        <BottomButton
          onClick={() => navigate("/diary/photo-capture/complete")}
        >
          촬영하기
        </BottomButton>
      </div>
    </div>
  )
}