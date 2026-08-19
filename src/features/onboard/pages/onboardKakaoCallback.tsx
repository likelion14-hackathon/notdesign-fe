import { useEffect, useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Logo from '@/shared/components/Logo'
import BottomButton from '@/shared/components/BottomButton'
import { signInWithKakao } from '@/features/auth/api'
import { useAuthStore } from '@/features/auth/store'
import { useWellnessStore } from '@/features/wellness/store'
import { ApiError } from '@/shared/api/apiError'

const KAKAO_ENTRY_FLOW_KEY = 'kakaoEntryFlow'

export default function OnboardKakaoCallback() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const login = useAuthStore((state) => state.login)
  const setEntryFlow = useWellnessStore((state) => state.setEntryFlow)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const hasRequestedRef = useRef(false)

  useEffect(() => {
    // 카카오 인가 코드는 1회용이라, StrictMode의 effect 이중 실행 등으로 같은 code로 두 번 요청되면 두 번째 요청은 반드시 실패한다. 최초 1회만 실행되게 막는다.
    if (hasRequestedRef.current) return
    hasRequestedRef.current = true

    const code = searchParams.get('code')
    const kakaoError = searchParams.get('error')

    if (kakaoError || !code) {
      const id = requestAnimationFrame(() => {
        setErrorMessage('카카오 로그인이 취소되었거나 실패했습니다.')
      })
      return () => cancelAnimationFrame(id)
    }

    signInWithKakao(code)
      .then((tokens) => {
        login(tokens)
        const entryFlow = sessionStorage.getItem(KAKAO_ENTRY_FLOW_KEY)
        sessionStorage.removeItem(KAKAO_ENTRY_FLOW_KEY)
        setEntryFlow(entryFlow === 'trial' ? 'trial' : 'measurement')
        navigate('/wellness', { replace: true })
      })
      .catch((error: unknown) => {
        setErrorMessage(
          error instanceof ApiError
            ? error.message
            : '카카오 로그인에 실패했습니다. 다시 시도해주세요.',
        )
      })
  }, [])

  return (
    <div className="bg-off-white min-h-screen-safe mx-auto flex w-full max-w-103.5 flex-col">
      <Logo />

      <div className="flex flex-1 flex-col items-center justify-center gap-4 px-5 text-center">
        {errorMessage ? (
          <>
            <p className="text-text-primary text-base font-semibold break-keep">
              {errorMessage}
            </p>
            <div className="w-full max-w-60">
              <BottomButton onClick={() => navigate('/onboard', { replace: true })}>
                다시 시도하기
              </BottomButton>
            </div>
          </>
        ) : (
          <p className="text-text-secondary text-sm font-medium">
            카카오 로그인 처리 중이에요...
          </p>
        )}
      </div>
    </div>
  )
}
