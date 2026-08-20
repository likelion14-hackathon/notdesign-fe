import { PLAN_CATEGORY_TAG } from '@/features/measurement/constants'
import type {
  ActionTimelineRow,
  ContributionItem,
  CostItem,
  FinalScoreMetric,
  PlanCategory,
  WeekScoreMetric,
} from '@/features/measurement/types'
import type {
  ReportCategory,
  ReportContribution,
  ReportExecution,
  ReportImprovement,
  ReportMetric,
  ReportReliability,
} from '@/features/report/types'
import { truncateText } from '@/shared/utils/truncateText'

const REPORT_TIMELINE_WEEKS = 12

const CATEGORY_ORDER: PlanCategory[] = [
  'procedure',
  'lifestyle',
  'homecare',
  'supplement',
]

const CATEGORY_FROM_API: Record<ReportCategory, PlanCategory> = {
  PROCEDURE: 'procedure',
  LIFESTYLE: 'lifestyle',
  HOME_CARE: 'homecare',
  SUPPLEMENT: 'supplement',
}

const RELIABILITY_LABEL: Record<ReportReliability, string> = {
  HIGH: '신뢰도 높음',
  MID: '신뢰도 보통',
  LOW: '신뢰도 낮음',
}

const RELIABILITY_TONE: Record<ReportReliability, 'high' | 'medium'> = {
  HIGH: 'high',
  MID: 'medium',
  LOW: 'medium',
}

/** delta(변화량)가 가장 작은(=가장 많이 개선된) 지표를 강조 표시한다 */
function buildScoreStatuses(metrics: ReportMetric[]): boolean[] {
  if (metrics.length === 0) return []
  const minDelta = Math.min(...metrics.map((metric) => metric.delta))
  return metrics.map((metric) => metric.delta === minDelta)
}

/** 화면에 처음 선택되어 있을 지표. 가장 많이 개선된 지표를 기본값으로 쓴다 */
export function pickDefaultImprovement(
  metrics: ReportMetric[],
): ReportImprovement | null {
  if (metrics.length === 0) return null
  return metrics.reduce((a, b) => (b.delta < a.delta ? b : a)).improvement
}

/** 선택된 지표(색소침착/모공/홍조)에 해당하는 기여 항목만 골라낸다 */
export function filterContributionsByImprovement(
  contributions: ReportContribution[],
  improvement: ReportImprovement | null,
): ReportContribution[] {
  if (improvement === null) return []
  return contributions.filter((item) => item.improvement === improvement)
}

/** 도넛 가운데에 들어가는 항목명 최대 길이. 더 길면 잘라서 표시한다 */
const TOP_CONTRIBUTION_NAME_MAX_LENGTH = 9

/** 선택된 지표에서 기여율이 가장 높은 항목 */
export function pickTopContribution(
  contributions: ReportContribution[],
): { name: string; percentage: number } | null {
  if (contributions.length === 0) return null
  const top = contributions.reduce((a, b) =>
    b.contributionRate > a.contributionRate ? b : a,
  )
  return {
    name: truncateText(top.content, TOP_CONTRIBUTION_NAME_MAX_LENGTH),
    percentage: Math.round(top.contributionRate),
  }
}

/** 12주 최종 리포트 상단 점수 카드(전/후 비교 포함) */
export function buildFinalScoreMetrics(
  metrics: ReportMetric[],
): FinalScoreMetric[] {
  const emphasizedFlags = buildScoreStatuses(metrics)
  return metrics.map((metric, index) => ({
    improvement: metric.improvement,
    label: metric.improvementName,
    delta: metric.delta,
    before: metric.before,
    after: metric.after,
    status: emphasizedFlags[index] ? '가장 개선됨' : '보통',
  }))
}

/** 6주차 중간 리포트 상단 점수 카드 */
export function buildWeekScoreMetrics(
  metrics: ReportMetric[],
): WeekScoreMetric[] {
  const emphasizedFlags = buildScoreStatuses(metrics)
  return metrics.map((metric, index) => ({
    improvement: metric.improvement,
    label: metric.improvementName,
    delta: metric.delta,
    status: emphasizedFlags[index] ? '가장 개선됨' : '보통',
  }))
}

/** "어떤 노력이 기여했을까요?" 목록 */
export function buildContributionItems(
  contributions: ReportContribution[],
): ContributionItem[] {
  return contributions.map((item) => ({
    category: CATEGORY_FROM_API[item.category],
    name: item.content,
    score: item.score,
    contributionRate: item.contributionRate,
    confidence:
      item.score !== 0
        ? {
            label: RELIABILITY_LABEL[item.reliability],
            tone: RELIABILITY_TONE[item.reliability],
          }
        : undefined,
  }))
}

/** "1점 개선에 든 비용" 목록. contributions[].costPerPoint 기반 */
export function buildCostItems(
  contributions: ReportContribution[],
): CostItem[] {
  return contributions.map((item) => ({
    category: CATEGORY_FROM_API[item.category],
    name: item.content,
    costPerPoint: item.costPerPoint,
  }))
}

/**
 * "12주 동안 어떻게 실천했을까요?" 타임라인. 12주 플랜 타임라인(PlanTimelineSection)과
 * 동일하게 카테고리별로 묶어 "시술/생활 습관/홈케어/영양제" 4줄로 보여준다.
 * plannedWeeks(계획)를 기본으로 칠하고, doneWeeks(실천)는 진한 색으로 구분한다.
 */
export function buildExecutionTimelineRows(
  executions: ReportExecution[],
): ActionTimelineRow[] {
  return CATEGORY_ORDER.map((category) => {
    const categoryExecutions = executions.filter(
      (execution) => CATEGORY_FROM_API[execution.category] === category,
    )
    if (categoryExecutions.length === 0) return null

    const plannedWeekSet = new Set(
      categoryExecutions.flatMap((execution) => execution.plannedWeeks),
    )
    const doneWeekSet = new Set(
      categoryExecutions.flatMap((execution) => execution.doneWeeks),
    )

    return {
      label: PLAN_CATEGORY_TAG[category].label,
      weeks: Array.from({ length: REPORT_TIMELINE_WEEKS }, (_, index) => {
        const week = index + 1
        if (doneWeekSet.has(week)) return 'done'
        if (plannedWeekSet.has(week)) return 'planned'
        return 'none'
      }),
    }
  }).filter((row): row is ActionTimelineRow => row !== null)
}
