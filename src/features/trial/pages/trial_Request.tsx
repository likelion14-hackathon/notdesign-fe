import { useNavigate } from 'react-router-dom'
import FlowHeader from '@/features/measurement/components/FlowHeader'
import { MEASUREMENT_RESULT } from '@/features/measurement/constants'
import BottomBar from '@/shared/components/BottomBar'
import BottomButton from '@/shared/components/BottomButton'
import Logo from '@/shared/components/Logo'

function Trial_Request() {
  const navigate = useNavigate()

  return (
    <div className="bg-off-white pb-bottom-bar min-h-screen-safe mx-auto w-full max-w-103.5">
      <Logo />

      <FlowHeader
        eyebrow="체험해보기"
        backTo="/trial/analyze/complete"
        title={
          <>
            {MEASUREMENT_RESULT.givenName}님을 위한 일주일 플랜을
            <br />
            생성해 볼까요?
          </>
        }
      />

      <BottomBar>
        <BottomButton onClick={() => navigate('/trial/plan-generating')}>
          생성하기
        </BottomButton>
      </BottomBar>
    </div>
  )
}

export default Trial_Request
