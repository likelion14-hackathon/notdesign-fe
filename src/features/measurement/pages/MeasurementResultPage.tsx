import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FlowHeader from '@/features/measurement/components/FlowHeader'
import ResultCard from '@/features/measurement/components/ResultCard'
import BottomButton from '@/shared/components/BottomButton'
import LeaveWarningModal from '@/shared/components/LeaveWarningModal'
import Logo from '@/shared/components/Logo'

export default function MeasurementResultPage() {
  const navigate = useNavigate()
  const [showLeaveWarning, setShowLeaveWarning] = useState(false)

  return (
    <div className="bg-off-white mx-auto flex h-svh w-full max-w-103.5 flex-col">
      <Logo />

      <FlowHeader
        eyebrow="오프라인 측정 데이터 불러오기"
        title="측정 결과를 찾았어요"
        onBack={() => setShowLeaveWarning(true)}
      />

      <div className="mt-21.25 min-h-0 flex-1 overflow-y-auto px-5">
        <ResultCard />
      </div>

      <div className="shrink-0 px-5 pt-5 pb-[calc(35px+env(safe-area-inset-bottom))]">
        <BottomButton onClick={() => navigate('/measurement/plan-request')}>
          다음으로
        </BottomButton>
      </div>

      {showLeaveWarning && (
        <LeaveWarningModal
          onApprove={() => navigate('/measurement/agreement')}
          onReject={() => setShowLeaveWarning(false)}
        />
      )}
    </div>
  )
}
