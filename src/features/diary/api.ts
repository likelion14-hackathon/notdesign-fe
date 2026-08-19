import { api } from '@/shared/api/axios'
import {
  assertSuccess,
  toApiError,
  unwrap,
  type ApiEnvelope,
} from '@/shared/api/apiError'

export interface CreateDiaryParams {
  skinTone: number
  pores: number
  flushing: number
  comment?: string
  doneChecklistIds?: number[]
}

export async function createDiary(params: CreateDiaryParams): Promise<void> {
  try {
    const { data } = await api.post<ApiEnvelope<null>>('/api/diaries', params)
    assertSuccess(data)
  } catch (error) {
    throw toApiError(error)
  }
}

export interface DiaryCalendarDay {
  /** yyyy-MM-dd */
  date: string
  recorded: boolean
}

/** 해당 월(1~12) 1일부터 말일까지 날짜별 기록 존재 여부를 조회한다. */
export async function getDiaryCalendar(
  year: number,
  month: number,
): Promise<DiaryCalendarDay[]> {
  try {
    const { data } = await api.get<ApiEnvelope<DiaryCalendarDay[]>>(
      '/api/diaries/calendar',
      { params: { year, month } },
    )
    return unwrap(data)
  } catch (error) {
    throw toApiError(error)
  }
}

export type DiaryTodoCategory =
  | 'PROCEDURE'
  | 'SUPPLEMENT'
  | 'HOME_CARE'
  | 'LIFESTYLE'

export interface DiaryTodo {
  checklistId: number
  category: DiaryTodoCategory
  /** 서버가 이미 한글 라벨로 내려줌 (시술/영양제/홈케어/생활습관) */
  categoryName: string
  content: string
  done: boolean
}

export interface DiaryDetail {
  diaryId: number
  skinTone: number
  pores: number
  flushing: number
  comment: string
  todos: DiaryTodo[]
}

/** 특정 일자(yyyy-MM-dd)의 기록 상세를 조회한다. 기록이 없으면 404(C404)로 응답한다. */
export async function getDiaryDetail(recordedDate: string): Promise<DiaryDetail> {
  try {
    const { data } = await api.get<ApiEnvelope<DiaryDetail>>(
      `/api/diaries/${recordedDate}`,
    )
    return unwrap(data)
  } catch (error) {
    throw toApiError(error)
  }
}
