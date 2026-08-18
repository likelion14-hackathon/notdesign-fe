export interface AnalyzeRequest {
  imageUrl: string
}

export interface AnalyzeRequestResult {
  requestId: string
}

/** GET /analyses/{requestId} 명세가 확정되면 실제 필드로 채움. */
export type AnalyzeResult = unknown

export type AnalyzeStatus = 'pending' | 'done' | 'timeout'
