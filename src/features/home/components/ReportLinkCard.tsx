import { useNavigate } from 'react-router-dom'
import chevronRightLight from '@/shared/assets/icons/chevron-right-light.svg'
import documentIcon from '@/shared/assets/icons/document.svg'

export default function ReportLinkCard() {
  const navigate = useNavigate()

  return (
    <button
      type="button"
      onClick={() => navigate('/measurement/report-request')}
      className="border-outline bg-box-background flex h-11.75 w-full items-center justify-between rounded-[10px] border px-5"
    >
      <span className="flex items-center gap-3.75">
        <img src={documentIcon} alt="" className="h-3.75 w-2.75" />
        <span className="text-primary text-[14px] leading-normal font-semibold tracking-[-0.28px]">
          내 리포트 보기
        </span>
      </span>
      <img src={chevronRightLight} alt="" className="h-3.5 w-1.75" />
    </button>
  )
}
