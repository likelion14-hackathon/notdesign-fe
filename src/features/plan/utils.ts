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

/** 원 단위 금액을 "18만원"/"6.8만원"/"비용 없음" 형태로 표시한다 */
export function formatManwon(amount: number): string {
  if (amount <= 0) return '비용 없음'
  const manwon = amount / 10_000
  return Number.isInteger(manwon) ? `${manwon}만원` : `${manwon.toFixed(1)}만원`
}

/** 카테고리별로 items를 묶어 타임라인 차트의 행(주차별 활성 여부)을 만든다 */
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
