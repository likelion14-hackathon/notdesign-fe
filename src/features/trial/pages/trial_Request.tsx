import { useNavigate } from 'react-router-dom'
import FlowHeader from '@/features/measurement/components/FlowHeader'
import { MEASUREMENT_RESULT } from '@/features/measurement/constants'
import BottomButton from '@/shared/components/BottomButton'
import Logo from '@/shared/components/Logo'

function Trial_Request() {
  const navigate = useNavigate()

  return (
    <div className="bg-off-white mx-auto flex h-svh w-full max-w-103.5 flex-col">
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

      <div className="min-h-0 flex-1" />

      <div className="shrink-0 px-5 pb-[calc(35px+env(safe-area-inset-bottom))]">
        <BottomButton onClick={() => navigate('/trial/plan-generating')}>
          생성하기
        </BottomButton>
      </div>
    </div>
  )
}

export default Trial_Request
