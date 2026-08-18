import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AnalyzingCard from '@/features/measurement/components/AnalyzingCard'
import FlowHeader from '@/features/measurement/components/FlowHeader'
import DataLoadFailedModal from '@/shared/components/DataLoadFailedModal'
import Logo from '@/shared/components/Logo'

/** 실제 API 연동 전까지 로딩 상태를 흉내 내는 시간(ms) */
const SIMULATED_LOADING_MS = 2400

/** Figma: PF_REPORT_IN_PROCESS - 데이터 없음 (962:2694) */
export default function ReportImportFailedPage() {
  const navigate = useNavigate()
  const [showFailedModal, setShowFailedModal] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowFailedModal(true)
    }, SIMULATED_LOADING_MS)

    return () => clearTimeout(timer)
  }, [])

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

      {showFailedModal && (
        <DataLoadFailedModal
          onConfirm={() =>
            navigate('/measurement/report-request', { replace: true })
          }
        />
      )}
    </div>
  )
}
