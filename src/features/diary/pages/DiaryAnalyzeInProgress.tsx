import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Logo from '@/shared/components/Logo'
import BottomButton from '@/shared/components/BottomButton'
import AnalyzingCard from '@/features/measurement/components/AnalyzingCard'
import { getDiaryPhotoAnalysisResult } from '@/features/analyze/api'
import {
  ANALYZE_POLL_INTERVAL_MS,
  ANALYZE_POLL_MAX_ATTEMPTS,
} from '@/features/analyze/constants'
import { mapAnalysisResultToDiaryScores } from '@/features/diary/mapping'
import { useDiaryStore } from '@/features/diary/data/store'
import { ApiError } from '@/shared/api/apiError'

interface AnalyzeInProgressState {
  requestId?: string
}

export default function DiaryAnalyzeInProgress() {
  const navigate = useNavigate()
  const location = useLocation()
  const requestId = (location.state as AnalyzeInProgressState | null)
    ?.requestId
  const setSkinTone = useDiaryStore((state) => state.setSkinTone)
  const setDryness = useDiaryStore((state) => state.setDryness)
  const setRedness = useDiaryStore((state) => state.setRedness)
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
    let attempt = 0

    const poll = async () => {
      attempt += 1
      try {
        const result = await getDiaryPhotoAnalysisResult(requestId)
        if (cancelled) return

        const scores = mapAnalysisResultToDiaryScores(result)
        console.log('[diary-analyze] raw result (0~100):', result)
        console.log('[diary-analyze] mapped store scores (0~10):', scores)

        setSkinTone(scores.skinTone)
        setDryness(scores.dryness)
        setRedness(scores.redness)

        navigate('/diary/record/checklist', { replace: true })
      } catch (error) {
        if (cancelled) return

        const status = error instanceof ApiError ? error.status : null
        // 404는 "결과 없음/진행중/실패"가 다 섞여있어서, 최대 시도 횟수 전까지는 에러로 취급하지 않고 계속 폴링한다.
        if (status === 404) {
          if (attempt >= ANALYZE_POLL_MAX_ATTEMPTS) {
            setErrorMessage('분석에 실패했어요. 다시 시도해주세요.')
            return
          }
          timer = setTimeout(poll, ANALYZE_POLL_INTERVAL_MS)
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
  }, [requestId, navigate, setSkinTone, setDryness, setRedness])

  return (
    <div className="bg-off-white relative mx-auto flex h-dvh w-full max-w-103.5 flex-col overflow-hidden">
      <Logo />

      {errorMessage ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-4 px-5 text-center">
          <p className="text-text-primary text-base font-semibold break-keep">
            {errorMessage}
          </p>
          <div className="w-full max-w-60">
            <BottomButton
              onClick={() =>
                navigate('/diary/photo-capture', { replace: true })
              }
            >
              다시 시도하기
            </BottomButton>
          </div>
        </div>
      ) : (
        <>
          <div className="mt-7.5 pl-5">
            <span className="text-text-secondary text-base font-semibold whitespace-nowrap">
              오늘의 기록
            </span>
            <p className="text-text-primary mt-2.5 text-2xl leading-[1.67] font-semibold">
              분석 중이에요...
            </p>
          </div>

          <div className="mt-21.25 px-5">
            <AnalyzingCard />
          </div>
        </>
      )}
    </div>
  )
}
