import { api } from '@/shared/api/axios'
import {
  toApiError,
  unwrap,
  assertSuccess,
  type ApiEnvelope,
} from '@/shared/api/apiError'
import type {
  KakaoSigninRequest,
  SigninRequest,
  SigninResult,
} from '@/features/auth/types'

export async function signIn(
  email: string,
  password: string,
): Promise<SigninResult> {
  try {
    const { data } = await api.post<ApiEnvelope<SigninResult>>(
      '/api/auth/login/signin',
      { email, password } satisfies SigninRequest,
    )
    return unwrap(data)
  } catch (error) {
    throw toApiError(error)
  }
}

export async function signInWithKakao(code: string): Promise<SigninResult> {
  try {
    const { data } = await api.post<ApiEnvelope<SigninResult>>(
      '/api/auth/login/kakao',
      { code } satisfies KakaoSigninRequest,
    )
    return unwrap(data)
  } catch (error) {
    throw toApiError(error)
  }
}

export async function signOut(): Promise<void> {
  try {
    const { data } = await api.post<ApiEnvelope<null>>('/api/auth/logout')
    assertSuccess(data)
  } catch (error) {
    throw toApiError(error)
  }
}
