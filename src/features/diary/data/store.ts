import { create } from "zustand"
import { persist } from "zustand/middleware"

interface DiaryRecordData {
  skinTone: number
  dryness: number
  redness: number
  checklist: string[]
  diaryText: string
}

interface DiaryStore {
  selectedRecordDate: string | null
  skinTone: number
  dryness: number
  redness: number
  checklist: string[]
  diaryText: string
  records: Record<string, DiaryRecordData>
  startRecord: (date: string) => void
  setSkinTone: (value: number) => void
  setDryness: (value: number) => void
  setRedness: (value: number) => void
  toggleChecklistItem: (item: string) => void
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
      checklist: [],
      diaryText: "",
      records: {},
      startRecord: (date) =>
        set({
          selectedRecordDate: date,
          skinTone: 5,
          dryness: 5,
          redness: 5,
          checklist: [],
          diaryText: "",
        }),
      setSkinTone: (value) => set({ skinTone: value }),
      setDryness: (value) => set({ dryness: value }),
      setRedness: (value) => set({ redness: value }),
      toggleChecklistItem: (item) =>
        set((state) => ({
          checklist: state.checklist.includes(item)
            ? state.checklist.filter((value) => value !== item)
            : [...state.checklist, item],
        })),
      setDiaryText: (value) => set({ diaryText: value }),
      submitRecord: () => {
        const {
          selectedRecordDate,
          skinTone,
          dryness,
          redness,
          checklist,
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
              checklist,
              diaryText,
            },
          },
        })
      },
    }),
    {
      name: "diary-storage",
      partialize: (state) => ({ records: state.records }),
    }
  )
)