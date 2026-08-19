import { MY_STATS } from '@/features/my/constants'

interface MyStatCardsProps {
  /** 없으면 기존 목업을 보여줌 */
  stats?: { elapsedDays: number; recordedDays: number }
}

export default function MyStatCards({ stats }: MyStatCardsProps) {
  const { recordDays, averageRate } = stats
    ? {
        recordDays: { label: '기록', value: `${stats.recordedDays}일` },
        averageRate: {
          label: '평균 실행률',
          value:
            stats.elapsedDays > 0
              ? `${Math.round((stats.recordedDays / stats.elapsedDays) * 100)}%`
              : '0%',
        },
      }
    : MY_STATS

  return (
    <div className="flex gap-4">
      {[recordDays, averageRate].map((stat) => (
        <div
          key={stat.label}
          className="border-outline bg-box-background min-w-0 flex-1 rounded-[10px] border px-5 pt-5.75 pb-5.75"
        >
          <p className="text-text-secondary text-[12px] leading-3.75 font-semibold tracking-[-0.24px]">
            {stat.label}
          </p>
          <p className="text-text-primary mt-2.75 text-[24px] leading-6 font-semibold tracking-[-0.48px]">
            {stat.value}
          </p>
        </div>
      ))}
    </div>
  )
}
