import { create } from 'zustand'
import { WELLNESS_SPENDING_DEFAULT } from '@/features/wellness/constants'
import type { DiagnosisResult } from '@/features/diagnosis/types'

/** 웰니스 지출 진단에 들어오기 전 어떤 흐름이었는지 (건너뛰기/완료 후 목적지 분기에 사용) */
export type WellnessEntryFlow = 'measurement' | 'trial'

interface WellnessState {
  procedureCost: number
  skincareCost: number
  effectPerceptionId: string | null
  contributionAwarenessId: string | null
  entryFlow: WellnessEntryFlow
  /** POST /api/diagnoses 응답. 결과 화면들이 이 값을 우선 사용한다. */
  diagnosisResult: DiagnosisResult | null
  /**
   * 낭비 지출/연간 지출/월평균 등 카운트업 카드가 이번 진단 세션에서
   * 한 번이라도 애니메이션을 보여줬는지 여부. waste-reveal → yearly-spend-reveal
   * → monthly-avg-reveal → spend-summary 로 페이지를 넘어갈 때마다 이전 페이지에서
   * 이미 다 센 카드가 새 페이지에서 다시 0부터 카운트업되는 걸 막기 위해 둠.
   */
  revealedMetrics: Record<string, boolean>
  setProcedureCost: (value: number) => void
  setSkincareCost: (value: number) => void
  setEffectPerceptionId: (id: string) => void
  setContributionAwarenessId: (id: string) => void
  setEntryFlow: (flow: WellnessEntryFlow) => void
  setDiagnosisResult: (result: DiagnosisResult) => void
  markMetricRevealed: (id: string) => void
}

export const useWellnessStore = create<WellnessState>((set) => ({
  procedureCost: WELLNESS_SPENDING_DEFAULT,
  skincareCost: WELLNESS_SPENDING_DEFAULT,
  effectPerceptionId: null,
  contributionAwarenessId: null,
  entryFlow: 'measurement',
  diagnosisResult: null,
  revealedMetrics: {},
  setProcedureCost: (value) => set({ procedureCost: value }),
  setSkincareCost: (value) => set({ skincareCost: value }),
  setEffectPerceptionId: (id) => set({ effectPerceptionId: id }),
  setContributionAwarenessId: (id) => set({ contributionAwarenessId: id }),
  setEntryFlow: (flow) => set({ entryFlow: flow }),
  setDiagnosisResult: (result) =>
    set({ diagnosisResult: result, revealedMetrics: {} }),
  markMetricRevealed: (id) =>
    set((state) => ({
      revealedMetrics: { ...state.revealedMetrics, [id]: true },
    })),
}))
