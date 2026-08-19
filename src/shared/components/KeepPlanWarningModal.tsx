import { useEffect } from 'react'
import warningIcon from '@/shared/assets/icons/warning.svg'

interface KeepPlanWarningModalProps {
  onConfirm: () => void
  onCancel: () => void
}

export default function KeepPlanWarningModal({
  onConfirm,
  onCancel,
}: KeepPlanWarningModalProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onCancel()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onCancel])

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div
        className="bg-modal-backdrop absolute inset-0 backdrop-blur-[2px]"
        onClick={onCancel}
      />
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="keep-plan-warning-title"
        className="border-line bg-off-white relative w-full max-w-103.5 rounded-t-[50px] border pt-9.75 pb-8.75"
      >
        <div className="px-10">
          <img src={warningIcon} alt="" className="size-13.25" />
          <p
            id="keep-plan-warning-title"
            className="text-text-primary mt-6 text-[20px] font-semibold tracking-[-0.4px]"
          >
            기존 플랜을 유지하시겠어요?
          </p>
          <p className="text-text-secondary mt-3.75 text-[14px] leading-6.25 font-semibold tracking-[-0.28px] break-keep">
            기존 플랜을 유지할 경우 개선된 플랜 참여가 어렵습니다.
            <br />
            계속 진행하시겠어요?
          </p>
        </div>
        <div className="mt-13.25 flex gap-3.5 px-5">
          <button
            type="button"
            onClick={onCancel}
            className="bg-dark text-off-white h-12.25 flex-1 rounded-[10px] text-[14px] font-semibold tracking-[-0.28px]"
          >
            취소
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="bg-primary text-off-white h-12.25 flex-1 rounded-[10px] text-[14px] font-semibold tracking-[-0.28px]"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  )
}
