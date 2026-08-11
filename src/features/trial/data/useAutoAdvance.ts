import { useEffect, useRef, useState } from "react";

interface UseAutoAdvanceProps {
  totalSlides: number;
  intervalMs?: number;
  onComplete?: () => void;
}

export const useAutoAdvance = ({
  totalSlides,
  intervalMs = 2500,
  onComplete,
}: UseAutoAdvanceProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goToNext = () => {
    setCurrentIndex((prev) => {
      if (prev >= totalSlides - 1) {
        return prev;
      }
      return prev + 1;
    });
  };

  useEffect(() => {
    if (currentIndex >= totalSlides - 1) {
      // 마지막 슬라이드 도달하면 일정 시간 뒤 자동으로 완료 처리
      timerRef.current = setTimeout(() => {
        onComplete?.();
      }, intervalMs);
      return () => {
        if (timerRef.current) clearTimeout(timerRef.current);
      };
    }

    timerRef.current = setTimeout(goToNext, intervalMs);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [currentIndex, totalSlides, intervalMs, onComplete]);

  const handleTap = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (currentIndex >= totalSlides - 1) {
      onComplete?.();
      return;
    }
    goToNext();
  };

  return { currentIndex, handleTap };
};