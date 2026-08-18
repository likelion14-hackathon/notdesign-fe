import { create } from 'zustand'
import { WELLNESS_SPENDING_DEFAULT } from '@/features/wellness/constants'

/** 웰니스 지출 진단에 들어오기 전 어떤 흐름이었는지 (건너뛰기/완료 후 목적지 분기에 사용) */
export type WellnessEntryFlow = 'measurement' | 'trial'

interface WellnessState {
  procedureCost: number
  skincareCost: number
  effectPerceptionId: string | null
  contributionAwarenessId: string | null
  entryFlow: WellnessEntryFlow
  setProcedureCost: (value: number) => void
  setSkincareCost: (value: number) => void
  setEffectPerceptionId: (id: string) => void
  setContributionAwarenessId: (id: string) => void
  setEntryFlow: (flow: WellnessEntryFlow) => void
}

export const useWellnessStore = create<WellnessState>((set) => ({
  procedureCost: WELLNESS_SPENDING_DEFAULT,
  skincareCost: WELLNESS_SPENDING_DEFAULT,
  effectPerceptionId: null,
  contributionAwarenessId: null,
  entryFlow: 'measurement',
  setProcedureCost: (value) => set({ procedureCost: value }),
  setSkincareCost: (value) => set({ skincareCost: value }),
  setEffectPerceptionId: (id) => set({ effectPerceptionId: id }),
  setContributionAwarenessId: (id) => set({ contributionAwarenessId: id }),
  setEntryFlow: (flow) => set({ entryFlow: flow }),
}))
