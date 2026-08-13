import React, { useState } from 'react'
import kakaoLogo from '@/shared/assets/icons/kakao-logo.svg'
import SocialLoginButton from '@/features/onboard/components/SocialLoginButton'
import { useSlideUpModal } from '@/features/onboard/data/useSlideUpModal'
import warningIcon from '@/shared/assets/icons/Vector.svg'
import mailIcon from '@/shared/assets/icons/mail.svg'
import lockIcon from '@/shared/assets/icons/lock.svg'
import {
  type LoginStep,
  LOGIN_MODAL_TITLE,
  LOGIN_MODAL_PLACEHOLDER,
  LOGIN_MODAL_ERROR,
  LOGIN_MODAL_BUTTON,
  MOCK_EMAIL,
  MOCK_PASSWORD,
} from '@/features/onboard/data/loginModalData'

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
  onKakaoLogin: () => void
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const STEP_ICON: Record<LoginStep, string> = {
  select: warningIcon,
  email: mailIcon,
  password: lockIcon,
}

const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onKakaoLogin,
}) => {
  const { shouldRender, translateClass } = useSlideUpModal({ isOpen })
  const [step, setStep] = useState<LoginStep>('select')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)

  if (!shouldRender) return null

  const handleClose = () => {
    onClose()
    setStep('select')
    setEmail('')
    setPassword('')
    setEmailError(false)
    setPasswordError(false)
  }

  const handleEmailContinue = () => {
    if (!EMAIL_REGEX.test(email)) {
      setEmailError(true)
      return
    }
    setEmailError(false)
    setStep('password')
  }

  const handlePasswordContinue = () => {
    if (password !== MOCK_PASSWORD || email !== MOCK_EMAIL) {
      setPasswordError(true)
      return
    }
    setPasswordError(false)
    // TODO: API 연동 시 여기서 실제 로그인 요청
  }

  return (
    <div
      className="absolute inset-0 z-50 flex items-end justify-center backdrop-blur-[2px]"
      onClick={handleClose}
    >
      <div
        className={`bg-text-primary border-dark relative flex min-h-96 w-full max-w-md flex-col rounded-tl-[50px] rounded-tr-[50px] border-t px-8 pt-8 pb-10 transition-transform duration-300 ease-out ${translateClass}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute top-6 right-6 text-white/70 hover:text-white"
          aria-label="닫기"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M15 5L5 15M5 5L15 15"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <img
          src={step === 'email' && emailError ? warningIcon : STEP_ICON[step]}
          alt=""
          className="mb-4 h-12 w-12"
        />

        <h2 className="mb-8 text-lg font-semibold text-white">
          {LOGIN_MODAL_TITLE[step]}
        </h2>

        {step === 'select' && (
          <div className="flex flex-col gap-3">
            <SocialLoginButton
              label={LOGIN_MODAL_BUTTON.kakao}
              icon={kakaoLogo}
              bgColor="bg-yellow-300"
              textColor="text-black"
              onClick={onKakaoLogin}
            />
            <SocialLoginButton
              label={LOGIN_MODAL_BUTTON.email}
              bgColor="bg-neutral-700"
              textColor="text-white"
              onClick={() => setStep('email')}
            />
          </div>
        )}

        {step === 'email' && (
          <div className="flex flex-col gap-3">
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  if (emailError) setEmailError(false)
                }}
                placeholder={LOGIN_MODAL_PLACEHOLDER.email}
                className={`h-14 w-full rounded-[10px] border bg-neutral-700 px-4 text-white placeholder:text-neutral-400 ${
                  emailError ? 'border-orange-500' : 'border-transparent'
                } focus:outline-none`}
              />
              {emailError && (
                <p className="mt-2 text-xs text-orange-500">
                  {LOGIN_MODAL_ERROR.email}
                </p>
              )}
            </div>
            <button
              onClick={handleEmailContinue}
              className="bg-primary h-14 w-full rounded-[10px] font-semibold text-white"
            >
              {LOGIN_MODAL_BUTTON.continue}
            </button>
          </div>
        )}

        {step === 'password' && (
          <div className="flex flex-col gap-3">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  if (passwordError) setPasswordError(false)
                }}
                placeholder={LOGIN_MODAL_PLACEHOLDER.password}
                className={`h-14 w-full rounded-[10px] border bg-neutral-700 px-4 text-white placeholder:text-neutral-400 ${
                  passwordError ? 'border-orange-500' : 'border-transparent'
                } focus:outline-none`}
              />
              {passwordError && (
                <p className="mt-2 text-xs text-orange-500">
                  {LOGIN_MODAL_ERROR.password}
                </p>
              )}
            </div>
            <button
              onClick={handlePasswordContinue}
              className="bg-primary h-14 w-full rounded-[10px] font-semibold text-white"
            >
              {LOGIN_MODAL_BUTTON.continue}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default LoginModal
