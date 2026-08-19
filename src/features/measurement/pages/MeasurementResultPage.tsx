import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FlowHeader from '@/features/measurement/components/FlowHeader'
import ResultCard from '@/features/measurement/components/ResultCard'
import BottomBar from '@/shared/components/BottomBar'
import BottomButton from '@/shared/components/BottomButton'
import LeaveWarningModal from '@/shared/components/LeaveWarningModal'
import Logo from '@/shared/components/Logo'

export default function MeasurementResultPage() {
  const navigate = useNavigate()
  const [showLeaveWarning, setShowLeaveWarning] = useState(false)

  return (
    <div className="bg-off-white pb-bottom-bar min-h-screen-safe mx-auto w-full max-w-103.5">
      <Logo />

      <FlowHeader
        eyebrow="오프라인 측정 데이터 불러오기"
        title="측정 결과를 찾았어요"
        onBack={() => setShowLeaveWarning(true)}
      />

      <div className="mt-21.25 px-5">
        <ResultCard />
      </div>

      <BottomBar>
        <BottomButton onClick={() => navigate('/measurement/plan-request')}>
          다음으로
        </BottomButton>
      </BottomBar>

      {showLeaveWarning && (
        <LeaveWarningModal
          onApprove={() => navigate('/measurement/agreement')}
          onReject={() => setShowLeaveWarning(false)}
        />
      )}
    </div>
  )
}
