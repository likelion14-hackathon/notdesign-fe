import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import FlowHeader from '@/features/measurement/components/FlowHeader'
import ResultCard from '@/features/measurement/components/ResultCard'
import BottomBar from '@/shared/components/BottomBar'
import BottomButton from '@/shared/components/BottomButton'
import LeaveWarningModal from '@/shared/components/LeaveWarningModal'
import Logo from '@/shared/components/Logo'

function Trial_AnalyzeComplete() {
  const navigate = useNavigate()
  const [showLeaveWarning, setShowLeaveWarning] = useState(false)

  return (
    <div className="bg-off-white pb-bottom-bar min-h-screen-safe mx-auto w-full max-w-103.5">
      <Logo />

      <FlowHeader
        eyebrow="체험해보기"
        title="분석을 완료했어요"
        onBack={() => setShowLeaveWarning(true)}
      />

      <div className="mt-21.25 px-5">
        <ResultCard />
      </div>

      <BottomBar>
        <BottomButton onClick={() => navigate('/trial/request')}>
          다음으로
        </BottomButton>
      </BottomBar>

      {showLeaveWarning && (
        <LeaveWarningModal
          onApprove={() => navigate('/trial/capture')}
          onReject={() => setShowLeaveWarning(false)}
        />
      )}
    </div>
  )
}

export default Trial_AnalyzeComplete
