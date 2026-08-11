import Logo from "@/shared/components/Logo";
import BottomButton from "@/shared/components/BottomButton";
import personSilhouette from "@/shared/assets/icons/person.svg";
import { useNavigate } from "react-router-dom";

function Trial_Capture() {
  const navigate = useNavigate();

  return (
    <div className="relative w-full max-w-md mx-auto h-dvh flex flex-col overflow-hidden bg-off-white">
      <Logo />

      {/* 제목 영역 */}
      <div className="pl-[20px] mt-[30px]">
        <div className="w-[64px] h-[18px]">
          <span className="text-text-secondary text-base font-semibold font-sans whitespace-nowrap">
            체험해보기
          </span>
        </div>

        <div className="w-[276px] h-[40px] mt-[10px]">
          <p className="text-text-primary text-2xl font-semibold font-sans leading-[1.67]">
            표시선에 얼굴을 맞춰주세요
          </p>
        </div>
      </div>

      {/* 원형 가이드 영역 */}
      <div className="flex justify-center mt-[99px]">
        <div className="relative w-[374px] h-[374px] rounded-full bg-primary flex items-center justify-center">
          <div className="w-[350px] h-[350px] rounded-full bg-off-white flex items-center justify-center">
            <div className="relative w-[334px] h-[334px] rounded-full bg-outline overflow-hidden">
              <img
                src={personSilhouette}
                alt="얼굴 위치 가이드"
                className="absolute inset-0 w-full h-full object-contain p-9.5"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 안내 문구 */}
      <div className="flex justify-center mt-[26px]">
        <p className="w-[204px] h-[14px] text-center text-xs text-text-secondary font-sans whitespace-nowrap">
          표시선에 얼굴이 인식되면 자동으로 촬영돼요
        </p>
      </div>

      {/* 촬영하기 버튼 */}
      <div className="mt-auto px-[20px] pb-10">
        <BottomButton onClick={() => navigate("/trial/capture/complete")}>
          촬영하기
        </BottomButton>
      </div>
    </div>
  );
}

export default Trial_Capture;