import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import FlowHeader from '@/features/measurement/components/FlowHeader'
import PlanGeneratingCard from '@/features/measurement/components/PlanGeneratingCard'
import Logo from '@/shared/components/Logo'
import { createPlan } from '@/features/plan/api'
import { usePlanStore } from '@/features/plan/store'
import { DEFAULT_MONTHLY_BUDGET } from '@/features/plan/constants'

const MIN_LOADING_MS = 2400

export default function PlanGeneratingPage() {
  const navigate = useNavigate()
  const setCreatedPlan = usePlanStore((state) => state.setCreatedPlan)
  const hasRequestedRef = useRef(false)

  useEffect(() => {
    if (hasRequestedRef.current) return
    hasRequestedRef.current = true

    const apiPromise = createPlan({
      mode: 'NEW',
      monthlyBudget: DEFAULT_MONTHLY_BUDGET,
    })
      .then((plan) => {
        setCreatedPlan(plan, DEFAULT_MONTHLY_BUDGET)
      })
      .catch(() => {
        // 실제 생성에 실패해도(측정 결과 없음 등) 지금은 목업 결과 화면으로 그대로 진행.
      })
    const minDelayPromise = new Promise((resolve) =>
      setTimeout(resolve, MIN_LOADING_MS),
    )

    Promise.all([apiPromise, minDelayPromise]).then(() => {
      navigate('/measurement/plan-result', { replace: true })
    })
  }, [])

  return (
    <div className="bg-off-white min-h-screen-safe mx-auto flex w-full max-w-103.5 flex-col">
      <Logo />

      <FlowHeader
        eyebrow="12주 플랜 만들기"
        title="12주 플랜을 생성하는 중"
        showBack={false}
      />

      <div className="mt-21.25 px-5">
        <PlanGeneratingCard />
      </div>
    </div>
  )
}
