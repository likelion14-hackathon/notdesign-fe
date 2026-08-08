import { HOME_SUMMARY } from '@/features/home/constants'

interface ImportPromptCardProps {
  /** 아직 연결된 화면이 없으면 생략 — 버튼이 눌려도 아무 동작도 하지 않음 */
  onImport?: () => void
}

export default function ImportPromptCard({ onImport }: ImportPromptCardProps) {
  const { title, description, buttonLabel } = HOME_SUMMARY.importPrompt

  return (
    <div className="border-nav-border bg-box-background w-full rounded-[10px] border px-5 pt-7.25 pb-9.5">
      <p className="text-text-primary text-[18px] leading-5.5 font-semibold tracking-[-0.36px]">
        {title}
      </p>
      <p className="text-text-secondary mt-2.25 text-[13px] leading-5 font-medium tracking-[-0.26px] break-keep">
        {description}
      </p>
      <button
        type="button"
        onClick={onImport}
        className="bg-primary text-off-white mt-5 flex h-11.25 w-full items-center justify-center rounded-[10px] text-[14px] font-semibold tracking-[-0.28px]"
      >
        {buttonLabel}
      </button>
    </div>
  )
}
