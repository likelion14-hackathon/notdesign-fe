import { isAxiosError } from 'axios'

export interface ApiEnvelope<T> {
  data: T | null
  error: {
    code: string | null
    message: string | null
  } | null
}

const DEFAULT_MESSAGE_BY_STATUS: Record<number, string> = {
  400: '요청 내용을 확인해주세요.',
  401: '로그인이 필요합니다. 다시 로그인해주세요.',
  500: '서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.',
  502: '서버 연결에 실패했습니다. 잠시 후 다시 시도해주세요.',
}

const FALLBACK_MESSAGE = '알 수 없는 오류가 발생했습니다.'

export class ApiError extends Error {
  code: string | null
  status: number | null

  constructor(message: string, code: string | null, status: number | null) {
    super(message)
    this.name = 'ApiError'
    this.code = code
    this.status = status
  }
}

export function toApiError(error: unknown): ApiError {
  if (isAxiosError<ApiEnvelope<unknown>>(error)) {
    const status = error.response?.status ?? null
    const serverError = error.response?.data?.error
    const message =
      serverError?.message ??
      (status ? DEFAULT_MESSAGE_BY_STATUS[status] : undefined) ??
      FALLBACK_MESSAGE
    return new ApiError(message, serverError?.code ?? null, status)
  }

  if (error instanceof Error) {
    return new ApiError(error.message, null, null)
  }

  return new ApiError(FALLBACK_MESSAGE, null, null)
}

export function unwrap<T>(envelope: ApiEnvelope<T>): T {
  assertSuccess(envelope)
  if (envelope.data === null) {
    throw new ApiError(FALLBACK_MESSAGE, null, null)
  }
  return envelope.data
}

export function assertSuccess(envelope: ApiEnvelope<unknown>): void {
  if (envelope.error?.code) {
    throw new ApiError(
      envelope.error.message ?? FALLBACK_MESSAGE,
      envelope.error.code,
      null,
    )
  }
}
