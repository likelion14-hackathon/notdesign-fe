import { create } from 'zustand'
import type { SigninResult } from '@/features/auth/types'
import { decodeJwtPayload } from '@/shared/utils/jwt'

const ACCESS_TOKEN_KEY = 'accessToken'
const REFRESH_TOKEN_KEY = 'refreshToken'

interface AccessTokenPayload {
  sub?: string
}

function extractEmail(accessToken: string | null): string | null {
  if (!accessToken) return null
  return decodeJwtPayload<AccessTokenPayload>(accessToken)?.sub ?? null
}

interface AuthState {
  isAuthenticated: boolean
  accessToken: string | null
  email: string | null
  name: string | null
  login: (tokens: SigninResult) => void
  logout: () => void
  setUserInfo: (info: { email: string; name: string }) => void
}

const initialAccessToken = localStorage.getItem(ACCESS_TOKEN_KEY)

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: Boolean(initialAccessToken),
  accessToken: initialAccessToken,
  email: extractEmail(initialAccessToken),
  name: null,
  login: ({ accessToken, refreshToken }) => {
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken)
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken)
    set({
      isAuthenticated: true,
      accessToken,
      email: extractEmail(accessToken),
    })
  },
  logout: () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY)
    localStorage.removeItem(REFRESH_TOKEN_KEY)
    set({ isAuthenticated: false, accessToken: null, email: null, name: null })
  },
  setUserInfo: ({ email, name }) => set({ email, name }),
}))
