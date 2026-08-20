import React, { useState } from 'react'
import kakaoLogo from '@/shared/assets/icons/kakao-logo.svg'
import SocialLoginButton from '@/features/onboard/components/SocialLoginButton'
import { useSlideUpModal } from '@/features/onboard/data/useSlideUpModal'
import { usePageBackground } from '@/shared/hooks/usePageBackground'
import { useScrollLock } from '@/shared/hooks/useScrollLock'
import { useVisualViewport } from '@/shared/hooks/useVisualViewport'
import warningIcon from '@/shared/assets/icons/Vector.svg'
import mailIcon from '@/shared/assets/icons/mail.svg'
import lockIcon from '@/shared/assets/icons/lock.svg'
import {
  type LoginStep,
  LOGIN_MODAL_TITLE,
  LOGIN_MODAL_PLACEHOLDER,
  LOGIN_MODAL_ERROR,
  LOGIN_MODAL_BUTTON,
} from '@/features/onboard/data/loginModalData'
import { signIn } from '@/features/auth/api'
import { useAuthStore } from '@/features/auth/store'

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
  onKakaoLogin: () => void
  onLoginSuccess: () => void
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const MODAL_PADDING_BOTTOM = 35
const MODAL_BACKGROUND = '#222222'

const STEP_ICON: Record<LoginStep, string> = {
  select: warningIcon,
  email: mailIcon,
  password: lockIcon,
}

const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onKakaoLogin,
  onLoginSuccess,
}) => {
  const { shouldRender, translateClass } = useSlideUpModal({ isOpen })
  useScrollLock(isOpen)
  usePageBackground(isOpen ? MODAL_BACKGROUND : null)
  const viewport = useVisualViewport(isOpen)
  const login = useAuthStore((state) => state.login)
  const [step, setStep] = useState<LoginStep>('select')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState(false)
  const [passwordError, setPasswordError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (!shouldRender) return null

  const handleClose = () => {
    onClose()
    setStep('select')
    setEmail('')
    setPassword('')
    setEmailError(false)
    setPasswordError(null)
  }

  const handleEmailContinue = () => {
    if (!EMAIL_REGEX.test(email)) {
      setEmailError(true)
      return
    }
    setEmailError(false)
    setStep('password')
  }

  const handlePasswordContinue = async () => {
    if (isSubmitting) return
    setIsSubmitting(true)
    try {
      const result = await signIn(email, password)
      login(result)
      setPasswordError(null)
      onLoginSuccess()
    } catch (error) {
      // 404(존재하지 않는 이메일), 401(비밀번호 불일치)
      const message =
        error instanceof Error ? error.message : LOGIN_MODAL_ERROR.password
      setPasswordError(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center overflow-hidden backdrop-blur-[2px]"
      data-vv="overlay"
      onClick={handleClose}
    >
      <div
        className={`bg-text-primary border-dark relative flex max-h-full w-full max-w-md flex-col overflow-y-auto overscroll-contain rounded-tl-[50px] rounded-tr-[50px] border-t px-8 pt-8 ${translateClass}`}
        style={{
          paddingBottom: `${MODAL_PADDING_BOTTOM + viewport.keyboardHeight}px`,
          transition:
            'transform 300ms ease-out, padding-bottom 280ms cubic-bezier(0.32, 0.72, 0, 1)',
        }}
        data-vv="panel"
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
          className="mb-4 h-12 w-12 shrink-0"
        />

        <h2 className="mb-8 text-lg font-semibold text-white">
          {LOGIN_MODAL_TITLE[step]}
        </h2>

        {step === 'select' && (
          <div className="flex shrink-0 flex-col gap-3">
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
          <div className="flex shrink-0 flex-col gap-3">
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
          <div className="flex shrink-0 flex-col gap-3">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  if (passwordError) setPasswordError(null)
                }}
                placeholder={LOGIN_MODAL_PLACEHOLDER.password}
                className={`h-14 w-full rounded-[10px] border bg-neutral-700 px-4 text-white placeholder:text-neutral-400 ${
                  passwordError ? 'border-orange-500' : 'border-transparent'
                } focus:outline-none`}
              />
              {passwordError && (
                <p className="mt-2 text-xs text-orange-500">{passwordError}</p>
              )}
            </div>
            <button
              onClick={handlePasswordContinue}
              disabled={isSubmitting}
              className="bg-primary h-14 w-full rounded-[10px] font-semibold text-white disabled:opacity-60"
            >
              {isSubmitting ? '로그인 중...' : LOGIN_MODAL_BUTTON.continue}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default LoginModal
