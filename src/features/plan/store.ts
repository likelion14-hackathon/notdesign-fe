import { create } from 'zustand'
import type { CreatePlanResult } from '@/features/plan/types'

interface PlanState {
  /** POST /api/plans 응답 */
  createdPlan: CreatePlanResult | null
  /** 생성 요청 시 보낸 monthlyBudget. 응답에는 안 들어있어서 따로 기억해둔다. */
  monthlyBudget: number | null
  setCreatedPlan: (plan: CreatePlanResult, monthlyBudget: number) => void
}

export const usePlanStore = create<PlanState>((set) => ({
  createdPlan: null,
  monthlyBudget: null,
  setCreatedPlan: (plan, monthlyBudget) =>
    set({ createdPlan: plan, monthlyBudget }),
}))
