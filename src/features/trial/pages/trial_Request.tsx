import { useLocation, useNavigate } from 'react-router-dom'
import FlowHeader from '@/features/measurement/components/FlowHeader'
import { useUserName } from '@/features/auth/useUserName'
import BottomBar from '@/shared/components/BottomBar'
import BottomButton from '@/shared/components/BottomButton'
import Logo from '@/shared/components/Logo'
import type { DiaryAnalysisResult } from '@/features/analyze/types'

function Trial_Request() {
  const navigate = useNavigate()
  const location = useLocation()
  const analysisResult = location.state as DiaryAnalysisResult | null
  const userName = useUserName()

  return (
    <div className="bg-off-white pb-bottom-bar min-h-screen-safe mx-auto w-full max-w-103.5">
      <Logo />

      <FlowHeader
        eyebrow="체험해보기"
        backTo="/trial/analyze/complete"
        title={
          <>
            {userName}님을 위한 일주일 플랜을
            <br />
            생성해 볼까요?
          </>
        }
      />

      <BottomBar>
        <BottomButton
          onClick={() =>
            navigate('/trial/plan-generating', { state: analysisResult })
          }
        >
          생성하기
        </BottomButton>
      </BottomBar>
    </div>
  )
}

export default Trial_Request
