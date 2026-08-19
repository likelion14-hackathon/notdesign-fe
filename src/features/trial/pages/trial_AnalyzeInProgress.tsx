import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import AnalyzingCard from '@/features/measurement/components/AnalyzingCard'
import FlowHeader from '@/features/measurement/components/FlowHeader'
import Logo from '@/shared/components/Logo'
import BottomButton from '@/shared/components/BottomButton'
import { getDiaryAnalysisResult } from '@/features/analyze/api'
import { ApiError } from '@/shared/api/apiError'

const POLL_INTERVAL_MS = 2500
const POLL_TIMEOUT_MS = 45_000

interface AnalyzeInProgressState {
  requestId?: string
}

function Trial_AnalyzeInProgress() {
  const navigate = useNavigate()
  const location = useLocation()
  const requestId = (location.state as AnalyzeInProgressState | null)
    ?.requestId
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    if (!requestId) {
      const id = requestAnimationFrame(() => {
        setErrorMessage('분석할 사진 정보를 찾을 수 없어요. 다시 촬영해주세요.')
      })
      return () => cancelAnimationFrame(id)
    }

    let cancelled = false
    let timer: ReturnType<typeof setTimeout> | undefined
    const startedAt = Date.now()

    const poll = async () => {
      try {
        const result = await getDiaryAnalysisResult(requestId)
        if (cancelled) return
        navigate('/trial/analyze/complete', { replace: true, state: result })
      } catch (error) {
        if (cancelled) return

        const status = error instanceof ApiError ? error.status : null
        // 404는 "아직 분석이 안 끝남"을 의미할 수도 있어서, 타임아웃 전까지는 에러로 취급하지 않고 계속 폴링한다.
        if (status === 404) {
          if (Date.now() - startedAt >= POLL_TIMEOUT_MS) {
            setErrorMessage(
              '분석이 지연되고 있어요. 잠시 후 다시 시도해주세요.',
            )
            return
          }
          timer = setTimeout(poll, POLL_INTERVAL_MS)
          return
        }

        setErrorMessage(
          error instanceof Error
            ? error.message
            : '분석 결과를 불러오지 못했어요.',
        )
      }
    }

    poll()

    return () => {
      cancelled = true
      if (timer) clearTimeout(timer)
    }
  }, [requestId, navigate])

  return (
    <div className="bg-off-white min-h-screen-safe mx-auto flex w-full max-w-103.5 flex-col">
      <Logo />

      {errorMessage ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-4 px-5 text-center">
          <p className="text-text-primary text-base font-semibold break-keep">
            {errorMessage}
          </p>
          <div className="w-full max-w-60">
            <BottomButton
              onClick={() => navigate('/trial/capture', { replace: true })}
            >
              다시 시도하기
            </BottomButton>
          </div>
        </div>
      ) : (
        <>
          <FlowHeader
            eyebrow="체험해보기"
            title="사진을 분석하고 있어요"
            showBack={false}
          />

          <div className="mt-21.25 px-5">
            <AnalyzingCard />
          </div>
        </>
      )}
    </div>
  )
}

export default Trial_AnalyzeInProgress
