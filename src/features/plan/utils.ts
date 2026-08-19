import type {
  PlanCategory,
  PlanDetailItem,
  PlanTimelineRow,
} from '@/features/measurement/types'
import { PLAN_CATEGORY_TAG } from '@/features/measurement/constants'
import type { PlanItem, PlanItemCategory } from '@/features/plan/types'

const CATEGORY_ORDER: PlanCategory[] = [
  'procedure',
  'lifestyle',
  'homecare',
  'supplement',
]

const CATEGORY_FROM_API: Record<PlanItemCategory, PlanCategory> = {
  PROCEDURE: 'procedure',
  LIFESTYLE: 'lifestyle',
  HOME_CARE: 'homecare',
  SUPPLEMENT: 'supplement',
}

/** 타임라인 상단에 표시할 구간 마커를 만든다. 12주 플랜이면 ['1주','4주','8주','12주'], 7일 체험이면 ['1일','3일','5일','7일'] 형태 */
export function buildTimelineUnitMarkers(totalUnits: number, unitLabel: string): string[] {
  const marks = [1, Math.round(totalUnits / 3), Math.round((totalUnits * 2) / 3), totalUnits]
  return [...new Set(marks)].map((mark) => `${mark}${unitLabel}`)
}

/** 원 단위 금액을 "18만원"/"6.8만원"/"비용 없음" 형태로 표시한다 */
export function formatManwon(amount: number): string {
  if (amount <= 0) return '비용 없음'
  const manwon = amount / 10_000
  return Number.isInteger(manwon) ? `${manwon}만원` : `${manwon.toFixed(1)}만원`
}

/**
 * 카테고리별로 items를 묶어 타임라인 차트의 행(주차별 활성 여부)을 만든다.
 * "시술/생활 습관/홈케어/영양제" 4줄 고정. 같은 카테고리에 항목이 여러 개면
 * 그중 하나라도 활성인 주차를 색칠한다(합집합) — 카테고리에 "매일" 항목만
 * 있으면 전부, "1회" 항목만 있으면 해당 주차만 정확히 반영된다.
 */
export function buildTimelineRows(
  items: PlanItem[],
  totalWeeks: number,
): PlanTimelineRow[] {
  return CATEGORY_ORDER.map((category) => {
    const categoryItems = items.filter(
      (item) => CATEGORY_FROM_API[item.category] === category,
    )
    if (categoryItems.length === 0) return null

    const activeWeekSet = new Set(categoryItems.flatMap((item) => item.weeks))
    const activeWeeks = Array.from({ length: totalWeeks }, (_, index) =>
      activeWeekSet.has(index + 1),
    )

    return {
      category,
      label: PLAN_CATEGORY_TAG[category].label,
      activeWeeks,
    }
  }).filter((row): row is PlanTimelineRow => row !== null)
}

/** "1회"/"2회"처럼 순수 횟수만 있는 문구. 그 외("매일", "아침저녁 2회" 등)는 매일 반복으로 간주한다 */
const ONE_TIME_FREQUENCY_PATTERN = /^\d+회$/

/**
 * TRIAL(일주일 체험) 전용 타임라인. weeks가 항상 [1]이라(1주 단위) 요일별 구분이
 * 안 되므로, frequency 문구를 봐서 "N회"(순수 횟수)만 1일차에, 그 외("매일" 등
 * 반복 표현)는 totalDays 전부에 색칠한다. "시술/생활 습관/홈케어/영양제" 4줄 고정.
 */
export function buildTrialTimelineRows(
  items: PlanItem[],
  totalDays: number,
): PlanTimelineRow[] {
  return CATEGORY_ORDER.map((category) => {
    const categoryItems = items.filter(
      (item) => CATEGORY_FROM_API[item.category] === category,
    )
    if (categoryItems.length === 0) return null

    const activeDaySet = new Set<number>()
    for (const item of categoryItems) {
      if (ONE_TIME_FREQUENCY_PATTERN.test(item.frequency.trim())) {
        item.weeks.forEach((day) => activeDaySet.add(day))
      } else {
        for (let day = 1; day <= totalDays; day += 1) activeDaySet.add(day)
      }
    }

    const activeWeeks = Array.from({ length: totalDays }, (_, index) =>
      activeDaySet.has(index + 1),
    )

    return {
      category,
      label: PLAN_CATEGORY_TAG[category].label,
      activeWeeks,
    }
  }).filter((row): row is PlanTimelineRow => row !== null)
}

/** API 응답 items를 "상세보기" 목록 카드 형태로 변환한다 */
export function buildDetailItems(items: PlanItem[]): PlanDetailItem[] {
  return items.map((item) => {
    const startWeek = Math.min(...item.weeks)
    return {
      weekLabel: `${startWeek}주차 시작`,
      category: CATEGORY_FROM_API[item.category],
      categoryLabel: item.categoryName,
      name: item.content,
      frequency: item.frequency,
      price: formatManwon(item.price),
      description: item.reason,
    }
  })
}
