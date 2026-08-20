import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import OnboardingSlider from '@/features/onboard/components/OnboardingSlider'
import { onboardingData } from '@/features/onboard/data/onboardingData'
import pfOnboardImg from '@/shared/assets/icons/PF_ONBOARD.svg'
import proofLogo from '@/shared/assets/icons/proof-logo-light.svg'
import LoginModal from '@/features/onboard/components/LoginModal'
import { useThemeColor } from '@/shared/hooks/useThemeColor'
import { useScrollLock } from '@/shared/hooks/useScrollLock'
import { usePageBackground } from '@/shared/hooks/usePageBackground'
import {
  useStableViewportHeight,
  useVisualViewport,
} from '@/shared/hooks/useVisualViewport'
import ViewportDebug from '@/shared/components/ViewportDebug'
import { useWellnessStore } from '@/features/wellness/store'
import { getKakaoAuthorizeUrl } from '@/features/auth/kakao'

const KAKAO_ENTRY_FLOW_KEY = 'kakaoEntryFlow'

const OnboardingPage: React.FC = () => {
  const navigate = useNavigate()
  const setEntryFlow = useWellnessStore((state) => state.setEntryFlow)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)

  useThemeColor('#000000')
  usePageBackground('#000000')
  useScrollLock()
  const viewport = useVisualViewport()
  const screenHeight = useStableViewportHeight()

  const openLoginModal = (flow: 'measurement' | 'trial') => {
    setEntryFlow(flow)
    setIsLoginModalOpen(true)
  }

  const handleLoginSuccess = () => {
    setIsLoginModalOpen(false)
    navigate('/wellness')
  }

  const handleKakaoLogin = () => {
    let authorizeUrl: string
    try {
      authorizeUrl = getKakaoAuthorizeUrl()
    } catch (error) {
      // 카카오 키/Redirect URI 설정 전이라 발생하는 개발 단계 전용 가드.
      window.alert(
        error instanceof Error
          ? error.message
          : '카카오 로그인 설정을 확인해주세요.',
      )
      return
    }

    const entryFlow = useWellnessStore.getState().entryFlow
    sessionStorage.setItem(KAKAO_ENTRY_FLOW_KEY, entryFlow)
    window.location.href = authorizeUrl
  }

  return (
    <div
      className="min-h-screen-safe tracking-2p relative mx-auto flex w-full max-w-md flex-col overflow-hidden bg-black"
      style={{ height: screenHeight }}
    >
      <div
        className="relative flex min-h-0 w-full flex-1 flex-col justify-between"
        style={{ transform: `translateY(${viewport.offsetTop}px)` }}
      >
        {/* 온보딩 배경 */}
        <div className="absolute inset-0 z-0">
          <img
            src={pfOnboardImg}
            alt="Background Forest"
            className="h-full w-full object-cover"
          />
        </div>

        {/* 헤더 영역 */}
        <header className="z-10 flex min-h-16 w-full items-center justify-start bg-neutral-800/30 px-5 pt-[env(safe-area-inset-top)]">
          <img
            src={proofLogo}
            alt="Proof Logo"
            className="h-4 w-auto object-contain"
          />
        </header>

        {/* 온보딩 슬라이더 */}
        <OnboardingSlider
          slides={onboardingData}
          currentIndex={currentIndex}
          onSlideChange={setCurrentIndex}
        />

        {/* 푸터 영역 */}
        <footer className="z-10 flex w-full flex-col items-center gap-4 px-6 pb-[max(40px,env(safe-area-inset-bottom))]">
          <button
            onClick={() => openLoginModal('measurement')}
            className="flex h-14 w-full items-center justify-center gap-2.5 rounded-[10px] bg-[#2A5A29A3] px-5 text-center font-['Pretendard'] text-base font-normal text-white backdrop-blur-[2px] transition-all active:scale-[0.98]"
          >
            오프라인 측정 결과 불러오기
          </button>

          <div className="flex items-center gap-2 text-xs text-gray-300">
            <span>아직 고민 중이신가요?</span>
            <button
              onClick={() => openLoginModal('trial')}
              className="font-['Pretendard'] font-normal text-white underline"
            >
              체험해보기
            </button>
          </div>
        </footer>
      </div>

      <ViewportDebug />

      {/* 로그인 모달 */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onKakaoLogin={handleKakaoLogin}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  )
}

export default OnboardingPage
