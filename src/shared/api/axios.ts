import axios from 'axios'
import { useAuthStore } from '@/features/auth/store'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? '',
  timeout: 10_000,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use((config) => {
  const accessToken = useAuthStore.getState().accessToken
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // 공통 에러 처리 지점 (인증 만료, 토스트 등)
    return Promise.reject(error)
  },
)
