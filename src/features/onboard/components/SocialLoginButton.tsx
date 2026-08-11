import React from "react";

interface SocialLoginButtonProps {
  label: string;
  icon?: string;
  bgColor: string;
  textColor: string;
  onClick: () => void;
}

const SocialLoginButton: React.FC<SocialLoginButtonProps> = ({
  label,
  icon,
  bgColor,
  textColor,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`w-full h-14 rounded-[10px] flex items-center justify-center gap-2 font-medium ${bgColor} ${textColor}`}
    >
      {icon ? <img src={icon} alt="" className="w-5 h-5" /> : null}
      {label}
    </button>
  );
};

export default SocialLoginButton;