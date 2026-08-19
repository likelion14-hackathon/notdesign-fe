import Logo from '@/shared/components/Logo'
import checkIcon from '@/shared/assets/icons/check.svg'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

interface CaptureCompleteState {
  requestId?: string
}

function Trial_CaptureComplete() {
  const navigate = useNavigate()
  const location = useLocation()
  const requestId = (location.state as CaptureCompleteState | null)
    ?.requestId

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/trial/analyze', { state: { requestId } })
    }, 1500)

    return () => clearTimeout(timer)
  }, [navigate, requestId])

  return (
    <div className="bg-off-white relative mx-auto flex h-dvh w-full max-w-md flex-col overflow-hidden">
      <Logo />

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

      <div className="mt-[99px] flex justify-center">
        <div className="bg-primary relative flex h-[374px] w-[374px] items-center justify-center rounded-full">
          <div className="bg-off-white flex h-[350px] w-[350px] items-center justify-center rounded-full">
            <div className="bg-outline relative flex h-[334px] w-[334px] flex-col items-center justify-center rounded-full">
              <img src={checkIcon} alt="완료" className="h-[60px] w-[86px]" />
              <div className="mt-[30px] flex h-[29px] w-[68px] items-center justify-center">
                <p className="text-primary font-sans text-xl font-semibold whitespace-nowrap">
                  좋아요!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Trial_CaptureComplete
