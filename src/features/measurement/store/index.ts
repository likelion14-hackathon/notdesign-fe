import { create } from 'zustand'
import type { OfflineResult } from '@/features/measurement/types'

interface MeasurementState {
  /** 선택한 클리닉 id. 오프라인 측정 결과 불러오기(POST /results?clinicId=)에 사용 */
  selectedClinicId: number | null
  setSelectedClinicId: (id: number) => void
  /** POST /api/results 응답. MeasurementResultPage에서 그대로 표시 */
  offlineResult: OfflineResult | null
  setOfflineResult: (result: OfflineResult) => void
}

export const useMeasurementStore = create<MeasurementState>((set) => ({
  selectedClinicId: null,
  setSelectedClinicId: (id) => set({ selectedClinicId: id }),
  offlineResult: null,
  setOfflineResult: (result) => set({ offlineResult: result }),
}))
