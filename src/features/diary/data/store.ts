import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface DiaryRecordData {
  skinTone: number
  dryness: number
  redness: number
  checkedTodoIds: number[]
  diaryText: string
}

interface DiaryStore {
  selectedRecordDate: string | null
  skinTone: number
  dryness: number
  redness: number
  /** "오늘 피부를 위해 어떤 것을 했나요?" 화면에서 체크한 현재 플랜 투두(checklistId) 목록 */
  checkedTodoIds: number[]
  diaryText: string
  records: Record<string, DiaryRecordData>
  startRecord: (date: string) => void
  setSkinTone: (value: number) => void
  setDryness: (value: number) => void
  setRedness: (value: number) => void
  toggleTodoId: (checklistId: number) => void
  setDiaryText: (value: string) => void
  submitRecord: () => void
}

export const useDiaryStore = create<DiaryStore>()(
  persist(
    (set, get) => ({
      selectedRecordDate: null,
      skinTone: 5,
      dryness: 5,
      redness: 5,
      checkedTodoIds: [],
      diaryText: '',
      records: {},
      startRecord: (date) =>
        set({
          selectedRecordDate: date,
          skinTone: 5,
          dryness: 5,
          redness: 5,
          checkedTodoIds: [],
          diaryText: '',
        }),
      setSkinTone: (value) => set({ skinTone: value }),
      setDryness: (value) => set({ dryness: value }),
      setRedness: (value) => set({ redness: value }),
      toggleTodoId: (checklistId) =>
        set((state) => ({
          checkedTodoIds: state.checkedTodoIds.includes(checklistId)
            ? state.checkedTodoIds.filter((value) => value !== checklistId)
            : [...state.checkedTodoIds, checklistId],
        })),
      setDiaryText: (value) => set({ diaryText: value }),
      submitRecord: () => {
        const {
          selectedRecordDate,
          skinTone,
          dryness,
          redness,
          checkedTodoIds,
          diaryText,
          records,
        } = get()
        if (!selectedRecordDate) return
        set({
          records: {
            ...records,
            [selectedRecordDate]: {
              skinTone,
              dryness,
              redness,
              checkedTodoIds,
              diaryText,
            },
          },
        })
      },
    }),
    {
      name: 'diary-storage',
      partialize: (state) => ({ records: state.records }),
    },
  ),
)
