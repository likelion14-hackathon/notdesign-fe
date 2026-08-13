import Logo from '@/shared/components/Logo'
import BottomButton from '@/shared/components/BottomButton'
import personSilhouette from '@/shared/assets/icons/person.svg'
import { useNavigate } from 'react-router-dom'

function Trial_Capture() {
  const navigate = useNavigate()

  return (
    <div className="bg-off-white relative mx-auto flex h-dvh w-full max-w-md flex-col overflow-hidden">
      <Logo />

      {/* 제목 영역 */}
      <div className="mt-[30px] pl-[20px]">
        <div className="h-[18px] w-[64px]">
          <span className="text-text-secondary font-sans text-base font-semibold whitespace-nowrap">
            체험해보기
          </span>
        </div>

        <div className="mt-[10px] h-[40px] w-[276px]">
          <p className="text-text-primary font-sans text-2xl leading-[1.67] font-semibold">
            표시선에 얼굴을 맞춰주세요
          </p>
        </div>
      </div>

      {/* 원형 가이드 영역 */}
      <div className="mt-[99px] flex justify-center">
        <div className="bg-primary relative flex h-[374px] w-[374px] items-center justify-center rounded-full">
          <div className="bg-off-white flex h-[350px] w-[350px] items-center justify-center rounded-full">
            <div className="bg-outline relative h-[334px] w-[334px] overflow-hidden rounded-full">
              <img
                src={personSilhouette}
                alt="얼굴 위치 가이드"
                className="absolute inset-0 h-full w-full object-contain p-9.5"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 안내 문구 */}
      <div className="mt-[26px] flex justify-center">
        <p className="text-text-secondary h-[14px] w-[204px] text-center font-sans text-xs whitespace-nowrap">
          표시선에 얼굴이 인식되면 자동으로 촬영돼요
        </p>
      </div>

      {/* 촬영하기 버튼 */}
      <div className="mt-auto px-[20px] pb-10">
        <BottomButton onClick={() => navigate('/trial/capture/complete')}>
          촬영하기
        </BottomButton>
      </div>
    </div>
  )
}

export default Trial_Capture
