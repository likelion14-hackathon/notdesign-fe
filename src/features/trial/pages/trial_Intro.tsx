import { useNavigate } from 'react-router-dom'
import Logo from '@/shared/components/Logo'
import { trialIntroSlides } from '@/features/trial/data/trialIntroData'
import { useAutoAdvance } from '@/features/trial/data/useAutoAdvance'

function Trial_Intro() {
  const navigate = useNavigate()

  const { currentIndex, handleTap } = useAutoAdvance({
    totalSlides: trialIntroSlides.length,
    intervalMs: 2000,
    onComplete: () => {
      navigate('/trial/capture')
    },
  })

  const currentSlide = trialIntroSlides[currentIndex]

  return (
    <div
      onClick={handleTap}
      className="bg-off-white relative mx-auto flex h-dvh w-full max-w-md cursor-pointer flex-col overflow-hidden select-none"
    >
      <Logo />

      <div className="flex flex-1 items-center justify-center px-6">
        <p
          key={currentIndex}
          className="text-text-primary animate-fade-slide-in text-center font-sans text-2xl leading-10 font-semibold whitespace-pre-line"
        >
          {currentSlide.text}
        </p>
      </div>
    </div>
  )
}

export default Trial_Intro
