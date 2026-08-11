import React from "react";
import type { OnboardingSlide } from "@/features/onboard/data/onboardingData";
import { useSwipeAndZone } from "@/features/onboard/data/useSwipeAndZone";

interface OnboardingSliderProps {
  slides: OnboardingSlide[];
  currentIndex: number;
  onSlideChange: (index: number) => void;
}

const OnboardingSlider: React.FC<OnboardingSliderProps> = ({
  slides,
  currentIndex,
  onSlideChange,
}) => {
  const currentSlide = slides[currentIndex];

  const touchHandlers = useSwipeAndZone({
    currentIndex,
    totalSlides: slides.length,
    onSlideChange,
  });

  return (
    <div
      className="relative w-full flex-1 flex flex-col justify-end pb-16 px-6 text-white z-10 select-none touch-pan-y cursor-pointer"
      {...touchHandlers}
    >
      {/* 텍스트 영역 */}
      <div key={currentIndex} className="text-left animate-fade-slide-in">
        {/* 제목 상자 - 374x80 */}
        <div className="w-[374px] h-[80px]">
          <h1 className="text-2xl font-medium leading-[1.67] whitespace-pre-line">
            {currentSlide.title}
          </h1>
        </div>

        {/* 설명 상자 - 374x75, 위쪽 31px 간격 */}
        <div className="w-[374px] h-[75px] mt-[31px]">
          <p className="text-sm font-light text-white leading-relaxed break-keep">
            {currentSlide.description}
          </p>
        </div>
      </div>

      {/* 인디케이터 (점 3개) - 높이 15, 아래쪽 31px 간격 */}
      <div className="h-[15px] flex justify-center items-center gap-2 mt-[31px]">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={(e) => {
              e.stopPropagation();
              onSlideChange(idx);
            }}
            className={`w-2 h-2 rounded-full transition-colors duration-300 ${
              currentIndex === idx
                ? " bg-white"
                : " bg-white/40 hover:bg-white/60"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default OnboardingSlider;