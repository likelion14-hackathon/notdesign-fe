import type { ReactNode } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import AnalyzingCard from '@/features/measurement/components/AnalyzingCard'
import FlowHeader from '@/features/measurement/components/FlowHeader'
import DataLoadFailedModal from '@/shared/components/DataLoadFailedModal'
import Logo from '@/shared/components/Logo'

interface FailedLocationState {
  reason?: 'no_new_data' | 'no_cycle'
}

const REASON_TEXT: Record<
  'no_new_data' | 'no_cycle',
  { title: string; description: ReactNode }
> = {
  no_new_data: {
    title: '새로운 측정 데이터가 있어야 리포트를 만들 수 있어요',
    description: (
      <>
        지난 리포트 이후 새로 등록된 오프라인 측정 데이터가 없어요
        <br />
        오프라인 측정 진행 후 데이터를 불러와주세요
      </>
    ),
  },
  no_cycle: {
    title: '측정 데이터를 불러올 수 없어요',
    description: (
      <>
        진행 중인 사이클이나 기준선 측정 데이터를 찾을 수 없어요
        <br />
        오프라인 측정 진행 후 데이터를 불러와주세요
      </>
    ),
  },
}

/** POST /api/reports가 409(새 측정 데이터 없음) 또는 404(진행 중 사이클·기준선 측정 없음)를 반환했을 때 안내 */
export default function ReportImportFailedPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const reason =
    (location.state as FailedLocationState | null)?.reason ?? 'no_new_data'
  const { title, description } = REASON_TEXT[reason]

  return (
    <div className="bg-off-white min-h-screen-safe mx-auto flex w-full max-w-103.5 flex-col">
      <Logo />

      <FlowHeader
        eyebrow="오프라인 측정 데이터 불러오기"
        title="측정 데이터를 불러오고 있어요"
        showBack={false}
      />

      <div className="mt-21.25 px-5">
        <AnalyzingCard />
      </div>

      <DataLoadFailedModal
        title={title}
        description={description}
        onConfirm={() =>
          navigate('/measurement/report-request', { replace: true })
        }
      />
    </div>
  )
}
