import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ReportGeneratingCard from '@/features/measurement/components/ReportGeneratingCard'
import Logo from '@/shared/components/Logo'

/** 실제 API 연동 전까지 로딩 상태를 흉내 내는 시간(ms) */
const SIMULATED_LOADING_MS = 2400

export default function ReportGeneratingPage() {
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/measurement/report', { replace: true })
    }, SIMULATED_LOADING_MS)

    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <div className="bg-off-white min-h-screen-safe mx-auto flex w-full max-w-103.5 flex-col">
      <Logo />

      <div className="px-5">
        <p className="text-text-secondary text-[15px] leading-normal font-semibold tracking-[-0.3px]">
          리포트
        </p>
        <h1 className="text-text-primary mt-2.75 text-[26px] leading-10 font-semibold tracking-[-0.52px] break-keep">
          리포트를 생성하고 있어요
        </h1>
      </div>

      <div className="mt-21.25 px-5">
        <ReportGeneratingCard />
      </div>
    </div>
  )
}
