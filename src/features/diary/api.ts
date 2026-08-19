import { api } from '@/shared/api/axios'
import { format } from 'date-fns'
import {
  ApiError,
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

/**
 * 오늘 날짜로 기록 작성 여부를 확인한다. getDiaryDetail과 같은 엔드포인트를
 * 오늘 날짜로 호출할 뿐이지만, 404(C404, 오늘 아직 기록 안 씀)는 진짜 에러가
 * 아니라 정상적인 "미작성" 상태라 여기서 null로 변환해 던지지 않는다.
 */
export async function getTodayDiaryStatus(): Promise<DiaryDetail | null> {
  const today = format(new Date(), 'yyyy-MM-dd')
  try {
    return await getDiaryDetail(today)
  } catch (error) {
    if (error instanceof ApiError && error.code === 'C404') return null
    throw error
  }
}
