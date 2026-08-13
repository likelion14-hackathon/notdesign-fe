import React from 'react'

interface SocialLoginButtonProps {
  label: string
  icon?: string
  bgColor: string
  textColor: string
  onClick: () => void
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
      className={`flex h-14 w-full items-center justify-center gap-2 rounded-[10px] font-medium ${bgColor} ${textColor}`}
    >
      {icon ? <img src={icon} alt="" className="h-5 w-5" /> : null}
      {label}
    </button>
  )
}

export default SocialLoginButton
