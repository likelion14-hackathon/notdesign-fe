export type LoginStep = 'select' | 'email' | 'password'

export const LOGIN_MODAL_TITLE: Record<LoginStep, string> = {
  select: '로그인이 필요해요',
  email: '이메일 주소를 입력해주세요',
  password: '비밀번호를 입력해주세요',
}

export const LOGIN_MODAL_PLACEHOLDER = {
  email: '이메일 주소',
  password: '비밀번호',
} as const

export const LOGIN_MODAL_ERROR = {
  email: '올바른 이메일 주소가 맞는지 확인하세요',
  password: '비밀번호가 일치하지 않아요',
} as const

export const LOGIN_MODAL_BUTTON = {
  kakao: '카카오로 계속하기',
  email: '이메일 계정으로 계속하기',
  continue: '계속하기',
} as const
