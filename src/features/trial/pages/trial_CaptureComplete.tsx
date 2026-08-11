import Logo from "@/shared/components/Logo";
import checkIcon from "@/shared/assets/icons/check.svg";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Trial_CaptureComplete() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/trial/analyze");
    }, 1500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="relative w-full max-w-md mx-auto h-dvh flex flex-col overflow-hidden bg-off-white">
      <Logo />

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

      <div className="flex justify-center mt-[99px]">
        <div className="relative w-[374px] h-[374px] rounded-full bg-primary flex items-center justify-center">
          <div className="w-[350px] h-[350px] rounded-full bg-off-white flex items-center justify-center">
            <div className="relative w-[334px] h-[334px] rounded-full bg-outline flex flex-col items-center justify-center">
              <img src={checkIcon} alt="완료" className="w-[86px] h-[60px]" />
              <div className="w-[68px] h-[29px] mt-[30px] flex items-center justify-center">
                <p className="text-primary text-xl font-semibold font-sans whitespace-nowrap">
                  좋아요!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Trial_CaptureComplete;