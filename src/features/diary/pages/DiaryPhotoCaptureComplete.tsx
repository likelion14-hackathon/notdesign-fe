import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Logo from '@/shared/components/Logo'
import checkIcon from '@/shared/assets/icons/check.svg'

export default function DiaryPhotoCaptureComplete() {
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/diary/record/checklist')
    }, 1500)

    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <div className="bg-off-white relative mx-auto flex h-dvh w-full max-w-103.5 flex-col overflow-hidden">
      <Logo />

      <div className="mt-[30px] pl-5">
        <span className="text-text-secondary text-base font-semibold whitespace-nowrap">
          오늘의 기록
        </span>
        <p className="text-text-primary mt-[10px] text-2xl leading-[1.67] font-semibold">
          표시선에 얼굴을 맞춰주세요
        </p>
      </div>

      <div className="mt-[99px] flex justify-center">
        <div className="bg-primary relative flex h-[374px] w-[374px] items-center justify-center rounded-full">
          <div className="bg-off-white flex h-[350px] w-[350px] items-center justify-center rounded-full">
            <div className="bg-outline relative flex h-[334px] w-[334px] flex-col items-center justify-center rounded-full">
              <img src={checkIcon} alt="완료" className="h-[60px] w-[86px]" />
              <div className="mt-[30px] flex h-[29px] w-[68px] items-center justify-center">
                <p className="text-primary text-xl font-semibold whitespace-nowrap">
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
