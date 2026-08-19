import { api } from '@/shared/api/axios'
import { toApiError, unwrap, type ApiEnvelope } from '@/shared/api/apiError'
import type { Clinic } from '@/features/measurement/types'

export async function getClinics(): Promise<Clinic[]> {
  try {
    const { data } = await api.get<ApiEnvelope<Clinic[]>>('/api/clinics')
    return unwrap(data)
  } catch (error) {
    throw toApiError(error)
  }
}
