import { api } from '@/shared/api/axios'
import { toApiError, unwrap, type ApiEnvelope } from '@/shared/api/apiError'
import type {
  AnalyzeDiaryResult,
  DiaryAnalysisResult,
  DiaryPhotoAnalysisResult,
} from '@/features/analyze/types'

export async function analyzeDiaryImage(
  image: Blob,
): Promise<AnalyzeDiaryResult> {
  const formData = new FormData()
  formData.append('image', image, 'face.jpg')

  try {
    const { data } = await api.post<ApiEnvelope<AnalyzeDiaryResult>>(
      '/api/analyses/diary',
      formData,
      // 인스턴스 기본 Content-Type(application/json)을 지워야 브라우저가 multipart boundary를 자동으로 채운다.
      { headers: { 'Content-Type': undefined } },
    )
    return unwrap(data)
  } catch (error) {
    throw toApiError(error)
  }
}

/** 다이어리(오늘의 기록) 플로우용 얼굴 사진 분석 요청. trial용 analyzeDiaryImage와 달리 /api/analyses(=/diary 접미사 없음)를 호출한다. */
export async function requestDiaryAnalysis(
  image: Blob,
): Promise<AnalyzeDiaryResult> {
  const formData = new FormData()
  formData.append('image', image, 'face.jpg')

  try {
    const { data } = await api.post<ApiEnvelope<AnalyzeDiaryResult>>(
      '/api/analyses',
      formData,
      // 인스턴스 기본 Content-Type(application/json)을 지워야 브라우저가 multipart boundary를 자동으로 채운다.
      { headers: { 'Content-Type': undefined } },
    )
    return unwrap(data)
  } catch (error) {
    throw toApiError(error)
  }
}

// 이 엔드포인트만 skin_tone처럼 snake_case로 내려줘서, 응답을 그대로 쓰지 않고 camelCase로 변환해서 반환한다.
interface DiaryAnalysisResponse {
  skin_tone: number
  pores: number
  redness: number
  confidence: {
    skin_tone: number
    pores: number
    redness: number
  }
}

export async function getDiaryAnalysisResult(
  requestId: string,
): Promise<DiaryAnalysisResult> {
  try {
    const { data } = await api.get<ApiEnvelope<DiaryAnalysisResponse>>(
      `/api/analyses/diary/${requestId}`,
    )
    const raw = unwrap(data)
    return {
      skinTone: raw.skin_tone,
      pores: raw.pores,
      redness: raw.redness,
      confidence: {
        skinTone: raw.confidence.skin_tone,
        pores: raw.confidence.pores,
        redness: raw.confidence.redness,
      },
    }
  } catch (error) {
    throw toApiError(error)
  }
}

/** 다이어리(오늘의 기록) 플로우용 사진 분석 결과 폴링 조회. done 전까지는 404(C404)로 응답한다. */
export async function getDiaryPhotoAnalysisResult(
  requestId: string,
): Promise<DiaryPhotoAnalysisResult> {
  try {
    const { data } = await api.get<ApiEnvelope<DiaryPhotoAnalysisResult>>(
      `/api/analyses/${requestId}`,
    )
    return unwrap(data)
  } catch (error) {
    throw toApiError(error)
  }
}
