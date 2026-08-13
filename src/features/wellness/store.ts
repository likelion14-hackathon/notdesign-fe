import { create } from 'zustand'
import { WELLNESS_SPENDING_DEFAULT } from '@/features/wellness/constants'

interface WellnessState {
  procedureCost: number
  skincareCost: number
  effectPerceptionId: string | null
  contributionAwarenessId: string | null
  setProcedureCost: (value: number) => void
  setSkincareCost: (value: number) => void
  setEffectPerceptionId: (id: string) => void
  setContributionAwarenessId: (id: string) => void
}

export const useWellnessStore = create<WellnessState>((set) => ({
  procedureCost: WELLNESS_SPENDING_DEFAULT,
  skincareCost: WELLNESS_SPENDING_DEFAULT,
  effectPerceptionId: null,
  contributionAwarenessId: null,
  setProcedureCost: (value) => set({ procedureCost: value }),
  setSkincareCost: (value) => set({ skincareCost: value }),
  setEffectPerceptionId: (id) => set({ effectPerceptionId: id }),
  setContributionAwarenessId: (id) => set({ contributionAwarenessId: id }),
}))
