export type FeltEffect = 'HIGH' | 'MEDIUM' | 'LOW'
export type Attribution = 'KNOWN' | 'GUESSED' | 'UNKNOWN'
export type DiagnosisGrade = 'HIGH' | 'MEDIUM' | 'LOW' | 'VERY_LOW'

export interface DiagnosisRequest {
  /** 최근 1년 시술 지출(원), 0~1,000,000 */
  procedureCost: number
  /** 최근 1년 제품 지출(원), 0~1,000,000 */
  productCost: number
  feltEffect: FeltEffect
  attribution: Attribution
}

export interface DiagnosisResult {
  diagnosisId: number
  totalCost: number
  monthlyAverage: number
  grade: DiagnosisGrade
  gradeName: string
  wasteAmount: number
}
