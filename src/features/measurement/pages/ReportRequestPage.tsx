import { useNavigate } from 'react-router-dom'
import FlowHeader from '@/features/measurement/components/FlowHeader'
import BottomBar from '@/shared/components/BottomBar'
import Logo from '@/shared/components/Logo'

const ACTION_BUTTON =
  'flex h-14.5 items-center justify-center rounded-[10px] text-[15px] font-semibold tracking-[-0.3px] shadow-[0px_0px_8.4px_0px_rgba(115,115,115,0.25)]'

export default function ReportRequestPage() {
  const navigate = useNavigate()

  return (
    <div className="bg-off-white pb-bottom-bar min-h-screen-safe mx-auto w-full max-w-103.5">
      <Logo />

      <FlowHeader
        eyebrow="리포트"
        backTo="/"
        title={
          <>
            오프라인 측정 데이터를 불러와
            <br />
            리포트를 생성할까요?
          </>
        }
      />

      <BottomBar>
        <div className="flex gap-2.75">
          <button
            type="button"
            onClick={() => navigate('/measurement/six-week-report')}
            className={`${ACTION_BUTTON} bg-line text-text-primary flex-1`}
          >
            기존 리포트 열기
          </button>
          <button
            type="button"
            onClick={() =>
              navigate('/measurement/processing', {
                state: { flow: 'report' },
              })
            }
            className={`${ACTION_BUTTON} bg-primary text-off-white flex-1`}
          >
            불러오기
          </button>
        </div>
      </BottomBar>
    </div>
  )
}
