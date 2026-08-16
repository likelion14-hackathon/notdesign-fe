import { useNavigate } from "react-router-dom";
import { useState } from "react";
import FlowHeader from "@/features/measurement/components/FlowHeader";
import ResultCard from "@/features/measurement/components/ResultCard";
import BottomButton from "@/shared/components/BottomButton";
import TrialLeaveWarningModal from "@/features/trial/components/TrialLeaveWarningModal";
import Logo from "@/shared/components/Logo";

function Trial_AnalyzeComplete() {
  const navigate = useNavigate()
  const [showLeaveWarning, setShowLeaveWarning] = useState(false)

  return (
    <div className="bg-off-white mx-auto flex h-svh w-full max-w-103.5 flex-col">
      <Logo />

      <FlowHeader
        eyebrow="체험해보기"
        title="분석을 완료했어요"
        onBack={() => setShowLeaveWarning(true)}
      />

      <div className="mt-21.25 min-h-0 flex-1 overflow-y-auto px-5">
        <ResultCard />
        <p className="mt-[25px] text-text-secondary text-xs text-center leading-[1.6] whitespace-pre-line">
          {"이 시스템은 의료기기가 아니며, 분석 결과는 미용 참고 정보일 뿐\n진단 목적으로 사용할 수 없음을 유의하시기 바랍니다"}
        </p>
      </div>

      <div className="shrink-0 px-5 pt-5 pb-[calc(35px+env(safe-area-inset-bottom))]">
        <BottomButton onClick={() => navigate('/trial/request')}>
          다음으로
        </BottomButton>
      </div>

      {showLeaveWarning && (
        <TrialLeaveWarningModal
          onApprove={() => navigate("/trial/capture")}
          onReject={() => setShowLeaveWarning(false)}
        />
      )}
    </div>
  )
}

export default Trial_AnalyzeComplete
