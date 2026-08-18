import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import FlowHeader from '@/features/measurement/components/FlowHeader'
import PlanGeneratingCard from '@/features/measurement/components/PlanGeneratingCard'
import Logo from '@/shared/components/Logo'

/** 실제 API 연동 전까지 로딩 상태를 흉내 내는 시간(ms) */
const SIMULATED_LOADING_MS = 2400

export default function Trial_PlanGenerating() {
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      // replace: true — 로딩 화면은 실제 콘텐츠가 없는 과도 상태라 히스토리에 남기지 않습니다.
      navigate('/trial/plan-result', { replace: true })
    }, SIMULATED_LOADING_MS)

    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <div className="bg-off-white min-h-screen-safe mx-auto flex w-full max-w-103.5 flex-col">
      <Logo />

      <FlowHeader
        eyebrow="일주일 플랜 만들기"
        title="일주일 플랜을 생성하는 중"
        showBack={false}
      />

      <div className="mt-21.25 px-5">
        <PlanGeneratingCard />
      </div>
    </div>
  )
}
