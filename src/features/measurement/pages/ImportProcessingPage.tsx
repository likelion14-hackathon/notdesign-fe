import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import AnalyzingCard from '@/features/measurement/components/AnalyzingCard'
import FlowHeader from '@/features/measurement/components/FlowHeader'
import Logo from '@/shared/components/Logo'
import BottomButton from '@/shared/components/BottomButton'
import { importOfflineResult } from '@/features/measurement/api/results'
import { useMeasurementStore } from '@/features/measurement/store'
import { ApiError } from '@/shared/api/apiError'

/** 실제 API 연동 전까지 로딩 상태를 보여주는 시간(ms). */
const SIMULATED_LOADING_MS = 2400

const NOT_FOUND_MESSAGE =
  '선택하신 클리닉에서 아직 측정 데이터를 확인할 수 없어요.'

interface ProcessingLocationState {
  /** 'import': 클리닉 선택→동의를 거쳐 새 측정 결과를 불러오는 흐름(이 화면에서 실제 API 호출)
   *  'report': 기존 플랜의 리포트를 재생성하는 흐름(과거부터 있던 로딩 연출, API 미연동) */
  flow?: 'import' | 'report'
}

export default function ImportProcessingPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const flow = (location.state as ProcessingLocationState | null)?.flow ?? 'report'
  const selectedClinicId = useMeasurementStore((state) => state.selectedClinicId)
  const setOfflineResult = useMeasurementStore((state) => state.setOfflineResult)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const hasRequestedRef = useRef(false)

  useEffect(() => {
    if (flow === 'report') {
      const timer = setTimeout(() => {
        navigate('/measurement/report-generating', { replace: true })
      }, SIMULATED_LOADING_MS)
      return () => clearTimeout(timer)
    }

    if (hasRequestedRef.current) return
    hasRequestedRef.current = true

    importOfflineResult(selectedClinicId ?? undefined)
      .then((result) => {
        setOfflineResult(result)
        navigate('/measurement/result', { replace: true })
      })
      .catch((error: unknown) => {
        if (error instanceof ApiError && error.code === 'C404') {
          setErrorMessage(NOT_FOUND_MESSAGE)
        } else {
          setErrorMessage(
            error instanceof ApiError
              ? error.message
              : '측정 데이터를 불러오지 못했어요. 다시 시도해주세요.',
          )
        }
      })
  }, [flow])

  return (
    <div className="bg-off-white min-h-screen-safe mx-auto flex w-full max-w-103.5 flex-col">
      <Logo />

      <FlowHeader
        eyebrow="오프라인 측정 데이터 불러오기"
        title={errorMessage ? '측정 데이터를 불러오지 못했어요' : '측정 데이터를 불러오고 있어요'}
        showBack={false}
      />

      {errorMessage ? (
        <div className="mt-21.25 flex flex-col items-center gap-4 px-5 text-center">
          <p className="text-text-secondary text-[14px] font-medium break-keep">
            {errorMessage}
          </p>
          <div className="w-full max-w-60">
            <BottomButton
              onClick={() => navigate('/measurement/center-select')}
            >
              클리닉 다시 선택하기
            </BottomButton>
          </div>
        </div>
      ) : (
        <div className="mt-21.25 px-5">
          <AnalyzingCard />
        </div>
      )}
    </div>
  )
}
