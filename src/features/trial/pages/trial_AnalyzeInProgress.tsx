import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AnalyzingCard from '@/features/measurement/components/AnalyzingCard'
import FlowHeader from '@/features/measurement/components/FlowHeader'
import Logo from '@/shared/components/Logo'

/** 실제 API 연동 전까지 로딩 상태를 흉내 내는 시간(ms) */
const SIMULATED_LOADING_MS = 2400

function Trial_AnalyzeInProgress() {
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/trial/analyze/complete', { replace: true })
    }, SIMULATED_LOADING_MS)

    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <div className="bg-off-white min-h-screen-safe mx-auto flex w-full max-w-103.5 flex-col">
      <Logo />

      <FlowHeader
        eyebrow="체험해보기"
        title="사진을 분석하고 있어요"
        showBack={false}
      />

      <div className="mt-21.25 px-5">
        <AnalyzingCard />
      </div>
    </div>
  )
}

export default Trial_AnalyzeInProgress
