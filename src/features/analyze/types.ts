export interface AnalyzeDiaryResult {
  requestId: string
}

export interface DiaryAnalysisResult {
  skinTone: number
  pores: number
  redness: number
  confidence: {
    skinTone: number
    pores: number
    redness: number
  }
}

/** GET /api/analyses/{requestId} (diary 사진 분석 결과 조회) 응답. 0~100 스케일. */
export interface DiaryPhotoAnalysisResult {
  pigmentation: number
  erythema: number
  pores: number
  confidence: {
    pigmentation: number
    erythema: number
    pores: number
  }
}
