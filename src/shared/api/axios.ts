import axios, { isAxiosError, type InternalAxiosRequestConfig } from 'axios'
import { useAuthStore } from '@/features/auth/store'
import { unwrap, type ApiEnvelope } from '@/shared/api/apiError'
import type { RefreshRequest, SigninResult } from '@/features/auth/types'

const baseConfig = {
  baseURL: import.meta.env.VITE_API_BASE_URL ?? '',
  timeout: 10_000,
  headers: {
    'Content-Type': 'application/json',
  },
}

export const api = axios.create(baseConfig)

/** 인터셉터가 붙지 않은 인스턴스. 토큰 재발급처럼 재시도 로직을 타면 안 되는 요청에 쓴다 */
export const plainApi = axios.create(baseConfig)

api.interceptors.request.use((config) => {
  const accessToken = useAuthStore.getState().accessToken
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }
  return config
})

interface RetriableConfig extends InternalAxiosRequestConfig {
  retriedAfterRefresh?: boolean
}

/** 동시에 401이 여러 개 떠도 재발급 요청은 한 번만 보낸다 */
let refreshPromise: Promise<string | null> | null = null

async function refreshAccessToken(): Promise<string | null> {
  const { refreshToken, applyRefresh, logout } = useAuthStore.getState()
  if (!refreshToken) {
    logout()
    return null
  }

  try {
    const { data } = await plainApi.post<ApiEnvelope<SigninResult>>(
      '/api/auth/refresh',
      { refreshToken } satisfies RefreshRequest,
    )
    const result = unwrap(data)
    applyRefresh(result)
    return result.accessToken
  } catch {
    logout()
    return null
  }
}

function requestAccessTokenRefresh(): Promise<string | null> {
  refreshPromise ??= refreshAccessToken().finally(() => {
    refreshPromise = null
  })
  return refreshPromise
}

function bearerToken(header: unknown): string | null {
  return typeof header === 'string' && header.startsWith('Bearer ')
    ? header.slice('Bearer '.length)
    : null
}

api.interceptors.response.use(
  (response) => response,
  async (error: unknown) => {
    if (!isAxiosError(error) || error.response?.status !== 401) {
      return Promise.reject(error)
    }

    const config = error.config as RetriableConfig | undefined
    if (!config || config.retriedAfterRefresh) {
      return Promise.reject(error)
    }

    const usedToken = bearerToken(config.headers.Authorization)
    const currentToken = useAuthStore.getState().accessToken
    /** 다른 요청이 이미 재발급을 끝냈으면 새 토큰으로 바로 재시도한다 */
    const accessToken =
      currentToken && currentToken !== usedToken
        ? currentToken
        : await requestAccessTokenRefresh()

    if (!accessToken) {
      return Promise.reject(error)
    }

    config.retriedAfterRefresh = true
    config.headers.Authorization = `Bearer ${accessToken}`
    return api(config)
  },
)
