import { create } from 'zustand'
import type { ReportResponseDto } from '@/features/report/types'

interface ReportState {
  /** POST /api/reports 응답. ReportGeneratingPage → FinalReportPage로 전달 */
  latestReport: ReportResponseDto | null
  setLatestReport: (report: ReportResponseDto) => void
}

export const useReportStore = create<ReportState>((set) => ({
  latestReport: null,
  setLatestReport: (report) => set({ latestReport: report }),
}))
