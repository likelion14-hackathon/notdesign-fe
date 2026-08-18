import React from 'react'
import type { OnboardingSlide } from '@/features/onboard/data/onboardingData'
import { useSwipeAndZone } from '@/features/onboard/data/useSwipeAndZone'

interface OnboardingSliderProps {
  slides: OnboardingSlide[]
  currentIndex: number
  onSlideChange: (index: number) => void
}

const OnboardingSlider: React.FC<OnboardingSliderProps> = ({
  slides,
  currentIndex,
  onSlideChange,
}) => {
  const currentSlide = slides[currentIndex]

  const touchHandlers = useSwipeAndZone({
    currentIndex,
    totalSlides: slides.length,
    onSlideChange,
  })

  return (
    <div
      className="relative z-10 flex w-full flex-1 cursor-pointer touch-pan-y flex-col justify-end px-6 pb-16 text-white select-none"
      {...touchHandlers}
    >
      {/* 텍스트 영역 */}
      <div key={currentIndex} className="animate-fade-slide-in text-left">
        {/* 제목 상자 */}
        <div className="min-h-[80px] w-full">
          <h1 className="text-2xl leading-[1.67] font-medium whitespace-pre-line">
            {currentSlide.title}
          </h1>
        </div>

        {/* 설명 상자 - 위쪽 31px 간격 */}
        <div className="mt-[31px] min-h-[75px] w-full">
          <p className="text-sm leading-relaxed font-light break-keep text-white">
            {currentSlide.description}
          </p>
        </div>
      </div>

      {/* 인디케이터 (점 3개) - 높이 15, 아래쪽 31px 간격 */}
      <div className="mt-[31px] flex h-[15px] items-center justify-center gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={(e) => {
              e.stopPropagation()
              onSlideChange(idx)
            }}
            className={`h-2 w-2 rounded-full transition-colors duration-300 ${
              currentIndex === idx
                ? 'bg-white'
                : 'bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default OnboardingSlider
