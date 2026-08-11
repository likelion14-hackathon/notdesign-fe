import { useNavigate } from "react-router-dom";
import Logo from "@/shared/components/Logo";
import { trialIntroSlides } from "@/features/trial/data/trialIntroData";
import { useAutoAdvance } from "@/features/trial/data/useAutoAdvance";

function Trial_Intro() {
  const navigate = useNavigate();

  const { currentIndex, handleTap } = useAutoAdvance({
    totalSlides: trialIntroSlides.length,
    intervalMs: 2000,
    onComplete: () => {
      navigate("/trial/capture"); 
    },
  });

  const currentSlide = trialIntroSlides[currentIndex];

  return (
    <div
      onClick={handleTap}
      className="relative w-full max-w-md mx-auto h-dvh flex flex-col overflow-hidden bg-off-white cursor-pointer select-none"
    >
      <Logo />

      <div className="flex-1 flex items-center justify-center px-6">
        <p
          key={currentIndex}
          className="text-text-primary text-2xl font-semibold font-sans leading-10 text-center whitespace-pre-line animate-fade-slide-in"
        >
          {currentSlide.text}
        </p>
      </div>
    </div>
  );
}

export default Trial_Intro;