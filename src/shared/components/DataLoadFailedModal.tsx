import type { ReactNode } from 'react'
import warningIcon from '@/shared/assets/icons/warning.svg'

interface DataLoadFailedModalProps {
  onConfirm: () => void
  /** 기본값: "측정 데이터를 불러올 수 없어요" */
  title?: string
  /** 기본값: 오프라인 측정 데이터 없음 안내 문구 */
  description?: ReactNode
}

export default function DataLoadFailedModal({
  onConfirm,
  title = '측정 데이터를 불러올 수 없어요',
  description = (
    <>
      오프라인에서 측정한 데이터를 찾을 수 없어요
      <br />
      오프라인 측정 진행 후 오프라인 측정 데이터를 불러와주세요
    </>
  ),
}: DataLoadFailedModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div className="bg-modal-backdrop absolute inset-0 backdrop-blur-[2px]" />
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="data-load-failed-title"
        className="border-line bg-off-white relative w-full max-w-103.5 rounded-t-[50px] border pt-9.75 pb-8.75"
      >
        <div className="px-10">
          <img src={warningIcon} alt="" className="size-13.25" />
          <p
            id="data-load-failed-title"
            className="text-text-primary mt-6 text-[20px] font-semibold tracking-[-0.4px]"
          >
            {title}
          </p>
          <p className="text-text-secondary mt-3.75 text-[14px] leading-6.25 font-semibold tracking-[-0.28px] break-keep">
            {description}
          </p>
        </div>
        <div className="mt-9.5 px-5">
          <button
            type="button"
            onClick={onConfirm}
            className="bg-primary text-off-white flex h-14.5 w-full items-center justify-center rounded-[10px] text-[15px] font-semibold tracking-[-0.3px] shadow-[0px_0px_4.2px_0px_rgba(115,115,115,0.25)]"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  )
}
