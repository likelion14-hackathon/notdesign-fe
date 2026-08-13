import React, { useState } from 'react'
import OnboardingSlider from '@/features/onboard/components/OnboardingSlider'
import { onboardingData } from '@/features/onboard/data/onboardingData'
import pfOnboardImg from '@/shared/assets/icons/PF_ONBOARD.svg'
import proofLogo from '@/shared/assets/icons/proof-logo-light.svg'
import LoginModal from '@/features/onboard/components/LoginModal'

const OnboardingPage: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)

  return (
    <div className="relative mx-auto flex h-dvh w-full max-w-md flex-col justify-between overflow-hidden bg-black">
      {/* 온보딩 배경 */}
      <div className="absolute inset-0 z-0">
        <img
          src={pfOnboardImg}
          alt="Background Forest"
          className="h-full w-full object-cover"
        />
      </div>

      {/* 헤더 영역 */}
      <header className="z-10 flex h-16 w-full items-center justify-start bg-neutral-800/30 px-5">
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
      <footer className="z-10 flex w-full flex-col items-center gap-4 px-6 pb-10">
        <button
          onClick={() => setIsLoginModalOpen(true)}
          className="flex h-14 w-full items-center justify-center gap-2.5 rounded-[10px] bg-[#2A5A29A3] px-5 text-center font-['Pretendard'] text-base font-normal text-white backdrop-blur-[2px] transition-all active:scale-[0.98]"
        >
          오프라인 측정 결과 불러오기
        </button>

        <div className="flex items-center gap-2 text-xs text-gray-300">
          <span>아직 고민 중이신가요?</span>
          <button className="font-['Pretendard'] font-normal text-white underline">
            체험해보기
          </button>
        </div>
      </footer>

      {/* 로그인 모달 */}

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onKakaoLogin={() => {
          // 카카오 로그인
        }}
      />
    </div>
  )
}

export default OnboardingPage
