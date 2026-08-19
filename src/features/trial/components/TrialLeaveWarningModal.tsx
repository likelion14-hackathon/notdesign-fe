import { useEffect } from "react";
import warningIcon from "@/shared/assets/icons/warning.svg";

interface TrialLeaveWarningModalProps {
  onApprove: () => void;
  onReject: () => void;
}

export default function TrialLeaveWarningModal({
  onApprove,
  onReject,
}: TrialLeaveWarningModalProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onReject();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onReject]);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div
        className="bg-modal-backdrop absolute inset-0 backdrop-blur-[2px]"
        onClick={onReject}
      />
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="trial-leave-warning-title"
        className="border-line bg-off-white relative w-full max-w-103.5 rounded-t-[50px] border pt-9.75 pb-8.75"
      >
        <div className="px-10">
          <img src={warningIcon} alt="" className="size-13.25" />
          <p
            id="trial-leave-warning-title"
            className="text-text-primary mt-6 text-[20px] font-semibold tracking-[-0.4px]"
          >
            뒤로 돌아가기
          </p>
          <p className="text-text-secondary mt-3.75 text-[14px] leading-6.25 font-semibold tracking-[-0.28px] break-keep">
            이 단계에서 뒤로 돌아가면 피부 분석을 위해 사진 촬영을 다시
            진행해야 해요. 계속 진행하시겠어요?
          </p>
        </div>
        <div className="mt-13.25 flex gap-3.5 px-5">
          <button
            type="button"
            onClick={onReject}
            className="bg-dark text-off-white h-12.25 flex-1 rounded-[10px] text-[14px] font-semibold tracking-[-0.28px]"
          >
            거절
          </button>
          <button
            type="button"
            onClick={onApprove}
            className="bg-primary text-off-white h-12.25 flex-1 rounded-[10px] text-[14px] font-semibold tracking-[-0.28px]"
          >
            승인
          </button>
        </div>
      </div>
    </div>
  );
}