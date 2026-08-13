import React, { useState } from "react";
import OnboardingSlider from "@/features/onboard/components/OnboardingSlider";
import { onboardingData } from "@/features/onboard/data/onboardingData";
import pfOnboardImg from "@/shared/assets/icons/PF_ONBOARD.svg";
import proofLogo from "@/shared/assets/icons/proof-logo-light.svg";
import LoginModal from "@/features/onboard/components/LoginModal";

const OnboardingPage: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  return (
    <div className="relative w-full max-w-md mx-auto h-dvh flex flex-col justify-between overflow-hidden bg-black">
      {/* 온보딩 배경 */}
      <div className="absolute inset-0 z-0">
        <img
          src={pfOnboardImg}
          alt="Background Forest"
          className="w-full h-full object-cover"
        />
      </div>

      {/* 헤더 영역 */}
      <header className="w-full h-16 px-5 bg-neutral-800/30 flex items-center justify-start z-10">
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
      <footer className="w-full px-6 pb-10 flex flex-col items-center gap-4 z-10">
        <button 
        onClick={() => setIsLoginModalOpen(true)}
        className="w-full h-14 px-5 bg-[#2A5A29A3] backdrop-blur-[2px] rounded-[10px] flex justify-center items-center gap-2.5 text-center text-white text-base font-normal font-['Pretendard'] transition-all active:scale-[0.98]">
          오프라인 측정 결과 불러오기
        </button>

        <div className="flex items-center gap-2 text-xs text-gray-300">
          <span>아직 고민 중이신가요?</span>
          <button
            onClick={() => setIsLoginModalOpen(true)}
            className="underline font-normal font-['Pretendard'] text-white"
          >
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
  );
};

export default OnboardingPage;