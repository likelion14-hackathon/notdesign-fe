import { create } from 'zustand'
import type { SigninResult } from '@/features/auth/types'
import { decodeJwtPayload } from '@/shared/utils/jwt'

const ACCESS_TOKEN_KEY = 'accessToken'
const REFRESH_TOKEN_KEY = 'refreshToken'
const USER_NAME_KEY = 'userName'
const USER_EMAIL_KEY = 'userEmail'

interface AccessTokenPayload {
  sub?: string
}

function normalize(value: string | null | undefined): string | null {
  const trimmed = value?.trim()
  return trimmed ? trimmed : null
}

function extractEmail(accessToken: string | null): string | null {
  if (!accessToken) return null
  return normalize(decodeJwtPayload<AccessTokenPayload>(accessToken)?.sub)
}

function persist(key: string, value: string | null) {
  if (value) localStorage.setItem(key, value)
  else localStorage.removeItem(key)
}

interface UserInfoPatch {
  email?: string | null
  name?: string | null
}

interface AuthState {
  isAuthenticated: boolean
  accessToken: string | null
  refreshToken: string | null
  email: string | null
  name: string | null
  login: (result: SigninResult) => void
  /** POST /api/auth/refresh 응답 반영. 응답에 없는 이름/이메일은 기존 값을 유지한다 */
  applyRefresh: (result: SigninResult) => void
  logout: () => void
  setUserInfo: (info: UserInfoPatch) => void
}

const initialAccessToken = normalize(localStorage.getItem(ACCESS_TOKEN_KEY))

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: Boolean(initialAccessToken),
  accessToken: initialAccessToken,
  refreshToken: normalize(localStorage.getItem(REFRESH_TOKEN_KEY)),
  email:
    normalize(localStorage.getItem(USER_EMAIL_KEY)) ??
    extractEmail(initialAccessToken),
  name: normalize(localStorage.getItem(USER_NAME_KEY)),
  login: ({ accessToken, refreshToken, name, email }) => {
    const nextName = normalize(name)
    const nextEmail = normalize(email) ?? extractEmail(accessToken)

    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken)
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken)
    persist(USER_NAME_KEY, nextName)
    persist(USER_EMAIL_KEY, nextEmail)

    set({
      isAuthenticated: true,
      accessToken,
      refreshToken,
      name: nextName,
      email: nextEmail,
    })
  },
  applyRefresh: ({ accessToken, refreshToken, name, email }) =>
    set((state) => {
      const nextName = normalize(name) ?? state.name
      const nextEmail =
        normalize(email) ?? extractEmail(accessToken) ?? state.email

      localStorage.setItem(ACCESS_TOKEN_KEY, accessToken)
      localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken)
      persist(USER_NAME_KEY, nextName)
      persist(USER_EMAIL_KEY, nextEmail)

      return {
        isAuthenticated: true,
        accessToken,
        refreshToken,
        name: nextName,
        email: nextEmail,
      }
    }),
  logout: () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY)
    localStorage.removeItem(REFRESH_TOKEN_KEY)
    localStorage.removeItem(USER_NAME_KEY)
    localStorage.removeItem(USER_EMAIL_KEY)
    set({
      isAuthenticated: false,
      accessToken: null,
      refreshToken: null,
      email: null,
      name: null,
    })
  },
  setUserInfo: ({ email, name }) =>
    set((state) => {
      const nextName = normalize(name) ?? state.name
      const nextEmail = normalize(email) ?? state.email

      persist(USER_NAME_KEY, nextName)
      persist(USER_EMAIL_KEY, nextEmail)

      return { name: nextName, email: nextEmail }
    }),
}))
