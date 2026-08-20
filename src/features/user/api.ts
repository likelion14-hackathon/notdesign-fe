import { api } from '@/shared/api/axios'
import { toApiError, unwrap, type ApiEnvelope } from '@/shared/api/apiError'
import type { UserInfo } from '@/features/user/types'

export async function agreeToMeasurementUsage(): Promise<UserInfo> {
  try {
    const { data } = await api.patch<ApiEnvelope<UserInfo>>('/api/users/me')
    return unwrap(data)
  } catch (error) {
    throw toApiError(error)
  }
}

export async function getMyInfo(): Promise<UserInfo> {
  try {
    const { data } = await api.get<ApiEnvelope<UserInfo>>('/api/users/me')
    return unwrap(data)
  } catch (error) {
    throw toApiError(error)
  }
}
