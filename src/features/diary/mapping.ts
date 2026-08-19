import type { CreateDiaryParams } from '@/features/diary/api'
import type { DiaryPhotoAnalysisResult } from '@/features/analyze/types'

export interface DiaryScores {
  skinTone: number
  dryness: number
  redness: number
}

/**
 * 스토어의 skinTone/dryness/redness(0~10)를 "하루 기록 생성" API가 기대하는 키(skinTone/pores/flushing)로 변환한다.
 * dryness 필드는 이름과 달리 DiaryRecordScoreStep 실제 화면 라벨이 "모공 점수"라 pores에,
 * redness는 화면 라벨이 "붉은기 점수"라 flushing에 대응한다.
 */
export function toDiaryScorePayload(
  scores: DiaryScores,
): Pick<CreateDiaryParams, 'skinTone' | 'pores' | 'flushing'> {
  return {
    skinTone: scores.skinTone,
    pores: scores.dryness,
    flushing: scores.redness,
  }
}

/** 0~100 분석 지표를 스토어가 쓰는 0~10 정수 점수로 변환(반올림 후 clamp)한다. */
function toScoreScale(value: number): number {
  return Math.min(10, Math.max(0, Math.round(value / 10)))
}

/**
 * 사진 분석 결과(pigmentation/erythema/pores, 0~100)를 스토어 형식(skinTone/dryness/redness, 0~10)으로 변환한다.
 * - erythema(홍조) → redness: 화면 라벨("붉은기 점수")과 이름 그대로 대응
 * - pores(모공) → dryness: dryness 필드의 실제 화면 라벨이 "모공 점수"라 이쪽에 대응 (이름만 보면 안 맞아 보이니 주의)
 * - pigmentation(색소침착) → skinTone: 남은 자리이자 피부 톤/색과 가장 가까운 지표라 대응
 */
export function mapAnalysisResultToDiaryScores(
  result: DiaryPhotoAnalysisResult,
): DiaryScores {
  return {
    skinTone: toScoreScale(result.pigmentation),
    dryness: toScoreScale(result.pores),
    redness: toScoreScale(result.erythema),
  }
}
