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
  ReportMetric,
  ReportReliability,
} from '@/features/report/types'

const REPORT_TIMELINE_WEEKS = 12

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

function formatDeltaLabel(delta: number): string {
  return `${delta > 0 ? '+' : ''}${delta}점`
}

/** delta(변화량)가 가장 작은(=가장 많이 개선된) 지표를 강조 표시한다 */
function buildScoreStatuses(metrics: ReportMetric[]): boolean[] {
  if (metrics.length === 0) return []
  const minDelta = Math.min(...metrics.map((metric) => metric.delta))
  return metrics.map((metric) => metric.delta === minDelta)
}

/** 12주 최종 리포트 상단 점수 카드(전/후 비교 포함) */
export function buildFinalScoreMetrics(metrics: ReportMetric[]): FinalScoreMetric[] {
  const emphasizedFlags = buildScoreStatuses(metrics)
  return metrics.map((metric, index) => ({
    label: metric.improvementName,
    scoreLabel: formatDeltaLabel(metric.delta),
    beforeAfter: `${metric.before} → ${metric.after}`,
    status: emphasizedFlags[index] ? '가장 개선됨' : '보통',
    emphasized: emphasizedFlags[index],
  }))
}

/** 6주차 중간 리포트 상단 점수 카드 */
export function buildWeekScoreMetrics(metrics: ReportMetric[]): WeekScoreMetric[] {
  const emphasizedFlags = buildScoreStatuses(metrics)
  return metrics.map((metric, index) => ({
    label: metric.improvementName,
    scoreLabel: formatDeltaLabel(metric.delta),
    status: emphasizedFlags[index] ? '가장 개선됨' : '보통',
    emphasized: emphasizedFlags[index],
  }))
}

/** "어떤 노력이 기여했을까요?" 목록 */
export function buildContributionItems(
  contributions: ReportContribution[],
): ContributionItem[] {
  return contributions.map((item) => ({
    category: CATEGORY_FROM_API[item.category],
    name: item.content,
    scoreLabel: item.score > 0 ? `-${item.score.toFixed(2)}점` : '기여하지 않음',
    confidence:
      item.score > 0
        ? {
            label: RELIABILITY_LABEL[item.reliability],
            tone: RELIABILITY_TONE[item.reliability],
          }
        : undefined,
    note: item.score > 0 ? `${item.contributionRate}% 기여` : '지표 변화가 관측되지 않음',
  }))
}

/** "1점 개선에 든 비용" 목록. contributions[].costPerPoint 기반 */
export function buildCostItems(contributions: ReportContribution[]): CostItem[] {
  return contributions.map((item) => ({
    category: CATEGORY_FROM_API[item.category],
    name: item.content,
    cost:
      item.costPerPoint > 0
        ? `${(item.costPerPoint / 10_000).toFixed(1)}만원/점`
        : '비용 없음',
  }))
}

/** "12주 동안 어떻게 실천했을까요?" 타임라인. executions[].doneWeeks 기반 */
export function buildExecutionTimelineRows(
  executions: ReportExecution[],
): ActionTimelineRow[] {
  return executions.map((execution) => {
    const doneWeekSet = new Set(execution.doneWeeks)
    return {
      label: execution.name,
      activeWeeks: Array.from({ length: REPORT_TIMELINE_WEEKS }, (_, index) =>
        doneWeekSet.has(index + 1),
      ),
    }
  })
}
