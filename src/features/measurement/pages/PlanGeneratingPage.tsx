import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import FlowHeader from '@/features/measurement/components/FlowHeader'
import PlanGeneratingCard from '@/features/measurement/components/PlanGeneratingCard'
import BottomBar from '@/shared/components/BottomBar'
import BottomButton from '@/shared/components/BottomButton'
import Logo from '@/shared/components/Logo'
import { createPlan } from '@/features/plan/api'
import { usePlanStore } from '@/features/plan/store'
import { DEFAULT_MONTHLY_BUDGET } from '@/features/plan/constants'
import { ApiError } from '@/shared/api/apiError'

const MIN_LOADING_MS = 2400

const NEXT_NO_FINAL_REPORT_MESSAGE =
  '12주 사이클을 마쳐야 다음 플랜을 만들 수 있어요'

interface PlanGeneratingLocationState {
  /** 'NEW': 12주 플랜 처음 만들기(기본값, 항상 성공한 것처럼 목업으로 진행)
   *  'NEXT': FINAL 리포트 확인 후 다음 12주 플랜 만들기(실제 에러 처리) */
  mode?: 'NEW' | 'NEXT'
}

export default function PlanGeneratingPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const mode = (location.state as PlanGeneratingLocationState | null)?.mode ?? 'NEW'
  const setCreatedPlan = usePlanStore((state) => state.setCreatedPlan)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  /** 404(C404, 직전 사이클 미종료)는 다시 시도해도 해결되지 않아 재시도 버튼을 숨긴다 */
  const [isRetryable, setIsRetryable] = useState(false)
  const [isRetrying, setIsRetrying] = useState(false)
  const hasRequestedRef = useRef(false)

  const runNew = () => {
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
  }

  const runNext = () => {
    createPlan({ mode: 'NEXT' })
      .then((plan) => {
        setCreatedPlan(plan, Math.round(plan.totalPrice / 3))
        navigate('/measurement/new-plan-result', { replace: true })
      })
      .catch((error: unknown) => {
        if (error instanceof ApiError && error.code === 'C404') {
          setErrorMessage(NEXT_NO_FINAL_REPORT_MESSAGE)
          setIsRetryable(false)
        } else {
          setErrorMessage(
            error instanceof ApiError
              ? error.message
              : '플랜을 생성하지 못했어요. 다시 시도해주세요.',
          )
          setIsRetryable(true)
        }
      })
      .finally(() => setIsRetrying(false))
  }

  useEffect(() => {
    if (hasRequestedRef.current) return
    hasRequestedRef.current = true

    if (mode === 'NEXT') {
      runNext()
      return
    }

    runNew()
  }, [])

  const handleRetry = () => {
    if (isRetrying) return
    setIsRetrying(true)
    setErrorMessage(null)
    runNext()
  }

  return (
    <div className="bg-off-white min-h-screen-safe mx-auto flex w-full max-w-103.5 flex-col">
      <Logo />

      <FlowHeader
        eyebrow="12주 플랜 만들기"
        title={errorMessage ? '플랜을 생성하지 못했어요' : '12주 플랜을 생성하는 중'}
        showBack={false}
      />

      {errorMessage ? (
        <p className="text-text-secondary mt-21.25 px-5 text-[14px] font-medium break-keep">
          {errorMessage}
        </p>
      ) : (
        <div className="mt-21.25 px-5">
          <PlanGeneratingCard />
        </div>
      )}

      {errorMessage && mode === 'NEXT' && isRetryable && (
        <BottomBar>
          <BottomButton onClick={handleRetry} disabled={isRetrying}>
            {isRetrying ? '다시 시도하는 중...' : '다시 시도하기'}
          </BottomButton>
        </BottomBar>
      )}
    </div>
  )
}
